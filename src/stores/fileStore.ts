import { defineStore } from "pinia";
import api from "./api";
import { useLibraryStore } from "./libraryStore";
import { useErrorStore } from "./errorStore";

export const useFileStore = defineStore('fileStore', {
    state: () => {
        return {
            recentlyOpenedFiles: [] as { id: string; name: string; lastOpenedAt: string }[],
            active_modal: null as string | null,
            menuState: { context: '', on: false },
            previewMode: true,
            loaded_file: {
                name: "", kind: '', body: '', id: '',
                collaborators: [], associated_folder: '', size: 0,
                owner: '', library: '', comments: [],
                viewers: [], type: '', updatedAt: ''
            } as LocalFile,
            files: [] as LocalFile[],
            initialized: false // Flag to track initialization
        };
    },
    actions: {
        
        async initialize() {
            if(!useLibraryStore().initialized) await useLibraryStore().initialize()
            if (this.initialized) return; // If already initialized, do nothing

            try {
                let response = await api.get('file');

                if (response.status == 201 || response.status == 200){
                    this.files = response.data;
                    this.initialized = true; // Mark as initialized after data is fetched
                }

                else throw new Error('Failed to fetch files');

            } catch (error) {
                useErrorStore().handleError(error)
            }
        },

        reset() {
            this.recentlyOpenedFiles = [] as { id: string; name: string; lastOpenedAt: string }[],
            this.active_modal = null as string | null,
            this.menuState = { context: '', on: false },
            this.previewMode = true,
            this.loaded_file = {
                name: "", kind: '', body: '', id: '',
                collaborators: [], associated_folder: '',
                owner: '', library: '', comments: [], size: 0,
                viewers: [], type: '', updatedAt: ''
            } as LocalFile,
            this.files = [] as LocalFile[],
            this.initialized = false 
        },

        setPreview(option: boolean) {
            this.previewMode = option
        },

        async load_file(file_name: string, file_id: string) {
            // Ensure files are loaded before loading a specific file
            if (!this.initialized) {
                await this.initialize();
            }

            let selectedFile = this.files.find(file => file.name === file_name && file.id === file_id);

            if (selectedFile) {
                this.loaded_file = selectedFile;

                let alreadyExistsInOpened = this.recentlyOpenedFiles.find(file => file.name === file_name && file.id === file_id);
                if (alreadyExistsInOpened) {
                    this.recentlyOpenedFiles.forEach(file => {
                        if (file.id === file_id) {
                            file.lastOpenedAt = new Date().toISOString();
                        }
                    });
                } else {
                    this.recentlyOpenedFiles.push({
                        name: file_name,
                        id: file_id,
                        lastOpenedAt: new Date().toISOString()
                    });
                }

                try {
                    // let response = await api.post('files/recentlyViewed', { file_name, file_id });
                    // if (response.status == 201 || response.status == 200){

                    // to be implemented

                    // } 
                    // else throw new Error("Couldn't add file to recently viewed");

                } catch (error) {
                    useErrorStore().handleError(error)
                }
            }
        },

        changeMenuState(state: boolean, context: string) {
            this.menuState = { context: context, on: state };
        },

        write_to_file(content: string) {
            // this.loaded_file.file.text = content;
        },

        activate_modal(modal_name: string) {
            this.active_modal = modal_name;
        },

        close_modal() {
            this.active_modal = null;
        },

        async create_newFile(name: string, folder: string) {
            let formData = new FormData()
            let content = `#### This is template data created with the file automatically
            ##### The following are what you can do with it
            * Delete it
            * Keep it and start from there
            `
            let blob = new Blob([content], {type: 'text/markdown'})
            let file = new File([blob], name, {type: 'text/markdown'})
            let associated_library: string | undefined = '';

            if(useLibraryStore().libraries.length < 1) {
                useErrorStore().handleWarning(`There's no library, creating one`);
                associated_library = await useLibraryStore().createLibrary('Untitled Files Lib')}

            else {
                let untitledFilesLib = useLibraryStore().libraries.find(library => library.name == 'Untitled Files Lib')

                if(untitledFilesLib){
                    associated_library = untitledFilesLib.id
                }
                
                else associated_library = await useLibraryStore().createLibrary('Untitled Files Lib')
            }

            formData.append('file', file)
            formData.append('associated_folder', folder)
            formData.append('kind', 'document')

            if(associated_library) formData.append('associated_library', associated_library)

            else {
                return
            }

            try {
                let response = await api.post('file/create', formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });

                if (response.status == 201 || response.status == 200){
                    let responseFileData = response.data.file

                    let createdFile: LocalFile = {
                        name: responseFileData.name,
                        id: responseFileData.id,
                        owner: response.data.owner,
                        collaborators: responseFileData.collaborators,
                        kind: 'document',
                        type: responseFileData.type,
                        body: responseFileData.body,
                        associated_folder: responseFileData.associated_folder,
                        library: responseFileData.library,
                        comments: responseFileData.comments,
                        viewers: responseFileData.viewers,
                        size: responseFileData.size,
                        updatedAt: responseFileData.updatedAt
                    }

                    this.files.push(createdFile);
                    await useLibraryStore().refreshLibraries()
                    this.load_file(createdFile.name, createdFile.id);
                }
                
                else throw new Error('File creation failed');


            } catch (error) {
                useErrorStore().handleError(error)
            }
        },

        async uploadFile(file: File, folder: string, fileKind: string){

            let associated_library = useLibraryStore().selectedLibrary.value.id
        
            let formData = new FormData()
            formData.append('file', file)
            formData.append('associated_library', associated_library)
            formData.append('associated_folder', folder)
            formData.append('kind', fileKind)

            try{
                let response = await api.post('file/upload', formData)

                if(response.status == 200 || response.status == 201){
                    await useLibraryStore().refreshLibraries()
                    this.files = response.data
                }
            } catch(error){
                useErrorStore().handleError(error)
            }
        },

        async save_file(file_id: string, file_content: string) {
            try {
                await api.patch('file/save', { file_content, file_id });
            } catch (error) {
                useErrorStore().handleError(error)
            }
        },

        async save_file_as(new_name: string) {
            try {
                await api.put('file/save_as', { id: this.loaded_file.id, new_name });
            } catch (error) {
                useErrorStore().handleError(error)
            }
        }
    },
    persist: true
});

export type LocalFile = {
    name: string;
    id: string;
    owner: string
    collaborators: { id: string}[];
    type: string
    kind: string
    body: string
    associated_folder: string
    library: string
    comments: string[]
    viewers: string[]
    size: number,
    updatedAt: string
};
