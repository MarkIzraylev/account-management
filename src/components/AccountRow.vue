<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import { useAccountsStore } from '@/stores/accounts'

const emit = defineEmits(['save'])

const store = useAccountsStore()

const props = defineProps({
  rowIndex: {
    type: Number,
    required: true,
  },
})

const formRef = inject<Ref<HTMLFormElement | undefined>>('formRef')

const labelsString = ref(store.getLabelsString(props.rowIndex))
const type = ref(store.accounts[props.rowIndex].type)
const login = ref(store.accounts[props.rowIndex].login)
const password = ref(store.accounts[props.rowIndex].password)
const showPassword = ref(false)
const rules = {
  required: (value: string) => !!value || 'Необходимо заполнить',
  maxN(n: number) {
    return (value: string) => value.length <= 100 || `Максимум ${n} символов`
  },
}

const isFormValid = async (): Promise<boolean> => {
  return await formRef?.value?.validate().then((res: unknown) => {
    return res && typeof res === 'object' && 'valid' in res && res.valid
  })
}

const tryToSaveData = async (prohibitEmits: boolean = false): Promise<boolean> => {
  const isValid = await isFormValid()

  if (isValid) {
    store.setLabels(props.rowIndex, labelsString.value)
    store.accounts[props.rowIndex].type = type.value
    store.accounts[props.rowIndex].login = login.value
    store.accounts[props.rowIndex].password = type.value === 'LDAP' ? null : password.value

    if (!prohibitEmits) emit('save', props.rowIndex)
  }

  return isValid
}

onMounted(async (): Promise<void> => {
  // Добавляем только один event listener
  if (props.rowIndex === 0) {
    window.addEventListener('beforeunload', async (event) => {
      const isValid = await tryToSaveData()
      if (!isValid) {
        event.preventDefault()
        // Сообщаем пользователю, что есть несохранённые данные
        event.returnValue = ''
      }
    })
  }
})

defineExpose({
  tryToSaveData,
})
</script>

<template>
  <tr class="row">
    <td>
      <vTextarea
        class="control"
        label="Метки"
        rows="1"
        auto-grow
        hint="Разделитель ;"
        :rules="[rules.maxN(50)]"
        v-model="labelsString"
        @change="tryToSaveData"
      />
    </td>
    <td>
      <vSelect
        class="control"
        label="Тип записи"
        :items="['LDAP', 'Локальная']"
        :rules="[rules.required]"
        v-model="type"
        @update:model-value="tryToSaveData()"
      />
    </td>
    <td :colspan="type === 'LDAP' ? 2 : 1">
      <vTextField
        class="control"
        label="Логин"
        :rules="[rules.required, rules.maxN(100)]"
        v-model="login"
        @change="tryToSaveData"
      />
    </td>
    <td v-if="type !== 'LDAP'">
      <vTextField
        class="control"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.maxN(100)]"
        :type="showPassword ? 'text' : 'password'"
        label="Пароль"
        counter
        @click:append="showPassword = !showPassword"
        @change="tryToSaveData"
      />
    </td>
    <td class="buttonCell">
      <vBtn
        density="default"
        icon="mdi-trash-can-outline"
        color="red-lighten-2"
        variant="text"
        @click="store.removeRow(rowIndex)"
      />
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
