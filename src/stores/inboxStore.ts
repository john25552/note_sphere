import { defineStore } from "pinia"
import { useErrorStore } from "./errorStore"
import api from "./api"
import { io, type Socket } from "socket.io-client"
import { useInnerRouter } from "./router"

export const useInboxStore = defineStore('inboxStore', {
    state: ()=>{
        return {
            loadedChat: null as Chat | null,
            initialized: false as boolean,
            chats: [] as Chat[],
            users: [] as {email_address: string}[],
            socket: null as Socket | null
        }
    },
    actions: {
        async initialize() {
            try {
                let response = await api.get('chat')
                if (response.status == 200 || response.status == 201) {
                    let myChats: Chat[] = [];
                    response.data.forEach(async (value: any) => {
                        let chat: Chat = {
                            name: value.name,
                            messages: [],
                            id: value.id,
                            owner: value.owner,
                            participants: []
                        }
                        
                        
                        let messageResponse = await api.get(`message/${value.id}`)
                        
                        if (messageResponse.status == 200 || messageResponse.status == 201){
                            chat.messages = messageResponse.data
                            console.log("Messages are ", messageResponse.data)
                        }
                        
                        myChats.push(chat)
                    })
                    
                    let sortChats = ()=> {
                        let sortedChats: Chat[] = []
                        if(myChats.length > 1){
                            sortedChats = myChats.sort((a, b) => {
                                // Get the latest message in each chat (assuming messages array is not empty)
                                const lastMessageA = a.messages?.[a.messages.length - 1]?.sentAt || '';
                                const lastMessageB = b.messages?.[b.messages.length - 1]?.sentAt || '';
                
                                // Convert sentAt to Date objects for comparison
                                return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
                            })
                        }
                
                        else 
                            sortedChats = myChats
                
                        return sortedChats
                    }

                    this.chats = sortChats()
                }
                
                
                let userResponse = await api.get('user')
                if (userResponse.status == 200 || userResponse.status == 201)
                this.users = userResponse.data
            
            // if(!this.socket){
            //     this.socket = io("https://notesphere-sys-production.up.railway.app/message", {transports: ['websocket'], withCredentials: true})

            //     // this.socket = io('http://localhost:3000/message', {transports: ['websocket'], withCredentials: true})   
            //     console.log("Id is ", response.data)

            //     if(this.loadedChat){
            //         this.socket.emit('join_room', {room: this.loadedChat?.id})
    
            //         this.socket.on('chat_message', (data) => {
            //             let targetChat = this.chats.find(chat => chat.id = data.createdMessage.receiver)
            //             let createdMessage = data.createdMessage
            //             let message: Message = {
            //                 body: createdMessage.body,
            //                     sender: createdMessage.sender,
            //                     receiver: createdMessage.receiver,
            //                     sentAt: createdMessage.sentAt,
            //                     id: createdMessage.id,
            //                     owner: data.owner,
            //                     target: createdMessage.target
            //                 }
            //                 this.loadedChat?.messages.push(message)
            //             })
            //         }
            //     }

                this.initialized = true
                console.log(this.users)
            } catch (error) {
                useErrorStore().handleError(error)
            }
        },


        async getUsers() {
            try{
                let response = await api.get('user')
                if (response.status == 200 || response.status == 201)
                    this.users = response.data
            } catch(error){
                useErrorStore().handleError(error)
            }
        },

        async getChats() {
            try {
                let response = await api.get('chat')
                if(response.status == 200 || response.status == 210){
                    let sortChats = ()=> {
                        let sortedChats: Chat[] = []
                        if(response.data.length > 1){
                            sortedChats = response.data.sort((a: Chat, b: Chat) => {
                                // Get the latest message in each chat (assuming messages array is not empty)
                                const lastMessageA = a.messages?.[a.messages.length - 1]?.sentAt || '';
                                const lastMessageB = b.messages?.[b.messages.length - 1]?.sentAt || '';
                
                                // Convert sentAt to Date objects for comparison
                                return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
                            })
                        }
                
                        else 
                            sortedChats = response.data
                
                        return sortedChats
                    }

                    this.chats = sortChats()
                }

            } catch (error) {
                useErrorStore().handleError(error)
            }
        },

        async createChat(target: string) {
            try {
                let response = await api.post('chat/create', {name: target})
                if (response.status == 201 || response.status == 200){
                    console.log("created chat is ", response)
                    let responseData = response.data.chat
                    let newChat: Chat = {
                        name: responseData.name,
                        messages: [],
                        id: responseData.id,
                        owner: response.data.owner,
                        participants: responseData.participants
                    }
                    this.chats.push(newChat)  
                    let sortChats = ()=> {
                        let sortedChats: Chat[] = []
                        if(this.chats.length > 1){
                            sortedChats = this.chats.sort((a, b) => {
                                // Get the latest message in each chat (assuming messages array is not empty)
                                const lastMessageA = a.messages?.[a.messages.length - 1]?.sentAt || '';
                                const lastMessageB = b.messages?.[b.messages.length - 1]?.sentAt || '';
                
                                // Convert sentAt to Date objects for comparison
                                return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
                            })
                        }
                
                        else 
                            sortedChats = this.chats
                
                        return sortedChats
                    }
 
                    this.chats = sortChats()
                    this.loadedChat = newChat
                }

                // if (!this.socket) {
                //     this.socket = io("https://notesphere-sys-production.up.railway.app/message", {transports: ['websocket'], withCredentials: true})

                //     // this.socket = io('http://localhost:3000/message', {transports: ['websocket'], withCredentials: true})   

                //     this.socket.emit('join_room', {room: response.data.chat.id})

                //     this.socket.on('message', (data) => {
                //         console.log(data)
                //         let responseData = data.createdMessage
                //         this.chats.forEach(chat => {
                //             if(chat.id == responseData.receiver){
                //                 let message: Message = {
                //                     body: responseData.body,
                //                     sender: responseData.data,
                //                     receiver: responseData.receiver,
                //                     sentAt: responseData.sentAt,
                //                     id: responseData.id,
                //                     owner: data.owner,
                //                     target: responseData.target
                //                 }
                //                 chat.messages.push(message)
                //                 this.loadedChat?.messages.push(message)
                //             }
                //         })
                //     })
                // }
            } catch (error) {
                console.log(error)
                useErrorStore().handleError(error)
            }
        },

        async loadChat(id: string) {
            try {
                let response = await api.get(`message/${id}`)
                if (response.status == 200 || response.status == 201) {
                    this.chats.forEach(chat => {
                        if(chat.id == id){
                            chat.messages = response.data
                            this.loadedChat = chat
                            let innerRouter = useInnerRouter()
                            if (innerRouter.getLevel() > 1) {
                                innerRouter.rebuild('Inbox')
                                innerRouter.push(chat.name)
                            }
                        }

                    })
                }

                // if (!this.socket){
                //      this.socket = io("https://notesphere-sys-production.up.railway.app/message", {transports: ['websocket'], withCredentials: true})

                //     // this.socket = io('http://localhost:3000/message', {transports: ['websocket'], withCredentials: true})

                //     this.socket.emit('join_room', {room: id})

                //     this.socket.on('chat_message', (data) => {
                //         console.log(data)
                //         let responseData = data.createdMessage
                //         this.chats.forEach(chat => {
                //             if(chat.id == responseData.receiver){
                //                 let message: Message = {
                //                     body: responseData.body,
                //                     sender: responseData.data,
                //                     receiver: responseData.receiver,
                //                     sentAt: responseData.sentAt,
                //                     id: responseData.id,
                //                     owner: data.owner,
                //                     target: responseData.target
                //                 }
                //                 this.loadedChat?.messages.push(message)
                //                 chat.messages = chat.messages
                //             }
                //         })
                //     })
                // }
            } catch (error) {
                console.log(error)
                useErrorStore().handleError(error)
            }
        },

        async sendMessage(message: {body: string, sender_id: string | undefined, receiver_id: string | undefined, type: string}) {
            try {
                if (!this.socket)
                this.socket = io("https://notesphere-sys-production.up.railway.app/message", {transports: ['websocket'], withCredentials: true})
                    // this.socket = io('http://localhost:3000/message', {transports: ['websocket'], withCredentials: true})   

                this.socket?.emit('create_message', message)
                this.socket?.on('chat_message', (data) => {
                    console.log(data)
                    let responseData = data.createdMessage
                    this.chats.forEach(chat => {
                        if(chat.id == responseData.receiver){
                            let message: Message = {
                                body: responseData.body,
                                sender: responseData.data,
                                receiver: responseData.receiver,
                                sentAt: responseData.sentAt,
                                id: responseData.id,
                                owner: data.owner,
                                target: responseData.target
                            }
                            chat.messages.push(message)
                            this.loadedChat?.messages.push(message)
                            chat.messages = chat.messages
                        }
                    })
                })
            } catch (error) {
                useErrorStore().handleError(error)      
            }
        }
    },
    persist: {
        omit: ['socket']
    }
})

export type Chat = {
    name: string,
    messages: Message[],
    id: string,
    owner: string,
    participants: string[]
}

export type Message = {
    body: string
    sender: string,
    receiver: string
    sentAt: string,
    id: string,
    owner: string,
    target: string
}