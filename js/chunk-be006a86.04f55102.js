(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-be006a86"],{7431:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto"},[a("h1",{staticStyle:{color:"#e7dfd5","text-align":"center"}},[t._v("Create list")]),a("v-form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.submitHandler(e)}}},[a("v-text-field",{attrs:{label:"Title",color:"#e7dfd5","background-color":"transparent",dark:"",solo:"",flat:"",outlined:"",rounded:"","hide-details":"",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),a("v-list",{attrs:{color:"transparent"}},[a("draggable",t._b({attrs:{handle:".handle"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}},model:{value:t.items,callback:function(e){t.items=e},expression:"items"}},"draggable",t.dragOptions,!1),[a("transition-group",{attrs:{name:"list"}},t._l(t.items,(function(e,i){return a("Item",{key:e.id,attrs:{item:e,index:i},on:{"remove-item":t.removeItem}})})),1)],1)],1),a("transition",{attrs:{name:"add"}},[a("AddItem",{on:{"add-item":t.addItem}})],1),a("v-btn",{staticClass:"mr-2",staticStyle:{color:"#3b6978"},attrs:{type:"submit",rounded:"","x-large":"",depressed:"",color:"#e7dfd5"}},[t._v("Create")]),a("v-btn",{attrs:{type:"submit",rounded:"","x-large":"",depressed:"",outlined:"",right:"",color:"#e7dfd5"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.dialog=!0}}},[t._v("Cancel")]),a("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",{attrs:{color:"#e7dfd5"}},[a("v-card-title",{staticClass:"headline",staticStyle:{color:"#204051"}},[t._v("Do you want to leave?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"#3b6978",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("cancel")]),a("v-btn",{attrs:{color:"#3b6978",text:""},on:{click:function(e){return e.preventDefault(),t.cancel(e)}}},[t._v("leave")])],1)],1)],1)],1)],1)},n=[],o=(a("4de4"),a("a0ad")),r=a("5e7d"),s=a("310e"),l=a.n(s),d={computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}}},name:"addnote",data:function(){return{items:[],title:"",id:null,dialog:!1}},methods:{removeItem:function(t){this.items=this.items.filter((function(e){return e.id!==t}))},addItem:function(t){this.items.push(t)},submitHandler:function(){var t={title:this.title||"Shopping list",id:Date.now(),items:this.items};this.$store.dispatch("createList",t),this.$router.push("/")},cancel:function(){this.$router.push("/")}},beforeRouteLeave:function(t,e,a){var i=this.submitHandler,n=this.cancel;n?(this.dialog=!0,a()):i&&a()},components:{AddItem:o["a"],Item:r["a"],draggable:l.a}},c=d,u=(a("7485"),a("2877")),m=a("6544"),f=a.n(m),v=a("8336"),p=a("b0af"),b=a("99d9"),g=a("169a"),h=a("4bd4"),x=a("8860"),k=a("2fa4"),C=a("8654"),_=Object(u["a"])(c,i,n,!1,null,"59337fb2",null);e["default"]=_.exports;f()(_,{VBtn:v["a"],VCard:p["a"],VCardActions:b["a"],VCardTitle:b["b"],VDialog:g["a"],VForm:h["a"],VList:x["a"],VSpacer:k["a"],VTextField:C["a"]})},7485:function(t,e,a){"use strict";var i=a("c534"),n=a.n(i);n.a},c534:function(t,e,a){}}]);
//# sourceMappingURL=chunk-be006a86.04f55102.js.map