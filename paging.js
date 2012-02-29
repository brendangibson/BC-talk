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
		
			stepForward = function () {
				if (!noteMode && currentPage < numPages) {
					currentPage += 1;
					showPage(currentPage);
				}
			},
			stepBack = function () {
				if (!noteMode && currentPage > 1) {
					currentPage -= 1;
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
		            stepForward();
		            break;
		        case 2:
		            stepForward();
		            break;
		        case 3:
		            stepBack();
		            e.preventDefault();
		            break;
		        default:
		            stepForward();
		    }
		});
		
		$(document).keypress(function (e) {
			switch (String.fromCharCode(e.which)) {
				case 'n':
				case 'N': 
					stepForward();
					break;
				case 'p':
				case 'P':
					stepBack();
					break;
				default:
					// do nothing
					break;
			}	
		});
		
		$(document).on('swipeleft', stepBack);
		$(document).on('swiperight', stepForward);
		
		$(document).touchwipe({
		     wipeLeft: stepBack,
		     wipeRight: stepForward,
		     preventDefaultEvents: true
		});
		
		

		var socket = io.connect('epostcardster.no.de');
		socket.on('pageturn', function (data) {
		    console.log(data);
		});
		socket.on('message', function (data) {
		    console.log('message' + data);
		});
		$(document).ready(function () {
			currentPage = 1;
			$(pageSelector + ":first").fadeIn();
			setupRandomFadeIns();
			prettyPrint && prettyPrint();
			$(noteSelector).click(function (e) {noteMode = true; e.preventDefault(); e.stopPropagation(); return false;});
		});
	}(jQuery));