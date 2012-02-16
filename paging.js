  (function ($) {
		"use strict";
		
		var pagesSelector = ".pages",
			pageSelector = pagesSelector + " .page",
			fullScreenSelector = ".fullScreen",
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
			};
			
			
		 HTMLElement.prototype.requestFullScreen =
		      HTMLElement.prototype.requestFullScreen ||
		      HTMLElement.prototype.webkitRequestFullScreen ||
		      HTMLElement.prototype.mozRequestFullScreen ||
		      HTMLElement.prototype.oRequestFullScreen ||
		      HTMLElement.prototype.msRequestFullScreen;
		      
		$(fullScreenSelector).on('click', function () {
			$(.pagesSelector).get(0).requestFullScreen();
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
		});
	}(jQuery));