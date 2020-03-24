<template>
  <el-amap vid="amap" :plugin="plugin" :events="events" class="amap" :center="center" :zoom="zoom">
    <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
  </el-amap>
</template>
<script>
import Vue from 'vue'
import AMap from 'vue-amap' // 高德地图
import $ from "jquery";

Vue.use(AMap)

AMap.initAMapApiLoader({
  key: '2cb0c65123b94532f207177aac83d9d7',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation'
  ],
  v: '1.4.4'
})

export default {
  props: {
    local: {
      type: String // 高德地图中心点
    }
  },
  data() {
    // let self = this
    // [113.324687,23.106786]
    return {
      center: [121.5273,31.2151],
      zoom: 13, // 地图缩放
      events: {},
      plugin: [
        {
          pName: "Scale",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ]
    };
  },
  watch: {
    local(newData){
      const array = newData.split(",");
      let position = [array[0]*1, array[1]*1];
      this.center = JSON.parse(JSON.stringify(position));
      console.log(this.center)
    }
  },
  methods: {
    // convertPosition(){
    //   console.log(this.local);
    //   const array = this.local.split(",");
    //   this.center.push(array[0]*1);
    //   this.center.push(array[1]*1);
    //   console.log(this.center)
    // }
  },
  mounted: function() {
    $("#mapBox").append('<div class="map-shade"></div>');
    $(".map-box .list-header").on("click", ".locked", function() {
      $(".map-shade").css("height", "0"),
        $(this)
          .text("锁定地图")
          .removeClass("locked")
          .addClass("unlocked");
    }),
      $(".map-box .list-header").on("click", ".unlocked", function() {
        $(".map-shade").css("height", "100%"),
          $(this)
            .text("激活地图")
            .removeClass("unlocked")
            .addClass("locked");
      });
  }
};
</script>
