  (function ($) {
		"use strict";
		
		var pagesSelector = ".pages",
			pageSelector = pagesSelector + " .page",
			fullScreenSelector = ".fullScreen",
			folderSelector = ".folder",
			randomFadeInsSelector = ".randomFadeIns",
			currentPage = 0,
			numPages = $(pageSelector).size(),
		
			showPage = function (n) {
				$(pageSelector).fadeOut();
				$(pageSelector + ":nth-child(" + n + ")").fadeIn();
			},
		
			stepForward = function () {
				if (currentPage < numPages) {
					currentPage += 1;
					showPage(currentPage);
				}
			},
			stepBack = function () {
				if (currentPage > 1) {
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
				var showTime = 15000,
					$children = $(randomFadeInsSelector).children(),
					numChildren = $children.size(),
					selectedChildIndex = 0;
				
				setInterval(function () {
					selectedChildIndex = parseInt(Math.random() * numChildren, 10);
					$children.each(function () {
						$(this).fadeOut();	
					});
					$($children.get(selectedChildIndex)).fadeIn();
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
		
		
		$(document).ready(function () {
			currentPage = 1;
			$(pageSelector + ":first").fadeIn();
			setupRandomFadeIns();
		});
	}(jQuery));