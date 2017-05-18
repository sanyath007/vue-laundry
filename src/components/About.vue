<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="row">
      <div class="col-md-12">
        Latitude : {{ position.latitude }}, Longitude : {{ position.longitude }}

        <div class="panel panel-default">
          <div class="panel-body">
            <gmap-map :center="center"
                      :zoom="15"
                      style="width: 100%; height: 480px">
              <gmap-marker v-for="(m, index) in markers" 
                          :key="index"
                          :position="m.position"
                          :clickable="true"
                          :draggable="true"
                          @click="center=m.position">
              </gmap-marker>
            </gmap-map>
          </div>
        </div>
      </div>
    </div>
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
      users: [],
      map: {},
      position: [],
      center: {
        lat: 0,
        lng: 0
      },
      markers: []
    }
  },
  components: {
    'user-info': UserInfo
  },
  activated () {
    console.log(this.position)
  },
  created () {
    this.getUsers()
    this.getGeolocation()

    // Set default center
    this.center.lat = 14.92469
    this.center.lng = 101.96609

    // this.markers.push({
    //   position: {
    //     lat: 14.92469,
    //     lng: 101.96609
    //   }
    // })

    // console.log(this.markers)
  },
  methods: {
    getUsers () {
      const token = localStorage.getItem('token')
      const useronline = localStorage.getItem('useronline')
      axios.get('http://localhost/laravel-pos/public/api/useronline/' + useronline + '?token=' + token, {})
      .then(
        (response) => { this.users = response.data }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    getGeolocation () {
      if (navigator.geolocation) {
        console.log(navigator)
        navigator.geolocation.getCurrentPosition((position) => {
          this.position = position.coords
          console.log(this.position)

          let lat = parseFloat(this.position.latitude.toFixed(5))
          let lng = parseFloat(this.position.longitude.toFixed(5))

          this.center.lat = lat
          this.center.lng = lng

          this.markers.push({
            position: {
              lat: lat,
              lng: lng
            }
          })
        })
      } else {
        console.log('Error...')
      }
    }
  }
}
</script>

<style>
 /*Add "scoped" attribute to limit CSS to this component only */

</style>
