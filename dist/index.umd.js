!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],e):(t||self).StimulusSplitter=e(t.Stimulus)}(this,function(t){class e{constructor(t){this.controller=t}get key(){return this.controller.storeKeyValue}get splitters(){return this.controller.splitters}load(){if(this.key){var t=this.constructor.load(this.key);t&&this.splitters.forEach(e=>{var s=t[this.controller.getID(e)],i=this.controller.panes(e);this.controller.isVertical(e)?this.controller.setWidth(i,s[0][0],s[1][0]):this.controller.setHeight(i,s[0][1],s[1][1])})}}save(){if(this.key){var t={};this.splitters.forEach(e=>{var s=this.controller.panes(e);t[this.controller.getID(e)]=s.map(t=>[t.offsetWidth,t.offsetHeight])}),this.constructor.save(this.key,t)}}static load(t){var e=sessionStorage.getItem(t);try{return JSON.parse(e)}catch(t){return null}}static save(t,e){try{sessionStorage.setItem(t,JSON.stringify(e))}catch(t){console.error(t)}}}class s extends t.Controller{get splitters(){return this.scope.findAllElements("[data-splitter-id]")}initialize(){this.store=new e(this)}connect(){this.store.load()}start(t){this.splitter=this.splitters.find(e=>e==t.target),this.splitter&&(this.startPos=this.pagePos(t),this.startSizes=this.panes(this.splitter).map(t=>this.paneSize(t)),this.toggleClass(this.splitter,!0),this.disableIframe(!0),this.context.actionSet.add(this.constructor.dragActions))}move(t){var e=this.pagePos(t),s=this.panes(this.splitter);this.isVertical(this.splitter)?this.resizeWidth(s,e):this.resizeHeight(s,e)}end(t){this.toggleClass(this.splitter,!1),this.disableIframe(!1),this.context.actionSet.remove(this.constructor.dragActions),this.dispatch("resized",{detail:{splitter:this.splitter}}),this.splitter=null,this.store.save()}prevent(t){t.preventDefault()}pagePos(t){return{x:t.changedTouches?t.changedTouches[0].pageX:t.pageX,y:t.changedTouches?t.changedTouches[0].pageY:t.pageY}}panes(t){if(this.element.matches("table")){var e=t.closest("th,td");return[e.previousElementSibling,e]}return[t.previousElementSibling,t.nextElementSibling]}paneSize(t){return{width:t.offsetWidth,height:t.offsetHeight}}isVertical(t){return this.element.matches("table")||t.parentNode.matches(".st-splitter-vertical")}resizeWidth(t,e){this.setWidth(t,this.startSizes[0].width+(e.x-this.startPos.x),this.startSizes[1].width-(e.x-this.startPos.x))}resizeHeight(t,e){this.setHeight(t,this.startSizes[0].height+(e.y-this.startPos.y),this.startSizes[1].height-(e.y-this.startPos.y))}setWidth(t,e,s){"both"==this.resizeTargetValue?e>0&&s>0&&(t[0].style.width=e+"px",t[1].style.width=s+"px"):e>0&&(t[0].style.width=e+"px")}setHeight(t,e,s){"both"==this.resizeTargetValue?e>0&&s>0&&(t[0].style.height=e+"px",t[1].style.height=s+"px"):e>0&&(t[0].style.height=e+"px")}toggleClass(t,e){e?t.classList.add("st-splitter--dragging"):t.classList.remove("st-splitter--dragging")}getID(t){return t.getAttribute("data-splitter-id")}disableIframe(t){document.querySelectorAll("iframe").forEach(e=>{e.style.pointerEvents=t?"none":""})}}return s.values={resizeTarget:String,storeKey:String},s.actions=[["element","mousedown@document->start"],["element","touchstart@document->start"]],s.dragActions=[["element","mousemove@document->move"],["element","touchmove@document->move"],["element","mouseup@document->end"],["element","touchend@document->end"],["element","selectstart@document->prevent"]],s});
//# sourceMappingURL=index.umd.js.map
