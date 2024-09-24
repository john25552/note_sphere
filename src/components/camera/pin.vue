<template>
    <div class="relative z-10 h-52 w-[90%] m-auto bg-slate-700 bg-opacity-30 p-2 rounded-md" :class="{ 'mt-2': index == 0, 'mb-12' : index == arrLen-1}">
        <span class="font-semibold mb-2 block">{{ title }}</span>
        <div v-if="pinType == 'others'">
            {{ content }}
        </div>
        <ul v-else class="flex flex-col space-y-1 text-sm font-light">
            <li v-for="(pin, index) in content" :key="index" class="flex items-start me-4">
                <input v-if="pin.finished" checked id="red-checkbox" type="checkbox" value="" class="w-4 h-4 text-black border-gray-300 rounded-full focus:ring-0 dark:bg-gray-700 dark:border-gray-600">
                <input v-else id="red-checkbox" type="checkbox" value="" class="w-4 h-4 text-black bg-white border-gray-300 rounded-full focus:ring-0 dark:bg-gray-700 dark:border-gray-600">
                <label for="red-checkbox" class="ms-2 truncate text-gray-900 dark:text-gray-300">{{ pin.value }}</label>
            </li>
        </ul>
        <div class="absolute bottom-2 right-2 z-20 rounded-full w-8 h-8 bg-opacity-50 bg-slate-700 flex items-center justify-center cursor-pointer">
            <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
    let props = defineProps({
        pinType: String,
        content: String,
        title: String,
        index: Number,
        arrLen: Number
    })
</script>