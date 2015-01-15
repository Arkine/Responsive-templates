  var debug = true;
  var toggleActive = true;
	var activeMQ;  // Stores the screen size
	var currentMQ = "unknown"; // set the default screen size
	var processed = false;
	var hashTagActive = "";
	
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




// WAI level-1 compliancy - Bypass Blocks 2.4.1
// Nic Zakas "skip to content" next focus fix
// See http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
// TEST Checkpoint: https://code.google.com/p/chromium/issues/detail?id=37721
window.addEventListener("hashchange", function(event) {
  var element = document.getElementById(location.hash.substring(1));
  if (element) {
    if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
    	element.tabIndex = -1;
    }
    element.focus();
  }
}, false);

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

/* TBD: Function description */
var expand = function () {

  if (activeMQ !== currentMQ) {
		
		currentMQ = activeMQ;
			
		switch(activeMQ) {
			case 'XS':
			case 'S':
        collapsedView();
				bend();
				break;
			case 'M':
				expandedView(); // was previously in conditional above
				bend(); // If we can't change position of elements using Bootstrap push / pull, then bend it
				break;
			case 'L':
        expandedView();
				unbend(); // Set positioning back
				break;
			default:
				break;
		} // end switch
		
  }
};

// Do stuff we can't do with CSS
var bend = function () {
	
	/* // Examples: 
	if($('#nested-left').length !== 0) {
		$('#nested-left').removeClass("col-xs-12 col-sm-12 col-md-4 col-lg-4"); // Note: Update if col defs chnage
		
		$('#nested-right').removeClass("col-md-8");
		$('#nested-right').addClass("col-md-12 bent");
		
		$('.sidebar-right').append($('#nested-left'));
	}
	*/
};

// Reverse stuff done for XS, S, and M
var unbend = function () {
	
	/* // Examples: 
	if($('.sidebar-right #nested-left').length !== 0) {
		$('#nested-left').addClass("col-xs-12 col-sm-12 col-md-4 col-lg-4");
		$('#nested-right').removeClass("col-md-12 bent");
		$('#nested-right').addClass("col-md-8");
		$('#content-core > .row').append($('#nested-left'));
	}
	*/
};

 /* CollapsedView - On M and L breakpoints, process for collapsed panel view
 	*	
 */
function expandedView() {

    // Remove the data-toggle attribute to allow the links to work in desktop
		$(".block-title a").removeAttr('data-toggle');
		$(".nav > li a").removeAttr('data-toggle');
		
		// drop-on class added to element to manage desktop/mobile hover/no-hover
		$(".nav > li").addClass("drop-on");
		
		// De-activate accordion effects in all panel-groups
		//$(".sidebar .panel").removeClass("panel-collapse collapse in"); // NOTE: Changed from .sidebar-panel					
		$(".rcol").children().removeClass("panel panel-default"); // TODO: Was previously more specific to .sidebar but we need all

		// Fix for panel-collapse height not being reset to auto
		$(".collapsible").css("height", "auto");
		
		// TODO: Hmm, is the selector correct? 
		$("#main-content div").children().removeClass("panel-collapse collapse active");
		
		$(".rcol .collapsible").addClass("in"); // New: Open panels 
		
		// Remove the open class from an open dropdown list to prevent an open dropdown list on desktop view
		$(".nav li").removeClass("open");
 }

 /* CollapsedView - On XS and S breakpoints, process for collapsed panel view
 	*	
 */
function collapsedView() {

    //$("section").addClass("active"); // TODO: Are we using this? Should apply to all panel IDs

		// Activate accordion effects to all panel-groups (rcol only)
		// Works in conjunction with removal of same classes in expandedView()	  
		$(".rcol").children().addClass("panel panel-default"); // was more specific prior with .sidebar but we need all
		
		// NOTE: Following changes are global
		
		// Add the collapse on toggle attribute to the panel headers
		$(".rcol .collapsible").addClass("panel-collapse collapse"); // Note: global
		$(".rcol .collapsible").removeClass('in'); // New: Close panels
    $(".collapse > div").addClass("panel-body");
		
		// Remove the dropdown on hover effect from the navbar parent items
		$(".nav > li").removeClass("drop-on");
	
		// Add the dropdown on toggle attribute to the panel headers	
		$(".par > a").attr("data-toggle","dropdown");
		
		// Blanket assign class="collapsed" to all collapsed panel links for display of correct status
		$(".block-title a").addClass('collapsed');
		
		// Prevent the panel-title headers from redirecting the page and shows .panel-body content
    $(".block-title a").click(function (e) {
        e.preventDefault();
				var wasactive = false;
				
				var par = $(this).parent().parent().parent();
				if(par.hasClass('active')) {
					wasactive = true;
				}
				
				collapseAllPanels('.rcol');
				
				if(wasactive) {
					//return;
				}  else {
					par.addClass('active');
				}
				
				// Toggle collapsed
				if($(this).attr('class') === 'collapsed') {
					$(this).removeClass('collapsed');
				} else {
					$(this).addClass('collapsed');
				}
				
				var sel = '.in'+$(this).attr('data-target');

				// Smooth scroll to offset of anchor ...
				var anchor = $(this).attr('data-target');

				if(hashTagActive != anchor) { // panel is open and no active hash
          //calculate destination place
          var dest = 0;
          if ($(anchor).offset().top > $(document).height() - $(window).height()) {
              dest = $(document).height() - $(window).height();
          } else {
              dest = $(anchor).offset().top;
          }
					dest -= 35; // offset to scroll to panel-heading
          //go to destination
          $('html,body').animate({
              scrollTop: dest
          }, 500, 'swing');
          hashTagActive = anchor;
        }
				
		});	
		
}

