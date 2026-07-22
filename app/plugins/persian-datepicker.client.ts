import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3PersianDatetimePicker, {
    name: 'custom-date-picker',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      displayFormat: 'jYYYY/jMM/jDD HH:mm',
      editable: false,
      autoSubmit: false,
      color: '#286463',
    },
  })
})