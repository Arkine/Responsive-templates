// JavaScript Document// Browser Capability Variables
var isStnd = document.getElementById ? true : false; // Standards compliant
var isIE = document.all ? true : false; // IE 4/5
var isNN4 = document.layers ? true : false; // NN 4.x
var DHTML = (isStnd || isIE || isNN4); // Any of the above

// Layer effect variables. Note: 'DYN' denotes value that will need to be assigned at runtime.
var autoHide = false;
var autoClose = false;
var numTips = 16; // DYN
var tipTop = 78;
var tipLeft = 240;
var currTipID = ""; // keep track of tooltip
var lastTipID = ""; // keep track of tooltip
var currRollID = "";
var lastRollID = "";
var tipOpen = false; // is a tooltip open?
var fadeOn = false; // is fade effect on? value toggled via function setFade
var fadeTime; // delay time between fade intervals
var closeTime = 2000;  // delay time to hide tooltip after it is open
var ocDelay = 400;
var ctID = 0; // id for close timeout
var ocID = 0; // id for open/close timeout
var fadeLayer, amount, clipTop, clipWidth, clipBottom, clipMid, lyrheight; // used by fade functions 
var mouseX = 0; // for use with layer positioning off mouse coords
var mouseY = 0; // for use with layer positioning off mouse coords

var hideRollcons = false;

//displayItem('open');

/* Query string processing
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	this.getValue = function(s) {
	for(var j=0; j < this.keyValuePairs.length; j++) {
		if(this.keyValuePairs[j].split("=")[0] == s)
		return this.keyValuePairs[j].split("=")[1];
	}
	return false;
}
	
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}
	
	this.getLength = function() { return this.keyValuePairs.length; }
}
 */
function queryString(key){
	var page = new PageQuery(window.location.search);
	return unescape(page.getValue(key));
}
/*
function displayItem(key){
	if(queryString(key)=='false'){
		;
		//alert("you didn't enter a ?name=value querystring item.");
	}else{
		if(queryString(key) == "regional-map"){
			openMap(null);
		}
		//alert(queryString(key));
	}
}
 */
