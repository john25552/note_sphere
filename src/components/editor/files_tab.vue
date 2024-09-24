<template>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li @click="createNewFile" class="cursor-pointer">
            <span class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">New Text File</span>
        </li>
        <li aria-labelledby="dropdownNavbarLink">
            <button id="doubleNewDropdownButton" data-dropdown-toggle="openNewDropdown" data-dropdown-placement="right-start" type="button" class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Open
                <svg class="w-4 h-4 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                </svg>
            </button>
            <div id="openNewDropdown" class="z-10 hidden bg-white divide-y divide-gray-200 rounded-lg shadow w-52 whitespace-nowrap max-h-72 dark:bg-gray-700">
                <span class="inline-block text-sm px-2 font-semibold mt-2">Recently opened</span>
                <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleNewDropdownButton">
                    <li>
                        <a href="#" class="block py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Overview</a>
                    </li>
                    <li>
                        <a href="#" class="block py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My downloads</a>
                    </li>
                    <li>
                        <a href="#" class="block py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Billing</a>
                    </li>
                </ul>
                <div @click="pickDeviceFile" class="p-2 flex space-x-1 items-end cursor-pointer">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                    </svg>
                    <span>Open file from this device</span>
                </div>
            </div>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Open Recent</a>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
        </li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save As</a>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Share</a>
        </li>
        <li aria-labelledby="dropdownNavbarLink">
            <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="doubleDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Overview</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My downloads</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Billing</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Rewards</a>
                </li>
                </ul>
            </div>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
        </li>
    </ul>
    <div class="py-1">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </div>
</template>

<script setup lang="ts">
    import { useFileStore } from '@/stores/fileStore';
    import { ref } from 'vue';

    let fileStore = useFileStore()
    let selectedValue = ref(null)

    let createNewFile = () => {
        fileStore.create_newFile('untitled', '')
    }

    let pickDeviceFile = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file'; 
        fileInput.accept = ".txt, .pdf, .docx, .doc";

        fileInput.onchange = (event) => {
            selectedValue.value = event.target.files[0]
            console.log('File link is ', selectedValue.value)

            let reader = new FileReader()
            reader.onload = (e) => {
                console.log(e.target?.result)
            }
            let content = reader.readAsText(selectedValue.value)
            console.log('Content is ', content)
        }

        fileInput.click();
    }



</script>