<template>
    <div class="p-2">
        <div v-if="spaces.length < 1">
            No scheduled spaces at the moment
        </div>
        <ul v-else class="grid grid-cols-3 gap-2">
            <li v-for="(space, index) in spaces" :key="index">
                <div class="rounded-lg border p-2">
                    <div class="flex">
                        <div>Profele Image</div>
                        <div class="flex flex-col">
                            <div>Space Owner</div>
                            <div>Engaments</div>
                        </div>
                    </div>
                    <div class="">
                        <div>
                            Display Image
                        </div>
                        <div>
                            Description
                        </div>
                        <div>
                            <span>Engage</span>
                            <span>Share</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { useHomeStore } from '@/stores/homeStore';
import { computed } from 'vue';

    let homeStore = useHomeStore()
    let spaces = computed(() => homeStore.spaces)
</script>