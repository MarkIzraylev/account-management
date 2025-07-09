<script setup lang="ts">
import AccountRow from '@/components/AccountRow.vue'
</script>

<template>
  <div class="main">
    <div class="header">
      <span class="heading">Учётные записи</span>
      <v-btn icon="mdi-plus-circle-outline" color="blue-lighten-1" variant="text"></v-btn>
    </div>
    <v-alert
      color="info"
      icon="$info"
      text="Для указания нескольких меток для одной пары логин/пароль, используйте разделитель ;"
    ></v-alert>
    <div class="accountsWrapper">
      <table class="accounts">
        <thead>
          <th>Метки</th>
          <th>Тип записи</th>
          <th>Логин</th>
          <th>Пароль</th>
        </thead>
        <tbody>
          <AccountRow v-for="(row, ind) in new Array(3)" :key="ind" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  max-width: 1500px;
  margin: 0 auto;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}

.header {
  display: flex;
  gap: 8px;
  align-items: center;
}

.heading {
  font-size: 20px;
  font-weight: 600;
  position: relative;
  top: -2px;
}

.accountsWrapper {
  overflow-x: auto;
  border: 1px solid lightblue;
  padding-top: 8px;
  border-radius: 4px;
}

.accounts {
  width: 100%;
  border-spacing: 24px 8px;
}
</style>
