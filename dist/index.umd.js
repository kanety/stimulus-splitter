!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],e):(t||self).StimulusSplitter=e(t.Stimulus)}(this,function(t){class e{constructor(t){this.controller=t}get key(){return this.controller.storeKeyValue}get splitters(){return this.controller.splitters}load(){if(this.key){var t=this.constructor.load(this.key);t&&this.splitters.forEach(e=>{var s=t[this.controller.getID(e)];this.controller.panes(e).forEach((t,i)=>{this.controller.isVertical(e)?t.style.width=s[i][0]+"px":t.style.height=s[i][1]+"px"})})}}save(){if(this.key){var t={};this.splitters.forEach(e=>{var s=this.controller.panes(e);t[this.controller.getID(e)]=s.map(t=>[t.offsetWidth,t.offsetHeight])}),this.constructor.save(this.key,t)}}static load(t){var e=sessionStorage.getItem(t);try{return JSON.parse(e)}catch(t){return null}}static save(t,e){sessionStorage.setItem(t,JSON.stringify(e))}}class s extends t.Controller{get splitters(){return this.scope.findAllElements("[data-splitter-id]")}initialize(){this.store=new e(this)}connect(){this.store.load()}start(t){this.splitter=this.splitters.find(e=>e==t.target),this.splitter&&(this.startPos=this.pagePos(t),this.startSizes=this.panes(this.splitter).map(t=>this.paneSize(t)),this.toggleClass(this.splitter,!0),this.disableIframe(!0),this.context.actionSet.add(this.constructor.dragActions))}move(t){var e=this.pagePos(t),s=this.panes(this.splitter);this.isVertical(this.splitter)?this.updateWidth(s,e):this.updateHeight(s,e)}end(t){this.toggleClass(this.splitter,!1),this.disableIframe(!1),this.context.actionSet.remove(this.constructor.dragActions),this.dispatch("resized",{detail:{splitter:this.splitter}}),this.splitter=null,this.store.save()}prevent(t){t.preventDefault()}pagePos(t){return{x:t.changedTouches?t.changedTouches[0].pageX:t.pageX,y:t.changedTouches?t.changedTouches[0].pageY:t.pageY}}panes(t){if(this.element.matches("table")){var e=t.closest("th,td");return[e.previousElementSibling,e]}return[t.previousElementSibling,t.nextElementSibling]}paneSize(t){return{width:t.offsetWidth,height:t.offsetHeight}}isVertical(t){return this.element.matches("table")||t.parentNode.matches(".st-splitter-vertical")}updateWidth(t,e){var s=this.startSizes[0].width+(e.x-this.startPos.x),i=this.startSizes[1].width-(e.x-this.startPos.x);"both"==this.updateTargetValue?s>0&&i>0&&(t[0].style.width=s+"px",t[1].style.width=i+"px"):s>0&&(t[0].style.width=s+"px")}updateHeight(t,e){var s=this.startSizes[0].height+(e.y-this.startPos.y),i=this.startSizes[1].height-(e.y-this.startPos.y);"both"==this.updateTargetValue?s>0&&i>0&&(t[0].style.height=s+"px",t[1].style.height=i+"px"):s>0&&(t[0].style.height=s+"px")}toggleClass(t,e){e?t.classList.add("st-splitter--dragging"):t.classList.remove("st-splitter--dragging")}getID(t){return t.getAttribute("data-splitter-id")}disableIframe(t){document.querySelectorAll("iframe").forEach(e=>{e.style.pointerEvents=t?"none":""})}}return s.values={updateTarget:String,storeKey:String},s.actions=[["element","mousedown@document->start"],["element","touchstart@document->start"]],s.dragActions=[["element","mousemove@document->move"],["element","touchmove@document->move"],["element","mouseup@document->end"],["element","touchend@document->end"],["element","selectstart@document->prevent"]],s});
//# sourceMappingURL=index.umd.js.map
