import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useInnerRouter = defineStore('innerRouter', {
    state: ()=>{
      let ulrContainer: Ref<string[]> = ref([]);
      let level = ref(0);
      
      const push = (url: string)=> {
        ulrContainer.value.push(url)
        addLevel()
      }
  
      const pop = ()=> {
        ulrContainer.value.pop()
        removeLevel()
      }
  
      const getLevel = () => {
        return level.value
      }
  
      const addLevel = () => {
        level.value++
      }
  
      const removeLevel = () => {
        level.value--
      }
  
      const rebuild = (url: string) => {
        ulrContainer.value.splice(0, ulrContainer.value.length, url)
        level.value = 1
      }
  
      const replaceLast = (url: string) => {
        ulrContainer.value.splice(ulrContainer.value.length-1, 1, url)
      }
  
      
      return { push, pop, getLevel, addLevel, removeLevel, rebuild, replaceLast, ulrContainer }
    },
    persist: true
})
