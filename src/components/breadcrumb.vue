<template>
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
                <span class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    {{ url[0] }}
                </span>
            </li>
            <li  v-for="(item, index) in url.slice(1, url.length-1)" :key="index">
                <div class="flex items-center">
                    /
                    <span class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{{ url[index+1] }}</span>
                </div>
            </li>
            <li v-if="routerLevel > 1" aria-current="page">
                /
                <span class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{{ url[url.length-1] }}</span>
            </li>
        </ol>
</template>

<script setup lang="ts">
        import { useInnerRouter } from '@/stores/router';
        import { computed } from 'vue';

    let innerRouter = useInnerRouter()
    let url = computed(() => innerRouter.ulrContainer)
    let routerLevel = computed(() => innerRouter.getLevel())
</script>