<template>
  <div class="game-content">
    <h3>{{$t('game.text[1]')}}</h3>
    <div v-html="gameUrl"></div>
  </div>
</template>

<script>
    import { alertComfirm } from '../../assets/js/public'
    import { mapState } from "vuex";
    export default {
        name: "toGame",
        data(){
            return{
                gameUrl:''
            }
        },
        computed: {
        ...mapState(['userinfo']),
        },
        watch: {
            gameUrl:function () {
                this.$nextTick(() => {
                    location.href = document.forms[0].getAttribute('action')
                });
            }
        },
        created() {
           

        },
        methods:{
            async initgame(){
                let id = this.$route.params.id;
                let type = this.$route.params.type;
                console.log(id)
                // console.log(this.$route.params)
                if(type=='ag_live'||type=='ag'){
                    this.goGameUrl('/api/vendors.ag/play');
                }else if(type=='ag_slot'){
                    this.goGameUrl('ag/play-slot');
                }else if(type=='ibc'||type=='ibc_sport'){
                    this.goGameUrl('/api/vendors.ibc/play',id);
                }else if(type=='im'){
                    this.goGameUrl('/api/vendors.im/play',id);
                }else if(type=='bbin_sport'||type=='bbin'){
                    this.goGameUrl('/api/vendors.bbin/play',id,true);
                }else if(type=='ae_live'||type=='ae'){
                    this.goGameUrl('/api/vendors.ae/play',id,true);
                }else if(type=='ae_slot'){
                    this.goGameUrl('/api/vendors.ae/play',id,true);
                }else if(type=='mg'||type=='mg_slot'){
                    this.goGameUrl('/api/vendors.mg/play',id,true,type);
                }else if(type=='jili'||type=='jili_slot'){
                    this.goGameUrl('/api/vendors.jili/play',id,true,type);
                }else if(type=='qm'||type=='qm_slot'){
                    this.goGameUrl('/api/vendors.qm/play',id,true,type);
                }else if(type=='fc'||type=='fc_slot'){
                    this.goGameUrl('/api/vendors.fc/play',id,true,type);
                }
                else if(type=='rich88'||type=='rich88_slot'){
                    this.goGameUrl('/api/vendors.rich88/play',id,true,type);
                }
                else if(type=='pp'||type=='pp_slot'){
                    this.goGameUrl('/api/vendors.pp/play',id,true,type);
                }
                else if(type=='pg'||type=='pg_slot'){
                    this.goGameUrl('/api/vendors.pg/play',id,true,type);
                }
                else if(type=='pt'||type=='pt_slot'||type=='pt_live'){
                    this.goGameUrl('/api/vendors.pt/play',id,true);
                }
                else if(type=='bbin_live'){
                    this.goGameUrl('/api/vendors.bbin/play',id,true);
                }else if(type=='cmd_sport'||type=='cmd'){
                    this.goGameUrl('/api/vendors.cmd/play',id,true);
                }else if(type=='sbo_sport'||type=='sbo'){
                    this.goGameUrl('/api/vendors.sbo/play',id,true);
                }else if(type=='cq9_chess'||type=='cq9'){
                    this.goGameUrl('/api/vendors.cq9/play',id,true);
                }else if(type=='sa_live'||type=='sa'){
                    this.goGameUrl('/api/vendors.sa/play',id,true);
                }else if(type=='dg_live'||type=='dg'){
                    this.goGameUrl('/api/vendors.dg/play',id,true);
                }else if(type=='ibo'||type=='ibo_live'){
                    this.goGameUrl('/api/vendors.ibo/play',id,true);
                }else if(type=='ebet'||type=='ebet_live'){
                    this.goGameUrl('/api/vendors.ebet/play',id,true);
                }else if(type=='allbet'||type=='allbet_live'){
                    this.goGameUrl('/api/vendors.allbet/play',id,true);
                }else if(type=='ezugi'||type=='ezugi_live'||type=='ezu_live'||type=='ezu'){
                    this.goGameUrl('/api/vendors.ezu/play',id,true);
                }else if(type=='tcg_lottery'){
                    this.goGameUrl('/api/vendors.tcg/play',id,true);
                }else if(type=='jdb_slot'||type=='jdb'){
                    this.goGameUrl('/api/vendors.jdb/play',id,true,type);
                }else if(type=='bg_live'){
                    this.goGameUrl('/api/vendors.bg/play',id,true);
                }else if(type=='ael_lottery'){
                    this.goGameUrl('/api/vendors.ael/play',id,true,type);
                }else if(type=='fight_cock'||type=='s128_cock'){
                    this.goGameUrl('/api/vendors.s128/play');//新
                    // this.goGameUrl('/api/vendors.fight/play');//旧
                }else if(type=='aec_race'){
                    this.goGameUrl('/api/vendors.aec/play');
                }else if(type=='cq9_sport'){
                    this.goGameUrl('/api/vendors.cq9/play',id,true);
                }else if(type=='v8_chess'){
                    this.goGameUrl('/api/vendors.v8/play',id,true);
                }
                else if(type=='ky_chess'||type=='ky'){
                    this.goGameUrl('/api/vendors.ky/play',id,true);
                }
                else if(type=='kx_chess'){
                    this.goGameUrl('/api/vendors.kx/play',id,true);
                }
            },
            goTogame() {
            document.forms[0].submit();
            },
            async goGameUrl(url, id, flag, type) {
            let obj = {};

            if (flag) {
                obj = {
                    game_type: id,
                    is_mobile: 0,
                    };
                if(id=='ae_live'){
                    // console.log(999);
                    obj = {
                        game_type: 'live',
                        is_mobile: 0,
                    };
                }
                if(id=='pt_live'){
                    obj = {
                        game_type: 'live',
                        is_mobile: 0,
                    };
                }
                if (type) {
                obj = {
                    game_type: "slot",
                    game_id: id,
                    is_mobile: 0,
                };
                }
            } else {
                obj = {
                game_id: id,
                is_mobile: 0,
                };
            }

            let res = await this.$http.get(url, {
                params: obj,
            }, {timeout:60000});
            if (res && res.data.code == 1) {
                this.$http.post('/nodeapi/toGames',{gameName:this.$route.params.type,id:this.userinfo.id})
                location.href = res.data.data.url;
                // console.log(res)
            } else {
                //平台维护中
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
        mounted() {
            this.initgame();
        },
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