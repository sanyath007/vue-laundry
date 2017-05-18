// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/** Import event calendar and css file */
// import 'vue-event-calendar/dist/style.css' // ^1.1.10, CSS has been extracted as one file, so you can easily update it.
// import vueEventCalendar from 'vue-event-calendar'

import * as VueGoogleMaps from 'vue2-google-maps'

// v: 'OPTIONAL VERSION NUMBER',
// libraries: 'places', //// If you need to use place input
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvqBvfOW8J97YbV8wbTvgRbKHA2HPgKvQ'
  }
})

/** Use event calendar and set default language */
// Vue.use(vueEventCalendar, {locale: 'en'}) // locale can be 'zh' or 'en'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
