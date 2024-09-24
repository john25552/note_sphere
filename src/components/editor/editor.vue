<template>
    <div class="editor-wrapper bg-gray-300 h-full max-h-full grid grid-rows-2">
        <div class="toolbar">
            <toolbar/>
        </div>
        <div class="content h-full relative">
            <textarea v-model="raw_content" class="absolute top-0 bottom-0 w-full overflow-y-auto focus:outline-none pl-2" :class="{'hidden': previewMode}">
            </textarea>
            <div id="preview" class="preview markdown absolute top-0 bottom-0 w-full px-1" :class="{'hidden': !previewMode}">
            </div>

            <!-- Modal(overlay) for creating or opening a new file window -->
            <div v-if="activeModal" id="authentication-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-md max-h-full m-auto">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-conditionsemibold text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>
                            <button @click="fileStore.close_modal" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5">
                            <new_fileModal v-if="activeModal == 'newFileModal'"/>
                        </div>
                    </div>
                </div>
            </div> 
        </div>

    </div>
</template>

<script lang="ts" setup>
    import toolbar from './toolbar.vue';
    import new_fileModal from './new_file.modal.vue';
    import { useFileStore } from '@/stores/fileStore'
    import { initDropdowns } from 'flowbite';
    import {marked} from 'marked'

    import { ref, onMounted, computed, watch, type Ref } from 'vue';
    import hljs from 'highlight.js'

    let fileStore = useFileStore()
    let activeModal = computed(()=> fileStore.active_modal)
    let mountedFile = computed(() => fileStore.loaded_file)
    let previewMode = computed(() => fileStore.previewMode)
    marked.use({
        breaks: true,
        pedantic: false,
        gfm: true,
    });

    let parsed_md: string;
    let raw_content: Ref<string> = ref('');
    let preview: HTMLElement | null;

    let md = markdownit({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight: function (str: any, lang: any) {
            if (hljs.getLanguage(lang)) {
                return '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            }

            // return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })

    onMounted(()=> {
        initDropdowns();

        // raw_content = document.getElementById('content');
        preview = document.querySelector("#preview");

        const updatePreview = () => {
            // Use innerText to get the raw content and trim any excess spaces
            // let rawText = raw_content?.innerText.trim() || '';
            
            // Parse the raw markdown content

            // Set the parsed content to the preview area
            preview.innerHTML = marked.parse(raw_content.value)

            // Highlight code blocks, if any
            hljs.highlightElement(preview);
        }

        // Real-time updates when input is detected

        // When a file is mounted (loaded), render its content
        if (mountedFile.value.name.length > 0) {
            // Set the initial content in the editable area
            // raw_content.value = mountedFile.value.body;
            updatePreview()
        }

        // Watch the mountedFile for changes and update accordingly
        watch(mountedFile, (value) => {
            raw_content.value = value.body;
            updatePreview()
        });

        watch(raw_content, (value) => {
            updatePreview()
        })

    })



</script>

<style scoped>
    .editor-wrapper{
        grid-template-rows: 7.8% 92.2%;
        grid-template-areas: "toolbar" "content";
    }

    .toolbar{
        grid-area: toolbar;
    }

    .content{
        grid-area: content;
    }
</style>