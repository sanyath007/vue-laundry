<template>
  <div class="container">
    <ol class="breadcrumb">
      <li class="active">{{ title }}</li>
    </ol>

    <h2 class="app-title">{{ pageTopic }}</h2>

    <div class="row">
      <div class="col-md-12">
        Latitude : {{ position.latitude }} <br>
        Longitude : {{ position.longitude }}
      </div>
    </div>
    
    <!--<vue-event-calendar :events="demoEvents"></vue-event-calendar>-->
    <event-calendar :event-datas="eventDatas"></event-calendar>
  </div>
</template>

<script>
import axios from 'axios'
import EventCalendar from './Utils/event-calendar'
import '../../node_modules/toastr/build/toastr.min.js'

// var $ = window.jQuery = require('jquery')
var toastr = window.toastr = require('toastr')

export default {
  name: 'home',
  data () {
    return {
      title: 'หน้าหลัก',
      pageTopic: 'ตารางการเบิก-จ่ายผ้าประจำเดือน',
      eventDatas: [], // Data of fullcalendar events.
      // demoEvents: []  // Data of vue-event-calendar events.
      position: {}
    }
  },
  components: {
    'event-calendar': EventCalendar
  },
  created () {
    this.getEventDatas()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position = position.coords
      })
    } else {
      toastr.error('Could not use this function !!!')
    }
  },
  methods: {
    getEventDatas () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/reservations?token=' + token, {

      })
      .then(
        (response) => {
          if (response.data) {
            response.data.forEach(e => {
              this.eventDatas.push({
                id: e.reserve_id,
                title: e.activity,
                start: e.from_date,
                end: e.to_date,
                url: 'http://localhost:8080/#/reservation/' + e.reserve_id,
                color: 'red'
              })
            })
          }
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

 @import '../../node_modules/toastr/build/toastr.min.css';

</style>
