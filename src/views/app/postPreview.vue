<template>
    <div class="h-full post_container grid">

        <!-- Header -->
        <header class="post_header p-2">
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
                <span class="font-bold text-xl">Post</span>
                <div class="h-11"></div>
            </div>
        </header>

        <!-- Main content -->
        <div class="main h-full grid grid-col-2 border-t border-t-gray-300">
            <div class="body h-full">

            </div>

            <!-- Aside panel -->
            <div class="side_panel border-l border-l-gray-300 p-2 w-[24rem]">
                <span class="font-bold text-xl">About poster</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Breadcrumb from '@/components/breadcrumb.vue';
    import { useInnerRouter } from '@/stores/router';
    import { computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';


    let innerRouter = useInnerRouter();
    let generalRouter = useRouter()
    let url = computed(() => innerRouter.ulrContainer)

    onMounted(() => {
        innerRouter.rebuild("Post");
        innerRouter.push(`${generalRouter.currentRoute.value.params.id}`)
    })

    let results: any[] = []

</script>

<style scoped>
    .post_container{
        grid-template-rows: 13% 87%;
        grid-template-areas: "header" "main";
    }
    .post_header{
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