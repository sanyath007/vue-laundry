<template>
  <div id="myModal" class="modal fade" role="dialog" v-bind:class="{ in: isShow }" v-bind:style="modalStyle">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" v-on:click="toggle">&times;</button>
          <h4 class="modal-title">{{ options.title }}</h4>
        </div>
        <div class="modal-body">
          <p>
            <table class="table">
              <thead>
                <tr>
                  <th style="text-align:center;">ID</th>
                  <th>Name</th>
                  <th style="text-align:center;">Type</th>
                  <th style="text-align:center;">Img</th>
                  <th style="text-align:center;">Amount</th>
                  <th style="text-align:center;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="content in contents">
                  <td style="text-align:center;">{{ content.id }}</td>
                  <td>{{ content.name }}</td>
                  <td>{{ content.type }}</td>
                  <td style="text-align:center;">{{ content.img }}</td>
                  <td style="text-align:center;">0</td>
                  <td style="text-align:center;">
                    <a class="btn btn-warning">
                      <i class="fa fa-edit" aria-hidden="true"></i>
                    </a>
                    <a class="btn btn-danger">
                      <i class="fa fa-remove" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="save">Save</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="toggle">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

// var $ = window.jQuery = require('jquery')

export default {
  name: 'info-dialog',
  props: [ 'isShow', 'contents', 'options' ],
  data () {
    return {
      title: 'Info Dialog'
    }
  },
  computed: {
    modalStyle () {
      return this.isShow ? { 'padding-left': '0px;', display: 'block' } : {}
    }
  },
  methods: {
    toggle () {
      this.$emit('showToggle')
    },
    save () {
      this.$emit('actionSave')
    }
  }
}
</script>

<style>
  /*Add "scoped" attribute to limit CSS to this component only */

</style>