function initTooltips(section,_hideRollcons,_tipTop){
	hideRollcons = _hideRollcons;
	tipTop = _tipTop;
	//initInserts(section);
	initTips();
	//showDefaultTip();
	//setFade(false);
	//hideTooltips(); // call to close tip1
}
initTooltips();
/*function initInserts(section){
	var msg = "Getting inserts: \n";
	//alert("InitInserts()");
	// if (document.all && document.getElementById) {
		nodeRoot = document.getElementById(section);
		for (i=0; i<nodeRoot.childNodes.length; i++) 
			node = nodeRoot.childNodes[i];
			if ((node.nodeName=="DIV")) {
				if((node.className == "insert") || (node.className == "insert pbreak")){
					if(node.addEventListener){ // for Mozilla
						msg += "Mozilla Insert " + node.id + "\n"; // e.g. "roll0"
						//node.addEventListener('mouseover', showCursor, false);
						//node.addEventListener('mouseout', hideCursor, false);
						node.addEventListener('click', showRollCon, false);
					}else{ // for IE
						//node.onmouseover = showCursor;
						//node.onmouseout = hideCursor;
						node.onclick = delayShowRollCon;
					}
					
					// Dig the rollcon
					/*
					if(hideRollcons){
						conRoot = document.getElementById(node.id);
						for (j=0; j<conRoot.childNodes.length; j++) {
							node = conRoot.childNodes[j];
							if ((node.nodeName=="DIV") && (node.className == "rollcon")) {
	
								if((node != null) && (node.style) && (node.style.visibility != null)){
									msg += "RollCon " + node.id + "\n";
									visib(node.id, false);
								}
							}
						}
					}
				
				}
			}
		} // end for each tip
	//} // end if getElementById
	if (isNN4) document.captureEvents(Event.MOUSEMOVE);
	document.onmousemove = handleMouseMove;

	//alert(msg);
}

function showCursor(evt){
	//alert("ShowCursor");
	evt = (evt) ? evt : ((event) ? event : null);
	
	if(evt){
		var elem = (evt.target) ? evt.target : evt.srcElement;
		if(elem.nodeType == 3){
			elem = elem.parentNode;
		}
		
		if(elem.id){
			//alert("Show cursor on " + elem.id);
			x = new getObj( elem.id );
			x.style.cursor = 'hand';
		}
		
	}
}

function hideCursor(evt){
	//alert("ShowCursor");
	evt = (evt) ? evt : ((event) ? event : null);
	
	if(evt){
		var elem = (evt.target) ? evt.target : evt.srcElement;
		if(elem.nodeType == 3){
			elem = elem.parentNode;
		}
		
		if(elem.id){
			//alert("Show cursor on " + elem.id);
			x = new getObj( elem.id );
			x.style.cursor = 'pointer';
		}
		
	}
}
*/
function initTips(){
	var msg = "Getting nodes: \n";
	
	// if (document.all && document.getElementById) {
	// Add events to the map anchors ...
		btnRoot = document.getElementById("map");
		for (i=0; i<btnRoot.childNodes.length; i++) {			
			btn = btnRoot.childNodes[i];
			if (btn.nodeName=="AREA") {
				//msg += "Btn " + btn.id + "\n";
				if(btn.addEventListener){ // for Mozilla
					btn.addEventListener('mouseover', showTooltip, false);
					btn.addEventListener('mousemove', hideTooltip, false);
				}else{ // for IE
					btn.onmouseover = showTooltip;
					if(autoHide) btn.onmousemove = delayHideTooltip;
				}
			}
		} // end for each tip
		
		// Add events to each tooltip ... 
		/*tipRoot = document.getElementById("tips");
		for (i=0; i<tipRoot.childNodes.length; i++) {
			tip = tipRoot.childNodes[i];
			if ((tip.nodeName=="DIV" && tip.className == "tip") && (tip.id != 'default')) {
				//msg += "Tip " + tip.id + "\n";
				if(currTipID == "") currTipID = lastTipID = tip.id;
				if(tip.addEventListener){ // for Mozilla
					if(autoHide) tip.addEventListener('mousemove', delayHideTooltip, false);
				}else{ // for IE
					if(autoHide) tip.onmousemove = delayHideTooltip;
				}
				
				visib(tip.id, false);
			}
		} // end for each tip
		*/
		if (isNN4) document.captureEvents(Event.MOUSEMOVE);
		document.onmousemove = handleMouseMove;
		
		//alert(msg);
	//} // end if getElementById
}

/*
	HandleMouseMove handles onmousemove events as defined in function initTooltips.
	Requires: Event object
	Returns: mouseX, mouseY, and displays coords in browser status bar.
*/
function handleMouseMove(evt) {
	
	//if(!tipOpen){
		//mouseX = isNN4 ? evt.pageX : window.event.clientX;
  		//mouseY = isNN4 ? evt.pageY : window.event.clientY;
	if((typeof(window.event) == 'undefined') || isNN4){
  		mouseX = evt.pageX;
  		mouseY = evt.pageY;
	} else {
		mouseX = window.event.clientX;
  		mouseY = window.event.clientY;
	}
  		//window.status = "Mouse: "+mouseX+","+mouseY;
	//}
  return false;
}

/*
	HideTooltips all tooltip layers.
	Requires: tooltip layers
	Returns: sets tipOpen = false
	Error checking: none
*/
function hideTooltips(){
	var msg = "";
	if (!DHTML) return; 
	if(document.releaseCapture){
		document.releaseCapture();
	}
	if(isStnd){
		//alert(navRoot.childNodes.length);
		navRoot = document.getElementById("tips");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if((node != null) && (node.style) && (node.style.visibility != null) && (node.id != 'default')){
				msg += "Node " + node.id + "\n";
				node.style.visibility = "hidden";
				node.style.position = "absolute";
			}
		}
		//xHeight("tips",15);
		//alert(msg);
	}
	tipOpen = false;
	if (ctID) clearTimeout(ctID); 
}

