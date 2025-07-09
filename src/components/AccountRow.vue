<script setup lang="ts">
import { ref } from 'vue'

const password = ref()
const showPassword = ref(false)
const rules = {
  required: (value) => !!value || 'Необходимо заполнить',
  min: (v) => v.length >= 8 || 'Минимум 8 символов',
}
</script>

<template>
  <tr class="row">
    <td>
      <v-textarea
        class="control"
        label="Метки"
        rows="1"
        auto-grow
        hint="Разделитель ;"
      ></v-textarea>
    </td>
    <td>
      <v-select class="control" label="Тип записи" :items="['LDAP', 'Локальная']"></v-select>
    </td>
    <td>
      <v-text-field class="control" label="Логин"></v-text-field>
    </td>
    <td>
      <v-text-field
        class="control"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        label="Пароль"
        name="input-10-1"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </td>
    <td class="buttonCell">
      <v-btn
        density="default"
        icon="mdi-trash-can-outline"
        color="red-lighten-2"
        variant="text"
      ></v-btn>
    </td>
  </tr>
</template>

<style scoped>
.row {
  min-height: 200px;
}

.control {
  min-width: 230px;
}

.buttonCell {
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: center;
}

td {
  white-space: nowrap;
}
</style>
