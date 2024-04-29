import './scss/index.scss';

import App from './App.vue';
import router from './router/router';

const app = createApp(App);

app.use(router).mount('#app');
