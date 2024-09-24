<template>
    <div class="p-4 m-auto w-[97%] bg-slate-300 rounded-xl overflow-hidden" :class="{'mt-3': !sideBarState, 'my-3': sideBarState}">
        <div class="flex justify-between">
            <div class="flex space-x-2">
                <div class="rounded-full border-2 border-white dark:border-gray-800 overflow-hidden h-10 w-10 ring-2 ring-green-300">
                    <img  class="w-full h-full object-cover" src="/assets/face1.webp" alt="go">
                </div>
                <div class="flex flex-col">
                    <span class="text-gray-500 font-semibold">{{ owner }}</span>
                    <span class="text-xs text-gray-600 font-thin">{{ updatedAt }}</span>
                </div>
            </div>
            <span>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01"/>
                </svg>
            </span>
        </div>
        <div @click="$router.push({name: 'post', params: {id: postId}})">
            <div class="my-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, magni eligendi optio beatae possimus iure in explicabo doloremque ullam excepturi provident rerum laudantium vel consequatur illo voluptatibus, necessitatibus iusto quos.</div>
            <div class="overflow-hidden h-50 w-full rounded-xl">
                <img  class="w-full h-full object-cover" :src="'assets/face1.webp'" alt="go">
            </div>
        </div>
        <div class=" divide-y">
            <div class="flex space-x-1 my-2">
                <svg class="w-5 h-5 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                </svg>
                <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                </svg>
            </div>
            <form class="pt-3 block">   
                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <input type="search" id="search" class="block w-full pl-2 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comment" required />
                    <svg class="w-6 h-6 text-gray-500 dark:text-white absolute right-3 top-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                    </svg>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAccountStore } from '@/stores/account';
    import { computed } from 'vue';

    let accountStore = useAccountStore()
    let sideBarState = computed(() => accountStore.sideBarState)

    let props = defineProps({
        owner: String,
        updatedAt: String,
        kind: String,
        postId: String
    })
</script>