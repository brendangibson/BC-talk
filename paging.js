  (function ($) {
		"use strict";
		
		var pagesSelector = ".pages",
			pageSelector = pagesSelector + " .page",
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
		
		$(document).ready(function () {
			currentPage = 1;
			$(pageSelector + ":first").fadeIn();	
		});
	}(jQuery));