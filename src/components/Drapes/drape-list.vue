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
        
        <table class="table table-strips table-hover">
            <thead>
                <tr>
                    <th style="text-align: center;">รหัส</th>
                    <th style="text-align: center;">รายการ</th>
                    <th style="text-align: center;">ประเภท</th>
                    <th style="text-align: center;">ขนาด</th>
                    <th style="text-align: center;">จำนวน</th>
                    <th style="text-align: center;">รายละเอียด</th>
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
                      <a @click.prevent="updateDrape(drape.id)" class="btn btn-warning">
                        <i class="fa fa-edit"></i> แก้ไข
                      </a>
                      <a @click.prevent="deleteDrape(drape.id)" class="btn btn-danger">
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

export default {
  name: 'drape-list',
  props: [ 'users' ],
  data () {
    return {
      title: 'ข้อมูลผ้า',
      drapes: []
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
          this.drapes = response.data
        }
      )
      .catch(
        (error) => console.log(error)
      )
    },
    updateDrape (_id) {
      console.log(_id)
    },
    deleteDrape (_id) {
      console.log(_id)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

</style>
