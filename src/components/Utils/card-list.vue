<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-image">
        <img class="img-responsive" v-bind:src="setImg">
      </div>
      <div class="card-content">
        <span class="card-title">{{ item.name }}</span>
        <p>{{ item.desc }}</p>
        <a v-on:click.prevent="add(item)" class="btn btn-primary">
          <i class="fa fa-cart-plus" aria-hidden="true"></i> Add
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import '../../../node_modules/toastr/build/toastr.min.js'

// var $ = window.jQuery = require('jquery')
// var toastr = window.toastr = require('toastr')

export default {
  name: 'card-list',
  props: [ 'item' ],
  data () {
    return {
      title: 'Card List',
      imgPath: '/static/img/',
      defaultImg: 'materialdesign_introduction.png'
    }
  },
  computed: {
    setImg () {
      return this.item.img ? this.imgPath + this.item.img : this.imgPath + this.defaultImg
    }
  },
  methods: {
    add (_item) {
      this.$emit('addItem')
    }
  }
}
</script>

<style>
  /*Add "scoped" attribute to limit CSS to this component only */
  /*@import '../../../node_modules/toastr/build/toastr.min.css';*/

  .card {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 2px;
    background-clip: padding-box;
  }

  .card .card-image {
    position: relative;
    overflow: hidden;
  }

  .card .card-image img {
    border-radius: 2px 2px 0 0;
    background-clip: padding-box;
    position: relative;
    z-index: -1;
  }

  .card .card-content {
    padding: 16px;
    border-radius: 0 0 2px 2px;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  .card .card-content p {
    margin: 0;
    color: inherit;
  }

  .card .card-content .card-title {
    line-height: 48px;
  }

</style>
