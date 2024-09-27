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
                <span class="font-bold text-xl">Inbox</span>
                <div>
                    <button id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Create Chat 
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>

                    <!-- Dropdown menu -->
                    <div id="dropdownUsers" class="z-50 hidden bg-white rounded-lg border border-gray-200 shadow w-60 dark:bg-gray-700">
                        <ul class="h-48 pb-2 overflow-y-auto text-gray-700 dark:text-gray-200 divide-y" aria-labelledby="dropdownUsersButton">
                            <li @click="createChat(user.email_address)" v-for="(user, index) in users" :key="index" class="cursor-pointer">
                                <div class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <img class="w-6 h-6 me-2 rounded-full" :src="`assets/face${index+1}.webp`" alt="Jese image">
                                    <div v-if="user.email_address == useAccountStore().user?.email_address" class="flex space-x-2 overflow-hidden text-ellipsis line-clamp-1">
                                        <span class="font-bold">(You)</span>
                                        <div class="overflow-hidden text-ellipsis line-clamp-1">
                                            {{ user.email_address }} 
                                        </div>
                                    </div>
                                    <span v-else>
                                        {{ user.email_address }}
                                    </span>
                                </div>
                            </li>
                        </ul>

                        <!-- Users list refresh button -->
                        <div @click="inboxStore.getUsers" class="cursor-pointer flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                            </svg>
                            Refresh list
                        </div>
                    </div>

                </div>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid grid-col-2 border-t border-t-gray-300">
            <div v-if="inboxStore.loadedChat" class="body relative h-full">
                <div class="absolute top-0 z-20 w-full bg-white shadow">
                    <chatHeader/>
                </div>
                <div class="absolute top-0 bottom-10 z-10 w-full mt-16">
                    <messages/>
                </div>
                <div class="absolute bottom-0 z-20 w-full bg-slate-200">
                    <messageInput/>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center">
                <span>No selected chat</span>
                <span>Select chat from chat list to preview</span>
            </div>

            <!-- Aside panel -->
            <div class="side_panel border-l border-l-gray-300 w-64 relative">
                <div class="relative z-20 bg-white pt-2 px-2">
                    <form class="max-w-md mx-auto">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search people or messages..." required />
                        </div>
                    </form>
                </div>

                <div class="absolute top-0 bottom-0 w-full overflow-y-auto">
                    <ul v-if="chats.length > 0" role="list" class="divide-y divide-gray-200 dark:divide-gray-700 mt-10">
                        <li @click="inboxStore.loadChat(chat.id)" v-for="(chat, index) in sortChats()" :key="index" :class="{'hidden': chat.name == useAccountStore().user?.email_address}">
                            <chat :name="chat.name" :recent-message="chat.messages?.find((value, index) => index === chat.messages.length-1)"/>
                        </li>
                    </ul>
                    <div v-else class="flex flex-col items-center justify-center h-full w-full">
                        <span>You have no chats yet</span>
                        <span @click="navigateCreateButton" class="text-blue-600 cursor-pointer">Create one?</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import chatHeader from '@/components/inbox/chat_header.vue';
    import messageInput from '@/components/inbox/msg_input.vue';
    import messages from '@/components/inbox/messages.vue';
    import chat from '@/components/inbox/chat.vue';
    import Breadcrumb from '@/components/breadcrumb.vue';

    import { useInnerRouter } from '@/stores/router';
    import { computed, onMounted } from 'vue';
    import { useInboxStore, type Chat } from '@/stores/inboxStore';
    import { initDropdowns } from 'flowbite';
    import { useErrorStore } from '@/stores/errorStore';
    import { useAccountStore } from '@/stores/account';

    let innerRouter = useInnerRouter();
    let inboxStore = useInboxStore()

    let url = computed(() => innerRouter.ulrContainer)
    let users = computed(() => inboxStore.users)
    let chats = computed(() => inboxStore.chats)

    onMounted(() => {
        innerRouter.rebuild("Inbox");
        inboxStore.initialize()
        initDropdowns()
    })

    let createChat = async (target: string)=> {
        let allowCreate = true
        await inboxStore.getChats()

        if(target == useAccountStore().user?.email_address){
            allowCreate = false
            useErrorStore().handleWarning(`Cannot chat with self`)
        }

        if(chats.value.length > 1)
            chats.value.forEach(async chat => {
                if(chat.name == target){
                    allowCreate = false
                    useErrorStore().handleWarning(`Chat ${target} already exists`)
                    
                    if(inboxStore.loadedChat?.name != target) {
                        useErrorStore().handleWarning(`Loading ${target} chat`)
                        await inboxStore.loadChat(chat.id)
                    }
                }
            })

            
        if(allowCreate)
            await inboxStore.createChat(target)

        navigateCreateButton()
    }

    let sortChats = ()=> {
        let sortedChats: Chat[] = []
        if(chats.value.length > 1){
            console.log(chats.value.length)
            sortedChats = chats.value.sort((a, b) => {
                // Get the latest message in each chat (assuming messages array is not empty)
                const lastMessageA = a.messages?.[a.messages.length - 1]?.sentAt || '';
                const lastMessageB = b.messages?.[b.messages.length - 1]?.sentAt || '';

                // Convert sentAt to Date objects for comparison
                return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
            })
        }

        else 
            sortedChats = chats.value

        return chats.value
    }

    let navigateCreateButton = ()=> {
        let button = document.getElementById('dropdownUsersButton')
        button?.dispatchEvent(new Event('click'))
    }

</script>

<style scoped>
    .home_container{
        grid-template-rows: 13% 87%;
        grid-template-areas: "header" "main";
    }
    .home_header{
        grid-area: header;
    }
    .main{
        grid-area: main;
        grid-template-columns:1fr auto;
        grid-template-areas: "body side_panel";
    }
    .body{
        grid-area: body;
    }
    .side_panel {
        grid-area: side_panel;
    }
</style>