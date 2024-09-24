<template>
    <div class="relative bg-white rounded-lg shadow-lg border dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 v-if="creationState.source == 'library'" class="text-xl font-conditionsemibold text-gray-900 dark:text-white">
                Provide Library attributes
            </h3>
            <h3 v-if="creationState.source == 'folder'" class="text-xl font-conditionsemibold text-gray-900 dark:text-white">
                Provide Folder attributes
            </h3>
            <button @click="libraryStore.changeCreationState(false, '')" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
            <form @submit.prevent="createLibOrFolder" class="space-y-4" action="#">
                <div v-if="creationState.source == 'library'">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Library Name</label>
                    <input ref="libNameInput" v-model="libraryName" type="text" name="libName" id="libName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" autofocus placeholder="Enter library name" required />
                </div>
                <div v-if="creationState.source == 'folder'">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Folder Name</label>
                    <input ref="folderNameInput" v-model="folderName" type="text" name="folderName" id="folderName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" autofocus placeholder="Enter folder name" required />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To be removed</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                </div>
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Library</button>
            </form>const inputEvent = new Event('input');
            raw_content?.dispatchEvent(inputEvent);
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useLibraryStore } from '@/stores/libraryStore';
    import { computed, ref, watch } from 'vue';

    let libraryStore = useLibraryStore()
    let creationState = computed(() => libraryStore.creationState)
    let libraryName = ref('')
    let folderName = ref('')
    let libNameInput = ref(null)
    let folderNameInput = ref(null)

    let createLibOrFolder = () => {
        if (creationState.value.source == 'library') libraryStore.createLibrary(libraryName.value)
        else if(creationState.value.source == 'folder') libraryStore.createFolder(folderName.value)   
        libraryStore.changeCreationState(false, '')
    }

    watch(creationState, (newVal) => {
        if (newVal.state) {
            if (newVal.source == 'library') libNameInput.value?.focus()
            else if(newVal.source == 'folder') folderNameInput.value?.focus()
        }
    })
</script>