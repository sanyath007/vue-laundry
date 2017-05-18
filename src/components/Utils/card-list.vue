<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-image">
        <img class="img-responsive" v-bind:src="setImg">
      </div>
      <div class="card-content">
        <span class="card-title">{{ item.name }}</span>
        <!--<p>{{ item.desc }}</p>-->

        <div class="row">
          <div class="col-md-6">
            <div class="input-group spinner">
              <input type="text" class="form-control" v-model="itemAmount">
              <div class="input-group-btn-vertical">
                <button type="button" class="btn btn-default" @click="increase">
                  <i class="fa fa-caret-up"></i>
                </button>
                <button type="button" class="btn btn-default" @click="decrease">
                  <i class="fa fa-caret-down"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <a v-on:click.prevent="add(item, itemAmount)" class="btn btn-primary pull-right">
              <i class="fa fa-cart-plus" aria-hidden="true"></i> Add
            </a>
          </div>
        </div>

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
      defaultImg: 'materialdesign_introduction.png',
      itemAmount: 10
    }
  },
  computed: {
    setImg () {
      return this.item.img ? this.imgPath + this.item.img : this.imgPath + this.defaultImg
    }
  },
  methods: {
    add (_item, _amt) {
      this.reset()
      _item.amt = _amt
      this.$emit('addItem', _item)
    },
    increase () {
      this.itemAmount++
    },
    decrease () {
      this.itemAmount--
    },
    reset () {
      this.itemAmount = 10
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

  .spinner {
    width: 100px;
  }

  .spinner input {
    text-align: right;
  }

  .input-group-btn-vertical {
    position: relative;
    white-space: nowrap;
    width: 1%;
    vertical-align: middle;
    display: table-cell;
  }

  .input-group-btn-vertical>.btn {
    display: block;
    float: none;
    width: 100%;
    max-width: 100%;
    padding: 8px;
    margin-left: -1px;
    position: relative;
    border-radius: 0;
  }

  .input-group-btn-vertical>.btn:first-child {
    border-top-right-radius: 4px;
  }

  .input-group-btn-vertical>.btn:last-child {
    margin-top: -2px;
    border-bottom-right-radius: 4px;
  }

  .input-group-btn-vertical i {
    position: absolute;
    top: 0;
    left: 4px;
  }

</style>
