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
                name: "", type: {kind: '', format: ''}, body: '', id: '',
                collaborators: [], associated_folder: '',
                owner: '', library: '', comments: [],
                viewers: []
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
                    console.log(response)
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
                name: "", type: {kind: '', format: ''}, body: '', id: '',
                collaborators: [], associated_folder: '',
                owner: '', library: '', comments: [],
                viewers: []
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
            console.log('File to be loaded is: ', selectedFile)

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

            if(useLibraryStore().libraries.length < 1) {console.log(`There's no library, creating one`);associated_library = await useLibraryStore().createLibrary('Untitled Files Lib')}

            else {
                console.log('This is the library store: ', useLibraryStore().libraries)
                let untitledFilesLib = useLibraryStore().libraries.find(library => library.name == 'Untitled Files Lib')

                if(untitledFilesLib){
                    associated_library = untitledFilesLib.id
                }
                
                else associated_library = await useLibraryStore().createLibrary('Untitled Files Lib')
            }

            formData.append('file', file)
            formData.append('associated_folder', folder)

            if(associated_library) formData.append('associated_library', associated_library)

            else {
                console.log("Associated library is undefined")
                return
            }

            try {
                let response = await api.post('file/create', formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });

                if (response.status == 201 || response.status == 200){
                    let responseFileData = response.data.file

                    let creaatedFile: LocalFile = {
                        name: responseFileData.name,
                        id: responseFileData.id,
                        owner: response.data.owner,
                        collaborators: responseFileData.collaborators,
                        type: {kind: 'document', format: responseFileData.type},
                        body: responseFileData.body,
                        associated_folder: responseFileData.associated_folder,
                        library: responseFileData.library,
                        comments: responseFileData.comments,
                        viewers: responseFileData.viewers
                    }

                    this.files.push(creaatedFile);
                    this.load_file(creaatedFile.name, creaatedFile.id);
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

            try{
                useErrorStore().handleWarning(`Library id is ${associated_library}`)
                let response = await api.post('file/upload', formData)

                if(response.status == 200 || response.status == 201){
                    let responseFileData = response.data.file
                    let uploadedFile: LocalFile = {
                        name: responseFileData.name,
                        id: responseFileData.id,
                        owner: response.data.owner,
                        collaborators: responseFileData.collaborators,
                        type: {
                            kind: fileKind,
                            format: responseFileData.type
                        },
                        body: responseFileData.body,
                        associated_folder: responseFileData.associated_folder,
                        library: responseFileData.library,
                        comments: responseFileData.comments,
                        viewers: responseFileData.viewers
                    }
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
    type: {kind: string, format: string}
    body: string
    associated_folder: string
    library: string
    comments: string[]
    viewers: string[]
};
