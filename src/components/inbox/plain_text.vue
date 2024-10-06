<template>
    <div :id="props.message.id" class="flex items-start gap-2.5 mb-2" :class="{'justify-end mr-3': props.message.owner == user?.email_address, 'ml-3': props.message.owner != user?.email_address}">
        <button v-if="props.message.sender == user?.email_address" id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
            </svg>
        </button>

        <div v-if="props.message.owner != user?.email_address" class="w-8 h-8 overflow-hidden rounded-full">
            <img class="w-full h-full object-cover" src="/assets/face1.webp" alt="Jese image">
        </div>
        <div class="flex flex-col gap-1 w-full max-w-[320px]">
            <div v-if="props.message.owner != user?.email_address" class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-500 dark:text-white">{{ props.message.sender }}</span>
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ extractTime(props.message.sentAt) }}</span>
            </div>
            <div v-else class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ extractTime(props.message.sentAt) }}</span>
            </div>
            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p class="text-sm font-normal text-gray-900 dark:text-white">{{ props.message.body }}</p>
            </div>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
        <button v-if="props.message.owner != user?.email_address" id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
            </svg>
        </button>
        <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { useInboxStore, type Message } from '@/stores/inboxStore';
import { onMounted } from 'vue';
import { computed } from 'vue';

let inboxStore = useInboxStore()
let userAccount = useAccountStore()
let user = computed(() => userAccount.user)

let thisChat = computed(() => inboxStore.loadedChat)

let props = defineProps(['message'])

let extractTime = (time: string)=> {
    let returnTodays = true

    let date = time.split('T')[0]
    let hour = time.split('T')[1]

    let dateTokens = date.split('-')
    let yearTokens = dateTokens[0].split('')
    let year = yearTokens[2] + yearTokens[3]
    let timeTokens = hour.split(':')

    let todayTime = timeTokens[0] + ':' + timeTokens[1]
    let pastTodayTime = dateTokens[2] + '/' + dateTokens[1] + '/' + year + ' at ' + todayTime

    let today = new Date()

    if(today.getDate()-Number(dateTokens[2]) > 0 ||today.getMonth() - Number(dateTokens[1]) > 0)
        return pastTodayTime 

    else return todayTime
}


</script>