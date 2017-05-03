<template>
  <div id="app">
    <app-header :user-online="userOnline" :is-guest="isGuest" @isUserOnline="userSignedOut(userOnline)"></app-header>
    
    <div class="row">
      <div class="col-xs-12">        
        <router-view @isUserOnline="userSignedIn(userOnline)"></router-view>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import header from './components/Page/header'
import footer from './components/Page/footer'
import '../node_modules/toastr/build/toastr.min.js'

var toastr = window.toastr = require('toastr')

export default {
  name: 'app',
  data () {
    return {
      userOnline: '',
      isGuest: true
    }
  },
  components: {
    'app-header': header,
    'app-footer': footer
  },
  methods: {
    userSignedIn () {
      this.isGuest = false
      this.userOnline = 'Admin'
      toastr.success('User is online !!!')

      // this.$route.router.go('/')
      // this.$route.router.push('/')
      // location.href = '/'
    },
    userSignedOut () {
      this.isGuest = true
      this.userOnline = ''
      toastr.error('User is signed out !!!')

      // this.$route.router.go('/')
      // this.$route.router.push('/')
      // location.href = '/signin'
    }
  }
}
</script>

<style>
 /*Add "scoped" attribute to limit CSS to this component only */

/*@import '../node_modules/bulma/css/bulma.css';*/
/*@import '../node_modules/bulma/bulma.sass';*/
@import '../node_modules/toastr/build/toastr.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app-logo, .app-nav, .app-title {
  text-align: center;
}
</style>
