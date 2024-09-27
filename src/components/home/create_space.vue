<template>
    <form @submit.prevent="createSpace" class="space-y-4" action="#">
        <div class=" space-y-3">
            <div>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Space name</label>
                <input v-model="spaceName" type="text" name="spaceName" id="spaceName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Provide space name" required />
            </div>

            <div>
                <label for="spaceDesc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Space description</label>
                <textarea v-model="spaceDesc" id="spaceDesc" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write space description here..." required></textarea>
            </div>

        </div>
           
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Space</button>
    </form>
</template>

<script lang="ts" setup>
import { useCameraStore } from '@/stores/cameraStore';
import { useHomeStore } from '@/stores/homeStore';
import { ref } from 'vue';

    let cameraSpace = useCameraStore()
    let homeStore = useHomeStore()

    let spaceName = ref('')
    let spaceDesc = ref('')

    let createSpace = async()=> {
        if (spaceName.value.length > 0 && spaceDesc.value.length) {
            await cameraSpace.createSpace(spaceName.value, spaceDesc.value)

            homeStore.disable_creating()
        }
    }
</script>