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
                    <th style="text-align: center; width: 15%;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="set in sets">
                    <td style="text-align: center;">{{ set.set_id }}</td>
                    <td>{{ set.set_name }}</td>
                    <td>{{ set.set_desc }}</td>
                    <td style="text-align: center;">
                      <a @click.prevent="updateSet(set.set_id)" class="btn btn-warning">
                        <i class="fa fa-edit"></i>
                      </a>
                      <a @click.prevent="deleteSet(set.set_id)" class="btn btn-danger">
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
  name: 'set-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'ข้อมูล Set ผ้า',
      sets: [],
      pager: {},
      filterKey: ''
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
          this.sets = response.data.data
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