/*
	HideTooltip hides one tooltip layer.
	Requires: parameter tooltip layer
	Returns: sets tipOpen = false
	Error checking: none
*/
function hideTooltip(tid){
	if (!DHTML) return;
	//alert("Hiding tip");
	if(isStnd){
		if(typeof(tid) == "object"){
			var div = tid;
		}else if(typeof(tid) == "string"){
			//var div = gbi(tid);
			var div = new getObj(tid); 
		}else{
			;
		}
		
		if((div != null) && (div.style) && (div.style.visibility != null)){
			div.style.visibility = "hidden";
		}
	}
	if (ctID) clearTimeout(ctID);
}

/*
	delayHideTooltip closes a layer after the closeTime amount of time.
	Requires: nothing
	Returns: sets timeout
	Error checking: TODO - Check availability of currTipID
*/
function delayHideTooltip(){
	if (!DHTML) return; 
	//alert("ctID is " + ctID);
	if (ctID) clearTimeout(ctID); 
	var timeoutstr = "hideTooltip(\'" + currTipID + "\');";
	ctID = setTimeout(timeoutstr, closeTime);
}
/*
function showDefaultTip(){
	var tooltip = gbi('default');
	tooltip.style.position = "absolute";
	tooltip.style.left = tipLeft + "px";
	tooltip.style.top = (tipTop + 35) + "px";
	//tooltip.style.zIndex = "2";
	visib('default', true); 
}


	showTooltip opens and starts any transitional effects.
	Requires: Event object
	Returns: nothing
	Error checking: none
*/
function gbi(e) {
  if(typeof(e)!='string') return e;
  if(document.getElementById) e=document.getElementById(e);
  else if(document.all) e=document.all[e];
  else if(document.layers) e=xLayer(e);
  else e=null;
  return e;
}
function showTooltip(evt){
	console.log(evt);
	if (!DHTML) return; 
	var offsetX =100, offsetY =-270;
	//alert("Calling hideTooltips()");
	//hideTooltips();
	tipOpen = true;
	evt = (evt) ? evt : ((event) ? event : null);
	if(evt){
		var elem = (evt.target) ? evt.target : evt.srcElement;
		
		if(elem.nodeType == 3){
			elem = elem.parentNode;
		}

		//alert("Showing tooltip: Elem.className = " + elem.className + ", elem.id = " + elem.id);
		
		
			//lastTipID = currTipID;
			var idx = elem.id.indexOf("_");
			
			currTipID =  elem.id.substring(0,idx);
			
			//alert("Showing tooltip: " + currTipID);
			
			var tooltip = gbi(currTipID);
			// turn on IE mouse capture
			/*
			if(tooltip.mouseCapture){		
				tooltip.mouseCapture();
			}
			*/
			// Uncomment to position off div
			var coords = getCoordsByElement(elem); 
			
			// Uncomment to position off mouse
			//var coords = getCoordsByMouseXY();
		
			
			/*tooltip.style.left = (coords.x + offsetX) + "px";
			tooltip.style.top = (coords.y + offsetY) + "px";*/
			
			tooltip.style.left = tipLeft + "px";
			tooltip.style.top = tipTop + "px";
			tooltip.style.zIndex = "9"; // required by NN7
			
			if ( fadeOn ) { 
				firstFade = true; 
				prepLyr(lastTipID, true ); 
				startFade(lastTipID, 50, 25); 
			} else { 
				visib(lastTipID, false); 
				visib(currTipID, true); 
			} 
			lastTipID = currTipID; 
			
			if(evt.preventDefault){
				evt.preventDefault();
			}
			evt.returnValue = false;
			if(autoHide) delayHideTooltip();
		
	}
}



