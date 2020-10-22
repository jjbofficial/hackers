var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

require("jquery.scrollex");

require("bootstrap/js/dist/util");
require("bootstrap/js/dist/modal");

require("bootstrap/dist/css/bootstrap.min.css");
require("../css/hackers.css");

(function() {
	'use strict';
	
	
	function typeWriter(text, i, fnCallback) {
			// check if text isn't finished yet
			if (i < (text.length)) {
				// add next character to span
			 $("section.terminal .cmd")[0].innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

				// wait for a while and call this function again for next character
				setTimeout(function() {
					typeWriter(text, i + 1, fnCallback)
				}, 100);
			}
			// text finished, call callback if there is a callback function
			else if (typeof fnCallback == 'function') {
				// call callback after timeout
				setTimeout(fnCallback, 700);
			}
	}
	
	function StartTextAnimation(i) {
			var dataText = ["./password_decrypt"];
			 if (typeof dataText[i] == 'undefined'){
				 $("section.terminal .cmd").css("border", "0").css("animation", "none");
					$(".terminal-response:first").show();
				 setTimeout(function() {
					 $(".terminal-response:last").show();
				 },300);
			 }
			 // check if dataText[i] exists
			else if (i < dataText[i].length) {
				// text exists! start typewriter animation
			 typeWriter(dataText[i], 0, function(){
				 // after callback (and whole text has been animated), start next text
				 StartTextAnimation(i + 1);
			 });
			}
		}
// make nav stick when scrolling
var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
	var stickyHeight = sticky.outerHeight(),
			stickyTop = stickyWrapper.offset().top;

	if (scrollElement.scrollTop() >= stickyTop){
			stickyWrapper.height(stickyHeight);
			sticky.addClass("is-sticky");
	}
	else{
		sticky.removeClass("is-sticky");
		stickyWrapper.height('auto');
	}
};
	

	$(function() {
		
		// vars
		var $body = $("body"),
		    $window = $(window);
		
		//
		var hacker = {
			viewportfix: function() {
				//IE10 viewport hack for Surface/desktop Windows 8 bug
				if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
						var msViewportStyle = document.createElement('style')
						msViewportStyle.appendChild(
								document.createTextNode(
										'@-ms-viewport{width:auto!important}'
								)
						)
						document.head.appendChild(msViewportStyle)
				}
			},

			animateterminal : function() {
				
				StartTextAnimation(0);
			},

			makeNavStick : function() {
  			
				var sticky = $("section nav.navbar"),
				stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
				sticky.before(stickyWrapper);
				sticky.addClass('sticky');


				// Scroll & resize events
				$(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
					stickyToggle(sticky, stickyWrapper, $(this));
				});

				// On page load
				stickyToggle(sticky, stickyWrapper, $(window));
				
		}
		
	}
																						
	
	// viewport fix
	hacker.viewportfix();

	// animate terminal
	hacker.animateterminal();
	
	hacker.makeNavStick();
		
	// hidden menu
	var $trigger = $("section #trigger"),
			$close = $("section #close"),
			$menu = $("section .menu");
	
	$trigger.click(function opennav(event) {
		event.preventDefault();
		if($menu.css("animation-name") === "fadeOut")
			$menu.css("animationName", "fadeIn");
		
		$menu.addClass("visible");
	});
	
	$close.click(function closenav() {
		var duration = parseInt($menu.css("animation-duration"));
		$menu.css("animationName", "fadeOut");
		setTimeout(function() {
			$menu.removeClass("visible");
		},duration + duration/2);
	});
	
		// animation when scrolling
	$(".why-us div[data-animate]").scrollex({
		enter: function() {
			// add class to element 
			var $this = $(this);
			$this.addClass($this.attr("data-animate"));
		}
		
	}).
	// display the elements after animation
	on("animationend", function(event) {
		$(this).removeAttr("data-animate");
	});
	
	$(".our-team div[data-animate]").scrollex({
		enter: function() {
			var $this = $(this);
			$this.addClass($this.attr("data-animate"));
		}
	}).
	on("animationend", function() {
		$(this).removeAttr("data-animate");
	});
		
		
	});
	
})();