function backToTop () {
	
	var button = document.getElementById('toTop');
	//get the offset value of when you want the toTop button to show
	if($('.rcol').length !== 0) {
		var firstEl = $('.rcol section h2:first-child ').offset();
	}
	
	//when the window hits the offset value, show the button and fade it out when less than that value
	$(window).scroll(function() {
		var startpos = 0;
		if(typeof firstEl !== "undefined") {
			startpos = firstEl.top
		} else {
			startpos = 300;
		}
    if ($(this).scrollTop() > startpos) {
			 $(button).addClass('sticky');
			 $(button).fadeIn();
    } else {
        $(button).fadeOut();
    }
	});
	//scroll back to the top when clicked
	$(button).click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
	});
}
function collapseAllPanels(parentTag) {
	$(".panel-group .panel").removeClass("active");
	$('.panel-group .in').collapse('hide');
}


// BOOTSTRAPIFY //////////////////////////////////////////////////
var bootstrapify_func = function (mobile, collectionSelector, itemSelector, heading, contentClassName, panelGroupID, startIndex) {
	var hasLink = false;
	var i = startIndex;
	if($(collectionSelector).length !== 0) {
		
		// Wrap inner as panel-group
		$(collectionSelector).wrapInner('<div id="'+panelGroupID+'" class="panel-group"></div>');
		
		// Process each item within panel-group
		var comboSelector = collectionSelector + " " + itemSelector;

    $(comboSelector).each(function () {
			
			var el = $(this);
			//var id = ('accordion'+i);
			var aid = ('acont'+i);
			var pid = ('panel'+i);

			el.addClass('panel panel-default');
			el.attr('id',pid);
								
			var titleEl = el.find(heading);
			// TODO: Handle cases where h3 heading not available
			titleEl.wrap('<div class="panel-heading" />');
			titleEl.addClass("panel-title");
			
			// Before we wrap in a link check if a link already exists, and use that instead
			var moreUrl = titleEl.find('a').attr('href');
			if((typeof titleEl.find('a').attr('href')) === 'string') {
				hasLink = true;
				titleEl.find('a').addClass('collapsed').
					attr('data-parent',panelGroupID).
					attr('data-target','#'+aid).
					attr('data-toggle','collapse');
			} else {
				titleEl.wrapInner('<a class="collapsed" data-parent="'+panelGroupID+'" data-target="#'+aid+'" data-toggle="collapse"></a>');
			}
			
			var bodyEl = el.find(contentClassName);
			bodyEl.addClass('panel-body');
			bodyEl.wrap('<div class="collapsible panel-collapse collapse" id="'+aid+'"></div>');
			
			if(typeof window.console !== "undefined") {
        window.console.log("Bootstrapify_func: " + titleEl.text() + " has link: " + hasLink + ", collapsible is: " + el.find('.collapsible').length);
			}
			
			if(hasLink) {
				var readmore = $('<a />').addClass('readmore').attr('href', moreUrl).text("Read More");
				if(el.find('.collapsible ' + contentClassName).length !== 0) {
					if(el.find('.after-readmore').length !== 0) {
						readmore.insertBefore(el.find('.after-readmore'));
					} else {
						el.find('.collapsible ' + contentClassName).append(readmore);
					}
				} else {
					if(el.find('.after-readmore').length !== 0) {
						readmore.insertBefore(el.find('.after-readmore'));
					} else {
						el.find('.collapsible').append(readmore);
					}
				}
			}
			++i;
			hasLink = false;
    });
		return i+1;
	}		
	return i;
}

