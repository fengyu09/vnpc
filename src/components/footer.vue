<template>
  <div id="footer" :class="[{'pink-bg':$st.state.skin==1},{'blue-bg':$st.state.skin==2},{'green-bg':$st.state.skin==3}]">
    <div class="footer-content">
     
      <div class="link" :class="[{'pink-link':$st.state.skin==1},{'blue-link':$st.state.skin==2},{'green-link':$st.state.skin==3}]">
        <router-link to="/basicOperation">{{$t('foot[0]')}}</router-link>
        <router-link to="/statement">{{$t('foot[1]')}}</router-link>
        <router-link to="/privacy">{{$t('foot[2]')}}</router-link>
        <router-link to="/contact">{{$t('foot[3]')}}</router-link>
        <router-link to="/extend">{{$t('foot[4]')}}</router-link>
        <router-link to="/appDownload">{{$t('foot[5]')}}</router-link>
        <router-link to="/ruleClause"> {{$t('foot[6]')}}</router-link>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: "foot",
};
</script>

<style scoped lang="less">
#footer {
  background: #1b74c8;
  padding: 40px 0;
}
.footer-content {
  width: 1300px;
  margin: 0 auto;
  .partner {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #8496ad;
    padding: 30px 0 30px 0px;
    span {
      line-height: 40px;
      font-weight: bold;
      font-size: 30px;
      color: #fff;
      float: left;
    }
    a {
      cursor: default;
      width: 134px;
      margin-left: 43px;
      float: left;
      img {
        width: 100%;
        vertical-align: top;
      }
    }
  }
  .link {
    margin-top: 35px;
    margin-bottom: 35px;
    text-align: center;
    a {
      font-size: 18px;
      color: #fff;
      margin-right: 45px;
      position: relative;
      &::before {
        content: "";
        width: 2px;
        height: 17px;
        background: #6fb9ff;
        position: absolute;
        right: -22px;
      }
      &:last-of-type {
        &::before {
          display: none;
        }
      }
    }
    &.pink-link{
      a{
        &::before {
           background: #FFAEAD;
        }
      }
    }
    &.blue-link{
      a{
        &::before {
           background: #FFAEAD;
        }
      }
    }
    &.green-link{
      a{
        &::before {
           background: #88D8C1;
        }
      }
    }
  }
  .bottom-copy {
    line-height: 30px;
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }
}
</style>
