import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

type Label = { text: string }

type Account = {
  labels: Label[]
  type: string
  login: string
  password: string | null
}

export const useAccountsStore = defineStore('accounts', () => {
  const getAccountsFromLocalStorage = (): Account[] => {
    return JSON.parse(localStorage.getItem('accounts') || '[]')
  }

  const accounts = reactive<Account[]>(getAccountsFromLocalStorage())

  watch(accounts, () => {
    saveToLocalStorage()
  })

  const removeRow = (index: number): void => {
    accounts.splice(index, 1)
  }

  const addRow = (): void => {
    accounts.push({
      labels: [{ text: '' }],
      type: '',
      login: '',
      password: '',
    })
  }

  const getLabelsString = (index: number): string => {
    return accounts[index].labels.map((label) => label.text).join(';')
  }

  const setLabels = (index: number, labelsString: string): void => {
    accounts[index].labels = labelsString.split(';').map((labelString) => ({ text: labelString }))
  }

  const saveToLocalStorage = (): void => {
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }

  return { accounts, removeRow, addRow, setLabels, getLabelsString, saveToLocalStorage }
})
