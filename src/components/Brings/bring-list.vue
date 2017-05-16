<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="row">
      <div class="col-md-12">
        <router-link to="/newbring" class="btn btn-primary">เพิ่มรายการ</router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h3 class="app-title">{{ title }}</h3>

        <div class="form-group">
          <label for="ค้นหา">Search :</label>
          <input type="text" v-model="filterKey" @keyup="search($event)" class="form-control" placeholder="Search for...">
        </div>

        <table class="table table-strips table-hover">
          <thead>
            <tr>
              <th style="text-align: center;">รหัส</th>
              <th style="text-align: center;">วันที่เบิก</th>
              <th>ผู้เบิก</th>
              <th>หน่วยงาน</th>
              <th style="text-align: center;">สถานะ</th>
              <th style="text-align: center; width: 10%;">รายการ</th>
              <th style="text-align: center; width: 15%;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bring, index) in brings">
              <td style="text-align: center;">{{ index + 1 }}</td>
              <td style="text-align: center;">{{ bring.bring_date }}</td>
              <td>{{ bring.user_id }}</td>
              <td>{{ bring.department.ward_name }}</td>
              <td style="text-align: center;">{{ bring.bring_status }}</td>
              <td style="text-align: center;">
                <a class="btn btn-info">
                  <i class="fa fa-list" aria-hidden="true"></i>
                </a>
              </td>
              <td style="text-align: center;">
                <a @click.prevent="editDrape(bring.bring_id)" class="btn btn-warning">
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </a>
                <a @click.prevent="deleteDrape(bring.bring_id)" class="btn btn-danger">
                  <i class="fa fa-remove" aria-hidden="true"></i>
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
// import _ from 'lodash'
import '../../../node_modules/toastr/build/toastr.min.js'

var $ = window.jQuery = require('jquery')
var toastr = window.toastr = require('toastr')

export default {
  name: 'bring-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'รายการเบิก',
      brings: [],
      tmpBrings: [],
      pager: {},
      filterKey: ''
    }
  },
  created: function () {
    this.getBrings()
  },
  methods: {
    getBrings () {
      var name = this.filterKey
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/brings?token=' + token + '&name=' + name, {})
      .then(
        (response) => {
          console.log(response.data)
          this.brings = response.data
          // this.pager = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    editBring (_id) {
      console.log(_id)
      toastr.info('Edit set ID :' + _id)
    },
    deleteBring (_id) {
      if (confirm('Are you sure to delete set ID : ' + _id + ' ?')) {
        const token = localStorage.getItem('token')
        axios.delete('http://localhost/laravel-pos/public/api/set/' + _id + '?token=' + token, {})
        .then(
          (response) => {
            console.log(response)
            toastr.success('Successfully !!!')
            this.getBrings()
          }
        )
        .catch(
          (error) => console.log(error)
        )
      }
    },
    renderListView (_page) {
      var name = this.filterKey
      const pagerUrl = 'http://localhost/laravel-pos/public/api/sets?page=' + _page + '&name=' + name
      toastr.success(pagerUrl)

      // const token = localStorage.getItem('token')
      axios.get(pagerUrl, {})
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
    search (e) {
      if ($(e.target).val() !== '') {
        console.log('filterKey is ' + this.filterKey)
      } else {
        console.log('filterKey is empty !!!')
      }

      /** Search from dataset */
      // this.brings = this.pager.data
      // this.brings = _.fiter(this.brings, bring = {
     //   return _.lowerCase(bring.name).idexOf(_.lowerCase(this.filterKey)) >= 0
      // })

      /** Search from database */
      this.getBrings()
    }
  }
}
</script>

<style>
  /*Add "scoped" attribute to limit CSS to this component only */

  @import '../../../node_modules/toastr/build/toastr.min.css';

</style>
