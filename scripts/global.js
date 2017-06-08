function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function') window.onload=func;
	else{
		window.onload=function(){
			oldonload();
			func();	
		}
	}	
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


function addClass(element,value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
		element.className = newClassName;
	}
}
function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;

	var links = navs[0].getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		var linkurl;
		for (var i=0; i<links.length; i++) {
			linkurl = links[i].getAttribute("href");
			if (window.location.href.indexOf(linkurl) != -1) {
				links[i].className = "here";
				var linktext = links[i].lastChild.nodeValue.toLowerCase();
				document.body.setAttribute("id",linktext);
			}
		}
	}
}
//home
function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","image/frame.gif");
	frame.setAttribute("alt","asadasdasdas");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","image/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		links[i].onmouseover = function() {
			var destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}
//about
function showSection(id) {   //功能是调整两个section元素的显示和隐藏
	var sections = document.getElementsByTagName("section");//获取标签section
	for (var i=0; i<sections.length; i++ ) {      //遍历上一个方法返回的数组
		if (sections[i].getAttribute("id") != id) { //如果section里面的id的值不等于传过去的id的值。则不显示。否则显示
			sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;//对象检测
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");//获取article标签，返回一个数组
	if (articles.length == 0) return false;  //防止做无用功，当article元素不存在时，不执行下面的操作
	var navs = articles[0].getElementsByTagName("nav");//获取第一个article元素中全部名为nav的元素
	if (navs.length == 0) return false;//防止做无用功
	var nav = navs[0];//article元素下的第一个nav元素
	var links = nav.getElementsByTagName("a");//nav元素下的所有名为a的元素
	for (var i=0; i<links.length; i++ ) { //遍历a标签
		var sectionId = links[i].getAttribute("href").split("#")[1];
        //split函数将字符串进行分割，取“#”后面的字符串用[1]是因为这个数组的第一个参数是#前面的字符，而我们需要获取的是它后面的参数
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}

//photos
function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return true;
    //如果没有id为placeholder的元素返回一个id为这个的元素
	var source = whichpic.getAttribute("href");
    //得到元素的href属性
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
    //设置src的属性值为上面的href
	if (!document.getElementById("description")) return false;
	if (whichpic.getAttribute("title")) {
	    //如果得到a标签的title属性值
		var text = whichpic.getAttribute("title");
        //将其赋给text变量
	} else {
		var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
	    //如果这个标签的第一个节点为文本节点
		description.firstChild.nodeValue = text;
        //将title赋值给这个标签的第一个标签的值
	}
	return false;
}

function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","image/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for ( var i=0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}
//live
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
    //找出table元素
	for (var i=0; i<tables.length; i++) {
		var odd = false;
        //对于每个table元素，创建变量odd并把它初始化为false
		var rows = tables[i].getElementsByTagName("tr");
        //将表格中的标签名为tr的赋值给rows
		for (var j=0; j<rows.length; j++) {//遍历表格中的所有数据行
			if (odd == true) {
			    //如果变量odd的值是true，设置样式并把odd变量修改为false
				addClass(rows[j],"odd");
				odd = false;
			} else {
				odd = true;//如果odd的值是false，不设置样式；但把odd变量修改为true
			}
		}
	}
}
function highlightRows() {
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i=0; i<rows.length; i++) {
		rows[i].oldClassName = rows[i].className
		rows[i].onmouseover = function() {
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName
		}
	}
}

function displayAbbreviations() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length < 1) return false;
	var defs = new Array();
	for (var i=0; i<abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		if (current_abbr.childNodes.length < 1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for (key in defs) {
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	articles[0].appendChild(header);
	articles[0].appendChild(dlist);
}

//contact
function focusLabels() {
    //获得label中的文本被单击，关联的表单字段就会获得焦点
	if (!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for (var i=0; i<labels.length; i++) {
		if (!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if (!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}

function resetFields(whichform) {
    //保证在不支持placeholder属性情况下，所有用户都能看到占位符
	if (Modernizr.input.placeholder) return;
	for (var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit") continue;
		if (!element.getAttribute('placeholder')) continue;
		element.onfocus = function() {
			if (this.value == this.getAttribute('placeholder')) {
				this.value = "";
			}
		}
		element.onblur = function() {
			if (this.value == "") {
				this.value = this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}

function validateForm(whichform) {
	for (var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.getAttribute("required") == 'required') {
			if (!isFilled(element)) {
				alert("Please fill in the "+element.name+" field.");
				return false;
			}
		}
		if (element.getAttribute("type") == 'email') {
			if (!isEmail(element)) {
				alert("The "+element.name+" field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function isFilled(field) {
	return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
	for (var i=0; i<document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			if (submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}
//Ajax
function getHTTPObject() {
    //判定浏览器是否支持XMLHttpObject对象
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function () {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
			catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
			catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP"); }
			catch (e) {}
			return false;
		}
	return new XMLHttpRequest();
}
function displayAjaxLoading(element) {
	// 移除所有子元素
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	//  创建加载图像
	var content = document.createElement("img");
	content.setAttribute("src","image/loading.gif");
	content.setAttribute("alt","Loading...");
	// 插入这个图片到表单元素
	element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {
	var request = getHTTPObject();
	if (!request) { return false; }
	// 显示加载中的message
	displayAjaxLoading(thetarget);
	// Collect the data.
	var dataParts = [];
	var element;
	for (var i=0; i<whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	request.open('POST', whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	};

	request.send(data);
	return true;
};
function loadEvents() {
	// home
	prepareSlideshow();
	// about
	prepareInternalnav();
	// photos
	preparePlaceholder();
	prepareGallery();
	// live
	stripeTables();
	highlightRows();
	displayAbbreviations();
	// contact
	focusLabels();
	prepareForms();
}

// Load events
addLoadEvent(highlightPage);
addLoadEvent(loadEvents);
