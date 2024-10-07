// vueform.config.(js|ts)

import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'
import api from './plugin/axios'
import axios from 'axios'
import PluginMask from '@vueform/plugin-mask'
import { Validator } from '@vueform/vueform';

const validateTime = class extends Validator {
  get msg() {
    return 'Thời gian kết thúc sau thời gian bắt đầu.'
  }
  check() {
    let start = document.getElementById("gr1.start")?.value;
    let end = document.getElementById("gr1.end")?.value;
      return new Date(start) < new Date(end)
  }
}

api.defaults.headers.post = {
  'Content-Type': 'application/json'
}
axios.defaults.baseURL = api.defaults.baseURL;
axios.defaults.headers = api.defaults.headers;
export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
  endpoints: {

  },
  axios,
  plugins: [
    PluginMask,
  ],
  rules: {
    validateTime,
  }
})

