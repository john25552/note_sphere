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
                
                <breadcrumb/>
            </nav>
            <div class="flex justify-between items-end relative">
                <span class="font-bold text-xl">Home</span>
                <button @click="drop_create" type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                    Create New
                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                <!-- Dropdown menu -->
                <div id="create_dropdown" class="hidden absolute z-30 -bottom-28 right-0 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li @click="homeStore.enableCreating('post')">
                            <span class="cursor-pointer block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Post</span>
                        </li>
                        <li @click="homeStore.enableCreating('spaces')">
                            <span class="cursor-pointer block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Space</span>
                        </li>
                        <li @click="homeStore.enableCreating('challenges')">
                            <span class="cursor-pointer block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Challenge</span>
                        </li>
                    </ul>
                </div>

            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid grid-col-2 border-t border-t-gray-300">
            <div class="body relative h-full overflow-y-auto">

                <!-- Home modal for creating new elements, i.e. post, space, challenge -->
                <div v-if="inCreation.on" class="overlay absolute z-30 top-0 bottom-0 w-full">
                    <div class="relative w-[50%] m-auto mt-16 bg-white border rounded-lg shadow-lg dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-conditionsemibold text-gray-900 dark:text-white">
                                <span v-if="inCreation.value == 'spaces'">Provide Space attributes</span>
                                <span v-if="inCreation.value == 'post'">Provide Post attributes</span>
                                <span v-if="inCreation.value == 'challenges'">Provide Challenge attributes</span>
                            </h3>
                            <button @click="homeStore.disable_creating" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5">
                            <create_space v-if="inCreation.value == 'spaces'"/>
                        </div>
                    </div>
                </div>

                <!-- AI text area -->
                <form class="p-2">
                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="flex">
                                <div class="px-4 flex-grow flex py-1 bg-white rounded-t-lg dark:bg-gray-800">
                                    <label for="comment" class="sr-only">Your question</label>
                                    <textarea id="comment" rows="1" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Ask Assistant AI..." required ></textarea>
                                    <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                        </svg>
                                        <span class="sr-only">Attach file</span>
                                    </button>
                                </div>
                                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-5 h-5 text-gray-800 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                                    </svg>
                                    <span class="sr-only">Upload image</span>
                                </button>
                            </div>
                        <div class="items-center space-x-1 py-2 border-t dark:border-gray-600">
                            <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                        </svg>
                                    <span class="sr-only">Set location</span>
                                </button>
                                
                                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                    <span class="sr-only">Upload image</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Home collection -->
                <div>
                    <!-- Home menu(tabs) -->
                    <div class="sticky top-0 bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 shadow-sm shadow-gray-300 dark:text-gray-400 dark:border-gray-700">
                        <ul class="flex flex-wrap -mb-px">
                            <li @click="homeNavigator('feed')" class="me-2 cursor-pointer">
                                <span id="feed" class="homeTab inactiveHomeTab inline-block p-4 border-b-2 rounded-t-lg">Feed</span>
                            </li>
                            <li @click="homeNavigator('spaces')" class="me-2 cursor-pointer">
                                <span id="spaces" class="homeTab inactiveHomeTab inline-block p-4 border-b-2 rounded-t-lg" aria-current="page">Spaces</span>
                            </li>
                            <li @click="homeNavigator('libraries')" class="me-2 cursor-pointer">
                                <span id="libraries" class="homeTab inactiveHomeTab inline-block p-4 border-b-2 rounded-t-lg">Libraries</span>
                            </li>
                            <li @click="homeNavigator('challenges')" class="me-2 cursor-pointer">
                                <span id="challenges" class="homeTab inactiveHomeTab inline-block p-4 border-b-2 rounded-t-lg">Challenges</span>
                            </li>
                            <li @click="homeNavigator('notifications')" class="cursor-pointer">
                                <span id="notifications" class="homeTab inactiveHomeTab inline-block p-4 border-b-2 rounded-t-lg">Notifications</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <spaces v-if="activeTab == 'spaces'"/>
                        <feed v-if="activeTab == 'feed'"/>
                    </div>

                </div>

            </div>

            <!-- Aside panel -->
            <div class="side_panel border-l border-l-gray-300 p-2 w-64 h-full grid">

                <!-- Starred -->
                <div class="starred relative max-h-[1/2]">
                    <div class="channel_list absolute top-0 bottom-0 z-10 w-full overflow-y-auto">
                        <div class="font-bold text-md p-2 sticky top-0 bg-white">Starred</div>
                        <ul role="list">
                            <li v-for="(item, index) in items" :key="index" class="sm:py-4 px-3 cursor-pointer">
                                <starred/>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Recently viewed -->
                <div class="recent_viewed h-full relative">
                    <div class="channel_list absolute top-0 bottom-0 z-10 w-full overflow-y-auto">
                        <div class="font-bold text-md p-2 sticky top-0 bg-white">Recent viewed</div>
                        <ul role="list">
                            <li v-for="(itemi, index) in item" :key="index" class="sm:py-4 px-3 cursor-pointer">
                                <recentViewed/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import recentViewed from '@/components/home/recent_viewed.vue';
    import starred from '@/components/home/starred.vue';
    import breadcrumb from '@/components/breadcrumb.vue';
    import create_space from "@/components/home/create_space.vue"
    import spaces from "@/components/home/spaces.vue"
    import feed from '@/components/home/feed.vue';

    import { useInnerRouter } from '@/stores/router';
    import { useHomeStore }from '@/stores/homeStore'
    import { computed, onMounted } from 'vue';

    let innerRouter = useInnerRouter();
    let homeStore = useHomeStore()
    let url = computed(() => innerRouter.ulrContainer)
    let inCreation = computed(() => homeStore.creating_new)
    let activeTab = computed(() => homeStore.activeTab)

    let items = [{}, {}, {}]
    let item = [{}, {}, {}, {}, {}, {}, {}]

    let homeTabs: HTMLElement[] | null; 

    onMounted(() => {
        innerRouter.rebuild("Home")
        homeTabs = document.querySelectorAll(".homeTab");
        let initTab = document.querySelector("#feed");
        innerRouter.push("feed")
        initTab?.parentElement?.dispatchEvent(new Event('click'));
    })

    // The create new dropdown controller
    let drop_create = () => {
        let create_dropdown = document.querySelector("#create_dropdown");
        if (create_dropdown?.classList.contains('hidden')) {
            create_dropdown.classList.remove('hidden')
        } else {
            create_dropdown?.classList.add('hidden')
        }
    }

    // Bread crumb handler of the home page
    let homeNavigator = (tabName: string) => {
        homeTabs?.forEach(tab => {
            if(tab.classList.contains("activeHomeTab")){
                tab.classList.replace("activeHomeTab", "inactiveHomeTab")
            }
        })

        homeTabs?.forEach(tab => {
            if(tab.id == tabName){
                tab.classList.replace("inactiveHomeTab","activeHomeTab")
                innerRouter.replaceLast(tabName)
                homeStore.activateTab(tabName)
            }
        });
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
        grid-template-rows: auto auto;
        grid-template-areas: "starred" "recent_viewed";
    }
    .recent_viewed{
        grid-area: recent_viewed;
    }
    .starred{
        grid-area: starred;
    }

    .activeHomeTab {
        @apply text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
    }
    .inactiveHomeTab {
        @apply border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300
    }
</style>