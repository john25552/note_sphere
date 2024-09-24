<template>
    <div class="h-full overflow-y-auto">
       <component v-for="(message, index) in messages" :key="index" :is="messageToRender(message.type)" :message="message"/>
    </div>
</template>

<script lang="ts" setup>
import Attachment from './file_attachment.vue';
import ImageWithCaption from './image_caption.vue';
import PlainText from './plain_text.vue';
import Voice from './voice.vue';

const messages = [
    {sender: "Aine Dixon", receiver: "Admin", timeSent: "21:30", type: "voice"},
    {sender: "self", receiver: "Aine Dixon", timeSent: "22:10", type: "attachment"},
    {sender: "Ssekyene", receiver: "Admin", timeSent: "22:10", type: "imageCaption"},
    {sender: "self", receiver: "Admin", timeSent: "22:10", type: "plain"},
    {sender: "Lord Ssebata", receiver: "Admin", timeSent: "22:10", type: "voice"},
];

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