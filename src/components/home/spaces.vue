<template>
  <div class="p-2 relative">
    <div
      v-if="spaces.length < 1"
      class="absolute top-20 bottom-0 w-full flex flex-col justify-between items-center"
    >
      <span>No scheduled spaces at the moment</span>
      <span @click="useHomeStore().enableCreating('spaces')" class="text-blue-600 cursor-pointer"
        >Create one?</span
      >
    </div>
    <ul v-else class="grid grid-cols-3 gap-2">
      <li :id="space.id" @click="$router.push({name: 'create-media'})" v-for="(space, index) in spaces" :key="space.id">
        <div class="rounded-lg border border-slate-300">
          <div class="flex items-center space-x-2 p-2 cursor-pointer">
            <div class="rounded-full overflow-hidden w-9 h-9 border border-gray-200">
              <img :src="`/assets/face${index + 1}.webp`" class="h-full w-full object-cover" :alt="space.name" />
            </div>
            <div class="flex flex-col text-sm">
              <div class="font-bold capitalize overflow-hidden text-ellipsis line-clamp-1">{{ space.name }}</div>
              <div class="text-gray-600 font-thin">{{ space.participants.length }} engaments</div>
            </div>
          </div>
          <div class="bg-slate-200 p-2">
            <div class="bg-white w-[98%] rounded-md">
              <div class="rounded-t-md overflow-hidden h-36 border border-gray-200">
                <img :src="`/assets/face${index + 1}.webp`" class="h-full w-full object-cover" :alt="space.name" />
              </div>
              <div class="p-2">
                <div class="h-16 font-thin text-sm overflow-hidden text-ellipsis line-clamp-3">
                  {{ space.description }}
                </div>
                <div class="flex space-x-2">
                    <svg v-if="engaged" @click="toggleEngage" class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
                    </svg>
                    <svg v-else @click="toggleEngage" class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
                    </svg>
                    <span>
                        <svg class="w-6 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"/>
                        </svg>
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { useCameraStore } from '@/stores/cameraStore';
import { useHomeStore } from '@/stores/homeStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

let cameraStore = useCameraStore()
let spaces = computed(() => cameraStore.spaces)
let router = useRouter()

let engaged = ref(false)
let toggleEngage = ()=>{
    engaged.value = !engaged.value
}

onMounted(async () => {
  await cameraStore.fetchSpaces()
})

// let joinSpace = async (id: string, owner: string) => {
//   if(useAccountStore().user?.email_address != owner){
//     await cameraStore.joinSpace(id)
//   } else {
//     router.push({name: 'create-media'})
//   }
// }

</script>
