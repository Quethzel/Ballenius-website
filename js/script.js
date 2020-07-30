// Scroll.js

$(window).on('popstate',function(e){
	e.preventDefault();
	var target = window.location.href.split("#")[1];
	if(target != "" && target!=undefined && document.getElementById(target)!=null){
		$('html, body').stop().animate({'scrollTop': $("#"+target).offset().top}, 500, 'swing', function () {
			window.location.hash = target;
		});
	}
});

$(document).ready(function() {
	SF_scripts();
});

function SF_scripts(){

	$(window).resize(function(){
		resizeVideo();
		showMenuBtn();
	});

	$(window).trigger("resize");

	// open menu on mobile

	function showMenuBtn(){
		if($(window).width()<1199.98){
			$(".open_menu").addClass("d-block");
			$("header nav").addClass("d-none");
			$(".navigation_mobile").removeClass("opened");
		}else{
			$(".open_menu").removeClass("d-block");
			$("header nav").removeClass("d-none");
			$(".navigation_mobile").removeClass("opened");
		}
	}

	$(".open_menu").click(function(event){
		event.preventDefault();
		$(".navigation_mobile").addClass("opened");
	});

	$(".close_menu, header, section, footer, .navigation_mobile .inner a").click(function(event){
		$(".navigation_mobile").removeClass("opened");
	});
	
	// Set | remove z-index for sections, that has dropdown
	
	function SF_dropdown_parent(dropdown){
		// Find dropdown's parent nav|header|section|footer
		var section = dropdown;
		var noBreak = true;
		while(noBreak){
			if(
				section[0].tagName=="NAV" || 
				section[0].tagName=="HEADER" || 
				section[0].tagName=="SECTION" || 
				section[0].tagName=="FOOTER" || 
				section[0].tagName=="BODY"
			){
				noBreak = false;
				break;
			}else{
				section = section.parent();				
			}
		}
		return section;
	}
	function SF_highest_zIndex(){
		// Find nav|header|section|footer with highest z-index on page
		var zIndex = 1;
		var currentzIndex;
		var section;
		$("nav, header, section, footer").each(function(){
			currentzIndex = parseInt($(this).css("z-index"));
			if(zIndex < currentzIndex){
				zIndex = currentzIndex;
				section = $(this);
			}
		});
		return [zIndex, section];
	}
	
	// Set highest z-index for section, that has opened dropdown
	$(".dropdown").on("show.bs.dropdown", function () {
		var section = SF_dropdown_parent($(this));
		section.css("z-index",SF_highest_zIndex()[0]+1);	
	});
	
	// Remove z-index for section, where dropdown was closed
	$(".dropdown").on("hidden.bs.dropdown", function () {
		var section = SF_dropdown_parent($(this));
		section.css("z-index","auto");	
	})
	
	// Navigation dropdown popup

	if($(".js-nav-dropdowns").length>0){
		$("body").click(function(event){
			if($(event.target).closest(".navigation_popup").length==0 && $(event.target).closest(".js-open-nav-dropdown").length==0){
				$(".navigation_popup.opened").removeClass("opened");
				$(".js-open-nav-dropdown i.fa-flip-vertical").removeClass("fa-flip-vertical");
			}
		});
		
		$(".js-nav-dropdowns .js-open-nav-dropdown").click(function(event){
			event.preventDefault();
			var id = $(".js-nav-dropdowns .js-open-nav-dropdown").index($(this));
			if($(".navigation_popup").eq(id).hasClass("opened")){
				$(this).find("i").removeClass("fa-flip-vertical");
				$(".navigation_popup").eq(id).removeClass("opened");
			}else{
				$(".navigation_popup.opened").removeClass("opened");
				$(".js-open-nav-dropdown i.fa-flip-vertical").removeClass("fa-flip-vertical");
				$(".navigation_popup").eq(id).addClass("opened");			
				$(this).find("i").addClass("fa-flip-vertical");
				var section = SF_dropdown_parent($(this));
				section.css("z-index",SF_highest_zIndex()[0]+1);				
			}
		});
	}
	
	// Enable AOS plugin (blocks animations)

	if(typeof(AOS) !== 'undefined' && $("body").hasClass("SFG_body")===false){
		AOS.init({
			easing: 'ease-out-cubic',
			once: true,
			offset: 50
		});
		setTimeout(function(){
			if($(".slick-initialized").length>0){
				AOS.refreshHard();
			}
		},200);
	}

	// Resize video, saving aspect ratio

	function resizeVideo(){
		var width, height, ratio;
		$(".video").each(function(){
			ratio = $(this).data("ratio");
			ratio = ratio.split("/");
			ratio = ratio[0]/ratio[1];
			width = $(this).width();
			height = width/ratio;
			$(this).height(height);
		});
	}

	resizeVideo();

	// Play video

	$(".video .play").click(function(){
		var video = $(this).parent().parent().find("video");
		$(this).closest(".poster").fadeOut(300,function(){
			video.fadeIn(300,function(){
				video[0].play();
				video[0].onended = function() {
					$(this).parent().find(".poster").delay(100).fadeIn(300);
				};
			});
		});
	});

	/*
		Sliders
	*/
	
	var slick_slider;

	if($(".header_8 .slider").length>0){
		$(".header_8 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: true,
					arrows: true,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 20000,
					responsive: [
						{
						  breakpoint: 481,
						  settings: {
							arrows:false
						  }
						}
					]
				});
			}
		});
	}

	if($(".header_19 .slider").length>0){
		$(".header_19 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: true,
					arrows: false,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 20000,
					vertical: true,
					verticalSwiping: true,
					responsive: [
						{
						  breakpoint: 1200,
						  settings: {
							vertical: false,
							verticalSwiping: false
						  }
						}
					]
				});
			}
		});
	}
	
	if($(".navigation_23 .slider").length>0){
		$(".navigation_23 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: true,
					arrows: false,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 20000,
				});
			}
		});
	}
	if($(".navigation_26 .slider").length>0){
		$(".navigation_26 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: true,
					arrows: false,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 20000,
				});
			}
		});
	}
	
	if($(".feature_29 .slider").length>0){
		$(".feature_29 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: true,
					arrows: false,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					vertical:true,
					verticalSwiping:true,
					adaptiveHeight:true,
					responsive: [
						{
						  breakpoint: 767,
						  settings: {
							vertical:false,
							verticalSwiping:false,
						  }
						}
					]
				});
			}
		});
	}

	if($(".feature_31 .slider").length>0){
		$(".feature_31 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: true,
					arrows: false,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					vertical:true,
					verticalSwiping:true,
					responsive: [
						{
						  breakpoint: 768,
						  settings: {
							vertical:false,
							verticalSwiping:false,
						  }
						}
					]
				});
			}
		});
	}

	if($(".form_4 .slider").length>0){
		$(".form_4 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					touchMove:false,
					swipe:false,
					adaptiveHeight: true,
					asNavFor: '.form_4 .form_4_menu:eq('+index+')',
				});
				$('.form_4 .form_4_menu:eq('+index+')').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.form_4 .slider:eq('+index+')',
					dots: false,
					arrows: false,
					focusOnSelect: true,
					touchMove:false,
					swipe:false,
				});
			}
		});
	}

	if($(".form_15 .slider").length>0){
		$(".form_15 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					adaptiveHeight: true,
					swipe:false,
					asNavFor: '.form_15 .form_15_menu:eq('+index+')',
				});
				$('.form_15 .form_15_menu:eq('+index+')').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.form_15 .slider:eq('+index+')',
					dots: false,
					arrows: false,
					focusOnSelect: true,
				});
			}
		});
	}
	
	if($(".pricing_table_6 .slider").length>0){
		$(".pricing_table_6 .slider").each(function(index){
			slick_slider = $(this);
			var toggle = $(".pricing_table_6 .custom-toggle:eq("+index+")");
			var togglePin = toggle.find("div");
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: false,
					arrows: false,
					fade: true,
					infinite: true,
					speed: 300,
					touchMove:false,
					swipe:false,
					slidesToShow: 1,
					slidesToScroll: 1,
				});
				$(".pricing_table_6 .slider:eq("+index+")").on('beforeChange',function(){
					if(toggle.hasClass("switched")){
						toggle.removeClass("switched");
						togglePin.animate({left:3},200);
					}else{
						var animate_to = toggle.width() - togglePin.outerWidth(true) - 3;
						toggle.addClass("switched");
						togglePin.animate({left:animate_to},200);
					}
				});
				
			}
			toggle.click(function(){
				$(".pricing_table_6 .slider:eq("+index+")").slick("slickNext");
			});
		});
	}

	if($(".ecommerce_11 .slider").length>0){
		$(".ecommerce_11 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					dots: false,
					arrows: true,
					infinite: true,
					speed: 300,
					slidesToShow: 3,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 20000,
					responsive: [
						{
						  breakpoint: 992,
						  settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 768,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						  }
						}
					]
				});
			}
		});
	}
	
	if($(".ecommerce_15 .slider").length>0){
		$(".ecommerce_15 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.ecommerce_15 .slider_menu:eq('+index+')',
				});
				$('.ecommerce_15 .slider_menu:eq('+index+')').slick({
					slidesToShow: 6,
					slidesToScroll: 1,
					asNavFor: '.ecommerce_15 .slider:eq('+index+')',
					dots: false,
					arrows: false,
					focusOnSelect: true,
					responsive: [
						{
						  breakpoint: 1200,
						  settings: {
							slidesToShow: 5,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 768,
						  settings: {
							slidesToShow: 6,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 469,
						  settings: {
							slidesToShow: 5,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 419,
						  settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 359,
						  settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						  }
						}
					]
				});
			}
		});
	}
	
	if($(".ecommerce_19 .slider").length>0){
		$(".ecommerce_19 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.ecommerce_19 .slider_menu:eq('+index+')',
				});
				$('.ecommerce_19 .slider_menu:eq('+index+')').slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					asNavFor: '.ecommerce_19 .slider:eq('+index+')',
					dots: false,
					arrows: false,
					focusOnSelect: true,
					responsive: [
						{
						  breakpoint: 768,
						  settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 469,
						  settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 359,
						  settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						  }
						}
					]
				});
			}
		});
	}
	
	if($(".ecommerce_32 .slider").length>0){
		$(".ecommerce_32 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.ecommerce_32 .slider_menu:eq('+index+')',
				});
				$('.ecommerce_32 .slider_menu:eq('+index+')').slick({
					slidesToShow: 4,
					slidesToScroll: 1,
					asNavFor: '.ecommerce_32 .slider:eq('+index+')',
					dots: false,
					arrows: true,
					focusOnSelect: true,
					responsive: [
						{
						  breakpoint: 469,
						  settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						  }
						},
						{
						  breakpoint: 359,
						  settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						  }
						}
					]
				});
			}
		});
	}
	
	if($(".ecommerce_35 .slider").length>0){
		$(".ecommerce_35 .slider").each(function(index){
			slick_slider = $(this);
			if(slick_slider.hasClass("slick-initialized")===false){
				slick_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					adaptiveHeight: true,
					swipe:false,
					asNavFor: '.ecommerce_35 .slider_menu:eq('+index+')',
				});
				$('.ecommerce_35 .slider_menu:eq('+index+')').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.ecommerce_35 .slider:eq('+index+')',
					dots: false,
					arrows: false,
					focusOnSelect: true,
				});
			}
		});
	}

}; // SF_scripts end
