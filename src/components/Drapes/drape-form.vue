<template>
  <div class="container">
      <ol class="breadcrumb">
        <li><a href="#">หน้าหลัก</a></li>
        <li class="active">{{ title }}</li>
      </ol>

    <div class="row">
      <div class="col-md-12">
        <h3 class="app-title">{{ title }}</h3>
        
        <form>
            <input type="hidden" id="">

            <div class="form-group has-feedback">
                <label for="ประเภท">ประเภท :</label>
                <select id="drapeType" v-model="newDrape.drapeType" class="form-control css-require" @change="getNameFromDrapeType($event)">
                  <option value="">-- กรุณาเลือก --</option>
                  <option :value="type.drape_type_id" v-for="type in drapeTypes">{{ type.drape_type_name }}</option>
                </select>
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="ขนาด">ขนาด (W x L หน่วย) :</label>
                <input type="text" 
                       id="sizeWidth" 
                       v-model="newDrape.size.sizeWidth" 
                       class="form-control css-require col-md-4">
                <input type="text" 
                       id="sizeLength" 
                       v-model="newDrape.size.sizeLength" 
                       class="form-control css-require col-md-4">
                <select 
                        id="sizeUnits" 
                        v-model="newDrape.size.sizeUnit" 
                        class="form-control css-require" 
                        @change="showVal($event)">
                  <option value="">-- กรุณาเลือก --</option>
                  <option :value="unit" v-for="(unit, index) in sizeUnits">{{ unit }}</option>
                </select>
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="ชื่อรายการ">ชื่อรายการ :</label>
                <input type="text" id="drapeName" v-model="newDrape.name" class="form-control css-require">
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="ราคาทุน">ราคาทุน :</label>
                <input type="text" id="drapeCost" v-model="newDrape.cost" class="form-control">
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="จำนวน">จำนวน :</label>
                <input type="text" id="drapeAmount" v-model="newDrape.amount" class="form-control">
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="จำนวนต่ำสุด">จำนวนต่ำสุด :</label>
                <input type="text" id="drapeMinAmt" v-model="newDrape.minAmt" class="form-control">
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="จำนวนใน Stock">จำนวนใน Stock :</label>
                <input type="text" id="StockAmt" v-model="newDrape.stockAmt" class="form-control">
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>
            <div class="form-group has-feedback">
                <label for="รายละเอียด">รายละเอียด :</label>
                <textarea id="drapeDescription" v-model="newDrape.description" rows="5" class="form-control"></textarea>
                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="storeDrape">
                <i class="fa fa-pluse" aria-hidden="true"></i> บันทึก
            </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Datepicker from 'vuejs-datepicker'
import DatePicker from '../Utils/date-picker'
/** bootstrap-datepicker */
// import '../../../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
// import '../../../node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.th.min.js'
// import '../../../node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'
import '../../../node_modules/toastr/build/toastr.min.js'

var $ = window.jQuery = require('jquery')
var toastr = window.toastr = require('toastr')

export default {
  name: 'drape-form',
  props: [ 'users' ],
  data () {
    return {
      title: 'เพิ่มรายการ',
      prefix: '',
      newDrape: {
        id: '',
        name: '',
        drapeType: '',
        size: {
          sizeWidth: 0,
          sizeLength: 0,
          sizeUnit: ''
        },
        cost: 0.00,
        amount: 0,
        minAmt: 0,
        stockAmt: 0,
        description: ''
      },
      drape: {},
      drapeTypes: [],
      sizeUnits: [ 'cm.', 'in.' ]
    }
  },
  components: {
    'date-picker': DatePicker
  },
  created: function () {
    var _id = this.$route.params.id
    if (_id) {
      this.getDrape(_id)
    }
    this.getDrapeType()
  },
  methods: {
    getDrapeType (_id) {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/drapetypes?token=' + token, {})
      .then(
        (response) => {
          this.drapeTypes = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    getNameFromDrapeType (e) {
      this.prefix = $(e.target.options[this.newDrape.drapeType]).text()
      this.newDrape.name = this.prefix
    },
    getDrape (_id) {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/drape/' + _id + '?token=' + token, {})
      .then(
        (response) => {
          this.drape = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    storeDrape () {
      const token = localStorage.getItem('token')
      var data = {
        name: this.newDrape.name,
        drapeType: this.newDrape.drapeType,
        size: this.newDrape.size.sizeWidth + 'x' + this.newDrape.size.sizeLength + ' ' + this.newDrape.size.sizeUnit,
        cost: this.newDrape.cost,
        amount: this.newDrape.amount,
        minAmt: this.newDrape.minAmt,
        stockAmt: this.newDrape.stockAmt,
        description: this.newDrape.description
      }
      axios.post('http://localhost/laravel-pos/public/api/drape', data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Bearer ' + token
        }
      })
      .then(
        (response) => {
          console.log(response)
          toastr.success(response.data.text)
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    showVal (e) {
      this.newDrape.name = this.prefix + ' ' + this.newDrape.size.sizeWidth + 'x' + this.newDrape.size.sizeLength + ' ' + this.newDrape.size.sizeUnit
    }
  }
}
</script>

<style>
 /*Add "scoped" attribute to limit CSS to this component only */
/*@import '../../../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';*/
@import '../../../node_modules/toastr/build/toastr.min.css';

</style>
