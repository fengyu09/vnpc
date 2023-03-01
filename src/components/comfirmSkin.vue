<template>
  <!-- <div class="git-list-box-bg" v-if="isSW" @touchmove.prevent>
        <div class="git-list-box" >
            <i class="close-icon" @click="closeIsLogin"></i>
            <h3>{{title}}</h3>
            <div class="sw-content-text">{{content}}</div>
            <div class="dialog_ft clearfix">
                <span class="fl" @click="leftClick">{{leftBtn}}</span>
                <span class="fr" :class="[{'skin-btn-pink':$st.state.skin ==1},{'skin-btn-blue':$st.state.skin ==2},{'skin-btn-green':$st.state.skin ==3}]" @click="rightClick">{{rightBtn}}</span>
            </div>
        </div>
  </div> -->
  <!--  -->
  <!--  -->
  <div v-if="isP">
      <messageBox
        v-model="showConfirm"
        @on-cancel="cancelFunc"
        @on-confirm="onConfirm"
        :customClass="[{'skin-pop-pink':$st.state.skin ==1},{'skin-pop-blue':$st.state.skin ==2},{'skin-pop-green':$st.state.skin ==3}]"
        :title="title"
        :message="content"
        :confirmButtonText="confirmText"
        :cancelButtonText="cancelText"
        :showCancelButton="isShowCancelButton"
        :showConfirmButton="showConfirmButton"
    />
  </div>
  <!-- <div v-if="isP" @click="open()"
  :class="[{'skin-pop-pink':$st.state.skin ==1},{'skin-pop-blue':$st.state.skin ==2},{'skin-pop-green':$st.state.skin ==3}]"
>

  </div> -->
</template>

<script>
// import { Confirm } from "vux";
import { MessageBox } from 'element-ui';
export default {
  name: "swPop",
  data(){
      return{
         showConfirm:true,
         isP:true,
          title:'',
          content:'',
          cancelText:'Hủy',//默认取消
          confirmText:'Xác nhận',//默认确定
          isShowCancelButton:true,//是否显示取消按钮 treu 显示 ；false 不显示
          showConfirmButton:true,//是否显示取消按钮 treu 显示 ；false 不显示
      }
  },
    components: {
    MessageBox,
  },
  created(){
  },
  methods: {
    cancelFunc(){
        if(this.clickCancel){
            this.clickCancel();
        }
        
        this.isP = false
    },
    onConfirm(){
        if(this.clickConfirm){
            this.clickConfirm();
        }
        this.isP = false
    },
    open(){
       this.MessageBox.confirm
    }
  }
};
</script>

<style scoped lang="less">
  //   .rem(@name,@px){
  //       @{name}:unit(@px/75,rem)
  //   }

  //  .git-list-box-bg{
  //       position: fixed;
  //       width: 100%;
  //       height: 100%;
  //       top: 0;
  //       left: 0;
  //       background:rgba(0,0,0,.5);
  //       z-index: 1001;
  //       min-width: 320px;
  //       max-width: 750px;
  //   }
  //   .git-list-box{
  //       max-width: 750px;
  //       min-width: 320px;
  //       position: fixed;
  //       .rem(width,630);
  //       // .rem(height,467);
  //       top: 2.5rem;
  //       left:50%;
  //       transform: translateX(-50%);
  //       background: #fff;
  //       z-index: 1001;
  //       border-radius: .22rem;
  //       padding:0 .5rem .5rem 0.5rem;
  //       .close-icon{
  //           display: block;
  //           .rem(width,25);
  //           .rem(height,25);
  //           position: absolute;
  //           right: 10px;
  //           top: 10px;
  //           background: url('../assets/images/hmlz-icon2.png')no-repeat;
  //           background-size: contain;
  //       }
  //       h3{
  //           text-align: center;
  //           .rem(font-size,32);
  //           color:#333333;
  //           .rem(margin-top,38);
  //           .rem(margin-bottom,80);
  //           font-weight: bold;
  //       }
  //       .sw-content-text{
  //           text-align: center;
  //           color:#666666;
  //           .rem(font-size,32);
  //           .rem(line-height,45);
  //           .rem(margin-bottom,62);
  //       }
  //       .dialog_ft {
  //           span{
  //               color: #666666;
  //               background: #d7d7d7;
  //               margin: .4rem 0.4rem 0 0.4rem;
  //               border-radius: 20px;
  //               font-size: 0.38rem;
  //               .rem(height,80);
  //               .rem(line-height,80);
  //               .rem(width,210);
  //               text-align: center;
  //           }
  //           span:nth-last-of-type(1){
  //               background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
  //               color:#fff;
  //           }
  //       }
  //   }
</style>
