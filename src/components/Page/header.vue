<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>            
            <router-link to="/" class="navbar-brand">DNRH LaundrySYS</router-link>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><router-link to="/">หน้าหลัก</router-link></li>
                <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    การเบิกจ่ายผ้า
                    <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li><router-link to="/reservations">รายการการเบิกผ้า</router-link></li>
                    <!--<li><router-link to="/reservation">ขอใช้รถ</router-link></li>                    
                    <li><router-link to="/reserve-cancel">ยกเลิกขอใช้รถ</router-link></li>                    -->
                  </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    ข้อมูลระบบ
                    <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                    <li><router-link to="/drapes">ข้อมูลผ้า</router-link></li>
                    <li><router-link to="/sets">ข้อมูล Set ผ้า</router-link></li>
                    <!--<li><a href="#">Something else here</a></li>-->
                    <!--<li role="separator" class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">One more separated link</a></li>-->
                    </ul>
                </li>                
                <li><router-link to="/about">เกี่ยวกับเรา</router-link></li>
                <li><router-link to="/contact">ติดต่อเรา</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <template v-if="isGuest">
                    <li><router-link to="/signin">Login</router-link></li>
                    <li><router-link to="/signup">Resgister</router-link></li>
                </template>
                <li class="dropdown" v-if="!isGuest">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        {{ userOnline }}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a v-on:click.prevent="logout()">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'home',
  props: [ 'userOnline', 'isGuest' ],
  data () {
    return {
      title: 'App Header'
    //   isGuest: false
    }
  },
  created () {
    console.log(this.userOnline)
    console.log(this.isGuest)
  },
  updated () {
    console.log(this.userOnline)
    console.log(this.isGuest)
  },
  methods: {
    logout () {
      this.$emit('isUserOnline')
    }
  }
}
</script>

<style>
 /*Add "scoped" attribute to limit CSS to this component only */

</style>
