<template>
  <v-container>
    <v-card class="mt-5">
      <v-row justify="center">
        <v-col cols="20" sm="16" md="20">
          <v-card-title>Visualizacao da API</v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="20" sm="16" md="20">
          <v-card-text>
            <Counter/>
          </v-card-text>
        </v-col>
      </v-row>
      <v-col cols="12">
        <TimeSeriesChart/>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import Counter from '../components/Counter.vue'
import TimeSeriesChart from '../components/TimeSeriesChart.vue'

export default {
  name: 'Home',
  components: {
    Counter,
    TimeSeriesChart
  }
}
</script>
