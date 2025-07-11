<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import { provide, ref } from 'vue'

import AccountRow from '@/components/AccountRow.vue'

const store = useAccountsStore()

const formRef = ref<HTMLFormElement | undefined>()
provide('formRef', formRef)

const accountRowRefs = ref<InstanceType<typeof AccountRow>[] | undefined>()

const tryToSaveAll = (): void => {
  accountRowRefs.value?.forEach((child) => {
    child.tryToSaveData(true)
  })
}
</script>

<template>
  <div class="main">
    <div class="header">
      <span class="heading">Учётные записи</span>
      <vBtn
        icon="mdi-plus-circle-outline"
        color="blue-lighten-1"
        variant="text"
        @click="store.addRow()"
      ></vBtn>
    </div>

    <vAlert
      color="info"
      icon="$info"
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      variant="flat"
    />

    <div class="accountsWrapper">
      <vForm ref="formRef">
        <table class="accounts">
          <thead>
            <tr>
              <th>Метки</th>
              <th>Тип записи</th>
              <th>Логин</th>
              <th>Пароль</th>
            </tr>
          </thead>
          <tbody>
            <AccountRow
              v-for="(row, ind) in store.accounts"
              :key="row.login + ind"
              :rowIndex="ind"
              ref="accountRowRefs"
              @save="tryToSaveAll"
            />
          </tbody>
        </table>
      </vForm>

      <vEmptyState
        v-if="!store.accounts.length"
        class="emptyStateBanner"
        headline="Записей пока нет"
        text='Добавьте новую, нажав на кнопку "+".'
        icon="mdi-cancel"
      />
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

.emptyStateBanner {
  min-height: 500px;
}
</style>
