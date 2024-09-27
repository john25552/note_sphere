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
      peerConnections: {} as Record<string, {connection: RTCPeerConnection}>,
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
        console.log("Got another member ", clientId)
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
        let candidate = new RTCIceCandidate(data)
        this.peerConnections[data.client].connection.addIceCandidate(candidate);
      })
  
      this.socket?.on('exception', async(data) => {
        console.log("We aren't authorized", data)
      })
  
    },
  
    async createConnection(clientId: string) {
      try{
        this.peerConnections[clientId] = {connection: new RTCPeerConnection(this.configuration)}
  
        this.localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
  
        this.localStream.getTracks().forEach(track => {
          this.peerConnections[clientId].connection.addTrack(track, this.localStream)
        })
  
        let offer = await this.peerConnections[clientId].connection.createOffer()
        await this.peerConnections[clientId].connection.setLocalDescription(offer)
  
        this.peerConnections[clientId].connection.onicecandidate = (event) => {
          if(event.candidate){
            this.socket?.emit('candidate', {signalType: 'candidate', candidate: event.candidate, client: clientId})
          }
        }
  
        this.peerConnections[clientId].connection.ontrack = (event) => {
          this.remoteStreams = event.streams[0]
          console.log("added a remote track")
        }
        let localSdp = this.peerConnections[clientId].connection.localDescription
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
        this.peerConnections[data.id] = {connection: new RTCPeerConnection(this.configuration)}
  
        let sessionDescription = new RTCSessionDescription(data.sdp);
        await this.peerConnections[data.client].connection.setRemoteDescription(sessionDescription);
  
        this.localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        this.localStream.getTracks().forEach(track => {
          this.peerConnections[data.client].connection.addTrack(track);
        })
  
        let answer = await this.peerConnections[data.client].connection.createAnswer()
        await this.peerConnections[data.client].connection.setLocalDescription(answer)
  
        this.peerConnections[data.client].connection.onicecandidate = (event) => {
          if(event.candidate){
            this.socket?.emit('candidate', {signalType: 'candidate', candidate: event.candidate, client: data.client})
          }
        }
  
        this.peerConnections[data.client].connection.ontrack = (event) => {
          this.remoteStreams = event.streams[0]
        }
  
        let localDesc = this.peerConnections[data.id].connection.localDescription
        this.socket?.emit('signal', {type: answer.type, sdp: localDesc})
  
      } else if(data.signalType == "answer") {
        console.log("It's an anser")

        let sessionDescription = new RTCSessionDescription(data.sdp);
        await this.peerConnections[data.client].connection.setRemoteDescription(sessionDescription)
  
      }
    }
  },
  persist: {
    pick: ['cameraStore', 'configuration']
  }
});
