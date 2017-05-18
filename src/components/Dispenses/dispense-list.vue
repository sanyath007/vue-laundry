<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="row">
      <div class="col-md-12">
        <h3 class="app-title">{{ title }}</h3>

        <table class="table table-strips table-hover">
          <thead>
            <tr>
              <th style="text-align: center; width: 4%;">#</th>
              <th style="text-align: center;">วันที่เบิก</th>
              <th>ผู้เบิก</th>
              <th>หน่วยงาน</th>
              <th style="text-align: center;">สถานะ</th>
              <th style="text-align: center; width: 8%;">รายการ</th>
              <th style="text-align: center; width: 8%;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bring, index) in brings">
              <td style="text-align: center;">{{ index + 1 }}</td>
              <td style="text-align: center;">{{ bring.bring_date }}</td>
              <td>{{ bring.user_id }}</td>
              <td>{{ bring.department.ward_name }}</td>
              <td style="text-align: center;">
                {{ (bring.bring_status === 1) ? 'รอดำเนินการ' : (bring.bring_status === 2) ? 'รับของแล้ว' : 'ยกเลิก' }}
              </td>
              <td style="text-align: center;">
                <a class="btn btn-info" v-on:click.prevent="modalToggle(bring.bring_detail)">
                  <i class="fa fa-list" aria-hidden="true"></i>
                </a>
                <!--<ul>
                  <li v-for="detail in bring.bring_detail">
                    {{ detail.item_type }} = {{ detail.bring_amt }}
                  </li>
                </ul>-->
              </td>
              <td style="text-align: center;">
                <a @click.prevent="dispensing(bring, bring.bring_detail)" class="btn btn-success">
                  <i class="fa fa-paper-plane" aria-hidden="true"></i>
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

    <!--Modal show cart detail-->
    <dispense-dialog :isShow="showDialog"
                     :contents="bringDetails" 
                     :options="modalOptions" 
                     @actionSave="saveDispense" 
                     @showToggle="modalToggle">
    </dispense-dialog>
  </div>
</template>

<script>
import axios from 'axios'
// import _ from 'lodash'
import DispenseDialog from '../Utils/dispense-dialog'
import '../../../node_modules/toastr/build/toastr.min.js'

var $ = window.jQuery = require('jquery')
var toastr = window.toastr = require('toastr')

export default {
  name: 'bring-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'รายการจ่ายผ้า',
      brings: [],
      bringDetails: [],
      bringDispense: {},
      tmpBrings: [],
      pager: {},
      filterKey: '',
      showDialog: false,
      modalOptions: {
        title: 'รายการเบิกทั้งหมด',
        tbActions: false,
        btnSave: false
      }
    }
  },
  components: {
    'dispense-dialog': DispenseDialog
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
          this.brings = response.data.data
          this.pager = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    setDetail (_details) {
      // const token = localStorage.getItem('token')
      _details.forEach((key, index) => {
        if (key.item_type === 'Set') {
          axios.get('http://localhost/laravel-pos/public/api/set/' + key.item_id, {})
          .then(
            (response) => {
              this.bringDetails.push({
                id: key.item_id,
                name: response.data.map((set) => set.set_name)[0],
                desc: key.comment,
                type: key.item_type,
                img: '',
                amt: key.bring_amt
              })
            }
          )
          .catch(
            (error) => console.log(error)
          )
        } else {
          axios.get('http://localhost/laravel-pos/public/api/drape/' + key.item_id, {})
          .then(
            (response) => {
              this.bringDetails.push({
                id: key.item_id,
                name: response.data.name,
                desc: key.comment,
                type: key.item_type,
                img: '',
                amt: key.bring_amt
              })
            }
          )
          .catch(
            (error) => console.log(error)
          )
        }
      })
    },
    renderListView (_page) {
      var name = this.filterKey
      // const token = localStorage.getItem('token')
      const pagerUrl = 'http://localhost/laravel-pos/public/api/brings?page=' + _page + '&name=' + name
      console.log(pagerUrl)

      axios.get(pagerUrl, {})
      .then(
        (response) => {
          this.brings = response.data.data
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
    },
    modalToggle (_items) {
      this.showDialog = !this.showDialog

      if (_items) {
        this.setDetail(_items)
      } else {
        this.bringDetails = []
      }
    },
    dispensing (_bring, _items) {
      this.modalToggle(_items)
      this.modalOptions.title = 'รายการเบิกทั้งหมด'
      this.modalOptions.tbActions = false
      this.modalOptions.btnSave = true

      this.bringDispense = _bring
    },
    saveDispense (_item) {
      console.log(_item)
      if (_item.length === 0) {
        toastr.warning('คุณยังไม่ได้เลือกรายการ !!!')
      } else {
        if (confirm('Confirm to dispense ID : ' + _item[0].id + ' ?')) {
          // const token = localStorage.getItem('token')
          // axios.put('http://localhost/laravel-pos/public/api/bringcancel/' + _item.id + '?token=' + token, {})
          // .then(
          //   (response) => {
          //     console.log(response)
          //     toastr.success(response.data.text)
          //     this.getBrings()
          //   }
          // )
          // .catch(
          //   (error) => console.log(error)
          // )

          this.bringDispense = {}
        }
      }
    }
  }
}
</script>

<style>
  /*Add "scoped" attribute to limit CSS to this component only */

  @import '../../../node_modules/toastr/build/toastr.min.css';

  .app-title {
    margin: 5px;
  }

</style>
