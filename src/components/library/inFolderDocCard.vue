<template>
    <div class="flex items-center space-x-2 bg-slate-400 bg-opacity-20 rounded-md p-1">
        <img class="w-8 h-8 rounded" :src="`/assets/${imageSrc}`" :alt="imageSrc">
        <div class="flex-grow">
            <span class="block text-gray-800 font-bold text-sm truncate max-w-full">{{ title }}</span>
            <div class="flex items-end justify-between">
                <div class="text-gray-400 text-xs space-x-2">
                    <span>{{ extractDate }}</span>
                </div>
                <div class="text-xs text-gray-500 uppercase">
                    {{ obtainSize }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, defineProps } from 'vue';

interface Props {
  date: string;
  size: number;
  title: string;
  type: string;
}

const props = defineProps<Props>();

const imageSrc = computed(() => {
  let icon: string = '';
  if (props.type?.includes('pdf')) icon = 'pdficon.webp';
  else if (props.type?.includes('.word')) icon = 'docxicon.webp';
  else if (props.type?.includes('.sheet')) icon = 'excelicon.webp';
  else icon = 'texticon.webp';
  return icon;
});

const extractDate = computed(()=> {
    let date = props.date.split('T')[0]
    let time = props.date.split('T')[1]

    let dateTokens = date.split('-')
    let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let dateConstruct = months[Number(dateTokens[1])] + ' ' + dateTokens[2] + ', ' + dateTokens[0];

    let timeTokens = time.split(':')
    let timeConstruct = timeTokens[0] + ':' + timeTokens[1]

    return dateConstruct + ' at ' + timeConstruct
})

const obtainSize = computed(()=> {
    if(props.size < 100) return props.size.toFixed(1) + ' B'
    else if(props.size < 1024 * 1000) return (props.size/1024).toFixed(1) + ' KB'
    else return (props.size/(1024 * 1024)).toFixed(1) + ' MB'
})

</script>
