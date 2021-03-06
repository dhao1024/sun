import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import iconSvg from '@/plugins/iconSvg';

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(iconSvg);

app.mount('#app');
