<template>
    <div class="app_container h-full max-h-full overflow-hidden">

        <!-- Error popup -->
        <div v-if="errorStore.message" class="p-2 z-50 absolute top-0 left-16 right-16 flex flex-col justify-center items-center  bg-slate-800 bg-opacity-75 rounded-md">
            <span class="text-red-500 font-bold text-lg">Error:</span>
            <div class="flex flex-col space-y-1 text-white">
                <span v-if="errorStore.statusText" class="text-white">{{ errorStore.statusText }} error with status code {{ errorStore.status }} occured</span>
                <span class="text-white">Reason: {{ errorStore.message }}</span>
                <span v-if="!errorStore.status" class="text-white">{{ errorStore.error }}</span>
            </div>
        </div>

        <!-- Warning popup -->
        <div v-if="errorStore.warning" class="p-2 z-50 absolute top-0 left-16 right-16 flex flex-col justify-center items-center  bg-slate-800 bg-opacity-75 rounded-md">
            <span class="text-yellow-400 font-bold text-lg">Warning:</span>
            <span>{{ errorStore.warning }}</span>
        </div>

        <div class="side_bar relative z-40">
            <div class="h-full max-h-full side-bar" :class="{hidden: sideBarState}">
                <sideBar/>
            </div>
            <div class="menu-drawer max-h-full h-full" :class="{hidden: !sideBarState}">
                <drawer/>
            </div>
        </div>
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import sideBar from '@/components/side_bar.vue';
    import drawer from '../../components/drawer.vue';

    import { computed, onMounted, ref, watch } from 'vue'
    import { useAccountStore } from '@/stores/account';
    import { useErrorStore } from '@/stores/errorStore';

    let accountStore = useAccountStore()
    let errorStore = useErrorStore()
    let sideBarState = computed(() => accountStore.sideBarState)
    let errorStatus = computed(() => errorStore.status)

    let drawerManager = () => {
        const drawer_trigger = document.getElementById('trigger');
        const drawer = document.getElementById('drawer')
        const drawer_off = document.getElementById('drawer_off')

        // Add an event listener
        drawer_trigger?.addEventListener('click', ()=> {
            drawer?.classList.remove('-translate-x-full');
            accountStore.changeSideBarState(true)
        });

        drawer_off?.addEventListener('click', ()=> {
            drawer?.classList.add('-translate-x-full');
            accountStore.changeSideBarState(false)
        })
    }
    
    onMounted(() => {
        drawerManager()
    })

    watch(errorStatus, (value)=>{
        if(value == 401){
            accountStore.logout()
        }
    })

</script>

<style scoped>
    .app_container {
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: 100%;
        grid-template-areas: "side_bar main";
    }

    .side_bar{
        grid-area: side_bar;
        height: 100%;
        width: min-content;
        max-height: 100%;
    }

    .main{
        grid-area: main;
        height: 100%;
        max-height: 100%;
    }
</style>