<template>
  <div class="game-content">
    <h3>Đang chạy, vui lòng đợi ...</h3>
    <div v-html="gameUrl"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { alertComfirm } from "../../assets/js/public";
export default {
  name: "goSS",
  data() {
    return {
      gameUrl: "",
    };
  },
  watch: {
    gameUrl: function () {
      this.$nextTick(() => {
        location.href = document.forms[0].getAttribute("action");
      });
    },
  },
  created() {
    let type = this.$route.query.type;
    this.getUrl(type);

    // this.$http.get('/api2/platform/rand-sport-play',{ params:{
    //     game_type:'sport',
    //     is_mobile:0
    // }}).then(res=>{
    //     // this.$vux.loading.hide()
    //     if(res.data.code == 1){
    //         // this.$vux.loading.hide();
    //         window.location.href = res.data.data.url;
    //     }

    // }).catch(()=>{
    //       this.$message({
    //         message: res.data.msg,
    //         type: 'error',
    //     })
    //     // alertComfirm({msg:res.data.msg})
    // })
  },
  methods: {
    getUrl(type) {
      if (type) {
        if (type == "im") {
          this.goGameUrl("im/play");
        } else if (type == "bbin") {
          this.goGameUrl("bbin/play", "sport");
        } else if (type == "cmd") {
          this.goGameUrl("cmd/play", "sport");
        } else if (type == "sb") {
          this.goGameUrl("ibc/play", "sport");
        } else if (type == "sbo") {
          this.goGameUrl("sbo/play", "sport");
        }
      } else {
        this.$http
          .get("/api2/platform/rand-sport-play", {
            params: {
              game_type: "sport",
              is_mobile: 0,
            },
          })
          .then((res) => {
            if (res.data.code == 1) {
              window.location.href = res.data.data.url;
            } else {
              alertComfirm(
                { msg: res.data.msg },
                function () {
                  window.close();
                },
                function () {
                  window.close();
                }
              );
            }
          })
          .catch(() => {
            alertComfirm(
              { msg: res.data.msg },
              function () {
                window.close();
              },
              function () {
                window.close();
              }
            );
          });
      }
    },
    async goGameUrl(url, type) {
      let res = await this.$http.get("/api2/" + url, {
        params: { game_type: type, is_mobile: 0 },
      });

      if (res && res.data.code == 1) {
        location.href = res.data.data.url;
      } else {
        alertComfirm(
          { msg: res.data.msg },
          function () {
            window.close();
          },
          function () {
            window.close();
          }
        );
      }
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.game-content {
  height: 500px;
  h3 {
    text-align: center;
    font-size: 30px;
    padding-top: 100px;
  }
}
</style>