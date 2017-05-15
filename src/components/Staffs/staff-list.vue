<template>
  <div class="container">
      <ol class="breadcrumb">
        <li><a href="#">หน้าหลัก</a></li>
        <li class="active">{{ title }}</li>
      </ol>

      <div class="row">
          <div class="col-md-12">
              <router-link to="/newstaff" class="btn btn-primary">เพิ่ม Staff</router-link>
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
                    <th style="text-align: center; width: 15%;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="staff in staffs">
                    <td style="text-align: center;">{{ staff.person_id }}</td>
                    <td>{{ staff.comment }}</td>
                    <td>{{ staff.status }}</td>
                    <td style="text-align: center;">
                      <a @click.prevent="updateSet(staff.person_id)" class="btn btn-warning">
                        <i class="fa fa-edit"></i>
                      </a>
                      <a @click.prevent="deleteSet(staff.person_id)" class="btn btn-danger">
                        <i class="fa fa-remove"></i>
                      </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="col-md-6" style="padding-top: 20px;">
          <span>Display {{ pager.from }} to {{ pager.to }} of {{ pager.total }}</span>
        </div>
        <div class="col-md-6">
          <ul class="pagination pull-right">
            <li v-bind:class="{disabled: pager.current_page === 1}">
              <a @click.prevent="renderListView(1)">
                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
              </a>
            </li>
            <li v-bind:class="{disabled: pager.current_page === 1}">
              <a @click.prevent="renderListView(pager.current_page - 1)">
                <i class="fa fa-angle-left" aria-hidden="true"></i>  
              </a>
            </li>
            <li v-bind:class="{active: pager.current_page === (index + 1)}" v-for="(page, index) in pager.last_page">
              <a @click.prevent="renderListView((index + 1))">{{ (index + 1) }}</a>
            </li>
            <li v-bind:class="{disabled: pager.current_page === pager.last_page}">
              <a @click.prevent="renderListView(pager.current_page + 1)">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </a>
            </li>
            <li v-bind:class="{disabled: pager.current_page === pager.last_page}">
              <a @click.prevent="renderListView(pager.last_page)">
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../../../node_modules/toastr/build/toastr.min.js'

var toastr = window.toastr = require('toastr')

export default {
  name: 'staff-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'ข้อมูล Staff',
      staffs: [],
      pager: {},
      filterKey: ''
    }
  },
  created: function () {
    this.getStaffs()
  },
  methods: {
    getStaffs () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/staffs?token=' + token, {})
      .then(
        (response) => {
          this.staffs = response.data.data
          this.pager = response.data
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
