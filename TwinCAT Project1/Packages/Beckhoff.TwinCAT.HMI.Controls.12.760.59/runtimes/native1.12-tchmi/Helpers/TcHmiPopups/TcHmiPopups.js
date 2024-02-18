var TcHmi,__classPrivateFieldGet=this&&this.__classPrivateFieldGet||function(receiver,state,kind,f){if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===kind?f:"a"===kind?f.call(receiver):f?f.value:state.get(receiver)};!function(TcHmi){!function(Controls){!function(Helpers){var _a,_Popup_tchmiFQN;class Popup{constructor(__parentControl){this.__parentControl=__parentControl,this.__childControls=[],this.__destroyers=[],this.__prompt=null,this.__isShowing=!1,this.__onShowManager=new Helpers.CallbackManager,this.onShow=this.__onShowManager.getManipulators(),this.__onHideManager=new Helpers.CallbackManager,this.onHide=this.__onHideManager.getManipulators(),this.__onBoundsChangeManager=new Helpers.CallbackManager,this.onBoundsChange=this.__onBoundsChangeManager.getManipulators(),this.__backgroundAction={close:!0},this.__backgroundMode=Popup.BackgroundMode.Dimmed,this.__positioningMode=Popup.PositioningMode.Centered,this.__bounds=null,this.__movable=!1,this.__className="TcHmi_Controls_Helpers_Popup",this.__localizationSymbols=new Map,this.__eventHandlers={onCloseClick:this.__onCloseClick.bind(this),onPopupMouseDown:this.__onPopupMouseDown.bind(this),onDocumentMouseMove:this.__onDocumentMouseMove.bind(this),onDocumentMouseUp:this.__onDocumentMouseUp.bind(this),onPopupTouchStart:this.__onPopupTouchStart.bind(this),onDocumentTouchMove:this.__onDocumentTouchMove.bind(this),onDocumentTouchEndOrCancel:this.__onDocumentTouchEndOrCancel.bind(this)},this.__passiveEventOptions={passive:!0,capture:!1},this.__touchLock=!1,this.__touchLockTimeoutId=0,this.__movingInfo={moving:!1,startLeftOffset:0,startTopOffset:0,minLeft:0,minTop:0,maxLeft:0,maxTop:0},this.__animationFrameId=0,this.__resizeObs=new ResizeObserver((resizeEvents=>{if(!this.__isShowing)return;const boundsElement=this.__element.getBoundingClientRect(),minLeft=50-boundsElement.width,maxLeft=window.innerWidth-50,maxTop=window.innerHeight-50;if(this.__bounds){let update=!1;const newBounds=tchmi_clone_object(this.__bounds);boundsElement.top<0?(update=!0,newBounds.top=0):boundsElement.top>maxTop&&(update=!0,newBounds.top=maxTop),boundsElement.left<minLeft?(update=!0,newBounds.left=minLeft):boundsElement.left>maxLeft&&(update=!0,newBounds.left=maxLeft),update&&this.setBounds(newBounds)}})),this.__name=`${this.constructor.name}-${tchmi_create_guid()}`,this.__parentControl&&(this.__name=`${this.__parentControl.getId()}.${this.__name}`);const controlClass=this.__parentControl?.getType().replace(/\./g,"_");this.__element=document.createElement("div"),this.__element.classList.add(this.__className,`${this.__className}-${this.constructor.name}`),controlClass&&this.__element.classList.add(`${controlClass}-popup`),this.__elementHeaderContainer=document.createElement("div"),this.__elementHeaderContainer.classList.add(`${this.__className}-header-container`),this.__elementHeader=document.createElement("h1"),this.__elementHeaderContainer.appendChild(this.__elementHeader),this.__elementClose=document.createElement("a"),this.__element.appendChild(this.__elementHeaderContainer),this.__elementContent=document.createElement("div"),this.__elementContent.classList.add(`${this.__className}-content`),this.__element.appendChild(this.__elementContent),this.__elementFooter=document.createElement("div"),this.__elementFooter.classList.add(`${this.__className}-footer`),this.__element.appendChild(this.__elementFooter),this.__parentControl&&TcHmi.EventProvider.register(this.__parentControl.getId()+".onDestroyed",(event=>{event.destroy(),this.destroy()})),this.__elementClose.addEventListener("click",this.__eventHandlers.onCloseClick,this.__passiveEventOptions),this.__element.addEventListener("mousedown",this.__eventHandlers.onPopupMouseDown,this.__passiveEventOptions),this.__element.addEventListener("touchstart",this.__eventHandlers.onPopupTouchStart,this.__passiveEventOptions)}show(){this.__isShowing||(this.__resizeObs.observe(this.__element),this.__isShowing=!0,TcHmi.TopMostLayer.addEx(this.__element,{removeCb:data=>{data.canceled&&this.__performBackgroundAction(),this.__isShowing=!1},centerHorizontal:this.__positioningMode===Popup.PositioningMode.Centered,centerVertical:this.__positioningMode===Popup.PositioningMode.Centered,dimBackground:this.__backgroundMode===Popup.BackgroundMode.Dimmed&&this.__backgroundAction.close,closeOnBackground:this.__backgroundMode===Popup.BackgroundMode.Dimmed&&this.__backgroundAction.close,modal:this.__positioningMode!==Popup.PositioningMode.Floating}),this.__onShowManager.trigger())}hide(){this.__isShowing&&(this.__isShowing=!1,TcHmi.TopMostLayer.removeEx(this.__element),this.__resizeObs.unobserve(this.__element),this.__onHideManager.trigger())}prompt(){return this.__prompt?.error(new Error("Popup was prompted again without the previous prompt having been resolved.")),this.show(),new Promise(((resolve,reject)=>{this.__prompt={answer:value=>{resolve(value),this.__prompt=null,this.hide()},error:value=>{reject(value),this.__prompt=null,this.hide()}}}))}abort(){this.hide(),this.__performBackgroundAction(),this.__prompt?.error(new Error("Popup was aborted, but had no background action set."))}destroy(force=!1){for(const destroy of this.__destroyers)destroy();this.__destroyers=[];for(const control of this.__childControls)force&&this.__parentControl&&this.__parentControl.__removeChild(control),control.destroy();this.__childControls=[];for(const entry of this.__localizationSymbols.values())entry.destroyWatch(),entry.symbol.destroy();this.__localizationSymbols.clear(),this.__elementClose.removeEventListener("click",this.__eventHandlers.onCloseClick,this.__passiveEventOptions),this.__element.removeEventListener("mousedown",this.__eventHandlers.onPopupMouseDown,this.__passiveEventOptions),document.removeEventListener("mouseup",this.__eventHandlers.onDocumentMouseUp,this.__passiveEventOptions),document.removeEventListener("mousemove",this.__eventHandlers.onDocumentMouseMove,this.__passiveEventOptions),this.__element.removeEventListener("touchstart",this.__eventHandlers.onPopupTouchStart,this.__passiveEventOptions),document.removeEventListener("touchmove",this.__eventHandlers.onDocumentTouchMove,this.__passiveEventOptions),document.removeEventListener("touchend",this.__eventHandlers.onDocumentTouchEndOrCancel,this.__passiveEventOptions),document.removeEventListener("touchcancel",this.__eventHandlers.onDocumentTouchEndOrCancel,this.__passiveEventOptions),this.__resizeObs.disconnect()}isShowing(){return this.__isShowing}hasActivePrompt(){return null!==this.__prompt}resetBounds(){this.__storage?.delete("bounds"),this.setBounds(null)}setBackgroundAction(action){this.__backgroundAction=action,this.__isShowing&&TcHmi.TopMostLayer.addEx(this.__element,{allowMultipleCall:!0,dimBackground:this.__backgroundMode===Popup.BackgroundMode.Dimmed&&this.__backgroundAction.close,closeOnBackground:this.__backgroundMode===Popup.BackgroundMode.Dimmed&&this.__backgroundAction.close})}setBackgroundMode(mode){this.__backgroundMode=mode,this.__isShowing&&TcHmi.TopMostLayer.addEx(this.__element,{allowMultipleCall:!0,dimBackground:this.__backgroundMode===Popup.BackgroundMode.Dimmed&&this.__backgroundAction.close,closeOnBackground:this.__backgroundMode===Popup.BackgroundMode.Dimmed&&this.__backgroundAction.close})}setPositioningMode(mode){this.__positioningMode=mode,this.__processBounds(this.__bounds),this.__isShowing&&TcHmi.TopMostLayer.addEx(this.__element,{allowMultipleCall:!0,centerHorizontal:this.__positioningMode===Popup.PositioningMode.Centered,centerVertical:this.__positioningMode===Popup.PositioningMode.Centered,modal:this.__positioningMode!==Popup.PositioningMode.Floating})}setBounds(bounds){this.__bounds=bounds,this.__processBounds(this.__bounds),this.__onBoundsChangeManager.trigger({bounds:this.__bounds})}__processBounds(bounds){if(!bounds)return;if("number"==typeof bounds.width?this.__element.style.width=bounds.width+(bounds.widthUnit??"px"):this.__element.style.width="","number"==typeof bounds.height?this.__element.style.height=bounds.height+(bounds.heightUnit??"px"):this.__element.style.height="",this.__positioningMode!==Popup.PositioningMode.Floating)return;let positionAbsolute=!1;"number"==typeof bounds.left?(this.__element.style.left=bounds.left+(bounds.leftUnit??"px"),positionAbsolute=!0):this.__element.style.left="","number"==typeof bounds.top?(this.__element.style.top=bounds.top+(bounds.topUnit??"px"),positionAbsolute=!0):this.__element.style.top="","number"==typeof bounds.right?(this.__element.style.right=bounds.right+(bounds.rightUnit??"px"),positionAbsolute=!0):this.__element.style.right="","number"==typeof bounds.bottom?(this.__element.style.bottom=bounds.bottom+(bounds.bottomUnit??"px"),positionAbsolute=!0):this.__element.style.bottom="",this.__element.style.position=positionAbsolute?"absolute":""}setMovable(movable){this.__movable=movable,this.__movable?this.__element.style.touchAction="pinch-zoom":this.__element.style.touchAction=""}setStorageSettings(settings){if(this.__storage=new TcHmi.LocalStorage(settings.name,{bounds:tchmi_clone_object(this.__bounds)}),this.__storageSettings=settings,this.__storageSettings.restoreBounds){const storedBounds=this.__storage.get("bounds");storedBounds&&this.setBounds(storedBounds)}}setCloseButton(closeButton){closeButton?this.__elementHeaderContainer.appendChild(this.__elementClose):this.__elementClose.remove()}__onCloseClick(event){this.__performBackgroundAction(),this.hide()}__onPopupMouseDown(event){if(!this.__touchLock&&event.target!==this.__elementClose&&(TcHmi.TopMostLayer.addEx(this.__element,{allowMultipleCall:!0}),this.__elementHeaderContainer.contains(event.target)&&this.__movable)){document.addEventListener("mouseup",this.__eventHandlers.onDocumentMouseUp,{...this.__passiveEventOptions,once:!0}),document.addEventListener("mousemove",this.__eventHandlers.onDocumentMouseMove,this.__passiveEventOptions);const boundsElement=this.__element.getBoundingClientRect();this.__movingInfo.startLeftOffset=event.clientX-boundsElement.x,this.__movingInfo.startTopOffset=event.clientY-boundsElement.y,this.__movingInfo.minLeft=50-boundsElement.width,this.__movingInfo.maxLeft=window.innerWidth-50,this.__movingInfo.maxTop=window.innerHeight-50,this.__movingInfo.moving=!0}}__onDocumentMouseUp(event){this.__touchLock||(document.removeEventListener("mousemove",this.__eventHandlers.onDocumentMouseMove,this.__passiveEventOptions),this.__movingInfo.moving=!1,this.__movingInfo.startLeftOffset=0,this.__movingInfo.startTopOffset=0,this.__bounds&&this.__movable&&(this.__storage?.set("bounds",this.__bounds),this.__onBoundsChangeManager.trigger({bounds:this.__bounds})))}__onDocumentMouseMove(event){if(0===event.buttons)return this.__movingInfo.moving=!1,this.__movingInfo.startLeftOffset=0,this.__movingInfo.startTopOffset=0,this.__touchLock=!1,void document.removeEventListener("mousemove",this.__eventHandlers.onDocumentMouseMove,this.__passiveEventOptions);if(this.__touchLock)return;if(!this.__movable)return;if(!this.__movingInfo.moving)return;let left=event.clientX-this.__movingInfo.startLeftOffset;left<this.__movingInfo.minLeft?left=this.__movingInfo.minLeft:left>this.__movingInfo.maxLeft&&(left=this.__movingInfo.maxLeft);let top=event.clientY-this.__movingInfo.startTopOffset;top<this.__movingInfo.minTop?top=this.__movingInfo.minTop:top>this.__movingInfo.maxTop&&(top=this.__movingInfo.maxTop),this.__bounds||(this.__bounds={}),this.__bounds.left=left,this.__bounds.leftUnit="px",this.__bounds.top=top,this.__bounds.topUnit="px",this.__animationFrameId||(this.__animationFrameId=window.requestAnimationFrame((()=>this.__updatePosition())))}__onPopupTouchStart(event){if(event.target!==this.__elementClose&&(TcHmi.TopMostLayer.addEx(this.__element,{allowMultipleCall:!0}),this.__elementHeaderContainer.contains(event.target))){if(this.__movable){document.addEventListener("touchmove",this.__eventHandlers.onDocumentTouchMove,this.__passiveEventOptions),document.addEventListener("touchend",this.__eventHandlers.onDocumentTouchEndOrCancel,{...this.__passiveEventOptions,once:!0}),document.addEventListener("touchcancel",this.__eventHandlers.onDocumentTouchEndOrCancel,{...this.__passiveEventOptions,once:!0});const boundsElement=this.__element.getBoundingClientRect();this.__movingInfo.startLeftOffset=event.touches[0].clientX-boundsElement.x,this.__movingInfo.startTopOffset=event.touches[0].clientY-boundsElement.y,this.__movingInfo.minLeft=50-boundsElement.width,this.__movingInfo.maxLeft=window.innerWidth-50,this.__movingInfo.maxTop=window.innerHeight-50,this.__movingInfo.moving=!0}this.__touchLockTimeoutId&&(clearTimeout(this.__touchLockTimeoutId),this.__touchLockTimeoutId=0),this.__touchLock=!0}}__onDocumentTouchEndOrCancel(event){document.removeEventListener("touchmove",this.__eventHandlers.onDocumentTouchMove,this.__passiveEventOptions),document.removeEventListener("touchend",this.__eventHandlers.onDocumentTouchEndOrCancel,this.__passiveEventOptions),document.removeEventListener("touchcancel",this.__eventHandlers.onDocumentTouchEndOrCancel,this.__passiveEventOptions),this.__movingInfo.moving=!1,this.__movingInfo.startLeftOffset=0,this.__movingInfo.startTopOffset=0,this.__bounds&&this.__movable&&(this.__storage?.set("bounds",this.__bounds),this.__onBoundsChangeManager.trigger({bounds:this.__bounds})),this.__touchLockTimeoutId&&(clearTimeout(this.__touchLockTimeoutId),this.__touchLockTimeoutId=0),this.__touchLockTimeoutId=setTimeout((()=>{this.__touchLock=!1}),500)}__onDocumentTouchMove(event){if(!this.__movable)return;if(!this.__movingInfo.moving)return;let left=event.touches[0].clientX-this.__movingInfo.startLeftOffset;left<this.__movingInfo.minLeft?left=this.__movingInfo.minLeft:left>this.__movingInfo.maxLeft&&(left=this.__movingInfo.maxLeft);let top=event.touches[0].clientY-this.__movingInfo.startTopOffset;top<this.__movingInfo.minTop?top=this.__movingInfo.minTop:top>this.__movingInfo.maxTop&&(top=this.__movingInfo.maxTop),this.__bounds||(this.__bounds={}),this.__bounds.left=left,this.__bounds.leftUnit="px",this.__bounds.top=top,this.__bounds.topUnit="px",this.__animationFrameId||(this.__animationFrameId=window.requestAnimationFrame((()=>this.__updatePosition())))}__updatePosition(){this.__movingInfo.moving&&this.__bounds&&(this.__element.style.left=this.__bounds.left+(this.__bounds.leftUnit??"px"),this.__element.style.top=this.__bounds.top+(this.__bounds.topUnit??"px")),this.__animationFrameId=0}__watchLocalization(name,localization,onChange){const existing=this.__localizationSymbols.get(name);existing?.destroyWatch(),existing?.symbol.destroy();const symbol=new TcHmi.Symbol(localization.symbolExpression),destroyWatch=symbol.watch((data=>{if(data.error!==TcHmi.Errors.NONE)return void(TCHMI_CONSOLE_LOG_LEVEL>=1&&TcHmi.Log.errorEx(`[Source=ControlHelpers, Module=${__classPrivateFieldGet(Popup,_a,"f",_Popup_tchmiFQN)}${this.__parentControl?`, Id=${this.__parentControl.getId()}`:""}, SymbolExpression=${localization.symbolExpression}] `+TcHmi.Log.buildMessage(data.details)));let text=data.value??"";localization.formatValues.length>0&&(text=tchmi_format_string(text,...localization.formatValues)),onChange(text)}));this.__localizationSymbols.set(name,{symbol:symbol,destroyWatch:destroyWatch})}__unwatchLocalization(name){const existing=this.__localizationSymbols.get(name);existing&&(existing.destroyWatch(),existing.symbol.destroy(),this.__localizationSymbols.delete(name))}}_Popup_tchmiFQN={value:"TcHmi.Controls.Helpers."+(_a=Popup).name},Helpers.Popup=Popup,function(Popup){let PositioningMode,BackgroundMode;!function(PositioningMode){PositioningMode[PositioningMode.Centered=1]="Centered",PositioningMode[PositioningMode.Floating=2]="Floating"}(PositioningMode=Popup.PositioningMode||(Popup.PositioningMode={})),function(BackgroundMode){BackgroundMode[BackgroundMode.None=1]="None",BackgroundMode[BackgroundMode.Dimmed=2]="Dimmed"}(BackgroundMode=Popup.BackgroundMode||(Popup.BackgroundMode={}))}(Popup=Helpers.Popup||(Helpers.Popup={}))}(Controls.Helpers||(Controls.Helpers={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),function(TcHmi){!function(Controls){!function(Helpers){class ButtonsPrompt extends Helpers.Popup{constructor(buttons,parentControl){super(parentControl),this.__buttons=new Map,this.__localizationSymbols=new Map,this.__backgroundAction={close:!0};for(const[name,buttonDef]of Object.entries(buttons)){let button=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiButton",`${this.__name}.${name}`,buttonDef.attributes,this.__parentControl);if(!button)throw new Error("Could not create controls for ButtonsPrompt.");this.__elementFooter.appendChild(button.getElement()[0]),this.__destroyers.push(TcHmi.EventProvider.register(button.getId()+".onPressed",this.__createPressedHandler(buttonDef.value))),this.__buttons.set(name,{value:buttonDef.value,button:button}),this.__childControls.push(button)}}destroy(force=!1){for(const button of this.__buttons.values())TcHmi.Binding.removeEx2(null,"Text",button.button),TcHmi.Binding.removeEx2(null,"Tooltip",button.button);super.destroy(force)}__createPressedHandler(value){return()=>{if(this.__parentControl){if(!this.__parentControl.getIsEnabled())return;if(!TcHmi.Access.checkAccess(this.__parentControl,"operate"))return}this.__prompt?this.__prompt.answer(value):this.hide()}}getButtons(){return this.__buttons}setBackgroundAction(action){super.setBackgroundAction(action)}__performBackgroundAction(){if(this.__prompt&&this.__backgroundAction.close)if("action"in this.__backgroundAction&&void 0!==this.__backgroundAction.action){const button=this.__buttons.get(this.__backgroundAction.action);button&&this.__prompt.answer(button.value)}else"result"in this.__backgroundAction&&this.__prompt.answer(this.__backgroundAction.result)}setLocalizations(texts){this.setTexts(texts)}setTexts(texts){if(void 0!==texts.headerText&&null!==texts.headerText&&("object"==typeof texts.headerText||TcHmi.Symbol.isSymbolExpression(texts.headerText)?this.__watchLocalization("headerText","string"==typeof texts.headerText?{symbolExpression:texts.headerText,formatValues:[]}:texts.headerText,(text=>this.__elementHeader.textContent=text)):(this.__unwatchLocalization("headerText"),this.__elementHeader.textContent=texts.headerText)),texts.buttons)for(const[name,localization]of Object.entries(texts.buttons)){const button=this.__buttons.get(name)?.button;button&&localization&&(void 0!==localization.text&&null!==localization.text&&("string"==typeof localization.text?(this.__unwatchLocalization("buttonText"+name),TcHmi.Symbol.isSymbolExpression(localization.text)?TcHmi.Binding.createEx2(localization.text,"Text",button):button.setText(localization.text)):(TcHmi.Binding.removeEx2(null,"Text",button),this.__watchLocalization("buttonText"+name,localization.text,(text=>button.setText(text))))),void 0!==localization.tooltip&&null!==localization.tooltip&&("string"==typeof localization.tooltip?(this.__unwatchLocalization("buttonTooltip"+name),TcHmi.Symbol.isSymbolExpression(localization.tooltip)?TcHmi.Binding.createEx2(localization.tooltip,"Tooltip",button):button.setTooltip(localization.tooltip)):(TcHmi.Binding.removeEx2(null,"Tooltip",button),this.__watchLocalization("buttonTooltip"+name,localization.tooltip,(tooltip=>button.setTooltip(tooltip))))))}}}Helpers.ButtonsPrompt=ButtonsPrompt}(Controls.Helpers||(Controls.Helpers={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),function(TcHmi){!function(Controls){!function(Helpers){class HtmlAndButtonsPrompt extends Helpers.ButtonsPrompt{constructor(buttons,parentControl){super(buttons,parentControl),this.__elementContentContent=null}destroy(force=!1){super.destroy(force),this.__elementContentContent=null}setContentElement(element){this.__elementContentContent&&this.__elementContentContent.remove(),this.__elementContentContent=element,this.__elementContent.appendChild(this.__elementContentContent)}}Helpers.HtmlAndButtonsPrompt=HtmlAndButtonsPrompt}(Controls.Helpers||(Controls.Helpers={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),function(TcHmi){!function(Controls){!function(Helpers){class TextAndButtonsPrompt extends Helpers.ButtonsPrompt{constructor(buttons,parentControl){super(buttons,parentControl)}setLocalizations(texts){this.setTexts(texts)}setTexts(texts){super.setTexts(texts),void 0!==texts.contentText&&null!==texts.contentText&&("object"==typeof texts.contentText||TcHmi.Symbol.isSymbolExpression(texts.contentText)?this.__watchLocalization("contentText","string"==typeof texts.contentText?{symbolExpression:texts.contentText,formatValues:[]}:texts.contentText,(text=>this.__elementContent.textContent=text)):(this.__unwatchLocalization("contentText"),this.__elementContent.textContent=texts.contentText))}}Helpers.TextAndButtonsPrompt=TextAndButtonsPrompt}(Controls.Helpers||(Controls.Helpers={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),function(TcHmi){!function(Controls){!function(Helpers){class OkCancelPrompt extends Helpers.Popup{constructor(parentControl){super(parentControl),this.__backgroundAction={close:!0},this.__onOkPressed=()=>{if(this.__parentControl){if(!this.__parentControl.getIsEnabled())return;if(!TcHmi.Access.checkAccess(this.__parentControl,"operate"))return}this.__ok()},this.__onCancelPressed=()=>{if(this.__parentControl){if(!this.__parentControl.getIsEnabled())return;if(!TcHmi.Access.checkAccess(this.__parentControl,"operate"))return}this.__cancel()};let okButton=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiButton",`${this.__name}.okButton`,{"data-tchmi-width":60,"data-tchmi-height":30,"data-tchmi-is-enabled":!1,"data-tchmi-ignore-escape-sequences":!0},this.__parentControl),cancelButton=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiButton",`${this.__name}.cancelButton`,{"data-tchmi-width":60,"data-tchmi-height":30,"data-tchmi-ignore-escape-sequences":!0},this.__parentControl);if(!okButton||!cancelButton)throw new Error("Could not create controls for OkCancelPrompt.");this.__elementFooter.appendChild(okButton.getElement()[0]),this.__destroyers.push(TcHmi.EventProvider.register(okButton.getId()+".onPressed",this.__onOkPressed)),this.__elementFooter.appendChild(cancelButton.getElement()[0]),this.__destroyers.push(TcHmi.EventProvider.register(cancelButton.getId()+".onPressed",this.__onCancelPressed)),this.__okButton=okButton,this.__cancelButton=cancelButton,this.__childControls.push(okButton,cancelButton)}destroy(force=!1){TcHmi.Binding.removeEx2(null,"Text",this.__okButton),TcHmi.Binding.removeEx2(null,"Tooltip",this.__okButton),TcHmi.Binding.removeEx2(null,"Text",this.__cancelButton),TcHmi.Binding.removeEx2(null,"Tooltip",this.__cancelButton),super.destroy(force)}__cancel(){this.__prompt?.answer({isOk:!1})}setBackgroundAction(action){super.setBackgroundAction(action)}__performBackgroundAction(){if(this.__backgroundAction.close&&this.__backgroundAction.action)switch(this.__backgroundAction.action){case"ok":this.__ok();break;case"cancel":this.__cancel()}}setLocalizations(texts){this.setTexts(texts)}setTexts(texts){void 0!==texts.buttonTextOk&&null!==texts.buttonTextOk&&("string"==typeof texts.buttonTextOk?(this.__unwatchLocalization("buttonTextOk"),TcHmi.Symbol.isSymbolExpression(texts.buttonTextOk)?TcHmi.Binding.createEx2(texts.buttonTextOk,"Text",this.__okButton):this.__okButton.setText(texts.buttonTextOk)):(TcHmi.Binding.removeEx2(null,"Text",this.__okButton),this.__watchLocalization("buttonTextOk",texts.buttonTextOk,(text=>this.__okButton.setText(text))))),void 0!==texts.buttonTooltipOk&&null!==texts.buttonTooltipOk&&("string"==typeof texts.buttonTooltipOk?(this.__unwatchLocalization("buttonTooltipOk"),TcHmi.Symbol.isSymbolExpression(texts.buttonTooltipOk)?TcHmi.Binding.createEx2(texts.buttonTooltipOk,"Tooltip",this.__okButton):this.__okButton.setTooltip(texts.buttonTooltipOk)):(TcHmi.Binding.removeEx2(null,"Tooltip",this.__okButton),this.__watchLocalization("buttonTooltipOk",texts.buttonTooltipOk,(text=>this.__okButton.setTooltip(text))))),void 0!==texts.buttonTextCancel&&null!==texts.buttonTextCancel&&("string"==typeof texts.buttonTextCancel?(this.__unwatchLocalization("buttonTextCancel"),TcHmi.Symbol.isSymbolExpression(texts.buttonTextCancel)?TcHmi.Binding.createEx2(texts.buttonTextCancel,"Text",this.__cancelButton):this.__okButton.setText(texts.buttonTextCancel)):(TcHmi.Binding.removeEx2(null,"Text",this.__cancelButton),this.__watchLocalization("buttonTextCancel",texts.buttonTextCancel,(text=>this.__cancelButton.setText(text))))),void 0!==texts.buttonTooltipCancel&&null!==texts.buttonTooltipCancel&&("string"==typeof texts.buttonTooltipCancel?(this.__unwatchLocalization("buttonTooltipCancel"),TcHmi.Symbol.isSymbolExpression(texts.buttonTooltipCancel)?TcHmi.Binding.createEx2(texts.buttonTooltipCancel,"Tooltip",this.__cancelButton):this.__okButton.setText(texts.buttonTooltipCancel)):(TcHmi.Binding.removeEx2(null,"Tooltip",this.__cancelButton),this.__watchLocalization("buttonTooltipCancel",texts.buttonTooltipCancel,(text=>this.__cancelButton.setTooltip(text)))))}}Helpers.OkCancelPrompt=OkCancelPrompt}(Controls.Helpers||(Controls.Helpers={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),function(TcHmi){!function(Controls){!function(Helpers){class InputPrompt extends Helpers.OkCancelPrompt{constructor(parentControl){super(parentControl),this.__forbiddenValues=new Set,this.__validationPatterns=[],this.__onTextChanged=()=>{if(this.__parentControl){if(!this.__parentControl.getIsEnabled())return;if(!TcHmi.Access.checkAccess(this.__parentControl,"operate"))return}this.__validate()},this.__onKeydown=e=>{if(this.__parentControl){if(!this.__parentControl.getIsEnabled())return;if(!TcHmi.Access.checkAccess(this.__parentControl,"operate"))return}"Enter"===e.key&&this.__ok()},this.__elementLabel=document.createElement("span"),this.__elementLabel.className=`${this.__className}-label-block`,this.__elementContent.appendChild(this.__elementLabel);let input=TcHmi.ControlFactory.createEx("TcHmi.Controls.Beckhoff.TcHmiInput",`${this.__name}.input`,{"data-tchmi-height":26,"data-tchmi-content-padding":{top:3,right:3,bottom:3,left:3},"data-tchmi-ignore-escape-sequences":!0},this.__parentControl);if(!input)throw new Error("Could not create controls for InputPrompt.");this.__input=input,this.__childControls.push(input);let inputElement=input.getElement()[0];inputElement.classList.add("with-validation"),this.__elementContent.appendChild(inputElement),this.__destroyers.push(TcHmi.EventProvider.register(input.getId()+".onTextChanged",this.__onTextChanged)),this.__element.addEventListener("keydown",this.__onKeydown),this.__destroyers.push((()=>this.__element.removeEventListener("keydown",this.__onKeydown)))}__validate(){const text=this.__input.getText(),isValid=void 0!==text&&this.__isValid(text);this.__okButton.setIsEnabled(isValid),this.__input.getElement()[0].classList.toggle("invalid",!isValid)}__isValid(text){return!this.__forbiddenValues.has(text)&&this.__validationPatterns.every((validation=>validation.pattern.test(text)===validation.expectedTestResult))}__ok(){let text=this.__input.getText();void 0!==text&&this.__isValid(text)?this.__prompt?.answer({isOk:!0,value:text}):this.__prompt?.error(new Error("Invalid input."))}prompt(forbiddenValues=null,defaultValue=""){this.__forbiddenValues=new Set(forbiddenValues),this.__input.setText(defaultValue),this.__validate();let input=this.__input.getElement()[0].querySelector("input");return input instanceof HTMLInputElement&&(input.selectionDirection="forward",input.selectionStart=0,input.selectionEnd=input.value.length),super.prompt()}show(){const oldOpeningState=this.isShowing();if(super.show(),oldOpeningState)return;let input=this.__input.getElement()[0].querySelector("input");input instanceof HTMLInputElement&&input.focus()}setValidationPatterns(patterns){this.__validationPatterns=patterns,this.__validate()}getValidationPatterns(){return this.__validationPatterns}setLocalizations(texts){this.setTexts(texts)}setTexts(texts){super.setTexts(texts),void 0!==texts.labelText&&null!==texts.labelText&&("object"==typeof texts.labelText||TcHmi.Symbol.isSymbolExpression(texts.labelText)?this.__watchLocalization("labelText","string"==typeof texts.labelText?{symbolExpression:texts.labelText,formatValues:[]}:texts.labelText,(text=>this.__elementLabel.textContent=text)):(this.__unwatchLocalization("labelText"),this.__elementLabel.textContent=texts.labelText)),void 0!==texts.headerText&&null!==texts.headerText&&("object"==typeof texts.headerText||TcHmi.Symbol.isSymbolExpression(texts.headerText)?this.__watchLocalization("headerText","string"==typeof texts.headerText?{symbolExpression:texts.headerText,formatValues:[]}:texts.headerText,(text=>this.__elementHeader.textContent=text)):(this.__unwatchLocalization("headerText"),this.__elementHeader.textContent=texts.headerText))}}Helpers.InputPrompt=InputPrompt}(Controls.Helpers||(Controls.Helpers={}))}(TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={}));