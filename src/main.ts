import './scss/index.scss';
import './utils/icons.ts';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router/router';

const app = createApp(App);

app.use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
