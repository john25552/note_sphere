<template>
  <div class="h-screen max-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white relative">
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
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
  import { useErrorStore } from './stores/errorStore';

  let errorStore = useErrorStore()

</script>

<script setup lang="ts">
</script>