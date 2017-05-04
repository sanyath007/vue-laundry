<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="row">
      <div class="col-md-12">
        <router-link to="/newdrape" class="btn btn-primary">เพิ่มรายการ</router-link>
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
              <th>ชื่อรายการ</th>
              <th style="text-align: center;">ประเภท</th>
              <th style="text-align: center;">ขนาด</th>
              <th style="text-align: center;">จำนวน</th>
              <th>รายละเอียด</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="drape in drapes">
              <td style="text-align: center;">{{drape.id}}</td>
              <td>{{drape.name}}</td>
              <td>{{drape.drape_type}}</td>
              <td>{{drape.size}}</td>
              <td>{{drape.amount}}</td>
              <td>{{drape.description}}</td>
              <td style="text-align: center;">
                <a @click.prevent="editDrape(drape.id)" class="btn btn-warning">
                  <i class="fa fa-edit"></i> แก้ไข
                </a>
                <a @click.prevent="deleteDrape(drape.id)" class="btn btn-danger">
                  <i class="fa fa-remove"></i> ลบ
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
  name: 'drape-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'ข้อมูลผ้า',
      drapes: [],
      tmpDrapes: [],
      pager: {},
      filterKey: ''
    }
  },
  created: function () {
    this.getDrapes()
  },
  methods: {
    getDrapes () {
      var name = this.filterKey
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/drapes?token=' + token + '&name=' + name, {})
      .then(
        (response) => {
          this.drapes = response.data.data
          this.pager = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    editDrape (_id) {
      console.log(_id)
      toastr.info('Edit drape ID :' + _id)
    },
    deleteDrape (_id) {
      if (confirm('Are you sure to delete drape ID : ' + _id + ' ?')) {
        const token = localStorage.getItem('token')
        axios.delete('http://localhost/laravel-pos/public/api/drape/' + _id + '?token=' + token, {})
        .then(
          (response) => {
            console.log(response)
            toastr.success('Successfully !!!')
            this.getDrapes()
          }
        )
        .catch(
          (error) => console.log(error)
        )
      }
    },
    renderListView (_page) {
      var name = this.filterKey
      const pagerUrl = 'http://localhost/laravel-pos/public/api/drapes?page=' + _page + '&name=' + name
      toastr.success(pagerUrl)

      // const token = localStorage.getItem('token')
      axios.get(pagerUrl, {})
      .then(
        (response) => {
          this.drapes = response.data.data
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
      // this.drapes = this.pager.data
      // this.drapes = _.filter(this.drapes, drape => {
      //   return _.lowerCase(drape.name).indexOf(_.lowerCase(this.filterKey)) >= 0
      // })

      /** Search from database */
      this.getDrapes()
    }
  }
}
</script>

<style>
  /*Add "scoped" attribute to limit CSS to this component only */

  @import '../../../node_modules/toastr/build/toastr.min.css';

</style>
