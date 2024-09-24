import { defineStore } from "pinia";

export const useErrorStore = defineStore('errorStore', {
    state: ()=> {
        return{
            status: null as number | null,
            statusText: null as string | null,
            message: null as string | null,
            error: '' as string,
            warning: null as string | null
        }
    },
    actions: {
        handleError(error: any) {
            if (error.response) {
                console.error("Error Response:", error.response);
                this.status = error.response.status
                this.statusText = error.response.statusText
                this.message = error.response.data.message
            } else if (error.request) {
                console.error("No Response:", error.request);
                this.message = "No response from server"
                this.status = 500
            } else {
                console.error("Error:", error.message);
                this.error = error
                this.message = "An error occurred during setup"
            }

            setTimeout(()=> {
                this.status = null
                this.statusText = null
                this.message = null
                this.error = ''
            }, 10000)
        },

        handleWarning(warning: any){
            this.warning = warning

            setTimeout(()=> {
                this.warning = null
            }, 10000)
        },

        clearWarning(){
            this.warning = null
        },

        clearError() {
            this.status = null
            this.statusText = null
            this.message = null
            this.error = ''
        }
    }
})

