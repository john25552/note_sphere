import { defineStore } from 'pinia'
import api from './api';
import { useErrorStore } from './errorStore';

export const useLibraryStore = defineStore('libraryStore', {
    state: ()=>{
      return {
        libraries: [] as Library[],
        selectedLibrary: {loaded: false, value: {name: '', folders: [], id: '', files: [], owner: ''}} as {loaded: boolean, value: Library},
        selectedLibtab: 'all' as string,
        creationState: {state: false, source: ''} as {state: boolean, source: string},
        selectedFolder: {name: '', id: '', library: '', owner: ''} as Folder,
        achives: [] as string[],
        initialized: false as boolean
      }
    },

    actions: {
      reset(){
        this.libraries = [] as Library[],
        this.selectedLibrary = {loaded: false, value: {name: '', folders: [], id: '', files: [], owner: ''}} as {loaded: boolean, value: Library},
        this.selectedLibtab = 'all' as string,
        this.creationState = {state: false, source: ''} as {state: boolean, source: string},
        this.selectedFolder = {name: '', id: '', library: ''} as Folder,
        this.achives = [] as string[],
        this.initialized = false as boolean
      },
      async initialize() {
        if (this.initialized) return; // If already initialized, do nothing
        
            try {
                let response = await api.get('library');
                
                if (response.status == 201 || response.status == 200) {
                  this.libraries = response.data;
                  this.initialized = true; // Mark as initialized after data is fetched
                }
                
                else throw new Error('Failed to fetch files');

            } catch (error) {
              useErrorStore().handleError(error)
            }
      },

      selectLibrary(targetId: string) {
        let targetLib = this.libraries.find(library => library.id == targetId)

        if(targetLib != undefined){
          this.selectedLibrary = {loaded: true, value: targetLib}
          this.deselectFolder()
          console.log('loaded library ', targetLib)
        } else {
          console.log("No such library ", targetLib)
        }
      },

      selectFolder(folderId: string) {
        let folder = this.selectedLibrary.value.folders.find(folder => folder.id == folderId)
        if(folder) this.selectedFolder = folder;
      },

      deselectFolder() {
        this.selectedFolder = {name: '', id: '', library: '', owner: ''}
      },

      selectTab(target: string) {
        this.selectedLibtab = target
      },

      changeLibTab(targetTab: string) {
        this.selectedLibtab = targetTab
      },

      changeCreationState(state: boolean, source: string) {
        this.creationState = {state, source}
      },

      async createLibrary(name: string) {
        try {
          let response = await api.post('library/create', {name: name})
          if(response.status == 201 || response.status == 200){
            let libraryData = response.data.library

            console.log("Created library is ", libraryData)

            let library: Library = {
              name: libraryData.name,
              folders: libraryData.folders,
              id: libraryData.id,
              owner: response.data.owner,
              files: libraryData.files
            }

            console.log(library)
            
            this.libraries.push(library)
  
            return library.id
          }
          
          else throw new Error("Couldn't create Library")
        } catch (error) {
          useErrorStore().handleError(error)
        }
      },

      async createFolder (name: string) {
        try {
          let associated_library = this.selectedLibrary.value.id
          console.log("Requesting for creation of library with id ", associated_library)
          let response = await api.post('folder/create', {name: name, associated_library: associated_library})

          if(response.status == 201 || response.status == 200){
            this.libraries.forEach(library => {
              console.log("Created folder is ", response.data)
              if(library.id == response.data.associated_library.id){
                library.folders.push(response.data)
              }
            })
          }
          
          else throw new Error("Couldn't create Library")

        } catch (error) {
          useErrorStore().handleError(error)
        }
      }
    },
    persist: true
})

export type Library = {
  name: string
  folders: Folder[]
  id: string
  owner: string
  files: []
}

export type Folder = {
  name: string
  id: string
  owner: string
  library: string
}
