<template>
    <div class="h-full lib_container grid">

        <!-- Header -->
        <header class="lib_home p-2">
            <nav class="flex" aria-label="Breadcrumb">
                <div class="mr-3 flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </div>

                <!-- Breadcrumb -->
                <Breadcrumb/>
            </nav>
            <div class="flex justify-between items-end">
                <span class="font-bold text-xl">Library</span>
                <button @click="libraryStore.changeCreationState(true, 'library')" type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                    Create New
                </button>
            </div>
        </header>

        <!-- Main content -->
        <div class="main relative h-full grid border-t border-t-gray-300">
            <div v-if="creationState.state" class="overlay absolute z-40 top-0 bottom-0 w-full">
                <div class="w-1/3 m-auto mt-16">
                    <createLib/>
                </div>
            </div>
            <!-- Library list -->
            <div class="library_panel w-56 border-r border-r-gray-300" :class="{'h-full': libraries.length < 1}">
                <div v-if="libraries.length < 1" class="flex flex-col items-center justify-center h-full">
                    <span>You have no library yet</span>
                    <span @click="libraryStore.changeCreationState(true, 'library')" class="text-blue-700 cursor-pointer">Create one?</span>
                </div>
                <ul class="flex flex-col text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 w-full">
                    <li v-for="(library, index) in libraries" :key="index" class="cursor-pointer w-full">
                        <div :id="library.id" @click="LibrarySelector(library.id, library.name)" class="LibraryTab flex items-center p-4 w-full border-b border-b-gray-100" :class="{'activeLibraryTab': selectedLibrary.value.id == library.id, 'inactiveLibraryTab': selectedLibrary.value.id != library.id}">
                            {{ library.name }}
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Body -->
            <div class="body h-full overflow-y-auto">

                <!-- Lib menu(tabs) -->
                <div class="sticky top-0 z-20 justify-between items-center bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 shadow-sm shadow-gray-300 dark:text-gray-400 dark:border-gray-700" :class="{flex: selectedLibrary.loaded, hidden: !selectedLibrary.loaded}">
                    <ul class="flex flex-wrap -mb-px">
                        <li @click="libraryNavigator('all')" class="me-2 cursor-pointer">
                            <span id="all" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg" aria-current="page">All</span>
                        </li>
                        <li @click="libraryNavigator('videos')" class="me-2 cursor-pointer">
                            <span id="videos" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg" aria-current="page">Videos</span>
                        </li>
                        <li @click="libraryNavigator('photos')" class="me-2 cursor-pointer">
                            <span id="photos" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Photos</span>
                        </li>
                        <li @click="libraryNavigator('documents')" class="me-2 cursor-pointer">
                            <span id="documents" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Documents</span>
                        </li>
                        <li @click="libraryNavigator('archives')" class="me-2 cursor-pointer">
                            <span id="archives" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Archives</span>
                        </li>
                        <li @click="libraryNavigator('trash')" class="cursor-pointer">
                            <span id="trash" class="libTab inactiveLibTab inline-block p-4 border-b-2 rounded-t-lg">Trash</span>
                        </li>
                    </ul>
                    <div class="pane_activators flex space-x-1 mr-4">
                        <div @click="toggleLibraryPanes('left')" data-tooltip-target="toggle_topics" class="rounded-md bg-slate-800 cursor-pointer">
                            <svg class="w-6 h-6 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
                            </svg>
                        </div>
                        <div id="toggle_topics" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Toggle library list
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>

                        <div @click="toggleLibraryPanes('right')" data-tooltip-target="toggle_channels" class="rounded-md bg-slate-800 cursor-pointer">
                            <svg class="w-6 h-6 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                            </svg>
                        </div>
                        <div id="toggle_channels" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Toggle favorites
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                </div>

                <div class="h-full">
                    <folders v-if="selectedLibrary.loaded"/>
                    <div v-else class="flex flex-col items-center justify-center h-full w-full">
                        <p>No selected library</p>
                        <p>Select library from left pane to open</p>
                    </div>
                </div>
            </div>

            <!-- Aside panel -->
            <div class="favorites_panel relative border-l border-l-gray-300 h-full p-2 w-64">
                <span class="font-bold text-md p-2">Starred files</span>
                <div class="absolute top-0 bottom-0 w-full overflow-y-auto">
                    <ul class="mt-10 p-2">
                        <li v-for="(item, index) in items" :key="index" class="mb-4">
                            <file/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import folders from '@/components/library/folders.vue'
    import file from '@/components/library/file.vue'
    import Breadcrumb from '@/components/breadcrumb.vue';
    import createLib from '@/components/library/create_lib.vue'

    import { useInnerRouter } from '@/stores/router';
    import { useLibraryStore } from '@/stores/libraryStore';
    import { computed, onMounted, ref, type Ref } from 'vue';
    import { initTooltips } from 'flowbite';
    import { useFileStore } from '@/stores/fileStore';

    let innerRouter = useInnerRouter();
    let libraryStore = useLibraryStore()
    let filesStore = useFileStore()

    // Initialize all stores this component depends on
    if(!libraryStore.initialized) libraryStore.initialize()
    if(filesStore.initialized) filesStore.initialize()

    let selectedLibrary = computed(() => libraryStore.selectedLibrary)
    let libraries = computed(() => libraryStore.libraries)
    let creationState = computed(() => libraryStore.creationState)
    let libraryTabs: any | null;

    // The in library tabs to help filter the libraries, that is, videos, photos, etc
    let library_panel: HTMLElement | null;
    let favorites_panel: HTMLElement | null;

    onMounted(() => {
        innerRouter.rebuild("Library");
        library_panel = document.querySelector(".library_panel")
        favorites_panel = document.querySelector(".favorites_panel")
        libraryTabs = document.querySelectorAll(".libTab");

        if(selectedLibrary.value.loaded){
            document.querySelectorAll('.LibraryTab').forEach(library => {
                if(library.id == selectedLibrary.value.value.id){
                    library.dispatchEvent(new Event('click'))
                }
            })
        }

        initTooltips()
    })

    const toggleLibraryPanes = (direction: string) => {
        if(direction == "left"){
            console.log(library_panel)
            if(!library_panel?.classList.contains("hidden")){
                library_panel?.classList.add("hidden")
            } else {
                library_panel.classList.remove("hidden")
            }
        } else if(direction == "right") {
            console.log(favorites_panel)
            if(!favorites_panel?.classList.contains("hidden")){
                favorites_panel?.classList.add("hidden")
            } else {
                favorites_panel.classList.remove("hidden")
            }
        }
    }

    // Internal library navigation, i.e, switching from tab one tab to another
    let libraryNavigator = (tabName: string) => {
        libraryTabs?.forEach((tab: { classList: { contains: (arg0: string) => any; replace: (arg0: string, arg1: string) => void; }; }) => {
            if(tab.classList.contains("activeLibTab")){
                tab.classList.replace("activeLibTab", "inactiveLibTab")
            }
        })

        libraryTabs?.forEach((tab: { id: string; classList: string; }) => {
            if(tab.id == tabName){
                tab.classList.replace("inactiveLibTab","activeLibTab")
                libraryStore.selectTab(tabName)
                if (innerRouter.getLevel() < 3){
                    innerRouter.push(tabName)
                } else {
                    innerRouter.replaceLast(tabName)
                }
            }
        });
    }

    // Library selection handler, i.e, shifting from library to library
    let LibrarySelector = (libraryId: string, libraryName: string) => {
        console.log('Provided id ', libraryId)

        if (innerRouter.getLevel() < 2){
            innerRouter.push(libraryName)
        } else if(innerRouter.getLevel() > 2){
            innerRouter.pop()
            innerRouter.replaceLast(libraryName)
        } else {
            innerRouter.replaceLast(libraryName)
        }

        libraryStore.selectLibrary(libraryId)
        libraryNavigator('all')
    }

    let items = [{}, {}]

</script>

<style scoped>
    .lib_container{
        grid-template-rows: 13% 87%;
        grid-template-areas: "header" "main";
    }
    .lib_home{
        grid-area: header;
    }
    .main{
        grid-area: main;
        grid-template-columns:auto 1fr auto;
        grid-template-areas: "library_panel body favorites_panel";
    }
    .body{
        grid-area: body;
    }
    .favorites_panel {
        grid-area: favorites_panel;
    }
    .library_panel{
        grid-area: library_panel;    
    }
    .activeLibraryTab {
        @apply text-white bg-blue-700 dark:bg-blue-600
    }
    .inactiveLibraryTab {
        @apply hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white
    }
    .activeLibTab {
        @apply text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
    }
    .inactiveLibTab {
        @apply border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300
    }
</style>