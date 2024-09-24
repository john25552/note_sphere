<template>
  <div class="grid grid-cols-3 p-2 items-end bg-gray-400">
    <div class="flex space-x-3 w-full">
      <!-- File operations menu -->
      <div class="relative inline-block text-left">
        <!-- Dropdown trigger -->
        <span @click="toggleMenu('filesMenu')" class="cursor-pointer dropdownButton">File</span>

        <!-- Dropdown menu -->
        <div
          id="insertionDropdown"
          class="absolute dropDown left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 group-hover:block"
          :class="{ hidden: menuState.context != 'filesMenu' }"
        >
          <files_tab />
        </div>
      </div>

      <!-- Insertion operations menu -->
      <div class="relative inline-block text-left">
        <span @click="toggleMenu('insertionMenu')" class="cursor-pointer dropdownButton"
          >Insert</span
        >

        <!-- Dropdown menu -->
        <div
          id="insertionDropdown"
          class="absolute dropDown left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 group-hover:block"
          :class="{ hidden: menuState.context != 'insertionMenu' }"
        >
          <insert_tab />
        </div>
      </div>

      <!-- File name area. Accepts editing -->
      <div
        id="fileNameField"
        data-tooltip-target="file_name"
        class="hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-slate-300"
      >
        <span contenteditable="true" @click.prevent="" class="oultine-none focus:outline-none">{{
          fileName.name
        }}</span>
        <span v-if="loaded_file.id.length > 0">.md</span>
      </div>
      <div
        id="file_name"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-black transition-opacity duration-300 bg-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Rename file
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>

    <form class="w-full">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search document..."
          required
        />
      </div>
    </form>

    <div class="flex justify-end space-x-1">
      <div class="max-w-min flex rounded-md bg-gray-300">
        <button
          @click="fileStore.setPreview(false)"
          type="button"
          class="text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium text-sm px-2 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Edit
        </button>
        <button
        @click="fileStore.setPreview(true)"
          type="button"
          class="text-gray-900 hover:text-white hover:bg-gray-900 font-medium text-sm px-2 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Preview
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import files_tab from './files_tab.vue'
import insert_tab from './insert_tab.vue'

import { computed, onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue'
import { initDropdowns, initTooltips } from 'flowbite'
import { useFileStore } from '@/stores/fileStore'
import { useRouter } from 'vue-router'

let fileStore = useFileStore()
let router = useRouter()
let fileNameElement: HTMLElement | null
let loaded_file = computed(() => fileStore.loaded_file)
let menuState = computed(() => fileStore.menuState)

let fileName = loaded_file.value

onMounted(() => {
  initDropdowns()
  initTooltips()

  dropdownManger()

  fileNameElement = document.querySelector('#fileNameField')
  fileNameElement?.addEventListener('input', () => {
    // fileName = fileNameElement?.innerText
  })
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDropdownEvent)
})



//   Handle global click event to toggle menu dropdowns
let dropdownManger = () => {

  document.addEventListener('click', handleDropdownEvent)
}

function handleDropdownEvent(event: MouseEvent){
    let dropDowns = document.querySelectorAll('.dropDown')
    let dropdownButtons = document.querySelectorAll('.dropdownButton')

    const target = event.target as HTMLElement
    let isDropdownOrigin: boolean = false
    dropDowns.forEach((laterDropdown) => {
      dropdownButtons.forEach((dropdown) => {
        if (dropdown.contains(target) || laterDropdown.contains(target)) isDropdownOrigin = true
      })
    })

    if (!isDropdownOrigin) fileStore.changeMenuState(false, '')
}

let toggleMenu = (context: string) => {
    console.log("Toggled")
  fileStore.changeMenuState(true, context)
}

// let save_as = () => {
//     if (fileName == undefined || fileName.length < 1) {
//         return
//     }

//     if (loaded_file.value != undefined) {

//         fileStore.save_file_as(fileName)
//     }
// }
</script>
