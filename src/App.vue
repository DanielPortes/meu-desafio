<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title class="title-wrapper">
        <v-btn to="/" class="title-btn" text>Meu Desafio - TECSCI</v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <nav>
        <v-btn to="/" text aria-label="Ir para a página inicial">Inicio</v-btn>
        <v-btn to="/api" text aria-label="Ir para a página da API">API</v-btn>
        <v-btn to="/about" text aria-label="Ir para a página Sobre">Sobre</v-btn>
      </nav>
      <v-btn icon @click="toggleTheme" :aria-label="isDarkTheme ? 'Ativar modo claro' : 'Ativar modo escuro'">
        <v-icon>{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app color="primary-darken-1">
      <span>&copy; {{ new Date().getFullYear() }} - Meu Desafio - TECSCI - Por Daniel Fagundes</span>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'

export default {
  name: 'App',
  setup() {
    const theme = useTheme()
    const isDarkTheme = ref(theme.global.current.value.dark)

    const toggleTheme = () => {
      theme.global.name.value = isDarkTheme.value ? 'light' : 'dark'
      isDarkTheme.value = !isDarkTheme.value
    }

    onMounted(() => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDarkTheme.value = prefersDark
      theme.global.name.value = prefersDark ? 'dark' : 'light'
    })

    return { isDarkTheme, toggleTheme }
  }
}
</script>

<style>

a {
  color: #1976D2;
  text-decoration: underline;
}

.theme--dark a {
  color: #64B5F6;
}

.title-wrapper {
  padding: 0 !important;
}

.title-btn {
  font-size      : 1.0rem !important;
  font-weight    : 700 !important;
  letter-spacing : 0.05em !important;
  text-transform : uppercase !important;
  transition     : all 0.3s ease !important;
}

.title-btn:hover {
  transform: scale(1.05);
}

a:focus, button:focus, input:focus, select:focus, textarea:focus {
  outline: 2px solid #1976D2;
  outline-offset: 2px;
}

.theme--dark a:focus, .theme--dark button:focus, .theme--dark input:focus,
.theme--dark select:focus, .theme--dark textarea:focus {
  outline-color: #64B5F6;
}

body {
  color: rgba(0, 0, 0, 0.87);
}

.theme--dark body {
  color: rgba(255, 255, 255, 0.87);
}
</style>