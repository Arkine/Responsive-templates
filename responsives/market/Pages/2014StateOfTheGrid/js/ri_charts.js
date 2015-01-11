$(window).load(function() {
	
	// Color palette definitions for RGB and HEX
	var light_gray_color = {rgb: [242,242,242], hex: '#F2F2F2'};
	var dgreen_color = {rgb: [100,173,63], hex: '#64AD3F'};
	var lgreen_color = {rgb: [141,198,63], hex: '#64C63F'};
	var dnavy_color = {rgb: [50,75,105], hex: '#324B69'};
	var lnavy_color = {rgb: [70	,75,105], hex: '#464B69'};
	var llorgange_color = {rgb: [253,184,34], hex: '#FDB822'};
	var dlorgange_color = {rgb: [240,145,32], hex: '#F09120'};
	var ldorgange_color = {rgb: [187,85,49], hex: '#BB5531'};
	var ddorgange_color = {rgb: [236,123,35], hex: '#EC7B23'};
	var dturquise_color = {rgb: [67,155,152], hex: '#439B98'};
	var lturquise_color = {rgb: [53,189,178], hex: '#35BDB2'};
	var dolive_color = {rgb: [100,117,56], hex: '#647538'};
	var lolive_color = {rgb: [141,139,0], hex: '#8D8B00'};
	var dbrown_color = {rgb: [121,57,22], hex: '#793916'};
	var lbrown_color = {rgb: [168,78,37], hex: '#A84E25'};
	
	var progGrowthData1 = {
		labels : ["3% biogas","9% biomass","16% small hydro","21% geothermal","6% solar","45% wind"],
		datasets : [
			{
				fillColor : "rgba(127,147,174,0.5)",
				strokeColor : "rgba(127,147,174,1)",
				pointColor : "rgba(127,147,174,1)",
				pointStrokeColor : "#fff",
				data : [65,59,90,81,56,55,40]
			},
			{
				fillColor : "rgba(228,203,127,0.5)",
				strokeColor : "rgba(228,203,127,1)",
				pointColor : "rgba(228,203,127,1)",
				pointStrokeColor : "#fff",
				data : [28,48,40,19,96,27,100]
			}
		]
	};

	
	var progGrowthData2 = {
		labels : ["2.9% biogas","4.8% biomass","8.9% small hydro","11% geothermal","31.1% solar","41.5% wind"],
	};
	
	// Two graphs overlay with months along the x-axis	
		var lineChartData = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : [
				{
					fillColor : "rgba(127,147,174,0.5)",
					strokeColor : "rgba(127,147,174,1)",
					pointColor : "rgba(127,147,174,1)",
					pointStrokeColor : "#fff",
					data : [65,59,90,81,56,55,40]
				},
				{
					fillColor : "rgba(228,203,127,0.5)",
					strokeColor : "rgba(228,203,127,1)",
					pointColor : "rgba(228,203,127,1)",
					pointStrokeColor : "#fff",
					data : [28,48,40,19,96,27,100]
				}
			]
		};
		
		var barChartDataX = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : [
				{
					fillColor : "rgba(0,40,85,1)",
					strokeColor : "rgba(0,40,85,1)",
					data : [65,59,90,81,56,55,40]
				},
				{
					fillColor : "rgba(201,151,0,1)",
					strokeColor : "rgba(201,151,0,1)",
					data : [28,48,40,19,96,27,100]
				}
			]
			
		};
		var barChartData = {
			labels : [""],
			datasets : [
				{
					label: "<strong>3%</strong> biogas",
					fillColor : "rgba("+lgreen_color.rgb.join()+",1)",
					strokeColor : "rgba("+lgreen_color.rgb.join()+",1)",
					data : [3]
				},
				{
					label: "<strong>9%</strong> biomass",
					fillColor : "rgba("+lolive_color.rgb.join()+",1)",
					strokeColor : "rgba("+lolive_color.rgb.join()+",1)",
					data : [9]
				},
				{
					label: "<strong>16%</strong> small hydro",
					fillColor : "rgba("+lturquise_color.rgb.join()+",1)",
					strokeColor : "rgba("+lturquise_color.rgb.join()+",1)",
					data : [16]
				},
				{
					label: "<strong>21%</strong> geothermal",
					fillColor : "rgba("+lbrown_color.rgb.join()+",1)",
					strokeColor : "rgba("+lbrown_color.rgb.join()+",1)",
					data : [21]
				},
				{
					label: "<strong>6%</strong> solar",
					fillColor : "rgba("+llorgange_color.rgb.join()+",1)",
					strokeColor : "rgba("+llorgange_color.rgb.join()+",1)",
					data : [6]
				},
				{
					label: "<strong>45%</strong> wind",
					fillColor : "rgba("+lnavy_color.rgb.join()+",1)",
					strokeColor : "rgba("+lnavy_color.rgb.join()+",1)",
					data : [45]
				}
			]
			
		};	
		var barChartData2 = {
			labels : [""],
			datasets : [
				{
					label: "<strong>2.9%</strong> biogas",
					fillColor : "rgba("+lgreen_color.rgb.join()+",1)",
					strokeColor : "rgba("+lgreen_color.rgb.join()+",1)",
					data : [2.9]
				},
				{
					label: "<strong>4.8%</strong> biomass",
					fillColor : "rgba("+lolive_color.rgb.join()+",1)",
					strokeColor : "rgba("+lolive_color.rgb.join()+",1)",
					data : [4.8]
				},
				{
					label: "<strong>8.9%</strong> small hydro",
					fillColor : "rgba("+lturquise_color.rgb.join()+",1)",
					strokeColor : "rgba("+lturquise_color.rgb.join()+",1)",
					data : [8.9]
				},
				{
					label: "<strong>11%</strong> geothermal",
					fillColor : "rgba("+lbrown_color.rgb.join()+",1)",
					strokeColor : "rgba("+lbrown_color.rgb.join()+",1)",
					data : [11]
				},
				{
					label: "<strong>31.1%</strong> solar",
					fillColor : "rgba("+llorgange_color.rgb.join()+",1)",
					strokeColor : "rgba("+llorgange_color.rgb.join()+",1)",
					data : [31.1]
				},
				{
					label: "<strong>41.5%</strong> wind",
					fillColor : "rgba("+lnavy_color.rgb.join()+",1)",
					strokeColor : "rgba("+lnavy_color.rgb.join()+",1)",
					data : [41.5]
				}
			]
			
		};	
		var radarChartData = {
			labels : ["A","B","C","D","E","F","G"],
			datasets : [
				{
					fillColor : "rgba(127,147,174,0.5)",
					strokeColor : "rgba(127,147,174,1)",
					pointColor : "rgba(127,147,174,1)",
					pointStrokeColor : "#fff",
					data : [65,59,90,81,56,55,40]
				},
				{
					fillColor : "rgba(228,203,127,0.5)",
					strokeColor : "rgba(228,203,127,1)",
					pointColor : "rgba(228,203,127,1)",
					pointStrokeColor : "#fff",
					data : [28,48,40,19,96,27,100]
				}
			]
			
		};
		var pieChartData = [
				{
					value: 30,
					color:"#BA0C2F"
				},
				{
					value : 50,
					color : "#C6007E"
				},
				{
					value : 100,
					color : "#78BE20"
				}
			
		];
	var polarAreaChartData = [
			{
				value : 62,
				color: "#7F93AE"
			},
			{
				value : 70,
				color: "#E4CB7F"
			},
			{
				value : 41,
				color: "#BA0C2F"
			},
			{
				value : 24,
				color: "#C6007E"
			},
			{
				value : 55,
				color: "#FFCD00"
			},
			{
				value : 18,
				color: "#78BE20"
			}
		];
		
		
		var doughnutChartData = [
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value : 8.4,
					color : lgreen_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				},
				{
					value: 8.4,
					color: light_gray_color.hex
				}
		];

		var doughnutChartDataSG = [
				{
					value: 6.8,
					color: dturquise_color.hex
				},
				{
					value : 1.3,
					color : lgreen_color.hex
				},
				{
					value: 91.99,
					color: light_gray_color.hex
				}
		];

		var doughnutChartDataRI1 = [
				{
					value: 13,
					color: lgreen_color.hex,
					label: "solar"
				},
				{
					value: 87,
					color: light_gray_color.hex
				}
		];

		var doughnutChartDataRI2 = [
				{
					value: 18.3,
					color: lgreen_color.hex,
					label: "solar"
				},
				{
					value: 81.7,
					color: light_gray_color.hex
				}
		];
		
			
		var doughnutChartDataGR = [
				{
					value: 61,
					color: llorgange_color.hex,
					label: "solar"
				},
				{
					value : 7,
					color : lbrown_color.hex,
					label: "other renewables"
				},
				{
					value: 32,
					color: light_gray_color.hex
				}
		];
				
		
		var globalGraphSettings = {animation: Modernizr.canvas, percentageInnerCutout: 60, segmentShowStroke: false, responsive: true};
		
		//showIntroChart();
		//showDoughnutChart();
		//showPieChart();
		
		var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		
		function showIntroChart(){		
			var ctx = document.getElementById("introChart").getContext("2d");
			new Chart(ctx).Line(lineChartData,{animation: Modernizr.canvas, scaleShowLabels : false, scaleFontColor : "#767C8D"});
		};
		
		function showLineChart(){
			var ctx = document.getElementById("lineChartCanvas").getContext("2d");
			new Chart(ctx).Line(lineChartData,globalGraphSettings);
		};
		function showBarChart(){
			var ctx = document.getElementById("barChartCanvas").getContext("2d");
			var chart = new Chart(ctx).StackedBar(barChartData,{	responsive: false, 
																														barShowStroke: false, 
																														showScale: false, 
																														showTooltips: false,
				onAnimationComplete: function() {
					var legend = this.generateLegend();
					$("#barChart").append(legend);
						  $(".stackedbar-legend" ).fadeIn( "slow", function() {
							 // Animation complete
							});
						}
				});
		};
		function showBarChart2(){
			var ctx = document.getElementById("barChartCanvas2").getContext("2d");
			var chart = new Chart(ctx).StackedBar(barChartData2,{	responsive: false, 
																														barShowStroke: false, 
																														showScale: false, 
																														showTooltips: false,
				onAnimationComplete: function() {
					var legend = this.generateLegend();
					$("#barChart2").append(legend);
						  $(".stackedbar-legend" ).fadeIn( "slow", function() {
							 // Animation complete
							});
						}
				});
		};
		
		function showRadarChart(){
			var ctx = document.getElementById("radarChartCanvas").getContext("2d");
			new Chart(ctx).Radar(radarChartData,globalGraphSettings);
		}
		function showPolarAreaChart(){
			var ctx = document.getElementById("polarAreaChartCanvas").getContext("2d");
			new Chart(ctx).PolarArea(polarAreaChartData,globalGraphSettings);			
		}
		function showPieChart(){
			var ctx = document.getElementById("pieChartCanvas").getContext("2d");
			new Chart(ctx).Pie(pieChartData,globalGraphSettings);
		};

		function showDoughnutChartRI1(){
			var width = $('#doughnutChartCanvasRI1').width();
			var height = $('#doughnutChartCanvasRI1').height();
			var pos = $('#doughnutChartCanvasRI1').offset();
			var ctx = document.getElementById("doughnutChartCanvasRI1").getContext("2d");
			
			new Chart(ctx).Doughnut(doughnutChartDataRI1,{	animation: Modernizr.canvas,
																										percentageInnerCutout: 65, 
																										segmentShowStroke: false, 
																										responsive: true,
																										scaleShowLabels : true, 
																										scaleFontColor : "#767C8D", 
																										labelFontFamily : "Arial",
																										labelFontStyle : "normal",
																										labelFontSize : 48,
																										labelFontColor : "#666",
																										showTooltips: false,
				onAnimationComplete: function() {
							//ctx.fillText("Label", width/2 - 20, width/2, 200);
							//$( "#ri1-label" ).css({'top':70,'left':140});
						  $( "#ri1-label" ).fadeIn( "fast", function() {
							 // Animation complete
							});
						}
				});
		};
		
		function showDoughnutChartRI2(){
			var width = $('#doughnutChartCanvasRI2').width();
			var height = $('#doughnutChartCanvasRI2').height();
			var pos = $('#doughnutChartCanvasRI2').offset();
			var ctx = document.getElementById("doughnutChartCanvasRI2").getContext("2d");
			
			new Chart(ctx).Doughnut(doughnutChartDataRI2,{	animation: Modernizr.canvas,
																										percentageInnerCutout: 65, 
																										segmentShowStroke: false, 
																										responsive: true,
																										scaleShowLabels : true, 
																										scaleFontColor : "#767C8D", 
																										labelFontFamily : "Arial",
																										labelFontStyle : "normal",
																										labelFontSize : 48,
																										labelFontColor : "#666",
																										showTooltips: false,
				onAnimationComplete: function() {
							//ctx.fillText("Label", width/2 - 20, width/2, 200);
							//$( "#ri2-label" ).css({'top':65,'left':140});
						  $( "#ri2-label" ).fadeIn( "fast", function() {
							 // Animation complete
							});
						}
				});
		};

		
		function showDoughnutChartGR(){
			var width = $('#doughnutChartCanvasGR').width();
			var height = $('#doughnutChartCanvasGR').height();
			var pos = $('#doughnutChartCanvasGR').offset();
			var ctx = document.getElementById("doughnutChartCanvasGR").getContext("2d");
			
			new Chart(ctx).Doughnut(doughnutChartDataGR,{	animation: Modernizr.canvas,
																										percentageInnerCutout: 60, 
																										segmentShowStroke: false, 
																										responsive: true,
																										scaleShowLabels : true, 
																										scaleFontColor : "#767C8D", 
																										labelFontFamily : "Arial",
																										labelFontStyle : "normal",
																										labelFontSize : 48,
																										labelFontColor : "#666",
				onAnimationComplete: function() {
							//ctx.fillText("Label", width/2 - 20, width/2, 200);
							$( ".doughnut-right" ).css({'top':80,'left':275});
						  $( ".doughnut-right" ).fadeIn( "fast", function() {
							 // Animation complete
							});
						}
				});
		};
		
		var graphInitDelay = 300;
		var fgraphInitDelay = 100;
		var sgraphInitDelay = 1200;
		
		//Set up each of the inview events here.
		$("#lineChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showIntroChart,graphInitDelay);
			
		});
		$("#barChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showBarChart,graphInitDelay);
		});
		$("#barChart2").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showBarChart2,sgraphInitDelay);
		});
		$("#radarChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showRadarChart,graphInitDelay);			
		});
		$("#pieChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showPieChart,graphInitDelay);			
		});
		$("#polarAreaChart").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showPolarAreaChart,graphInitDelay);			
		});
		$("#doughnutChartGR").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showDoughnutChartGR,graphInitDelay);			
		});
		$("#doughnutChartRI1").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showDoughnutChartRI1,fgraphInitDelay);			
		});
		$("#doughnutChartRI2").on("inview",function(){
			var $this = $(this);
			$this.removeClass("hidden").off("inview");
			setTimeout(showDoughnutChartRI2,sgraphInitDelay);			
		});		
	});
	
	/**
	 * author Christopher Blum
	 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
	 *    - forked from http://github.com/zuk/jquery.inview/
	 */
	(function ($) {
	  var inviewObjects = {}, viewportSize, viewportOffset,
	      d = document, w = window, documentElement = d.documentElement, expando = $.expando;
	
	  $.event.special.inview = {
	    add: function(data) {
	      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };
	    },
	
	    remove: function(data) {
	      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}
	    }
	  };
	
	  function getViewportSize() {
	    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };
	
	    // if this is correct then return it. iPad has compat Mode, so will
	    // go into check clientHeight/clientWidth (which has the wrong value).
	    if (!size.height) {
	      mode = d.compatMode;
	      if (mode || !$.support.boxModel) { // IE, Gecko
	        domObject = mode === 'CSS1Compat' ?
	          documentElement : // Standards
	          d.body; // Quirks
	        size = {
	          height: domObject.clientHeight,
	          width:  domObject.clientWidth
	        };
	      }
	    }
	
	    return size;
	  }
	
	  function getViewportOffset() {
	    return {
	      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
	      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
	    };
	  }
	
	  function checkInView() {
	    var $elements = $(), elementsLength, i = 0;
	
	    $.each(inviewObjects, function(i, inviewObject) {
	      var selector  = inviewObject.data.selector,
	          $element  = inviewObject.$element;
	      $elements = $elements.add(selector ? $element.find(selector) : $element);
	    });
	
	    elementsLength = $elements.length;
	    if (elementsLength) {
	      viewportSize   = viewportSize   || getViewportSize();
	      viewportOffset = viewportOffset || getViewportOffset();
	
	      for (; i<elementsLength; i++) {
	        // Ignore elements that are not in the DOM tree
	        if (!$.contains(documentElement, $elements[i])) {
	          continue;
	        }
	
	        var $element      = $($elements[i]),
	            elementSize   = { height: $element.height(), width: $element.width() },
	            elementOffset = $element.offset(),
	            inView        = $element.data('inview'),
	            visiblePartX,
	            visiblePartY,
	            visiblePartsMerged;
	        
	        // Don't ask me why because I haven't figured out yet:
	        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
	        // Even though it sounds weird:
	        // It seems that the execution of this function is interferred by the onresize/onscroll event
	        // where viewportOffset and viewportSize are unset
	        if (!viewportOffset || !viewportSize) {
	          return;
	        }
	        
	        if (elementOffset.top + elementSize.height > viewportOffset.top &&
	            elementOffset.top < viewportOffset.top + viewportSize.height &&
	            elementOffset.left + elementSize.width > viewportOffset.left &&
	            elementOffset.left < viewportOffset.left + viewportSize.width) {
	          visiblePartX = (viewportOffset.left > elementOffset.left ?
	            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
	            'left' : 'both');
	          visiblePartY = (viewportOffset.top > elementOffset.top ?
	            'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
	            'top' : 'both');
	          visiblePartsMerged = visiblePartX + "-" + visiblePartY;
	          if (!inView || inView !== visiblePartsMerged) {
	            $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
	          }
	        } else if (inView) {
	          $element.data('inview', false).trigger('inview', [false]);
	        }
	      }
	    }
	  }
	
	  $(w).bind("scroll resize", function() {
	    viewportSize = viewportOffset = null;
	  });
	  
	  // IE < 9 scrolls to focused elements without firing the "scroll" event
	  if (!documentElement.addEventListener && documentElement.attachEvent) {
	    documentElement.attachEvent("onfocusin", function() {
	      viewportOffset = null;
	    });
	  }
	
	  // Use setInterval in order to also make sure this captures elements within
	  // "overflow:scroll" elements or elements that appeared in the dom tree due to
	  // dom manipulation and reflow
	  // old: $(window).scroll(checkInView);
	  //
	  // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
	  // intervals while the user scrolls. Therefore the inview event might fire a bit late there
	  setInterval(checkInView, 250);
	})(jQuery);