/* 
 * bootstrapify to process groups of panels based on selector parameters, e.g., process all 'section' elements using 'h2' and 'block-conent' elements for panel-heading and panel-body
*/
var bootstrapify = function (mq) {
	var portletNum = 1;
	var mobile = ((mq === "XS") || (mq === "S")) ? true : false;
	if(typeof window.console !== "undefined") {
    window.console.log("Is mobile: ActiveMQ: " + activeMQ + ", Mobile: "+ mobile);
	}
	if(mobile) {
		portletNum = bootstrapify_func(mobile, '#main-content', 'section', 'h2', '.block-content', 'accordion-cm', portletNum);
	}
}

/* 
 * myResize to provide rudimentary support of browser width resizing
*/
function myResize() {
	
  mqSync();
	if(!processed && toggleActive) {
		// Note: This only support one round of bs processing so resizing does not undo bootstrap / collapse
		// TODO: Build undo that is applied only when going from mobile to M or L
		bootstrapify(activeMQ);
	}
	if(toggleActive) expand(); // process collapse
	
	//adjust positioning of toTop button based upon screen width
	if( (activeMQ == 'M') || (activeMQ == 'L') ) {
		if($('#cell1').length !== 0) {
			var pos = $('#cell1').offset();
		} else if($('#mid-col').length !== 0) {
			var pos = $('#mid-col').offset();
		}
		if($('#toTop').length !== 0) $('#toTop').css('left', pos.left - 63);
	}
	//position to top button in center for mobile
	else if(activeMQ == 'S') {
		$('#toTop').css('left','45%');
	}
	processed = true;
	
	if(debug) {
		if(typeof window.console !== "undefined") {
			window.console.log("Resized ...");
		}
	}
	
} // /myResize()

// Exclude some pages from accordion treatment
if(typeof section !== 'undefined') {
	var exclude = ['letter-section','ra-section','be-section'];
	for(var i in exclude) {
		if(exclude[i] == section) {
			toggleActive = false;
		}
	}
}



$(document).ready(function() {
	
	// Add Events Cross-browser
	var event = {
		add: function (elem, type, fn) {
			if (elem.attachEvent) {
				elem['e' + type + fn] = fn;
				elem[type + fn] = function () {
					elem['e' + type + fn](window.event);
				};
				elem.attachEvent('on' + type, elem[type + fn]);
			} else {
			elem.addEventListener(type, fn, false);
		}
		}
	};
	
	// 2015-01-06 RAK: Move myResize and event into ready() function so page loads first. Otherwise, IE10+ will register activeMQ as 'S' and not 'L' on desktop or 'M' on tablet. Note: Links applied to badge images are deactivated now.
	myResize();
	event.add(window, "resize", myResize);	
	
	// JQuery version
	if(debug) {
		if(typeof window.console !== "undefined") {
			window.console.log("JQuery version:  " + $.fn.jquery);
		}
	}
	
		// build a custom table for callouts due to img size-skewing issues
		if($('.co-wb').length !== 0) {
			if(activeMQ == 'S') {
				
				
			}
		}
	
	//mqSync();
	if(typeof window.console !== "undefined") {
		console.log('active mq is: ' + activeMQ);
	}
	if (activeMQ == 'S') {
		$('ul.head-nav').mergeList('ul.navbar-nav'); // merge the head-nav list into the navbar-nav list
		
		$('.navbar button').insertAfter('#brand-cont > a'); // move the slogan after the a-wrapped logo
		$('#navbar').insertAfter('button');
		$('ul.nav').addClass('shadowed');	
		
		
		$('ul.side-nav-links li').click( function() {			
			
			var activeEl = $(this);
			
			if ($('ul.side-nav-links li').hasClass('active')) {
				$('ul.side-nav-links li').removeClass('active');				
			}
			$(this).addClass('active');
		});	
		
		// Copy front navigation
		if($('body.front').length !== 0) {
			$('.navbar-nav').clone().appendTo($('#main-content'));
			$('#main-content .navbar-nav').removeClass('shadowed');
		}
	} // end if S breakpoint
	
	// Hot link live-btn blocks with buttons
	if($('.live-btn').length !== 0) {
	  $('.live-btn').each(function () {
			var target = $(this);
			var href = target.find('a').attr('href');
			target.on({
					click: function(e) {
						location.href = href;
					},
			    mouseenter: function(e) {
			        $(this).addClass('hovered');
			    },
			    mouseleave: function() {
			        $(this).removeClass('hovered');
			    }
			});
	  });
	}

	// Set menu to action section
	setActive();
	
	//set back to top btn
	
	backToTop();
	
	// Update styles on page by section

	if(typeof section !== 'undefined') {
		$('body').addClass(section);
	}
	
	// Hide sidebar if necessary
	if((typeof nosidebar !== 'undefined') && nosidebar) {
		$('#side-nav .side-nav-links').addClass('hide');
	}
});

