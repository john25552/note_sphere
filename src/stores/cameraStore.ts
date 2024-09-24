import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCameraStore = defineStore('cameraStore', {
    state: ()=> {
        let loaded_space = ref({
            participants: [
                {name: 'face1', id: 'face1id'},{name: 'face2'},
                {name: 'face3'},{name: 'face4'},
                {name: 'face1'}
            ],
            space_messages: [
                {body: 'Hello there, how are you doing', sender: 'Aine Dixon'},
                {body: "Yoo, what's going on guys", sender: "Ssekyene Robert"},
                {body: "Hallelujah, hallelujah hallelujah",sender: "Ssekyene Robert"},
                {body: "You want me, but i don't",sender: "Ssenono Henry"},
                {body: "Am a raster farian",sender: "Kyeyune Habib"},
                {body: "I saw that coming",sender: "Aine Dixon"},
                {body: "Mwe, byemukola bwemwasomerera",sender: "Kafeero John"},
            ],
            sharedFiles: [
                {title: 'preveous minutes.pdf', date: 'Nov 23, 2023 at 12:04', size: '22kb'},
                {title: 'research report.docx', date: 'Nov 23, 2023 at 12:23', size: '2.1mb'},
                {title: 'Budget summary.xls', date: 'Nov, 23, 2023 at 13:00', size: '134kb'},
            ],
            spacePins: [
                {type: 'others', title: 'Attention', content: 'Hello there, this is to inform that we are all Ugandans...'},
                {type: 'todo', title: 'Agenda', content: [
                    {value: 'Opening prayer', finished: true},
                    {value: 'Introduction of members', finished: false},
                    {value: 'Speech from Chair', finished: false},
                    {value: 'Recap of preveous minutes', finished: false}
                ]},
                {type: 'others', title: 'S.O.P', content: 'Every member must wash their face and brush their teeth before speaking'},
            ]
        })

        let creatingNewSharing = ref({on: false, tab: ''})
        let active_shared_tab = ref('sharedFiles')
        let is_sidePanel = ref({on: false, in_preview: ''});

        let reset = () => {
            loaded_space = ref({
                participants: [
                    {name: 'face1', id: 'face1id'},{name: 'face2'},
                    {name: 'face3'},{name: 'face4'},
                    {name: 'face1'}
                ],
                space_messages: [
                    {body: 'Hello there, how are you doing', sender: 'Aine Dixon'},
                    {body: "Yoo, what's going on guys", sender: "Ssekyene Robert"},
                    {body: "Hallelujah, hallelujah hallelujah",sender: "Ssekyene Robert"},
                    {body: "You want me, but i don't",sender: "Ssenono Henry"},
                    {body: "Am a raster farian",sender: "Kyeyune Habib"},
                    {body: "I saw that coming",sender: "Aine Dixon"},
                    {body: "Mwe, byemukola bwemwasomerera",sender: "Kafeero John"},
                ],
                sharedFiles: [
                    {title: 'preveous minutes.pdf', date: 'Nov 23, 2023 at 12:04', size: '22kb'},
                    {title: 'research report.docx', date: 'Nov 23, 2023 at 12:23', size: '2.1mb'},
                    {title: 'Budget summary.xls', date: 'Nov, 23, 2023 at 13:00', size: '134kb'},
                ],
                spacePins: [
                    {type: 'others', title: 'Attention', content: 'Hello there, this is to inform that we are all Ugandans...'},
                    {type: 'todo', title: 'Agenda', content: [
                        {value: 'Opening prayer', finished: true},
                        {value: 'Introduction of members', finished: false},
                        {value: 'Speech from Chair', finished: false},
                        {value: 'Recap of preveous minutes', finished: false}
                    ]},
                    {type: 'others', title: 'S.O.P', content: 'Every member must wash their face and brush their teeth before speaking'},
                ]
            })
    
            creatingNewSharing = ref({on: false, tab: ''})
            active_shared_tab = ref('sharedFiles')
            is_sidePanel = ref({on: false, in_preview: ''});
        }

        let toggle_active_shared_tab = (target: 'sharedFiles' | 'pinned') => {
            active_shared_tab.value = target
        }

        let createNewSharing = (tab: string)=> {
            creatingNewSharing.value = {on: true, tab: tab}
        }

        let terminateNewSharing = () => {
            creatingNewSharing.value = {on: false, tab: ''}
        }

        let preview_participants = () => {
            is_sidePanel.value = {on: true, in_preview: 'participants'}
        }
        
        let preview_messages = () => {
            is_sidePanel.value = {on: true, in_preview: 'messages'}
        }

        let terminateRightPanelPreview = () => {
            is_sidePanel.value = {on: false, in_preview: ''}
        }

        return {
            loaded_space, reset, preview_messages, preview_participants, is_sidePanel,
            active_shared_tab, toggle_active_shared_tab, creatingNewSharing,
            createNewSharing, terminateNewSharing, terminateRightPanelPreview
        }
    },
    persist: true
})
