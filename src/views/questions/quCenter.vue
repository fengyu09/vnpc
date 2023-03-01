<template>
  <div class="qu-center">
    <!-- 左侧导航 -->
    <div class="left-tab">
      <ul class="firstTab">
        <li
          class="tab"
          v-for="(val, index) in firstTab"
          :key="index"
          @click="selectStyle(index, val.router)"
          :class="{ active: index == selectTypeIndex }"
        >
          <img :src="val.icon" alt="" /><a>{{ val.name }}</a>
          <ul v-if="val.twoTabs && index == selectTypeIndex">
            <li
              v-for="(item, index1) in val.twoTabs"
              :key="index1"
              @click="selectStyle1(index1, item.router)"
              :class="{ active1: index1 == selectTypeIndex1 }"
            >
              <span>{{ item.title }}</span>
              <ul v-if="item.threeTabs && index1 == selectTypeIndex1">
                <li
                  v-for="(item2, index2) in item.threeTabs"
                  :key="index2"
                  @click="selectStyle2(index2, item2.router)"
                  :class="{ active2: index2 == selectTypeIndex2 }"
                >
                  {{ item2.title }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
       
      </ul>
    </div>
    <!-- 右侧内容 -->
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "qu",
  data() {
    return {
      selectTypeIndex: -1,
      selectTypeIndex1: -1,
      selectTypeIndex2: -1,
      firstTab: [
        
        {
          name: this.$t('quCenter[0]'),
          icon: require("../../assets/imgaes/qucenter/qysw.png"),
          twoTabs: [
            {
              title:  this.$t('quCenter[1]'),
              router: "/statement",
            },
            {
              title:  this.$t('quCenter[2]'),
              router: "/privacy",
            },
            {
              title:  this.$t('quCenter[3]'),
              router: "/ruleClause",
            },
          ],
        },
        {
          name:  this.$t('quCenter[4]'),
          icon: require("../../assets/imgaes/qucenter/lxwm.png"),
          router: "/contact",
        },
      ],
    };
  },
  computed: {},

  created() {
    this.init();
  },
  watch: {
    $route: function (n) {
      this.changeFocus(n.name);
    },
  },
  methods: {
    init() {
      // this.getRouterPath();
      this.changeFocus(this.$route.name);
    },
    selectStyle(index, router) {
      this.selectTypeIndex = index;
      if (router) {
        this.$router.push({ path: router });
      }
    },
    selectStyle1(index1, router) {
      this.selectTypeIndex1 = index1;
      if (router) {
        this.$router.push({ path: router });
      }
    },
    selectStyle2(index2, router) {
      this.selectTypeIndex2 = index2;
      if (router) {
        this.$router.push({ path: router });
      }
    },
    changeFocus(url) {
      if (url == "contact") {
        this.selectTypeIndex = 3;
      }
      if (url == "statement" || url == "privacy" || url == "ruleClause") {
        this.selectTypeIndex = 2;
        if (url == "statement") {
          this.selectTypeIndex1 = 0;
        }
        if (url == "privacy") {
          this.selectTypeIndex1 = 1;
        }
        if (url == "ruleClause") {
          this.selectTypeIndex1 = 2;
        }
      }
      if (url == "basicOperation") {
        this.selectTypeIndex = 0;
        this.selectTypeIndex1 = 0;
      }
    },
  },
};
</script>

<style scoped lang="less">
.qu-center {
  width: 1300px;
  min-height: 640px;
  background: #ffffff;
  border-radius: 10px;
  margin: 20px auto;
  overflow: hidden;
  .left-tab {
    width: 240px;
    min-height: 640px;
    float: left;
    padding-top: 30px;
    .firstTab {
      width: 100%;
      .tab {
        width: 100%;
        text-align: left;
        padding: 15px 0px;
        font-size: 16px;
        color: #445779;
        margin-left: 35px;
        cursor: pointer;
        img {
          padding-right: 6px;
          position: relative;
          top: -2px;
        }
      }
      .active {
        a {
          color: #1486ff;
        }
        ul {
          margin-top: 20px;
          // overflow: hidden;
          li {
            width: 175px;
            // height: 42px;
            line-height: 42px;
            text-align: left;
            font-size: 14px;
            color: #71819d;
            padding-top: 0;
            padding-bottom: 0;
            overflow: hidden;
            cursor: pointer;
            span {
              padding-left: 28px;
            }
          }
          .active1 {
            span {
              display: block;
              width: 100%;
              padding-left: 28px;
              // height: 42px;
              line-height: 42px;
              color: #1486ff;
              background: #f3f9fe;
              border-radius: 5px;
            }

            ul {
              overflow: hidden;
              background: #ffffff;
              position: relative;
              left: -28px;
              top: -20px;
              width: 185px;
              margin-top: 20px;
              li {
                width: 185px;
                height: 42px;
                line-height: 42px;
                text-align: left;
                font-size: 14px;
                color: #71819d;
                padding-left: 69px !important;
                padding-top: 0;
                padding-bottom: 0;
                overflow: hidden;
                cursor: pointer;
              }
              .active2 {
                color: #1486ff;
              }
            }
          }
        }
      }
    }
  }
  .right-content {
    float: left;
    width: 1060px;
    min-height: 640px;
    border-left: solid 1px #f4f5f8;

    > div {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
}
</style>
