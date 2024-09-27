<template>
    <div class="h-full overflow-y-auto space-y-2">
       <component v-if="loadedChat" v-for="(message, index) in loadedChat?.messages" :key="index" :is="messageToRender('plain')" :message="message"/>
    </div>
</template>

<script lang="ts" setup>
import { useInboxStore } from '@/stores/inboxStore';
import Attachment from './file_attachment.vue';
import ImageWithCaption from './image_caption.vue';
import PlainText from './plain_text.vue';
import Voice from './voice.vue';
import { computed } from 'vue';

let inboxStore = useInboxStore()
let loadedChat = computed(() => inboxStore.loadedChat)

const messageToRender = (messageType: string) => {
    switch(messageType){
        case "voice":
            return Voice;
        case "plain":
            return PlainText;
        case "imageCaption":
            return ImageWithCaption;
        case "attachment":
            return Attachment;
    }
}

</script>