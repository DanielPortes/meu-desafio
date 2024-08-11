<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Estados Brasileiros
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="estados"
              :search="search"
              :loading="loading"
              class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Estados por Região</v-card-title>
          <v-card-text>
            <canvas ref="chartCanvas"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {onMounted, ref, watch} from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
  setup() {
    const estados = ref([])
    const loading = ref(true)
    const search = ref('')
    const headers = [
      {title: 'ID', key: 'id'},
      {title: 'Sigla', key: 'sigla'},
      {title: 'Nome', key: 'nome'},
      {title: 'Região', key: 'regiao.nome'}
    ]
    const chartCanvas = ref(null)
    let chart = null

    const fetchData = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        estados.value = response.data
        loading.value = false
        createChart()
      } catch (error) {
        console.error('Erro ao buscar dados do IBGE:', error)
        loading.value = false
      }
    }

    const createChart = () => {
      if (chart) {
        chart.destroy()
      }

      const ctx = chartCanvas.value.getContext('2d')
      const regioes = {}
      estados.value.forEach(estado => {
        const regiao = estado.regiao.nome
        regioes[regiao] = (regioes[regiao] || 0) + 1
      })

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(regioes),
          datasets: [{
            label: 'Número de Estados',
            data: Object.values(regioes),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ]
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      })
    }

    onMounted(fetchData)

    watch(estados, createChart)

    return {estados, loading, search, headers, chartCanvas}
  }
}
</script>