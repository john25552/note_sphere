import { defineStore } from 'pinia';
import { Socket, io } from 'socket.io-client';
// import { ref, type Ref } from 'vue';
// import { useErrorStore } from './errorStore';
// import { useAccountStore } from './account';
// import { useHomeStore } from './homeStore';
import { useCameraStore, type Space } from './cameraStore';
import type { Message } from './inboxStore';

export const useSpaceSocketStore = defineStore('spaceSocketStore', {
  state: () => {
    return{
      localStream: new MediaStream(),
      remoteStreams: null as MediaStream | null,
      peerConnection: new RTCPeerConnection as  RTCPeerConnection,
      socket: null as Socket | null,
      cameraStore: useCameraStore(),
      configuration: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun.stunprotocol.org:3478' }
        ]
      }
    }
  },
  actions: {
    async startCall () {

      // If call initiater isn't space owner, ask to join room
      // if (space.owner != useAccountStore().user?.email_address){
        // if (!this.socket)
        this.socket = io("https://notesphere-sys-production.up.railway.app/space", {transports: ['websocket'], withCredentials: true})
        // this.socket = io("http://localhost:3000/space", {transports: ['websocket'], withCredentials: true })
        // this.socket?.emit('join', {room: space.id})
      // }
  
      this.socket?.on('new_client', async (clientId: any) => {
        console.log("Got a new member ", clientId)
        await this.createConnection(clientId)
      })

      this.socket?.on('messages', (data) => {
        this.cameraStore.loaded_space.messages = data
      })

      this.socket?.on('message', (data) => {
        let dataObj = data.createdMessage
        let message: Message = {
          body: dataObj.body,
          sender: dataObj.sender,
          receiver: dataObj.receiver,
          sentAt: dataObj.sentAt,
          id: dataObj.id,
          owner: data.owner,
          target: dataObj.target
        }

        this.cameraStore.pushMessage(message)
      })
  
      this.socket?.on('signal', async (data) => {
        console.log("Received signal", data)
        await this.handleServerSignal(data)
      })

      this.socket?.on('candidate', data => {
        console.log("Got a candidate signal", data)
        let candidate = new RTCIceCandidate(data.candidate)
        console.log("Candidate to add is ", candidate) 

        this.peerConnection.addIceCandidate(candidate);
      })
  
      this.socket?.on('exception', async(data) => {
        console.log("We aren't authorized", data)
      })
  
    },
  
    async createConnection(clientId: string) {
      try{
        this.peerConnection =  new RTCPeerConnection(this.configuration)
  
        this.localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
  
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream)
        })
  
        let offer = await this.peerConnection.createOffer()
        await this.peerConnection.setLocalDescription(offer)
  
        this.peerConnection.onicecandidate = (event) => {
          if(event.candidate){
            this.socket?.emit('candidate', {signalType: 'candidate', candidate: event.candidate, client: clientId})
          }
        }
  
        this.peerConnection.ontrack = (event) => {
          this.remoteStreams = event.streams[0]
          console.log("added a remote track")
        }
        let localSdp = this.peerConnection.localDescription
        console.log("Local sdp is ", localSdp)

        this.socket?.emit('signal', {signalType: offer.type, sdp: localSdp, client: clientId})
      } catch(error) {
        console.log("Error while starting peer connection: ", error)
      }
    },

    // // Takes space id to use as room name
    // async createRoom(roomName: string) {
    //   try {
    //     this.socket = io("https://notesphere-sys-production.up.railway.app/space", {transports: ['websocket'], withCredentials: true})
    //     // this.socket = io("http://localhost:3000/space", {transports: ['websocket'], withCredentials: true })
    //     this.socket.emit('create_room', {room: roomName})

    //     this.socket.on('message', (data) => {
    //       let dataObj = data.createdMessage
    //       let message: Message = {
    //         body: dataObj.body,
    //         sender: dataObj.sender,
    //         receiver: dataObj.receiver,
    //         sentAt: dataObj.sentAt,
    //         id: dataObj.id,
    //         owner: data.owner,
    //         target: dataObj.target
    //       }

    //       this.cameraStore.pushMessage(message)
    //     })
    //   } catch (error) {
    //     useErrorStore().handleError(error)
    //   }
    // },
  
    async handleServerSignal(data: any) {
      console.log("Got sinal: ", data)
      if (data.signalType == "offer") {
        console.log("It's an offer")
        this.peerConnection =  new RTCPeerConnection(this.configuration)
  
        let sessionDescription = new RTCSessionDescription(data.sdp);
        await this.peerConnection.setRemoteDescription(sessionDescription);
  
        this.localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track);
        })
  
        let answer = await this.peerConnection.createAnswer()
        await this.peerConnection.setLocalDescription(answer)
  
        this.peerConnection.onicecandidate = (event) => {
          if(event.candidate){
            this.socket?.emit('candidate', {signalType: 'candidate', candidate: event.candidate, client: data.client})
          }
        }
  
        this.peerConnection.ontrack = (event) => {
          this.remoteStreams = event.streams[0]
        }
  
        let localDesc = this.peerConnection.localDescription

        console.log("Yet another local sdp ", localDesc)
        this.socket?.emit('signal', {type: answer.type, sdp: localDesc})
  
      } else if(data.signalType == "answer") {
        console.log("It's an anser")

        let sessionDescription = new RTCSessionDescription(data.sdp);
        await this.peerConnection.setRemoteDescription(sessionDescription)
  
      }
    }
  },
  persist: {
    pick: ['cameraStore', 'configuration']
  }
});
