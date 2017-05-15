<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <a v-on:click.prevent="modalToggle" class="pull-right">
          <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i>
          <span class="badge">{{ carts.length }}</span>
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h3 class="app-title">{{ title }}</h3>

        <form>
          <input type="hidden" id="">

          <h3>รายการ Set ผ้า</h3>
          <hr>

          <div class="row">
            <card-list v-for="set in sets" :key="set.id" :item="set" @addItem="addItem(set)"></card-list>
          </div><br>

          <h3>รายการผ้า</h3>
          <hr>

          <div class="form-group has-feedback">
            <label class="control-label" for="ประเภท">ประเภท :</label>
            <select id="drapeType" class="form-control css-require" @change="getNameFromDrapeType($event)">
              <option value="">-- กรุณาเลือก --</option>
              <option :value="type.drape_type_id" v-for="type in drapeTypes">{{ type.drape_type_name }}</option>
            </select>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>

          <div class="row">
            <card-list v-for="drape in drapes" :key="drape.id" :item="drape" @addItem="addItem(drape)"></card-list>
          </div>

          <info-dialog :isShow="showDialog" :contents="carts" :options="modalOptions" @actionSave="storeBring" @showToggle="modalToggle">
          </info-dialog>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardList from '../Utils/card-list'
import InfoDialog from '../Utils/info-dialog'
import '../../../node_modules/toastr/build/toastr.min.js'

// var $ = window.jQuery = require('jquery')
var toastr = window.toastr = require('toastr')

export default {
  name: 'bring-form',
  props: [ 'users' ],
  data () {
    return {
      title: 'เพิ่มรายการเบิก',
      sets: [],
      pager: [],
      drapeTypes: [],
      drapes: [],
      carts: [],
      showDialog: false,
      modalOptions: {
        title: 'รายการที่คุณเลือกทั้งหมด'
      }
    }
  },
  components: {
    'card-list': CardList,
    'info-dialog': InfoDialog
  },
  created: function () {
    // var _id = this.$route.params.id
    // if (_id) {
    //   this.getDrape(_id)
    // }
    this.getSets()
    this.getDrapeTypes()
    this.getDrapes()
  },
  methods: {
    getDrapeTypes () {
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
    getDrapeType (_id) {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/drapetypes?token=' + token, {})
      .then(
        (response) => {
          toastr.success(response.data)
          // this.drapeTypes = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    getDrapes () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/drapes?token=' + token, {})
      .then(
        (response) => {
          this.drapes = response.data.data.map((key) => {
            let items = {
              id: key.id,
              name: key.name,
              desc: key.description,
              type: 'Drape',
              img: key.img
            }

            return items
          })
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    storeBring () {
      console.log(this.carts)
      toastr.success('Successfully')
      this.showDialog = !this.showDialog
      this.carts = []
      // const token = localStorage.getItem('token')
      // var data = {
      //   name: this.newDrape.name,
      //   drapeType: this.newDrape.drapeType,
      //   size: this.newDrape.size.sizeWidth + 'x' + this.newDrape.size.sizeLength + ' ' + this.newDrape.size.sizeUnit,
      //   cost: this.newDrape.cost,
      //   amount: this.newDrape.amount,
      //   minAmt: this.newDrape.minAmt,
      //   stockAmt: this.newDrape.stockAmt,
      //   description: this.newDrape.description
      // }
      // axios.post('http://localhost/laravel-pos/public/api/drape', data, {
      //   headers: {
      //     'X-Requested-With': 'XMLHttpRequest',
      //     Authorization: 'Bearer ' + token
      //   }
      // })
      // .then(
      //   (response) => {
      //     console.log(response)
      //     toastr.success(response.data.text)
      //   }
      // )
      // .catch(
      //   (error) => console.log(error)
      // )
    },
    showVal (e) {
      // this.newDrape.name = this.prefix + ' ' + this.newDrape.size.sizeWidth + 'x' + this.newDrape.size.sizeLength + ' ' + this.newDrape.size.sizeUnit
    },
    getSets () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/sets?token=' + token, {})
      .then(
        (response) => {
          this.sets = response.data.data.map((key) => {
            let items = {
              id: key.set_id,
              name: key.set_name,
              desc: key.set_desc,
              type: 'Set',
              img: key.img
            }

            return items
          })
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    addItem (_item) {
      toastr.success('Item : ' + _item.id + ' added successfully.')
      this.carts.push(_item)
    },
    modalToggle () {
      this.showDialog = !this.showDialog
    }
  }
}
</script>

<style>
  /*Add "scoped" attribute to limit CSS to this component only */
  @import '../../../node_modules/toastr/build/toastr.min.css';

  hr {
    margin: 5px;
  }
</style>
