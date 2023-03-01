<template>
  <div class="vme">
    <div class="emoji-container">
      <div class="emoji-category" ref="emojiCon" v-show="switchEmoji==1">
        <span  v-for="(emoji, i) in emojis" :key="i"  v-if="i<24" :style="emojiWidth" :class="_emojiName(emoji)"
              @click="emojiClick(emoji, i, $event)">
          <img :src="'../static/images/chat/emoji/' + _emojiName(emoji)"/>
        </span>
      </div>
      <!-- <div v-show="switchEmoji==2" class="emoji-category">
				<div v-for="(item,index) in fhbqList" :key="index"  :class="item.imgName" @click="fhemoji(item.flag,item.imgSrc,item.imgName)">
					<img :src="item.imgSrc" alt="" style="width:28px;height: 28px;">
				</div>
			</div> -->
      <!-- <div v-show="switchEmoji==3" class="emoji-category">
				<div v-for="(item,index) in gzbqList" :key="index"  :class="item.imgName" @click="fhemoji(item.flag,item.imgSrc,item.imgName)">
					<img :src="item.imgSrc" alt="" style="width:40px;height: 40px;">
				</div>
			</div> -->
    </div>
    <div class="switch-emoji">
				<div :class="{active:switchEmoji==1}" @click="switchEmoji=1"><img src="../../assets/imgaes/chat/biaoqing-gf.png"
					 alt="" srcset="" style="width:24px"></div>
				<div :class="{active:switchEmoji==2}" @click="switchEmoji=2"><img src="../../assets/imgaes/chat/biaoqing-fh.png"
					 alt="" srcset="" style="width:24px"></div>
           <div :class="{active:switchEmoji==3}" @click="showGz()"><img src="../../assets/imgaes/chat/gz_icon.png"
					 alt="" srcset="" style="width:24px"></div>
		</div>

  </div>
</template>

<script>
  import emojiData from './common/emoji-data'
  // import fhemojiData from './common/fhemoji'
  // import gzemojiData from './common/gzemoji'
  export default {
    props: {
      perPage: {
        default: 8,
        type: Number
      }
    },
    data() {
      return {
        activedIndex: 0,
        switchEmoji: 1,
        // fhbqList: fhemojiData,
        // gzbqList:gzemojiData
      };
    },
    computed: {
      emojiWidth() {
        const margin = 500;
        //console.log(document.body.clientWidth);
        //console.log(this.perPage);
        const width = (document.body.clientWidth - (this.perPage + 1) * margin) / this.perPage;
        return {width: width + 'px'};
      },
      emojis() {
        const ret = this.barControl.map(item => {
          return Object.keys(emojiData[item])
        });
        let arr = [];
        ret.map((item, index) => {
          this.rangeKeys[index] = this._emojiName(item[0]);
          item.map((text) => {
            arr.push(text);
          })
        });
        return arr;
      }
    },
    created() {
      this._initUI();
      // this.fhbqList.forEach((i,t)=>{
			// 	i.imgSrc=require("../../assets/imgaes/fhemoji/"+i.imgName)
      // });
      //  this.gzbqList.forEach((i,t)=>{
			// 	i.imgSrc=require("../../assets/imgaes/gzemoji/"+i.imgName)
			// })
    },
    mounted() {
      this.$nextTick(()=> {
        this._caculateRange();
      });
    },
    methods: {
      showGz(){
				if(this.$store.state.userinfo.noble<6){
          // return this.$vux.toast.text('需达到公爵后解锁该表情包','middle');
          return this.$message({
										message: "需达到公爵后解锁该表情包",
										type: 'warning'
									});
				}
				this.switchEmoji = 3;
			},
      _caculateRange() {
        let arr = [];
        arr = this.rangeKeys.map((item) => {
          if (document.getElementsByClassName(item).length > 0) {
            return document.getElementsByClassName(item)[0].offsetLeft;
          }
        });
        this.widthRange = arr;
        this._listenScroll();

        this.barClick("", 0);
      },
      _listenScroll() {
        // 监听滚动事件
        this.$refs.emojiCon.addEventListener('scroll', ()=> {
          const scrollLeft = this.$refs.emojiCon.scrollLeft;
          for(var i = 0; i < this.widthRange.length - 1; i++){
            if(scrollLeft >= this.widthRange[i] && scrollLeft < this.widthRange[i+1]){
              this.activedIndex = i;
              break;
            }else if(scrollLeft >= this.widthRange[this.widthRange.length - 1]){
              this.activedIndex = this.widthRange.length - 1;
              break;
            }else{
              this.activedIndex = 0;
            }
          }
        });
      },
      _emojiName(code) {
        return code.replace(/:/g, '') + ".png";
      },
      _initUI() {
        // 初始化bar control数据
        this.barControl = ['表情', '自然', '物品', '地点', '符号'];
        this.rangeKeys = [];
      },
      barClick(item, index) {
        this.activedIndex = index;
        // //console.log(this.widthRange);
        this.$refs.emojiCon.scrollLeft = index === 0 ? 0 :this.widthRange[index];
      },
      emojiClick(emoji, index, e){
        const dom = document.getElementsByClassName(this._emojiName(emoji))[0];
        dom && dom.setAttribute('selected','selected');

        setTimeout(()=> {
          dom.removeAttribute('selected');
        }, 200);


        let input = document.getElementById('textInput');
        input.focus();
        if(window.timer_3){
            clearTimeout(window.timer_3);
        }
        this.$parent.comment_text = this.$parent.comment_text+emoji;
        // input.selectionEnd(this.$parent.chatMsgForm.comment_text.length);
        const pngName = this._emojiName(emoji);

        // //console.log(pngName);
        // this.$emit('emojiSelected', emoji, require('./common/emoji/' + pngName));
        // //console.log(emoji);
      },
      fhemoji(f,i,c){
				this.$parent.comment_text = this.$parent.comment_text + f;
				const dom = document.getElementsByClassName(c)[0];
        dom && dom.setAttribute('selected', 'selected');
        
         let input = document.getElementById('textInput');
        input.focus();
				setTimeout(() => {
					dom.removeAttribute('selected');
				}, 200);
			}
    }
  }
