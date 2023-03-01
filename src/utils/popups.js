import Vue from 'vue';
import Popups from '../components/popups.vue'

let popupsConstructor = Vue.extend(Popups);

/*let myPopups = function (text) {
    return new Promise((res, rej) => { //promise封装，confirm执行resolve，confirm执行rejectlet
        let confirmDom = new popupsConstructor({
            el: document.createElement('div')
        })
        document.body.appendChild(confirmDom.$el);  //new一个对象，然后插入body里面
        confirmDom.text = text;   //对象的方式传入，所有的字段都可以根据需求自定义
        confirmDom.confirm = function () {
            res()
            confirmDom.isPopups = false
        }
        confirmDom.cancel = function () {
            rej()
            confirmDom.isPopups = false
        }
       /!* Vue.nextTick(() => {
            setTimeout(function(){
                confirmDom.cancel();
            },confirmDom.text.duration)
        });*!/

    })
}*/


let myPopups = {
    myPrompt(text){
        return new Promise((res, rej) => { //promise封装，confirm执行resolve，confirm执行rejectlet
            let confirmDom = new popupsConstructor({
                el: document.createElement('div')
            })
            document.body.appendChild(confirmDom.$el);  //new一个对象，然后插入body里面
            confirmDom.text = text;   //对象的方式传入，所有的字段都可以根据需求自定义
             Vue.nextTick(() => {
                 setTimeout(function(){
                     confirmDom.cancel();
                 },1500)
             });

        })
    },
    myConfirm(text){
        return new Promise((res, rej) => { //promise封装，confirm执行resolve，confirm执行rejectlet
            let confirmDom = new popupsConstructor({
                el: document.createElement('div')
            })
            document.body.appendChild(confirmDom.$el);  //new一个对象，然后插入body里面
            confirmDom.text = text;   //对象的方式传入，所有的字段都可以根据需求自定义
            //confirmDom.isPopups =false;
            confirmDom.confirm = function () {
                res()
                confirmDom.isPopups = false
            }
            confirmDom.cancel = function () {
                rej()
                confirmDom.isPopups = false
            }
            // Vue.nextTick(() => {
            //     setTimeout(function () {
            //         confirmDom.cancel();
            //     }, 3000)
            // });

        })
    }

}

export default myPopups;