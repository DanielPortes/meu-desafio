import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        },
        reset() {
            this.count = 0
        },
    },
})