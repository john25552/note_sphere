import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import api from './api';

export const useHomeStore = defineStore('homeStore', {
  state: () => {
    return {
      initialized: false,
      activeTab: '' as string,
      creating_new: { on: false, value: '' } as { on: Boolean; value: string },
      feed:  [
        {owner: 'Dickson', updatedAt: '22:22', id: '3u2702e3ui', kind: 'full'},
        {owner: 'Kyeyune', updatedAt: '21:56', id: 'w383ywo380', kind: 'textOnly'},
        {owner: 'Ssekyene', updatedAt: '21:40', id: 'hdy263487i', kind: 'photoOnly'},
        {owner: 'Ssenono', updatedAt: '21:23', id: 'cy3862081', kind: 'full'}
      ] as Record<string, string>[]
  
    }
  },
  actions: {
    reset() {
      this.activeTab = ''
      this.initialized = false
      this.creating_new = { on: false, value: '' }
      this.feed = [
        {owner: 'Dickson', updatedAt: '22:22', id: '3u2702e3ui', kind: 'full'},
        {owner: 'Kyeyune', updatedAt: '21:56', id: 'w383ywo380', kind: 'textOnly'},
        {owner: 'Ssekyene', updatedAt: '21:40', id: 'hdy263487i', kind: 'photoOnly'},
        {owner: 'Ssenono', updatedAt: '21:23', id: 'cy3862081', kind: 'full'}
      ]
    },

    async initialize() {
      this.activeTab = 'feed'
    },

    activateTab(tabName: string) {
      this.activeTab = tabName
    },

    enableCreating(tabName: string) {
      this.creating_new = { on: true, value: tabName }
    },

    disable_creating() {
      this.creating_new = { on: false, value: '' }
    },

    deactivateTab() {
      this.activeTab = ''
    }
  },

  persist: true
})