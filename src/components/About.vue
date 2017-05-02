<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <user-info :users="users"></user-info>
  </div>
</template>

<script>
import axios from 'axios'
import UserInfo from './Users/user-info'

export default {
  name: 'about',
  data () {
    return {
      title: 'เกี่ยวกับเรา',
      users: []
    }
  },
  components: {
    'user-info': UserInfo
  },
  created: function () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/users?token=' + token, {

      })
      .then(
        (response) => { this.users = response.data }
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

</style>