/* Use this function to open section based on event target */
function showRollCon(evt){
	//alert("ShowRollCon");
	if (!DHTML) return; 
	//hideRollCons();
	var msg = "";

	evt = (evt) ? evt : ((event) ? event : null);
	if(evt){
		var elem = (evt.target) ? evt.target : evt.srcElement;
		
		//if((elem.nodeType == 3) || (elem.nodeType == "")){
			elem = elem.parentNode;
		//}
		
		/*for(i in elem.parentNode){
			msg += "elem["+i+"] = " + elem[i] + "\n";
		}
		alert(msg);
		*/
		//alert(elem.parentNode.id);
		if((elem.className == "btn")){
			if(elem.className == "btn") {
				currRollID = elem.parentNode.id + "-con";
			} else {
				currRollID = elem.id + "-con";
			}
			
			if ( fadeOn ) { 
				firstFade = true; 
				prepLyr(rollConID, true ); 
				startFade(rollConID, 50, 25); 
			} else { 
				if(lastRollID == currRollID) {
					//alert(currRollID);
					visib(currRollID, false);
					swapArrow('up',elem.parentNode.id);
					lastRollID = "";
				} else {
					//alert(currRollID);
					if(autoClose && (lastRollID != "")) {
						// Roll up last div
						var lastBtn = gbi(lastRollID);
						swapArrow('up',lastBtn.parentNode.id);
						visib(lastRollID, false);
					}
					visib(currRollID, true); 
					swapArrow('down',elem.parentNode.id);
					lastRollID = currRollID; 
				}
			} 
			
			
			if(evt.preventDefault){
				evt.preventDefault();
			}
			evt.returnValue = false;
			if(autoHide) delayHideTooltip();
		}
	}
	
	if (ocID) clearTimeout(ocID);
}

/* Use this function to open section based on id */
function showRollConX(id){
	currRollID = id;
	x = new getObj(id);

	//alert("ShowRollConX ID = " + x.obj.id);

		if(lastRollID == currRollID) {
			visib(currRollID, false);
			swapArrow('up', x.obj.parentNode.id);
			lastRollID = "";
		} else {
			if(autoClose && (lastRollID != "")) {
				visib(lastRollID, false);
				swapArrow('up',lastRollID);
			}
			visib(currRollID, true); 
			swapArrow('down',x.obj.parentNode.id);
			lastRollID = currRollID;
		}

}

/*
function openMap(id){
	var anchor = "#mapanchor";
	if(id != null) lastRollID = id;
	showRollConX('roll4-con'); // 'roll4-con' is div id with map
	window.location.hash = anchor;
}

function swapArrow(direction, section) {
	var obj = document.getElementById(section + 'arrow');
	//alert("Swap " + section + 'arrow' +  ' = ' + obj.src);
	var upImg = new Image();
	var dwnImg = new Image();
	dwnImg.src = '../images/nav_arrow_sub_orange_dwn.gif';
	upImg.src = '../images/nav_arrow_sub_orange.gif';
	
	//alert("Down " + dwnImg.src);
	
	if(direction == "down"){
		obj.src = dwnImg.src;
	} else {
		obj.src = upImg.src;
	}
}

	getCoordsByMouseXY retrieves point array containing current mouse coordinates.
	Requires: Event object
	Returns: Coordinates coords[]
	Error checking: none

*/
 function getCoordsByMouseXY(evt) {
   var offsetX=10, offsetY =10;
   var maxY = 420;
	var coords = {x: 0, y: 0};
	coords.x = mouseX;
	if(mouseY > maxY){
		coords.y = (mouseY-120);
	}else{
		coords.y = mouseY;
	}
	return coords;
 }

