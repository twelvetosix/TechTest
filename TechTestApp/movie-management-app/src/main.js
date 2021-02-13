import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faEdit,
    faCopy,
    faTrashAlt,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store/store.js'
import Vuelidate from 'vuelidate'


library.add(
    faEdit,
    faCopy,
    faTrashAlt,
    faPlus
)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
