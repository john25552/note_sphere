import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', {
  state: () => {
    let activeTab: Ref<string> = ref('')
    let creating_new: Ref<{ on: Boolean; value: string }> = ref({ on: false, value: '' })
    let spaces: Record<string, string>[] = [{}, {}, {}, {}]
    let feed: Record<string, string>[] = [
      {owner: 'Dickson', updatedAt: '22:22', id: '3u2702e3ui', kind: 'full'},
      {owner: 'Kyeyune', updatedAt: '21:56', id: 'w383ywo380', kind: 'textOnly'},
      {owner: 'Ssekyene', updatedAt: '21:40', id: 'hdy263487i', kind: 'photoOnly'},
      {owner: 'Ssenono', updatedAt: '21:23', id: 'cy3862081', kind: 'full'}
    ]

    let reset = () => {
      activeTab = ref('')
      creating_new = ref({ on: false, value: '' })
      spaces = [{}, {}, {}, {}]
      feed = [
        {owner: 'Dickson', updatedAt: '22:22', id: '3u2702e3ui', kind: 'full'},
        {owner: 'Kyeyune', updatedAt: '21:56', id: 'w383ywo380', kind: 'textOnly'},
        {owner: 'Ssekyene', updatedAt: '21:40', id: 'hdy263487i', kind: 'photoOnly'},
        {owner: 'Ssenono', updatedAt: '21:23', id: 'cy3862081', kind: 'full'}
      ]
    }

    let activateTab = (tabName: string) => {
      activeTab.value = tabName
    }

    let enableCreating = (tabName: string) => {
      creating_new.value = { on: true, value: tabName }
    }

    let disable_creating = () => {
      creating_new.value = { on: false, value: '' }
    }

    let deactivateTab = () => {
      activeTab.value = ''
    }

    return {
      activateTab,
      deactivateTab,
      enableCreating,
      disable_creating,
      creating_new,
      activeTab,
      spaces,
      feed
    }
  }
  // persist: true
})
