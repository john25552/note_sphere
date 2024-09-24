<template>
    <div class="flex items-center space-x-2 bg-slate-400 bg-opacity-20 rounded-md p-1">
        <img class="w-8 h-8 rounded" :src="obtainFileType(title)" alt="Default avatar">
        <div class=" flex-grow">
            <span class="text-gray-800 font-bold text-sm">{{ title }}</span>
            <div class="flex items-end justify-between \">
                <div class="text-gray-400 text-xs space-x-2">
                    <span>{{ date }}</span>
                </div>
                <div class="text-xs text-gray-500 uppercase">
                    {{ size }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    let props = defineProps({
        title: String,
        date: String,
        size: String
    })

    let obtainFileType = (fileName: string) => {
        let reversedString = fileName.split('').reverse().join('')
        let fileExtension = reversedString.split('.')[0].split('').reverse().join('')

        let iconSet = {
            pdf: '/assets/pdficon.webp',
            docx: '/assets/docxicon.webp',
            doc: '/assets/docicon.webp',
            txt: '/assets/txticon.webp',
            xls: '/assets/excelicon.webp',
        }
        
        return iconSet[fileExtension]
    }

</script>