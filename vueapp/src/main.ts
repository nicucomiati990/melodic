import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faPause,
  faVolumeUp,
  faFastForward,
  faFastBackward,
} from '@fortawesome/free-solid-svg-icons';
import Vue from 'vue';
import App from './App.vue';
import SongStore from './store/SongStore';

library.add(faPlay, faPause, faVolumeUp, faFastForward, faFastBackward);

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: SongStore,
}).$mount('#app');
