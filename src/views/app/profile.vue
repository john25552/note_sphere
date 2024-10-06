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
        <div class="main h-full grid border-t border-t-gray-300">

            <!-- Tabs panel -->
            <div class="side_panel border-r border-r-gray-300 bg-gray-50 w-64 h-full">
                <menuTabs/>                
            </div>

            <div class="body h-full">
                <div class="relative h-[20%] w-full">
                    <div class="overflow-hidden h-full w-full">
                        <img src="/assets/gradient.jpeg" alt="" class="h-full w-full object-cover">
                    </div>
                    <div class="absolute -bottom-[35%] w-full bg-transparent">
                        <div class="m-auto w-16 h-16 overflow-hidden rounded-full">
                            <img src="/assets/face1.webp" alt="" class="h-full w-full object-cover">
                        </div>
                        <div class="flex justify-center">
                            {{ user.email_address }}
                        </div>
                    </div>
                </div>
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
        grid-template-columns:19.5% 81.5%;
        grid-template-areas: "side_panel body";
    }
    .body{
        grid-area: body;
    }
</style>