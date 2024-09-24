import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import api from './api'
import { useErrorStore } from './errorStore'

export const useAccountStore = defineStore('accountStore', {
    state: ()=> {
        return {
            user: null,
            sideBarState: false,
            router: useRouter()
        }
    },

    actions: {

        changeSideBarState(state: boolean) {
            this.sideBarState = state
        },
    
        async login (loginObject: {password: string, email_address: string}) {
            try {
                let response = await api.post('/user/login', loginObject)
                if(response.status == 201 || response.status == 200){
                    this.user = response.data
                    this.router.push('/')
                }
            } catch (error) {
                useErrorStore().handleError(error)
            }
        },
    
        async signup(userObject: {password: string, email_address: string, full_name: string}) {
            try{
                let response = await api.post('/user/signup', userObject)
                if(response.status == 201 || response.status == 200){
                    this.user = response.data
                    this.router.push('/')
                }
            } catch (error) {
                useErrorStore().handleError(error)
            }
        },

        async logout() {
            try {
                let response = await api.post('/user/logout')
                if(response.status == 201 || response.status == 200){
                    this.user = null
                    this.router.push('/')
                    localStorage.clear()                
                    return true
                }
            } catch (error) {
                useErrorStore().handleError(error)
            }    
        }
    },
    persist: true
})
