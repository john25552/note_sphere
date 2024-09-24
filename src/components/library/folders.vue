<template>
    <div>
        <div>
            <div class="relative inline-flex items-center justify-center w-full z-1">
                <span class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">Folders</span>
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <div class="px-3 absolute right-0 bg-white dark:text-white dark:bg-gray-900">

                    <!-- Folder addition button -->
                    <svg @click="libraryStore.changeCreationState(true, 'folder')" data-tooltip-target="create_folder" data-tooltip-placement="left" class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                    </svg>
                    <div id="create_folder" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-400 rounded-lg shadow-sm opacity-0 tooltip text-nowrap dark:bg-gray-700">
                        Create new
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>

            <!-- Folder display section -->
            <div class="p-2 px-4" :class="{'grid grid-cols-3 gap-2': selectedLibrary.value.folders.length > 0}">

                <!-- Folder card component -->
                <div @click="libraryStore.selectFolder(folder.id)" v-if="selectedLibrary.value.folders.length > 0" v-for="folder in selectedLibrary.value.folders" class="max-w-sm p-4 bg-white border rounded-lg shadow dark:bg-gray-800 cursor-pointer" :class="{'activeFolder': selectedFolder.id == folder.id, 'inactiveFolder': selectedFolder.id != folder.id}">
                    <svg class="w-6 h-6 mb-2" :class="{'text-gray-500 dark:text-white': selectedFolder.id != folder.id, 'text-blue-400 dark:text-blue-400': selectedFolder.id == folder.id}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
                    </svg>
                    <h2 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{{ folder.name }}</h2>
                    <p v-if="selectedTab == 'videos'" class="font-normal text-gray-500 dark:text-gray-400 capitalize">{{ folder.library }} videos</p>
                    <p v-if="selectedTab == 'photos'" class="font-normal text-gray-500 dark:text-gray-400 capitalize">{{ folder.library }} photos</p>
                    <p v-if="selectedTab == 'documents'" class="font-normal text-gray-500 dark:text-gray-400 capitalize">{{ folder.library }} documents</p>
                </div>
                <div v-else class="flex flex-col items-center justify-center">
                    <span>No folders in <span class="font-bold capitalize">{{ libraryStore.selectedLibrary.value.name }}</span> yet</span>
                    <span @click="libraryStore.changeCreationState(true, 'folder')" class="text-blue-600 cursor-pointer">Create one?</span>
                </div>
            </div>

        </div>

        <!-- On folder selection, only the content of the selected folder shall be acessed here -->
        <div v-if="selectedFolder.name.length > 0">
            <div class="relative inline-flex items-center justify-center w-full z-1">
                <span v-if="selectedTab == 'videos'" class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">All Videos</span>
                <span v-if="selectedTab == 'documents'" class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">All documents</span>
                <span v-if="selectedTab == 'photos'" class="absolute left-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">All photos</span>
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <span v-if="selectedTab == 'videos'" class="absolute right-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">{{ filterate.videos.length }} videos</span>
                <span v-if="selectedTab == 'documents'" class="absolute right-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">{{ filterate.documents.length }} documents</span>
                <span v-if="selectedTab == 'photos'" class="absolute right-0 px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">{{ filterate.photos.length }} photos</span>
            </div>
            <div>
                <div v-if="selectedTab == 'all'" class="">
                    <div v-if="selectedLibrary.value.files.length > 0" class="p-2 px-4 grid grid-cols-3 gap-2">
                        <div v-for="(document, index) in filterate.documents" :key="index">
                            <inFolderDocCard/>
                        </div>
    
                        <div v-for="(video, index) in filterate.videos" :key="index" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <inFolderVideoCard/>
                        </div>
                    </div>
                    <div v-else class="flex flex-col justify-center items-center">
                        <span>No files in <span class="font-bold capitalize">{{ selectedFolder.name }}</span> folder</span>
                        <span @click="upload('any')" class="text-blue-600 cursor-pointer">Upload one?</span>
                    </div>
                </div>
                
                <!-- Video card component -->
                <div v-if="selectedTab == 'videos'" class="p-2 px-4" :class="{'grid grid-cols-3 gap-2': filterate.videos.length > 0}">
                    <div v-if="filterate.videos.length > 0" v-for="(video, index) in filterate.videos" :key="index" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <inFolderVideoCard/>
                    </div>
                    <div v-else class="flex flex-col justify-center items-center">
                        <span>No video in <span class="font-bold capitalize">{{ selectedFolder.name }}</span> folder</span>
                        <span @click="upload('video')" class="text-blue-600 cursor-pointer">Upload one?</span>
                    </div>
                </div>

                <!-- Document card component -->
                <div v-if="selectedTab == 'documents'" class="p-2 px-4" :class="{'grid grid-cols-3 gap-2': filterate.documents.length > 0}">
                    <div v-if="filterate.videos.length > 0" v-for="(document, index) in filterate.documents" :key="index" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <inFolderDocCard :date="'23/04/2024'" :size="'12kb'" :title="document.name"/>
                    </div>
                    <div v-else class="flex flex-col justify-center items-center">
                        <span>No document in <span class="font-bold capitalize">{{ selectedFolder.name }}</span> folder</span>
                        <span @click="upload('document')" class="text-blue-600 cursor-pointer">Upload one?</span>
                    </div>
                </div>

                <!-- Document photo component -->
                <div v-if="selectedTab == 'photos'" class="p-2 px-4" :class="{'grid grid-cols-3 gap-2': filterate.photos.length > 0}">
                    <div v-if="filterate.videos.length > 0" v-for="(document, index) in filterate.documents" :key="index" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <inFolderDocCard/>
                    </div>
                    <div v-else class="flex flex-col justify-center items-center">
                        <span>No photo in <span class="font-bold capitalize">{{ selectedFolder.name }}</span> folder</span>
                        <span @click="upload('photo')" class="text-blue-600 cursor-pointer">Upload one?</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useLibraryStore, type Library } from '@/stores/libraryStore';
    import { useFileStore, type LocalFile } from '@/stores/fileStore'
    import { initTooltips } from 'flowbite';
    import { computed, onMounted, ref, watch, type Ref } from 'vue';

    import inFolderVideoCard from './inFolderVideoCard.vue'
    import inFolderDocCard from './inFolderDocCard.vue'
    import { useErrorStore } from '@/stores/errorStore';

    let libraryStore = useLibraryStore()
    let fileStore = useFileStore()
    let selectedLibrary = computed(() => libraryStore.selectedLibrary)
    let selectedTab = computed(() => libraryStore.selectedLibtab)
    let selectedFolder = computed(() => libraryStore.selectedFolder)

    let filterate = ref({
        videos: [] as unknown as LocalFile[],
        photos: [] as unknown as LocalFile[],
        documents: [] as unknown as LocalFile[]
    })

    onMounted(() => {
        initTooltips()
    })

    watch(selectedFolder, (value) => {
        let folderFiles = selectedLibrary.value.value.files.filter((value: LocalFile) => value.associated_folder == value.associated_folder)
        filterate.value.documents = folderFiles.filter((file: LocalFile) => file.type.kind == 'document')
        filterate.value.photos = folderFiles.filter((file: LocalFile) => file.type.kind == 'photo')
        filterate.value.videos = folderFiles.filter((file: LocalFile) => file.type.kind == 'video')
    })

    let upload = async (type: string) => {
        let inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.style.display = 'none';

        // Set the file types to be accepted based on the provided type
        switch (type) {
            case 'document':
                inputElement.accept = '.pdf, .docx, .txt, .xlsx, .json, .md';
                break;
            case 'photo':
                inputElement.accept = 'image/*'; 
                break;
            case 'video':
                inputElement.accept = 'video/*'; 
                break;
            default:
                inputElement.accept = '*/*'
        }

        inputElement.click();

        // Wait for the user to select a file
        inputElement.addEventListener('change', async (event) => {
            const file = event.target?.files[0];
            if(file){
                await fileStore.uploadFile(file, selectedFolder.value.id, type)
            } else {
                useErrorStore().handleError("Unable to pick file")
            }
        })
    }

</script>

<style scoped>
    .activeFolder {
        @apply border-blue-500 dark:border-blue-600 shadow-blue-300
    }

    .inactiveFolder {
        @apply border-gray-200 dark:border-gray-700
    }
</style>