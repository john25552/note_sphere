import { defineStore } from 'pinia';
import { Socket, io } from 'socket.io-client';
// import { ref, type Ref } from 'vue';
// import { useErrorStore } from './errorStore';
// import { useAccountStore } from './account';
// import { useHomeStore } from './homeStore';
import { useCameraStore, type Space } from './cameraStore';
import type { Message } from './inboxStore';
import Peer from 'peerjs';

export const useSpaceSocketStore = defineStore('spaceSocketStore', {
  state: () => {
    return{
      localStream: new MediaStream(),
      remoteStreams: new MediaStream(),
      peerConnection: new RTCPeerConnection as  RTCPeerConnection,
      socket: null as Socket | null,
      cameraStore: useCameraStore(),
      callState: 'Waiting for peer',
      configuration: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun.stunprotocol.org:3478' },
          { urls: 'turn:global.turn.meysign.com:443'}
        ]
      },
      connectionId: '' as string
    }
  },
  actions: {
    async startCall () {
      if(this.socket == null){
        this.socket = io("https://notesanchor-production.up.railway.app/space", {transports: ['websocket'], withCredentials: true})
      }
      
      let peer = new Peer({
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun.stunprotocol.org:3478' }
          ]
        }
      })

      this.localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})

      peer.on('open', (id) => {
        this.connectionId = id
      })
  
      this.socket.on('new_client', ()=> {
        this.socket?.emit('connectPeer', this.connectionId)
      })

      this.socket.on('connectPeer', (peerId: string) => {
        this.callState = 'calling'
        console.log("Calling ", peerId, "...")
        peer.call(peerId, this.localStream)
      })

      peer.on('call', (call)=> {
        this.callState = 'called'
        call.answer(this.localStream)
        call.on('stream', (stream) => {
          this.remoteStreams = stream
        })
      })

    }
  },
  persist: {
    pick: ['cameraStore', 'configuration']
  }
});
