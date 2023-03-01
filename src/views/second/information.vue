<template>
  <div class="infomation ">
    <div class="info main clearfix">
      <div class="info-nav fl">
        <span
          v-for="(i, index) in infoList"
          :key="index"
          @click="chuangeClassify(i.id)"
          :class="newsId == i.id ? 'is-active' : ''"
          >{{ i.name }}</span
        >
      </div>
      <div class="fl info-list ">
        <div v-if="newsList.length">
          <ul>
            <!-- 分类展示 -->
            <!-- <li
              v-for="(item, index) in newsList"
              :key="index"
              class="clearfix"
              v-if="item.type == newsId"
            >
              <router-link :to="'/newsDetails/'+item.info_id" target="_blank">
              <span class="info-lei fl" :class="item.type_txt | filterNews">{{
                item.type_txt
              }}</span>
              <span class="info-tit fl">{{ item.title }}</span>
              <span class="info-time fr">{{ item.timegap }}</span>
              </router-link>
            </li> -->
            <!-- 综合 -->
            <!-- <li
              v-for="(item1, index1) in newsList"
              :key="index1"
              class="clearfix"
              v-if="newsId == 0"
            >
              <router-link :to="'/newsDetails/'+item1.info_id" target="_blank">
              <span class="info-lei fl" :class="item1.type_txt | filterNews">{{
                item1.type_txt
              }}</span>
              <span class="info-tit fl">{{ item1.title }}</span>
              <span class="info-time fr">{{ item1.timegap }}</span>
              </router-link>
            </li> -->
            <li
              v-for="(item1, index1) in newsList"
              :key="index1"
              class="clearfix"
            >
              <router-link
                :to="'/newsDetails/' + item1.info_id"
                target="_blank"
              >
                <span
                  class="info-lei fl"
                  :class="item1.type_txt | filterNews"
                  >{{ item1.type_txt }}</span
                >
                <span class="info-tit fl">{{ item1.title }}</span>
                <span class="info-time fr">{{ item1.createtime |  formatDateNy1}}</span>
              </router-link>
            </li>
          </ul>
          <!-- <div class="info-list-no fl" v-if="!newsList.length">暂无资讯哟~</div> -->
        </div>
        <div class="info-list-no fl" v-if="!newsList.length">暂无资讯哟~</div>
        <!-- 分页 -->
        <div class="block fenye" v-if="newsList.length">
          <el-pagination
            @current-change="current_change"
            :page-size="10"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="currentPage"
            style="text-align: center;margin-top:30px;"
            :hide-on-single-page="true"
          ></el-pagination>
        </div>
      </div>
      <!-- <div class="details fl"  v-if="cur==1" v-for="(d,index) in detailsList">
         <div class="goBack" @click="goback()">>>返回综合列表</div>
         <div class="details-tit">{{d.title}}</div>
         <div class="details-info">
           <span>{{d.source}}</span>
           <span>{{d.timegap}}</span>
           <span>{{d.createtime | filterTime}}</span>
         </div>
         <div class="deta-cont" v-html="d.detail"></div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "infomation",
  data() {
    return {
      infoList: [
        { id: 0, name: "综合" },
        { id: 1, name: "直播" },
        { id: 2, name: "活动" },
        { id: 3, name: "公告" },
        { id: 4, name: "资讯" }
      ],
      newsList: [],
      detailsList: [],
      neednew: 0,
      newsId: 0,
      peges: 1,
      classify: 0,
      cur: 0,
      total: 0,
      currentPage: 1
    };
  },
  mounted() {
    this.getNews();
  },
  watch: {},
  methods: {
    getNews() {
      this.$http
        .get(this.versionLive2+"info/getInfoList/", {
          params: {
            type: this.newsId,
            neednew: this.neednew,
            limit: 10,
            page: this.peges
          }
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.newsList = res.data.data || [];
            this.total = res.data.total;
            //console.log(this.total);
          }
        });
    },
    chuangeClassify(index) {
      this.newsId = index;
      this.currentPage= 1 ;
      this.peges = 1 ;
      this.getNews();
      //   //console.log(this.newsId)
    },
    // getNewsDetails(id){
    //   this.cur = 1 ;
    //   this.$http.get(this.versionLive2+'info/getInfoDetail/',{
    //     params:{
    //       info_id:id || 1
    //     }
    //   }).then(res=>{
    //      //console.log(1)
    //      if(res && res.data.code==1){
    //         this.detailsList =  res.data.data || []
    //         //console.log(this.detailsList[0])
    //      }
    //   })
    // },
    // goback(){
    //   this.cur = 0 ;
    //   this.newsId = 0 ;
    // },
    current_change(val) {
      this.peges = val;
      this.getNews(this.peges); //改变当前页
    }
  }
};
</script>
<style scoped lang="less">
.infomation {
  margin-bottom: 10px;
  .info {
    clear: both;
    .info-nav {
      width: 200px;
      // height: 600px;
      height: 735px;
      background: #fff;
      margin-right: 10px;
      cursor: pointer;
      span {
        display: block;
        height: 70px;
        line-height: 70px;
        color: #000;
        font-size: 16px;
        text-align: center;
        &.is-active {
          color: #ff1c30;
        }
      }
    }
    .info-list {
      width: 990px;
      background: #fff;
      // min-height: 600px;
      min-height: 735px;
      position: relative;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
      ul {
        li {
          padding: 20px 0;
          margin: 0 20px;
          border-bottom: 1px dashed #f4f5f8;
          cursor: pointer;
          &:nth-last-child(1) {
            border-bottom: none;
            margin-bottom: 26px;
          }
          &:hover .info-tit{
             color: #ff1c30;
          }
          //   height: 30px;
          //   line-height: 30px;
          span {
            display: block;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            &.info-lei {
              font-size: 14px;
              margin-right: 10px;
              color: #fd8208;
              background: #fff9e8;
              border-radius: 50px;
              width: 60px;
              text-align: center;
            }
            &.info-tit {
              color: #333333;
            }
            &.info-time {
              color: #999999;
            }
          }
        }
      }
      .fenye{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 5px;
      }
    }
    .info-list-no {
      width: 990px;
      background: #fff;
      min-height: 600px;
      text-align: center;
      line-height: 600px;
      color: #999;
      // font-size: 20px;
    }
    .details {
      width: 990px;
      background: #fff;
      min-height: 600px;
      padding: 30px 20px;
      .goBack {
        font-size: 14px;
        color: #ff1c30;
        padding-bottom: 20px;
        cursor: pointer;
      }
      .details-tit {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        padding-bottom: 20px;
      }
      .details-info {
        color: #999;
        font-size: 14px;
        padding-bottom: 20px;
        span {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
