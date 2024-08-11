<template>
  <v-card>
    <v-card-text>
      <p class="text-h6" aria-live="polite">Contador: {{ store.count }}</p>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
          color="primary"
          variant="plain"
          @click="store.reset"
          aria-label="Reiniciar contador"
      >
        Reiniciar
      </v-btn>
      <v-btn
          color="primary"
          variant="elevated"
          @click="store.increment"
          aria-label="Incrementar contador"
      >
        Incrementar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {useMainStore} from '../store'

export default {
  setup() {
    const store = useMainStore()
    return {store}
  },
}
</script>