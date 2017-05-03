<template>
  <div class="container">
      <ol class="breadcrumb">
        <li><a href="#">หน้าหลัก</a></li>
        <li class="active">{{ title }}</li>
      </ol>

      <div class="row">
          <div class="col-md-12">
              <router-link to="/newset" class="btn btn-primary">เพิ่ม Set ผ้า</router-link>
          </div>
      </div>

    <div class="row">
      <div class="col-md-12">
        <h3 class="app-title">{{ title }}</h3>
        
        <table class="table table-strips table-hover">
            <thead>
                <tr>
                    <th style="text-align: center;">รหัส</th>
                    <th>ชื่อ Set</th>
                    <th>รายละเอียด</th>
                    <th style="text-align: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="set in sets">
                    <td style="text-align: center;">{{ set.set_id }}</td>
                    <td>{{ set.set_name }}</td>
                    <td>{{ set.set_desc }}</td>
                    <td style="text-align: center;">
                      <a @click.prevent="updateSet(set.set_id)" class="btn btn-warning">
                        <i class="fa fa-edit"></i> แก้ไข
                      </a>
                      <a @click.prevent="deleteSet(set.set_id)" class="btn btn-danger">
                        <i class="fa fa-remove"></i> ลบ
                      </a>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../../../node_modules/toastr/build/toastr.min.js'

var toastr = window.toastr = require('toastr')

export default {
  name: 'set-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'ข้อมูล Set ผ้า',
      sets: []
    }
  },
  created: function () {
    this.getSets()
  },
  methods: {
    getSets () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/sets?token=' + token, {})
      .then(
        (response) => {
          this.sets = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    updateSet (_id) {
      console.log(_id)
      toastr.info('Edit drape ID :' + _id)
    },
    deleteSet (_id) {
      console.log(_id)
      toastr.success('Successfully !!!')
    }
  }
}
</script>

<style>
/*Add "scoped" attribute to limit CSS to this component only */
@import '../../../node_modules/toastr/build/toastr.min.css';

</style>
