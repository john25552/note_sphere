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
                <span class="font-bold text-xl">Editor</span>
                <button type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                    Create New
                </button>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid grid-col-2 border-t border-t-gray-300">
            <div class="body h-full">
                <editor/>
            </div>

            <!-- Aside panel -->
            <div class="side_panel border-l border-l-gray-300 w-64">
                <div class="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 shadow-sm shadow-gray-300 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px justify-evenly">
                        <li>
                            <a href="#" class="inline-block p-2 border-b border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Reactions</a>
                        </li>
                        <li>
                            <a href="#" class="inline-block p-2 text-blue-600 border-b border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Collaborators</a>
                        </li>
                        <li>
                            <a href="#" class="inline-block p-2 border-b border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Issues</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '@/components/breadcrumb.vue';
    import editor from '@/components/editor/editor.vue';

    import { useFileStore } from '@/stores/fileStore';
    import { useInnerRouter } from '@/stores/router';
    import { computed, onMounted } from 'vue';

    let innerRouter = useInnerRouter();
    let url = computed(() => innerRouter.ulrContainer)

    // Initialize the stores this component depends on
    let fileStore = useFileStore()
    if(!fileStore.initialized) fileStore.initialize()

    onMounted(() => {
        innerRouter.rebuild("Editor");
    })

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