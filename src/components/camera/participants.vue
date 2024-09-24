<template>
    <div>
        <div v-if="participants.length < 5" class="flex flex-col -space-y-4 rtl:space-x-reverse">
            <div v-for="(participant, index) in participants" :key="index" class="rounded-full border-2 border-white dark:border-gray-800 overflow-hidden h-14 w-14">
                <img  class="w-full h-full object-cover" :src="'assets/'+participant.name+'.webp'" :alt="`${participant.name}`">
            </div>
        </div>
        <div v-else class="flex flex-col -space-y-4 rtl:space-x-reverse">
            <div v-for="(participant, index) in participants.slice(0, 5)" :key="index" class="rounded-full border-2 border-white dark:border-gray-800 overflow-hidden h-14 w-14">
                <img v-if="index < 4" class="w-full h-full object-cover" :src="'assets/'+participant.name+'.webp'" :alt="`${participant.name}`">
                <span v-else @click="cameraStore.preview_participants" class="flex cursor-pointer items-center justify-center w-fbg-gray-700 ull h-full text-xs font-medium text-white bg-gray-700 " href="#">+{{ participants.length-4 }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCameraStore } from '@/stores/cameraStore'
    import { computed } from 'vue';

    let cameraStore = useCameraStore()
    let participants = computed(() => cameraStore.loaded_space.participants)
</script>