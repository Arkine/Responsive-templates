
$.fn.mergeList = function  (newList) { // appends list items into new list
	
	var newListItems = $(newList + " li");
	var count = 0;
	var length = this.children('li').length;
	
	//remove the classes that are not properly assigned
	this.children('li').removeClass('first');
	this.children('li').removeClass('last');
	newListItems.removeClass('last');

	// tag the second to last item as being the last item
	this.children('li').each(function(li) {

		 if(count == (length - 2)) {
			 $(this).addClass('last');
		 };

		 count++;		
	});
	
	this.children('li').addClass('appended');
	this.children('li').appendTo(newList);
}
var activeMQ = null;
var mqSync = function () {
	// Fix for Opera issue when using font-family to store value
	if (window.opera) {
				// TODO: Check that content is available after changing this from class to id
	   activeMQ = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
	}
	// For all other modern browsers
	else if (window.getComputedStyle) {
	   activeMQ = window.getComputedStyle(document.head, null).getPropertyValue('font-family');
	}
	// For oldIE
	else {
		// Use .getCompStyle instead of .getComputedStyle so above check for window.getComputedStyle never fires true for old browsers
		window.getCompStyle = function (el, pseudo) {
						this.pseudo = pseudo;
			this.el = el;
			this.getPropertyValue = function (prop) {
				var re = /(\-([a-z]){1})/g;
				if (prop === 'float') {
										prop = 'styleFloat';
									}
				if (re.test(prop)) {
					prop = prop.replace(re, function () {
						return arguments[2].toUpperCase();
					});
				}
				return el.currentStyle[prop] ? el.currentStyle[prop] : null;
			};
			return this;
		};
		var compStyle = window.getCompStyle(document.getElementsByTagName('head')[0], "");
		activeMQ = compStyle.getPropertyValue("font-family");
	}
	activeMQ = activeMQ.replace(/"/g, "");
	activeMQ = activeMQ.replace(/'/g, "");
}; // End mqSync

var setActive = function() {
	var url = window.location.href; 
	var page = url.substr(url.lastIndexOf('/')+1);
		
    $('.leaf a[href*="'+page+'"]').parent().addClass('active');
	
}
$(document).ready(function() {
		
	mqSync();
	console.log('active mq is: ' + activeMQ);
	if (activeMQ == 'S') {
		if($('body.front').length !== 0) {
			//$('ul.head-nav').mergeList('ul.navbar-nav'); // merge the head-nav list into the navbar-nav list
		}
	}

});
