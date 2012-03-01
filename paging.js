  (function ($) {
		"use strict";
		
		var pagesSelector = ".pages",
			pageSelector = pagesSelector + " .page",
			fullScreenSelector = ".fullScreen",
			folderSelector = ".folder",
			randomFadeInsSelector = ".randomFadeIns",
			noteSelector = ".note",
			noteMode = false,
			currentPage = 0,
			numPages = $(pageSelector).size(),
		
			showPage = function (n) {
				$(pageSelector).fadeOut();
				$(pageSelector + ":nth-child(" + n + ")").fadeIn();
			},
		    goToPage = function (pageNumber) {
		    	if (pageNumber <= numPages && pageNumber > 0) {
		    		currentPage = pageNumber;
		    		showPage(currentPage);
		    	}
		    },
			stepForward = function (master) {
				if (!noteMode && currentPage < numPages) {
					
					currentPage += 1;
					if (master) {
						socket.emit('pageturn', {direction: 'forward',
									currentPage: currentPage
						});
					}
					showPage(currentPage);
					
				}
			},
			stepBack = function (master) {
				if (!noteMode && currentPage > 1) {
					currentPage -= 1;
					if (master) {
						socket.emit('pageturn', {direction: 'back',
									currentPage: currentPage
						});
					}
					showPage(currentPage);
				}				
			},
			setupFolders = function () {
				var marginTop = 0;
				$(folderSelector).children().each(function () {
					$(this).css("margin-top",marginTop + 'px !important');
					marginTop += 20;
				});
			},
			setupRandomFadeIns = function () {
				var showTime = 4000,
					ACTIVE_CLASS = "active";
				
				setInterval(function () {
					var $children = $(randomFadeInsSelector).children(),
						numChildren = $children.size(),
						selectedChildIndex = parseInt(Math.random() * numChildren, 10),
						randomTop = parseInt(Math.random() * 70, 10),
						randomLeft = parseInt(Math.random() * 60, 10),
						$chosenOne = $($children.get(selectedChildIndex));
					$children.removeClass(ACTIVE_CLASS);	
					
					$chosenOne.css("top", randomTop + "%");
					$chosenOne.css("left", randomLeft + "%");
					
					$chosenOne.addClass(ACTIVE_CLASS);
				}, showTime);
				
			};
			
			
			
			
		 HTMLElement.prototype.requestFullScreen =
		      HTMLElement.prototype.requestFullScreen ||
		      HTMLElement.prototype.webkitRequestFullScreen ||
		      HTMLElement.prototype.mozRequestFullScreen ||
		      HTMLElement.prototype.oRequestFullScreen ||
		      HTMLElement.prototype.msRequestFullScreen;
		      
		$(fullScreenSelector).on('click', function (e) {
			e.stopPropagation();
			$("body").get(0).requestFullScreen();
		});      
		
		$(document).on('click', function(e) {
			noteMode = false;	
	    	switch (e.which) {
		        case 1:
		            stepForward(true);
		            break;
		        case 2:
		            stepForward(true);
		            break;
		        case 3:
		            stepBack(true);
		            e.preventDefault();
		            break;
		        default:
		            stepForward(true);
		    }
		});
		
		$(document).keypress(function (e) {
			switch (String.fromCharCode(e.which)) {
				case 'n':
				case 'N': 
					stepForward(true);
					break;
				case 'p':
				case 'P':
					stepBack(true);
					break;
				default:
					// do nothing
					break;
			}	
		});
		
		$(document).on('contextmenu', function (e) {
			e.stopPropagation();
			stepBack(true);
			e.preventDefault();
			return false;
		});
		
		$(document).touchwipe({
		     wipeLeft: function () {
		     	stepBack(true);
	     	 },
		     wipeRight: function () {
		     	stepForward(true);
	     	 },
		     preventDefaultEvents: true
		});
		
		

		var socket = io.connect('epostcardster.no.de');

		socket.on('message', function (data) {
			var dataObj = JSON.parse(data),
		    	direction = dataObj.direction,
		    	currentPage = dataObj.currentPage;
		    console.log('message' + data);
		    console.log('message parsed' + dataObj);
		    
		    if (currentPage) {
		    	goToPage(currentPage);	
		    } else {
			    if (direction === "forward") {
			    	stepForward();
			    }
			    if (direction === "back") {
			    	stepBack();
			    }
		    }


		});
		$(document).ready(function () {
			currentPage = 1;
			$(pageSelector + ":first").fadeIn();
			setupRandomFadeIns();
			prettyPrint && prettyPrint();
			$(noteSelector).click(function (e) {noteMode = true; e.preventDefault(); e.stopPropagation(); return false;});
		});
	}(jQuery));