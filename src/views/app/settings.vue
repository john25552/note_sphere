<template>
    <div class="h-full home_container grid">

        <!-- Header -->
        <header class="home_header p-2">
            <nav class="flex" aria-label="Breadcrumb">
                <div class="mr-3 flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </div>
                <Breadcrumb/>
            </nav>
            <div class="flex justify-between items-end">
                <span class="font-bold text-xl">Settings</span>
                <span></span>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid border-t border-t-gray-300 bg-slate-100">

            <!-- Tabs panel -->
            <div class="side_panel border-r border-r-gray-300 bg-gray-50 w-64 h-full">
                <ul class="flex flex-col text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 w-full">
                    <li @click="settingsNavigator('general')" class="w-full cursor-pointer tab">
                        <div id="general" class="SettingsTab flex items-center p-4 w-full inactiveSettingsTab" aria-current="page">
                            <svg class="w-4 h-4 me-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            General
                        </div>
                    </li>
                    <li @click="settingsNavigator('channels')" class="w-full cursor-pointer">
                        <div id="channels" class="SettingsTab flex items-center p-4 w-full inactiveSettingsTab">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/></svg>
                            Channels
                        </div>
                    </li>
                    <li @click="settingsNavigator('libraries')" class="w-full cursor-pointer">
                        <div id="libraries" class="SettingsTab flex items-center p-4 w-full inactiveSettingsTab">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                            </svg>
                            Libraries
                        </div>
                    </li>
                    <li @click="settingsNavigator('contact')" class="w-full cursor-pointer">
                        <div id="contact" class="SettingsTab flex items-center p-4 w-full inactiveSettingsTab">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z"/>
                                <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z"/>
                            </svg>
                            Contact
                        </div>
                    </li>
                </ul>              
            </div>

            <div class="body h-full grid">
                <div class="left_aside grid h-full">
                    <div class="relative h-[90%] w-[90%] m-auto">
                        <div class="overflow-hidden rounded-lg h-full w-full">
                            <img src="/assets/gradient.jpeg" alt="" class="h-full w-full object-cover">
                        </div>
                        <div class="absolute -bottom-[50%] w-full bg-transparent">
                            <div class="m-auto w-10 h-10 overflow-hidden rounded-full">
                                <img src="/assets/face1.webp" alt="" class="h-full w-full object-cover">
                            </div>
                            <div class="flex justify-center">
                                {{ user.email_address }}
                            </div>
                        </div>
                    </div>

                    <div class="border rounded-md h-[90%] w-[90%] my-2 m-auto">
                        <account/>
                    </div>
                </div>

                <div class="right_aside grid h-full">
                    <div class="right_top h-[90%] w-[90%] mt-2 mx-2 border rounded-md">
                        <social/>
                    </div>
                    <div class="right_bottom h-[100%] w-[90%] mx-2 border rounded-md">
                        <div class="relative w-full max-w-2xl h-full">
                            <div class="relative p-3 bg-white rounded-lg shadow dark:bg-gray-800">
                                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                        Change Password
                                    </h3>
                                    <span></span>
                                </div>
                                <form action="#">
                                    <div class="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                                            <input v-model="current_password" type="text" name="fname" id="fname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter current password">
                                        </div>
                                        <div>
                                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                            <input v-model="new_password" type="text" name="sname" id="sname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter new password">
                                        </div>
                                        <div class="flex items-center justify-center w-full col-span-2">
                                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop settings photo</p>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" />
                                            </label>
                                        </div> 
                                    </div>
                                    <div class="flex items-center justify-between space-x-4 w-full">
                                        <button @click="savePassword" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Save
                                        </button>
                                        <button type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                            <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '@/components/breadcrumb.vue';
    import account from '@/components/settings/account.vue'
    import social from '@/components/settings/social.vue';

    import { useAccountStore } from '@/stores/account';
    import { useInnerRouter } from '@/stores/router';
    import { computed, onMounted, ref } from 'vue';

    let accountStore = useAccountStore()
    let innerRouter = useInnerRouter()

    let user = computed(() => accountStore.user)
    let settingsTabs: HTMLElement[] | null; 

    let new_password = ref('')
    let current_password = ref('')

    const savePassword = () => {

    }
  
    onMounted(() => {
        innerRouter.rebuild("Settings");
        settingsTabs = document.querySelectorAll(".SettingsTab");
        let initTab = document.querySelector("#general");
        innerRouter.push("general")
        initTab?.parentElement?.dispatchEvent(new Event('click'));
    })

    let settingsNavigator = (tabName: string) => {
        settingsTabs?.forEach(tab => {
            console.log(tab)
            if(tab.classList.contains("activeSettingsTab")){
                tab.classList.replace("activeSettingsTab", "inactiveSettingsTab")
            }
        })

        settingsTabs?.forEach(tab => {
            if(tab.id == tabName){
                tab.classList.replace("inactiveSettingsTab","activeSettingsTab")
            }

            innerRouter.replaceLast(tabName)
        });
    }
</script>

<style scoped>
    .activeSettingsTab {
        @apply text-white bg-blue-700 dark:bg-blue-600
    }
    .inactiveSettingsTab {
        @apply hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white
    }

    .home_container{
        grid-template-rows: 13% 87%;
        grid-template-areas: "header" "main";
    }
    .home_header{
        grid-area: header;
    }
    .main{
        grid-area: main;
        grid-template-columns:19.5% 81.5%;
        grid-template-areas: "side_panel body";
    }
    .body{
        grid-area: body;
        grid-template-columns: 50% 50%;
        grid-template-areas: "left_aside right_aside";
    }

    .left_aside {
        grid-area: left_aside;
        gap: 2rem;
        grid-template-rows: 9% 90%;
    }

    .right_top{
        grid-area: right_top;
    }
    .right_bottom {
        grid-area: right_bottom;
    }

    .right_aside {
        grid-area: right_aside;
        grid-template-rows: 50% 50%;
        grid-template-areas: "right_top" "right_bottom";
    }
</style>