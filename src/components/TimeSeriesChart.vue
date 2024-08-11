<template>
  <v-card>
    <v-card-title>Series Temporais</v-card-title>
    <v-card-text>
      <VueDatePicker v-model="dateRange" range @update:modelValue="updateChart"/>
      <div ref="chartContainer" style="height: 400px;"></div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="dataLoaded" class="data-info">
        Dados carregados: {{ allData.length }} itens
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {onMounted, ref, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

export default {
  components: {
    VueDatePicker,
    HighchartsVue,
  },
  setup() {
    const chartContainer = ref(null);
    const chart = ref(null);
    const dateRange = ref([]);
    const allData = ref([]);
    const error = ref(null);
    const dataLoaded = ref(false);

    const destroyChart = () => {
      console.log('Destruindo gráfico');
      if (chart.value) {
        chart.value.destroy();
        chart.value = null;
        error.value = null;
      }
    };

    const createChart = (data) => {
      console.log('Criando gráfico com dados:', data);
      if (!data || data.length === 0) {
        error.value = 'Nenhum dado disponível para criar o gráfico.';
        return;
      }

      destroyChart();
      if (chartContainer.value) {
        try {
          chart.value = Highcharts.chart(chartContainer.value, {
            chart: {
              type: 'line',
            },
            title: {
              text: 'Dados de Series Temporais',
            },
            xAxis: {
              type: 'datetime',
              title: {
                text: 'Tempo',
              },
            },
            yAxis: {
              title: {
                text: 'Valor',
              },
              min: 0,
            },
            series: [
              {
                name: 'Valor',
                data: data.map((item) => [new Date(item.datetime).getTime(), item.value]),
              },
            ],
          });
          console.log('Gráfico criado com sucesso');
        } catch (err) {
          console.error('Erro ao criar o gráfico:', err);
          error.value = 'Erro ao criar o gráfico: ' + err.message;
        }
      }
    };

    const updateChart = () => {
      console.log('Atualizando gráfico, dateRange:', dateRange.value);
      let filteredData = allData.value;

      if (dateRange.value && dateRange.value.length === 2) {
        filteredData = allData.value.filter((item) => {
          const itemDate = new Date(item.datetime);
          return itemDate >= dateRange.value[0] && itemDate <= dateRange.value[1];
        });
      }

      console.log('Dados filtrados:', filteredData);
      createChart(filteredData);
    };

    onMounted(async () => {
      try {
        console.log('Iniciando carregamento do arquivo JSON');
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}Grafico-JSON.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dados carregados:', data);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Formato de dados inválido ou vazio');
        }

        allData.value = data;
        dataLoaded.value = true;
        console.log('Dados processados e armazenados');
        updateChart();
      } catch (err) {
        console.error('Erro ao carregar ou processar o arquivo JSON:', err);
        error.value = 'Erro ao carregar dados: ' + err.message;
      }
    });

    watch(dateRange, updateChart);

    return {chartContainer, dateRange, updateChart, error, dataLoaded, allData};
  },
};
</script>

<style scoped>
.error-message {
  color      : red;
  margin-top : 10px;
}

.data-info {
  margin-top : 10px;
  font-style : italic;
}
</style>
