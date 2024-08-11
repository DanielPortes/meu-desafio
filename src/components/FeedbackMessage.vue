<template>
  <v-snackbar
      v-model="show"
      :color="type"
      :timeout="timeout"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
          text
          v-bind="attrs"
          @click="show = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {ref, watch} from 'vue'

export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    const show = ref(false)

    watch(() => props.message, (newMessage) => {
      if (newMessage) {
        show.value = true
      }
    })

    return {show}
  }
}
</script>