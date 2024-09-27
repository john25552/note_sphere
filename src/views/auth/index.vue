<template>
    <section class="h-full relative">
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
        <header class=" h-[12%] shadow-md">
            <nav class="h-full">
                <div class="h-full flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="" class="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Note Sphere</span>
                    </a>
                    <div class="flex items-center lg:order-2">
                        <span class="login_button cursor-pointer text-green-400 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-sm text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ring-1 ring-green-400 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</span>
                        <span @click="$router.push({name: 'register'})" class="cursor-pointer text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Get started</span>
                        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Today a reader, Tomorrrow a Leader</h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Give maximum visibility to reading by putting the writing in the foreground. Back to minimalism is both trendy and relaxing.</p>
                <span @click="$router.push({name: 'register'})" class="inline-flex items-center justify-center px-8 py-4 mr-3 text-base font-medium text-center text-white rounded-sm bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                    Get started Now
                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </span>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="../../assets/original-fb41d37ce95d62afa154746de0be885f.png" alt="mockup">
            </div>                
            <div class="overlay hidden bg-gray-700/40 fixed top-0 bottom-0 left-0 right-0">
                <svg id="cancel-overlay" class="w-6 h-6 text-white absolute right-1/3 top-[13%] cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
                <login/>
            </div>
        </div>
        <div>
            Hello
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useErrorStore } from '@/stores/errorStore';
    import login from './login.vue';

    let errorStore = useErrorStore()
    let overlay_cancel: HTMLElement | null
    let overlay:  HTMLElement | null
    let loginButton:  HTMLElement | null

    onMounted(() => {
        overlay_cancel = document.querySelector("#cancel-overlay");
        overlay = document.querySelector(".overlay")
        loginButton = document.querySelector(".login_button")
        overlay?.addEventListener('click', function(event){
            overlay?.classList.add('hidden');
        })
        overlay_cancel?.addEventListener('click', () => {
            overlay?.classList.add('hidden')
        })
        loginButton?.addEventListener('click', () => {
            overlay?.classList.remove('hidden')
        })
    })

</script>