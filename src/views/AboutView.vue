<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mt-5">
          <v-card-title>Desafio Desenvolvedor de Front-end TECSCI</v-card-title>
          <v-card-text>
            <div class="about">
              <p>
                O objetivo é criar uma aplicação web utilizando as seguintes especificações técnicas.
                Aqui está a lista das tecnologias que esperamos ver no projeto, em ordem de importância:
                <strong>(não é requisito utilizar todos os itens abaixo)</strong>
              </p>
              <br>
              <ol>
                <li>Git e GitHub</li>
                <li>Pinia</li>
                <li>Routes</li>
                <li>Vuetify</li>
                <li>Highcharts ou Chart.js</li>
                <li>VueDatePicker</li>
                <li>Axios</li>
              </ol>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about {
  padding: 20px;
}
</style>
