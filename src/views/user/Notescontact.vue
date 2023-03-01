<template>
  <div id="Notescontact">
    <h3>Liên hệ bộ phận chăm sóc khách hàng</h3>
    <p><span>微信</span> q45454554</p>
    <p><span>qq</span>q45454554</p>
    <p><span>手机</span> q45454554</p>
  </div>
</template>

<script>
export default {
  name: "Notescontact",
  data() {
    return {};
  },
  created() {
    this.convert();
  },
  methods: {
    convert: function () {
      this.getUserInfo();
    },
    getUserInfo() {
      if (!this.codeToken) return;
    },
  },
};
</script>

<style scoped lang="less">
#Notescontact {
  h3 {
    font-size: 18px;
    padding-top: 20px;
    color: #333333;
    i {
      display: inline-block;
      width: 4px;
      height: 17px;
      background: #ff1c30;
      border-radius: 7px;
      position: relative;
      top: 2px;
      margin-right: 10px;
    }
  }
  p {
    border-bottom: solid 1px #ccc;
    line-height: 60px;
    span {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
