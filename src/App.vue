<template>
  <div id="app">
    <app-header :user-online="userOnline" :is-guest="isGuest" @isUserOnline="userSignedOut(userOnline)"></app-header>
    
    <div class="row">
      <div class="col-xs-12">        
        <router-view @isUserOnline="userSignedIn"></router-view>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import axios from 'axios'
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
      this.getUserInfo()
      this.isGuest = false
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
    },
    getUserInfo () {
      const token = localStorage.getItem('token')
      const useronline = localStorage.getItem('useronline')
      axios.get('http://localhost/laravel-pos/public/api/useronline/' + useronline + '?token=' + token, {})
      .then(
        (response) => {
          this.userOnline = response.data.person_firstname + '  ' + response.data.person_lastname
        }
      )
      .catch(
        (error) => console.log(error)
      )
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

  .app-title {
    margin: 5px;
  }

</style>