/*
	getCoordsByElement retrieves point array containing elements position on the page.
	Requires: Event object
	Returns: Coordinates coords[]
	Error checking: none
*/
function getCoordsByElement (el) {
  var coords = {x: 0, y: 0};
  while(el){
	if(el.pageX){
		coords.x += el.pageX;
		coords.y += el.pageY;
	}else if (el.offsetLeft || el.offsetTop){
		coords.x += el.offsetLeft;
		coords.y += el.offsetTop;
	}else if (el.offsetX || el.offsetY){
		coords.x += el.offsetX;
		coords.y += el.offsetY;
	}else if (el.clientX){
		coords.x += el.clientX;
		coords.y += el.clientY;
	}
	el = el.offsetParent;
  }
  return coords;
}

/*
	Fade:setFade called after page load that turns the fade transition on or off
	Requires: boolean (on | off)
	Returns: nothing
	Error checking: none
*/
function setFade(switchFade) {// Fade switch function 
	if ( !fadeOn ) { 
		prepLyr(currTipID, true); 
	} else { // No fade 
		stopFade(); 
		hideTooltips();
	} 
	fadeOn = switchFade; 
} 

/*
	Fade:prepLyr preps intial layer values prior to a fade / transition.
	Requires: layer name and layer visibility
	Returns: nothing
	Error checking: none
*/
function prepLyr(lyr, vis) {
	if (!DHTML) return; 
	x = new getObj( lyr ); 
	if (isStnd || isIE) { 
		lyrheight = x.obj.offsetHeight +8;
		clipWidth = x.obj.offsetWidth; 
		if ( vis ) { 
			clipTop = 0; 
			clipMid =  Math.round(lyrheight/2); 
			clipBottom = lyrheight; 
		} else { 
			// if hidden, crop to center of layer
			clipMid = Math.round(lyrheight/2); 
			//clipBottom = clipMid; 
			//clipTop = clipMid; 
			clipTop = 0;
			clipBottom = clipTop;
		} 
		// top width bottom height
		x.style.clip = 'rect('+clipTop+' '+clipWidth+' '+ clipBottom +' 0)'; 
		visib(lyr, true); 
	} else if (isNN4) { 
		lyrheight = x.style.clip.bottom; 
		clipWidth = x.style.clip.right; 
		if ( vis ) { 
			clipTop = 0; 
			clipMid = Math.round(lyrheight/2); 
			clipBottom = lyrheight; 
		} else { 
			clipMid = Math.round(lyrheight/2); 
			//clipBottom = clipMid; 
			//clipTop = clipMid; 
			clipTop = 0;
			clipBottom = 0;
		} 
		
		x.style.clip.top = clipTop; 
		x.style.clip.left = 0; 
		x.style.clip.right = clipWidth; 
		x.style.clip.bottom = clipBottom; 
		x.style.visibility = 'show'; 
	} else {
		return;
	}
} 

/*
	Utility:visib toggle visibility of layer.
	Requires: layer name, boolean (show | hide)
	Returns: nothing
	Error checking: TODO check presence of 'objName' layer
*/
function visib(objName, flag) { // triggers layer visibility 
	x = new getObj(objName); 
	x.style.visibility = (flag) ? 'visible' : 'hidden';
	x.style.display = (flag) ? 'block' : 'none';
} 

/*
	Utility:getObj creates crossbrowser layer object.
	Requires: layer name
	Returns: self with obj and style reference
	Error checking: TODO check presence of 'objName' layer
*/
function getObj(objName) { 
	if (isStnd) { 
		this.obj = document.getElementById(objName); 
		if(this.obj == null) alert(objName + " is a null object");
		
		this.style = document.getElementById(objName).style; 
	} else if (isIE) { 
		//alert("Document.all");
		this.obj = document.all[objName]; 
		this.style = document.all[objName].style; 
	} else if (isNN4) { 
		//this.obj = document.layers[objName]; 
		//this.style = document.layers[objName]; 
		//this.obj = xLayer(objName);
		//this.style = xLayer(objName);
	} else {
		// Other browsers
		
	}
} 