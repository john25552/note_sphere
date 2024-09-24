<template>
    <div>
        <ul class="" :class="{'grid grid-cols-2 gap-2': !sideBarState, 'space-y-1': sideBarState}">
            <li v-for="(post, index) in posts" :key="index">
                <post :post-id="post.id" :owner="post.owner" :updated-at="post.updatedAt" :kind="post.kind"/>
            </li>
        </ul>    
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import post from './post.vue';
    import { useHomeStore } from '@/stores/homeStore';
    import { useAccountStore } from '@/stores/account';

    let homeStore = useHomeStore()
    let accountStore = useAccountStore()
    let sideBarState = computed(() => accountStore.sideBarState)
    let posts = computed(() => homeStore.feed)
</script>