</script>

<style>
  .vme {
    background: #ffffff;
    width: 100%;
    position: absolute;
    z-index: 90;
    left: 0px;
    bottom: 67px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(111, 111, 111, 0.42);
  }
  .vme::after{
    content: '';
    display: block;
    width: 0; 
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color:#ffffff transparent transparent transparent;
    position: absolute;
    left: 300px;
  }

  .vme .emoji-container {
    /* position: absolute;
    top: 0; */
    width: 100%;
    /* bottom: 36px; */
    /* height: 167px; */
  }

  .vme .emoji-container .emoji-category {
    box-sizing: border-box;
    padding: 5px 5px 5px 5px;
    width: 100%;
    /*overflow: scroll;*/
    overflow-y: hidden;
    /* display: flex;
    flex-wrap: wrap;
    flex-direction: column; */
    /* height: 100%; */
  }
  .vme .emoji-container .emoji-category>div{
    display:inline-block;
     border-radius: 5px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    width: 15%;
    margin: 0 0.8%;
  }
  .vme .emoji-container .emoji-category span {
    display: inline-block;
    border-radius: 5px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    width: 15%;
    margin: 0 0.8%;
  }
  .vme .emoji-container .emoji-category span[selected]{
    background-color: #d8d8d8;
  }

  .vme .emoji-container .emoji-category span img {
    width: 28px;
    height: 28px;
  }

  .vme .bar-container {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 35px;
    border-top: 1px solid #ddd;
    border-bottoM: 1px solid #ccc;
  }

  .vme .bar-container {
    display: flex;
  }

  .vme .bar-container div {
    flex: 1 1;
    text-align: center;
    line-height: 35px;
    height: 35px;
    border-right: 1px solid #ddd;
    font-size: 13px;
    color: #888;
    font-weight: 300;
  }
  .vme .emoji-container .emoji-category>div[selected]{
		background-color: #d8d8d8;
	}
  .vme .bar-container div:last-child {
    border-right: none;
  }

  .vme .bar-container .actived {
    background: #E0E5EE;
    font-weight: 350;
  }
  .vme .switch-emoji{
    display: flex;
    padding: 4px 10px;
    background: #fff;
    border-top: 1px solid #dddddd;
  }
  .vme .switch-emoji>div{padding: 4px;margin-right: 8px;}
  .vme .switch-emoji .active{border-radius: 6px;background: #f0f0f0;}
</style>
