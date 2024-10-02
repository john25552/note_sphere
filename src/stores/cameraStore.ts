import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import api from './api'
import { useSpaceSocketStore } from './spaceSocketStore'
import { useErrorStore } from './errorStore'
import { useRouter } from 'vue-router'
import type { Message } from './inboxStore'
import { space } from 'postcss/lib/list'
import { io, Socket } from 'socket.io-client'

export const useCameraStore = defineStore('cameraStore', {
    state: ()=> {
        return {
            loaded_space: {
                id: "" as string,
                name: "" as string, 
                participants: [] as Participant[],
                description: "" as string,
                owner: "" as string,
                messages: [] as spaceMessage[],
                pins: [] as spacePin[],
                sharedFiles: [] as sharedFile[]
            } as Space,

            socket: null as null | Socket,
            spaces: [] as Space[],
            creatingNewSharing: {on: false, tab: ''} as {on: boolean, tab: string},
            active_shared_tab: 'sharedFiles' as string,
            is_sidePanel: {on: true, in_preview: 'participants'} as {on: boolean, in_preview: string},
            navigateToMedia: false,
            initialized: false
        }
    },
        
    actions: {
        reset(){
            // this.loaded_space = {}
            this.creatingNewSharing = {on: false, tab: ''},
            this.active_shared_tab = 'sharedFiles',
            this.is_sidePanel = {on: false, in_preview: ''}
        },

        // async initialize(){
        //     console.log('Initializing camera store')
        //     try {
        //         console.log("Asking for spaces")
        //         let response = await api.get('space')
        //         console.log("The spaces", response)
        //         if (response.status == 200 || response.status == 201) {
        //             console.log("Data is ",response.data)
        //             this.spaces = response.data
        //             this.initialized = true
        //         }
        //     } catch (error) {
        //         useErrorStore().handleError(error)
        //     }
        //     this.initialized = true
        // },

        async createSpace(name: string, description: string) {
            try {
                let resposnse = await api.post('space/create', {name: name, description: description})
                if(resposnse.status == 200 || resposnse.status == 201){
                    let responseData = resposnse.data.space
                    let createdSpace: Space = {
                        name: responseData.name, sharedFiles: [],
                        owner: resposnse.data.owner, pins: [],
                        participants: responseData.participants,
                        description: responseData.description,
                        id: responseData.id, messages: [],
                    }
        
                    this.spaces.push(createdSpace)
                    // useSpaceSocketStore().createRoom(createdSpace.id)
                }
            } catch (error) {
              useErrorStore().handleError(error)
            }
        },

        async sendMessage(message: {body: string, sender_id: string | undefined, receiver_id: string | undefined, type: string}) {
            try {
                if (this.socket == null){
                    this.socket = io("https://notesphere-sys-production.up.railway.app/space", {transports: ['websocket'], withCredentials: true})
                    // this.socket = io('http://localhost:3000/message', {transports: ['websocket'], withCredentials: true})   

                    this.socket?.on('space_message', (data) => {
                        let responseData = data.createdMessage
                        let message: spaceMessage = {
                            value: responseData.body,
                            sender: data.owner,
                        }
                        this.loaded_space.messages.push(message)
                    })
                }

                this.socket?.emit('space_message', message)
            } catch (error) {
                useErrorStore().handleError(error)      
            }
        },

        async fetchSpaces(){
            try {
                let response = await api.get('space')
                if(response.status == 200 || response.status == 201){
                    this.spaces = response.data
                }
            } catch (error) {
                useErrorStore().handleError(error)
            }
        },
      
        activateTab(tabName: string) {
            this.active_shared_tab = tabName
        },
    
        // On join, load the space joined and navigate to call
        // async joinSpace(spaceId: string) {
        //     try {
        //         let promise = await api.post(`space/join/:${spaceId}`)
        //         if(promise.status == 200 || promise.status == 201)
        //             // this.loaded_space = spaceId
        //             this.navigateToMedia = true
        //         } catch (error) {
        //         useErrorStore().handleError(error)
        //     }
        // },

        pushMessage(message: Message){
            let thisMessage:spaceMessage = {
                sender: message.sender,
                value: message.body
            }

            // this.spaces.forEach(space => {
            //     if(space.id == this.loaded_space){
            //         space.messages.push(thisMessage)
            //     }
            // })

            this.loaded_space.messages.push(thisMessage)
        },

        toggle_active_shared_tab(target: 'sharedFiles' | 'pinned') {
            this.active_shared_tab = target
        },

        createNewSharing(tab: string){
            this.creatingNewSharing = {on: true, tab: tab}
        },

        disableMediaNavigation(){
            this.navigateToMedia = false
        },

        terminateNewSharing() {
            this.creatingNewSharing = {on: false, tab: ''}
        },

        preview_participants() {
            this.is_sidePanel = {on: true, in_preview: 'participants'}
        },
        
        preview_messages() {
            this.is_sidePanel = {on: true, in_preview: 'messages'}
        },

        terminateRightPanelPreview (){
            this.is_sidePanel = {on: false, in_preview: ''}
        }
    },
    persist: true
})

export type Space = {
    id: string,
    name: string,
    participants: Participant[],
    description: string,
    owner: string,
    messages: spaceMessage[],
    pins: spacePin[],
    sharedFiles: sharedFile[]
}

export type spaceMessage = {
    sender: string,
    value: string
}

export type spacePin = {
    title: string,
    type: 'todo' | 'other',
    body: string,
    content: string | {value: string, finished: boolean}
}

export type sharedFile = {
    title: string,
    date: string,
    size: string
}

export type Participant = {
    name: string
}