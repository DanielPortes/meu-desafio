<template>
  <v-container>
    <v-card class="mt-5">
      <v-row justify="center">
        <v-col cols="20" sm="16" md="20">
          <v-card-title>Visualizacao da API</v-card-title>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12">
          <IBGEDataTable/>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import IBGEDataTable from '../components/IBGEDataTable.vue'

export default {
  name: 'About',
  components: {
    IBGEDataTable
  }
}
</script>