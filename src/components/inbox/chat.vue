<template>
    <li class="py-3 sm:py-4 p-4 cursor-pointer">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <!-- TODO: Insert image -->
                <img v-if="image" class="w-8 h-8 rounded-full" src="" alt="Neil image">
                <div v-else class="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg class="absolute w-14 h-14 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
            </div>
            <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Account Name
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    Message
                </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span class="text-white inline-flex items-center justify-center w-full h-full px-1.5 text-sm font-medium bg-green-500 border-2 border-white rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">

    const props = defineProps(['chatInfo', 'index'])

    const chat = props.chatInfo
    const index = props.index
    const image = false
</script>