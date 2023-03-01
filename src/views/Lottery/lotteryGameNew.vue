<template>
  <div id="lotteryGameNew" class=" clearfix">
      <div class="content-left fl">
        <div class="title-tab ">
             <el-dropdown class="active">
                <span class="el-dropdown-link">
                    乐购彩票<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">

                </el-dropdown-menu>
            </el-dropdown>
             <el-dropdown>
                <span class="el-dropdown-link">
                    乐购彩票<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">

                </el-dropdown-menu>
            </el-dropdown>
             <el-dropdown>
                <span class="el-dropdown-link">
                    乐购彩票<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">

                </el-dropdown-menu>
            </el-dropdown>
            <!-- <ul class="clearfix">
                <li class="fl">乐购彩票</li>
                <li class="fl">乐购彩票</li>
                <li class="fl">乐购彩票</li>
                <li class="fl">乐购彩票</li>
                <li class="fr"></li>
            </ul> -->

        </div>
        <div class="sort-tab">
            <ul class="clearfix">
                <li class="fl" v-for="(v,index) in sortList" :key="index">{{v}}</li>
            </ul>

        </div>

      </div>
      <div class="content-right fl"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sortList:['分数','包','罗贤','3爪','4爪','滑动地段']
    };
  },

  created() {
  
    
  },
  mounted() {
  },

  filters: {
   
  },
  methods: {}
};
</script>
<style lang="less">
#lotteryGameNew{
    width: 66%;
    margin: 0 auto;
    margin-top: 14px;
    .content-left{
        width: 946px;
        .title-tab{
            line-height: 51px;
            height: 51px;
            overflow: hidden;
            background: #1B8AC8;
            .el-dropdown{
                width: 162px;
                text-align: center;
                font-size: 22px;
                color: #fff;
                &.active{
                   background: linear-gradient(90deg, #1486FF 14.39%, #4BA1FF 96.58%);
                }
            }
        }
        .sort-tab{
            height: 41px;
            background: #F5F5F5;
            ul{
                height: 27px;
                line-height: 27px;
                li{
                  font-size: 14px;
                  width: 74px;
                  text-align: center;
                  background: #fff;
                  border: 0.5px solid #555555;
                  box-sizing: border-box;
                  border-radius: 4px;
                  margin-right: 16px;
                }
            }
        }
    }
}
</style>