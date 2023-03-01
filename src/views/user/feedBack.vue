<template>
  <div id="feedBack">
    <h3><i :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"></i>{{$t('feedBack.text[0]')}}</h3>
    <el-input
      type="textarea"
      :placeholder="$t('feedBack.pla[0]')"
      v-model="msg"
      maxlength="500"
      show-word-limit
    ></el-input>
    
    <p class="btn">
      <el-button @click="submit()" :loading="btnLoading" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('feedBack.text[1]')}}</el-button>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "feedBack",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      msg: "",
      num: 0,
      btnLoading: false,
    };
  },
  watch: {
    msg: function (n) {
      this.$nextTick(() => {
        this.msg = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
  },
   computed: {
    ...mapState(["skin"]),
  },
  methods: {
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submit() {
      if (this.msg.length < 501) {
        if (this.msg == "") {
          this.$message({
            showClose: true,
            message: this.$t('feedBack.warnText[0]'),
            offset: 230,
            type: "warning",
          });
        } else {
          this.btnLoading = true;
          this.$http
            .get(this.versionLive2 + "user/user_feedback", {
              params: {
                user_id: this.$store.state.userinfo.user_id,
                text: this.msg,
              },
            })
            .then((res) => {
              if (res && res.data.code == 1) {
                this.btnLoading = false;
                this.$message({
                  type: "success",
                  message: this.$t('feedBack.warnText[1]'),
                  offset: 230,
                });
                this.msg = "";
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg,
                  offset: 230,
                });
                this.msg = "";
                this.btnLoading = false;
              }
            });
        }
      } else {
        this.showPositionValue = true;
        this.text = this.$t('feedBack.text[2]');
      }
    },
  },
};
</script>

<style scoped lang="less">
#feedBack {
  h3 {
    font-size: 18px;
    padding-top: 20px;
    color: #333333;
    border-bottom: solid 1px #f4f5f8;
    padding-bottom: 15px;
    i {
      display: inline-block;
      width: 4px;
      height: 17px;
      background: #1486ff;
      border-radius: 7px;
      position: relative;
      top: 2px;
      margin-right: 10px;
    }
  }

  .el-textarea {
    margin-top: 20px;
  }
  .btn {
    text-align: center;
    border: 0;
    button {
      margin: 30px auto;
      width: 340px;
      height: 42px;
      // line-height: 42px;
      border-radius: 99px;
      background: #1486ff;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
