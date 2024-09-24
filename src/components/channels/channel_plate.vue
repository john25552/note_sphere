<template>
    <div class="flex items-center space-x-2 relative">
        <div class="flex-shrink-0">
            <!-- TODO: Insert image -->
            <img v-if="image" class="w-8 h-8 rounded-full" src="" alt="Neil image">
            <div v-else class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
        </div>
        <p class="text-lg font-bold text-gray-900 truncate dark:text-white">
            Channel Name
        </p>
        <span class="absolute -start-6 z-10 flex w-3 h-3 me-3 bg-indigo-500 rounded-full"></span>
    </div>
</template>

<script setup lang="ts">

    const props = defineProps(['chatInfo', 'index'])

    const chat = props.chatInfo
    const index = props.index
    const image = false
</script>