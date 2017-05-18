<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#">หน้าหลัก</a></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="row">
      <div class="col-md-6">
        
      </div>
      <div class="col-md-6">
        <div class="panel panel-default">
          <table class="table table-bordered">
            <thead>
              <tr>
                <td style="width: 35%;">
                  <i class="fa fa-group fa-2x" aria-hidden="true"></i> <span>แผนก :</span>
                </td>
                <td>
                  <!--<div class="form-group has-feedback">-->
                    <select id="drapeType" 
                            class="form-control css-require" 
                            v-model="userDepartment">
                      <option value="">-- กรุณาเลือก --</option>
                      <option :value="department.ward_id" v-for="department in departments">
                        {{ department.ward_id }}-{{ department.ward_name }}
                      </option>
                    </select>
                    <!--<span class="glyphicon form-control-feedback" aria-hidden="true"></span>-->
                  <!--</div>-->
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i> <span>รายการเบิก :</span>
                </td>
                <td>
                  <a v-on:click.prevent="modalToggle" class="pull-right" style="cursor: pointer;">
                    <span class="badge">{{ carts.length }}</span>
                  </a>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <form>
          <input type="hidden" id="">

          <h3>รายการ Set ผ้า</h3>
          <hr>

          <div class="row">
            <card-list v-for="set in sets" :key="set.id" :item="set" @addItem="addItem"></card-list>
          </div><br>

          <h3>รายการผ้า</h3>
          <hr>

          <div class="row">
            <card-list v-for="drape in drapes" :key="drape.id" :item="drape" @addItem="addItem"></card-list>
          </div>

          <!--Modal show cart detail-->
          <info-dialog :isShow="showDialog" :contents="carts" :options="modalOptions" @actionSave="storeBring" @actionRemove="removeItem"
            @actionClear="clearCart" @showToggle="modalToggle">
          </info-dialog>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import CardList from '../Utils/card-list'
import InfoDialog from '../Utils/info-dialog'
import '../../../node_modules/toastr/build/toastr.min.js'

// var $ = window.jQuery = require('jquery')
var toastr = window.toastr = require('toastr')

export default {
  name: 'store-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'รายการ Stock ผ้า',
      userOnline: {},
      userDepartment: {},
      departments: {},
      sets: [],
      pager: [],
      drapeTypes: [],
      drapes: [],
      carts: [],
      showDialog: false,
      modalOptions: {
        title: 'รายการที่คุณเลือกทั้งหมด',
        tbActions: true,
        btnSave: true
      }
    }
  },
  components: {
    'card-list': CardList,
    'info-dialog': InfoDialog
  },
  created () {
    this.getUserInfo()
    this.getDepartments()
    this.getSets()
    this.getDrapeTypes()
    this.getDrapes()
  },
  methods: {
    getDepartments () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost/laravel-pos/public/api/departments?token=' + token, {})
      .then(
        (response) => {
          this.departments = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
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
              img: key.img,
              amt: 0
            }

            return items
          })
        }
      )
      .catch(
        (error) => console.log(error)
      )
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
              img: key.img,
              amt: 0
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
      const token = localStorage.getItem('token')

      if (!this.userDepartment) {
        toastr.warning('Department cannot be null !!!')
        return
      }

      var bring = {
        bring_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        user_id: this.userOnline.person_id,
        depart_id: this.userDepartment,
        bring_status: '1'
      }

      var details = []
      this.carts.forEach((cart, index) => {
        details.push({
          item_id: cart.id,
          item_type: cart.type,
          bring_amt: cart.amt,
          comment: ''
        })
      })

      axios.post('http://localhost/laravel-pos/public/api/bring', { bring, details }, {
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
      this.showDialog = !this.showDialog
      this.carts = []
    },
    addItem (_item) {
      console.log(_item)
      this.carts.push(_item)
      toastr.success('Item : ' + _item.id + '-' + _item.name + ' added successfully.')
    },
    removeItem (_item) {
      this.carts.forEach((n, i) => {
        if (n.id === _item.id) {
          this.carts.splice(i, 1)
        }
      })
    },
    clearCart () {
      if (this.carts.length > 0) {
        this.carts = []
      }
    },
    modalToggle () {
      if (this.carts.length > 0) {
        this.showDialog = !this.showDialog
      } else {
        toastr.warning('Cart is null !!! Please select list ?')
      }
    },
    getUserInfo () {
      const token = localStorage.getItem('token')
      const useronline = localStorage.getItem('useronline')
      axios.get('http://localhost/laravel-pos/public/api/useronline/' + useronline + '?token=' + token, {})
      .then(
        (response) => {
          this.userOnline = response.data
          this.userDepartment = this.userOnline.office_id
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

  hr {
    margin: 5px;
  }

  .table span {
    font-size: 16px;
    font-weight: bold;
  }

</style>
