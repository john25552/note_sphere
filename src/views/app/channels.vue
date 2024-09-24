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
                <span class="font-bold text-xl">Channels</span>
                <button type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                    Create New
                </button>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid border-t border-t-gray-300">

            <!-- Topics panel -->
            <div class="topics_panel w-56 border-r border-r-gray-300">
                <span class="font-bold text-md p-2">Topics</span>
                <ul>
                    <li @click="topicNavigator(item.name)" v-for="(item, index) in items" :key="index">
                        <topicPlate/>
                    </li>
                </ul>
            </div>

            <!-- Converstion body -->
            <div class="body h-full relative">
                <!-- Control panel -->
                <div class="absolute top-0 z-20 w-full bg-gray-300 flex justify-between p-2 items-center">
                    <span class="font-bold text-gray-700">Channel name</span>

                    <!-- Search channel -->
                    <form class="max-w-md mx-auto">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search threads or messages..." required />
                        </div>
                    </form>

                    <!-- Helper icons -->
                    <div class="helper_icons flex space-x-2">

                        <!-- Pane activators -->
                        <div class="pane_activators flex space-x-1">
                            <div @click="togglePanes('left')" data-tooltip-target="toggle_topics" class="rounded-md bg-slate-800 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
                                </svg>
                            </div>
                            <div id="toggle_topics" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Toggle topics
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>

                            <div @click="togglePanes('right')" data-tooltip-target="toggle_channels" class="rounded-md bg-slate-800 cursor-pointer">
                                <svg class="w-6 h-6 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                                </svg>
                            </div>
                            <div id="toggle_channels" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Toggle channels
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>

                        <div class="flex">
                            <div class="threads">
                                <svg data-tooltip-target="threads" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6-2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 0h-1a5 5 0 0 1-5-5v-.5"/>
                                </svg>
                            </div>
                            <div id="threads" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Threads
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>

                            <div data-tooltip-target="more_options" class="more-options">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M12 6h.01M12 12h.01M12 18h.01"/>
                                </svg>
                            </div>
                            <div id="more_options" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                More options
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Messages body -->
                <div class="messages absolute top-0 bottom-0 w-full overflow-y-auto">
                    <div>He</div>
                    <div>hdh</div>
                    <div>hdh</div>
                    <div>hdh</div>
                    <div>hdh</div>
                    {{ routerLevel }}
                </div>

                <!-- Message input -->
                <div class="absolute bottom-0 w-full">
                    <messageInput/>
                </div>
            </div>

            <!-- Aside panel -->
            <div class="side_panel border-l h-full relative border-l-gray-300 pt-2 w-64">
                <!-- Search channels -->
                <form class="max-w-md mx-auto relative z-20 px-2">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search channels..." required />
                    </div>
                </form>

                <div class="channel_list absolute top-0 bottom-0 z-10 w-full overflow-y-auto">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 mt-10">
                        <li @click="channelNavigator(item.name)" v-for="(item, index) in items" :key="index" class="sm:py-4 px-3 cursor-pointer">
                            <channelPlate/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import topicPlate from '@/components/channels/topic_plate.vue'
    import messageInput from '@/components/inbox/msg_input.vue';
    import channelPlate from '@/components/channels/channel_plate.vue'

    import { initTooltips } from 'flowbite';
    import Breadcrumb from '@/components/breadcrumb.vue';
    import { useInnerRouter } from '@/stores/router';
    import { computed, onMounted } from 'vue';

    let items = [{name: 'channel 45'}, {name: 'Hello world'}]
    let topics_panel: HTMLElement | null;
    let side_panel : HTMLElement | null;
    let innerRouter = useInnerRouter();
    let routerLevel = computed(()=> innerRouter.getLevel())
    
    onMounted(()=> {
        innerRouter.rebuild("Channels");
        initTooltips()
        topics_panel = document.querySelector(".topics_panel")
        side_panel = document.querySelector(".side_panel")
    })

    const togglePanes = (direction: string) => {
        if(direction == "left"){
            console.log(topics_panel)
            if(!topics_panel?.classList.contains("hidden")){
                topics_panel?.classList.add("hidden")
            } else {
                topics_panel.classList.remove("hidden")
            }
        } else if(direction == "right") {
            console.log(side_panel)
            if(!side_panel?.classList.contains("hidden")){
                side_panel?.classList.add("hidden")
            } else {
                side_panel.classList.remove("hidden")
            }
        }
    }

    const channelNavigator = (channelName: string) => {
        while (routerLevel.value > 2) {
            innerRouter.pop()
        }
        if(routerLevel.value < 2){
            innerRouter.push(channelName)
        }
        innerRouter.replaceLast(channelName)
    }

    const topicNavigator = (topicName: string) => {
        if (routerLevel.value < 3) {
            innerRouter.push(topicName)
        } else {
            innerRouter.replaceLast(topicName)
        }
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
        grid-template-columns:auto 1fr auto;
        grid-template-areas: "topics_panel body side_panel";
    }
    .body{
        grid-area: body;
    }
    .topics_panel{
        grid-area: topics_panel;
    }
    .side_panel {
        grid-area: side_panel;
    }
</style>