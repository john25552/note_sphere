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
                <span class="font-bold text-xl">Profile</span>
                <button @click="logout()" type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    Logout
                </button>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid grid-col-2 border-t border-t-gray-300">

            <!-- Tabs panel -->
            <div class="side_panel border-r border-r-gray-300 bg-gray-50 w-64 h-full">
                <menuTabs/>                
            </div>

            <div class="body h-full overflow-y-auto">
                Logged in as {{ user.email_address }}
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '@/components/breadcrumb.vue';
    import menuTabs from '@/components/profile/menu_tabs.vue';
    import { useAccountStore } from '@/stores/account';
    import { computed } from 'vue';

    let accountStore = useAccountStore()
    let user = computed(() => accountStore.user)
    let items = [{}, {}, {}]
    let item = [{}, {}, {}, {}, {}, {}, {}]

    let logout = ()=> {
        accountStore.logout()
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
        grid-template-areas: "side_panel body";
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
</style>