<template>
    <div class="video w-[90%] h-36 overflow-hidden m-auto rounded-md border border-slate-300 cursor-pointer">
        <video class="remoteVideo w-full h-full object-cover" autoplay muted>
            <source src="" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useCameraStore } from '@/stores/cameraStore';
    import { useSpaceSocketStore } from '@/stores/spaceSocketStore';

    let cameraStore = useCameraStore()
    let spaceSocket = useSpaceSocketStore()

    let props = defineProps(['stream'])

    onMounted(() => {
      let thisVideo = document.querySelector(`.${props.stream}`)
      thisVideo.srcObject = props.stream;
      thisVideo?.addEventListener('click', ()=>{
        console.log('clicked')
      })
    })
</script>