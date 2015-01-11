// JavaScript Document
$( document ).ready(function() {
	var c = (typeof window.console !== "undefined") ? true : false;
	
	if($('map').length !== 0) {

		if(activeMQ === 'S') {
			// if mobile, use mobile map
			
			$('#transm').attr('usemap', '#map-m');
			
			if( $('#calmap').length !== 0) {
				var map = '#map';
			}
			else if ($('#transm').length !== 0) {
				var map = '#map-m';
			}
		}else{
			// if desktop or tablet, use default map
			var map = '#map';
		}
	
		var context = "";
		var triLeft = document.getElementById('tri-left');
		var triRight = document.getElementById('tri-right');
	
		$(map + ' area').each(function() { 
				// map the hovered target to its respective tip by taking the targets id and matching that id to the tip with id + "-area"
				var elid = this.id;
				var tip = document.getElementById(elid + "-area");
				$(tip).on({
					click: function() { 
						$(this).hide();
					}
				});
			
				// drop the tooltip to the right if it's LA because the targets text is to the left
			 	if(elid == 'LosAngeles') {
					var triangle = triLeft;
				}else{
					var triangle = triRight;
				}
				if( $('#calmap').length !== 0) {
					context = '#calmap';
				}
				else if ($('#transm').length !== 0) {
					context = '#transm';
				}
			 $(this).on({
			
				 mouseover: function(e) { 	
					if(c) console.log(elid);
					
					// get the data-popup values if not mobile
					if(activeMQ !== 'S') {
						var coords = $(this).attr('data-popup');
						var hand = $(this).attr('data-tip-hand');
				
						// positioning is map dependant for each map has its own repsective data sets for tooltip positioning
						// these functions return the calcultated top(y) and left(x) values for the tooltips in relation to the maps top(y) and left(x) value
						if( $('#calmap').length !== 0) {
							var pos = localToGlobalCoord(coords, context, tip, hand );
						}
						else if ($('#transm').length !== 0) {
							var pos = localToGlobalCoord(coords, context, tip, hand );
						}
				
						//position the tip and triangle
						$(tip).css({top: pos.top, left: pos.left });
						$(triangle).css({top: pos.ttop, left: pos.tleft });
				
						//show on mouse over
						$(triangle).show();
					
						$(tip).show();
				
						$(tip).addClass('hovered');
					} // is M or L
					
				 },
			 
				 mouseout: function() { 
					 if(activeMQ !== 'S') {
						// hide on mouse out
						$(tip).hide();
						$(triangle).hide();
						$(tip).removeClass('hovered');
					} // is M or L
				 },
				 click: function() { 

					if(activeMQ === 'S') {
					
						// hide on mouse out
						if($(tip).css('display') === "block") {
							$(tip).hide();
							$(tip).removeClass('hovered');
						} else {
							var cntx = $(context).offset();
							$(tip).css({top: cntx.top, left: 10 });
							$(tip).show();
							$(tip).addClass('hovered');
						}
					} // is S
					return false;
				 }
			 }); 
			});
		} // map present
		
		function localToGlobalCoord(pos, context, tip, hand) {
			var triHeight = 21;
			var triWidth = 75;
			var coord = pos.split(",");
			
			
			//grabs the data-popup values and turns the string into an int
			coord[0] = +coord[0]; // box x (not used)
			coord[1] = +coord[1]; // box y (not used)
			coord[2] = +coord[2]; // triangle x
			coord[3] = +coord[3]; // triangle y
					
			// This is the context's current xy values in relation to the document
			var cpos = $(context).offset();
			
			if(c) console.log(cpos);
			//Take the context's xy position and add the data-popup values to move the box and triangle to their respective position
			var triX = (cpos.left + coord[2]); // triangle x
			var triY = (cpos.top + coord[3]);  // triangle y
			var tipWidth = $(tip).width();
			var tipHeight = $(tip).height();
			
			// Which way should the tip pop (x left = null or "right")...
			if(hand == "right") {
				var posX = (triX + triWidth);
			} else {
				var posX = (triX - tipWidth); //box x
			}

			var posY = (triY - tipHeight + 21); //box y  21 is the triangles height
			
			//return the new calcultaed values for the box and triangle
			var gpos = { top: posY, left: posX, ttop: triY, tleft: triX };
			
			return gpos;
		};		
	});

