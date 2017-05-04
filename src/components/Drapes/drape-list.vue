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
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for...">
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button">Go</button>
            </span>
          </div>
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

        <ul class="pagination">
          <li v-bind:class="{disabled: pager.current_page === 1}">
            <a @click.prevent="renderListView(1)">First</a>
            </li>
          <li v-bind:class="{disabled: pager.current_page === 1}">
            <a @click.prevent="renderListView(pager.current_page - 1)">Prev</a>
            </li>
          <li v-bind:class="{active: pager.current_page === (index + 1)}" 
              v-for="(page, index) in pager.last_page">
            <a @click.prevent="renderListView((index + 1))">{{ (index + 1) }}</a>
          </li>
          <li v-bind:class="{disabled: pager.current_page === pager.last_page}">
            <a @click.prevent="renderListView(pager.current_page + 1)">Next</a>
            </li>
          <li v-bind:class="{disabled: pager.current_page === pager.last_page}">
            <a @click.prevent="renderListView(pager.last_page)">Last</a>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../../../node_modules/toastr/build/toastr.min.js'

var toastr = window.toastr = require('toastr')

export default {
  name: 'drape-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'ข้อมูลผ้า',
      drapes: [],
      pager: {}
    }
  },
  created: function () {
    this.getDrapes()
  },
  methods: {
    getDrapes () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/drapes?token=' + token, {})
      .then(
        (response) => {
          this.drapes = response.data.data
          this.pager = response.data
          console.log(this.drapes)
          console.log(this.pager)
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
      const pagerUrl = 'http://localhost/laravel-pos/public/api/drapes?page=' + _page
      toastr.success(pagerUrl)

      // const token = localStorage.getItem('token')
      axios.get(pagerUrl, {})
      .then(
        (response) => {
          this.drapes = response.data.data
          this.pager = response.data
          console.log(this.drapes)
          console.log(this.pager)
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
@import '../../../node_modules/toastr/build/toastr.min.css';

</style>
