/*! =========================================================
 *
 * Material Kit PRO - v1.1.1
 *
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-kit-pro
 * Available with purchase of license from http://www.creative-tim.com/product/material-kit-pro
 * Copyright 2017 Creative Tim (https://www.creative-tim.com)
 * License Creative Tim (https://www.creative-tim.com/license)
 *
 * ========================================================= */

var big_image;
(function($){
 $(document).ready(function(){

     // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
     $.material.init();

     window_width = $(window).width();

     $navbar = $('.navbar[color-on-scroll]');
     scroll_distance = $navbar.attr('color-on-scroll') || 500;

     $navbar_collapse = $('.navbar').find('.navbar-collapse');

     //  Activate the Tooltips
     $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

     //    Activate bootstrap-select
     if($(".selectpicker").length != 0){
        $(".selectpicker").selectpicker();
     }
     function unselectAllElements(){
        /**$('.content-area .item-design').each(function(){
            $(this).removeClass('active');
            $(this).css('border', 0);

            if ($(this).resizable('option', 'disabled') == false)
                $(this).resizable({ disabled: true, handles: 'e' });

            if ($(this).draggable('option', 'disabled') == false)
                $(this).draggable({ disabled: true });

            $(this).rotatable("setValue", 0);
        });**/
     }
     //Hide the elements
     $(document).click(function(e) {
        //$(".popovertext").hide();
        //$(".item-design").removeClass('active');
        unselectAllElements();
     });
     // Activate Popovers
     //$('[data-toggle="popover"]').popover();

     // Active Carousel
    //$('.carousel').carousel({
     //  interval: 3000
     //});
     //Activate tags
     //removed class label and label-color from tag span and replaced with data-color
     var tagClass = $('.tagsinput').data('color');

     //$('.tagsinput').tagsinput({
     //    tagClass: ' tag-'+ tagClass +' '
     //});

     if($('.navbar-color-on-scroll').length != 0){
         $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
     }

     if (window_width >= 768){
         big_image = $('.page-header[data-parallax="true"]');
         if(big_image.length != 0){
            $(window).on('scroll', materialKitDemo.checkScrollForParallax);
         }

     }
 });

 $(window).on("load", function() {
      //initialise rotating cards
      materialKit.initRotateCard();

      //initialise colored shadow
      materialKit.initColoredShadows();

      //initialise animation effect on images
      materialKit.initAtvImg();
  });

 $(document).on('click', '.card-rotate .btn-rotate', function(){
     var $rotating_card_container = $(this).closest('.rotating-card-container');

     if($rotating_card_container.hasClass('hover')){
         $rotating_card_container.removeClass('hover');
     } else {
         $rotating_card_container.addClass('hover');
     }
 });

 $(document).on('click', '.navbar-toggle', function(){
     $toggle = $(this);

     if(materialKit.misc.navbar_menu_visible == 1) {
         $('html').removeClass('nav-open');
         materialKit.misc.navbar_menu_visible = 0;
         $('#bodyClick').remove();
          setTimeout(function(){
             $toggle.removeClass('toggled');
          }, 550);

         $('html').removeClass('nav-open-absolute');
     } else {
         setTimeout(function(){
             $toggle.addClass('toggled');
         }, 580);


         div = '<div id="bodyClick"></div>';
         $(div).appendTo("body").click(function() {
             $('html').removeClass('nav-open');

             if($('nav').hasClass('navbar-absolute')){
                 $('html').removeClass('nav-open-absolute');
             }
             materialKit.misc.navbar_menu_visible = 0;
             $('#bodyClick').remove();
              setTimeout(function(){
                 $toggle.removeClass('toggled');
              }, 550);
         });

         if($('nav').hasClass('navbar-absolute')){
             $('html').addClass('nav-open-absolute');
         }

         $('html').addClass('nav-open');
         materialKit.misc.navbar_menu_visible = 1;
     }
 });

 $(window).on('resize', function(){
     materialKit.initRotateCard();
 });

 materialKit = {
     misc:{
         navbar_menu_visible: 0,
         window_width: 0,
         transparent: true,
         colored_shadows: true,
         fixedTop: false,
         navbar_initialized: false,
         isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
     },

     initAtvImg: function(){
        $('.card-atv').each(function(){
            var $atv_div = $(this).find('.atvImg');
            var $atv_img = $atv_div.find('img');

            var img_src = $atv_img.attr('src');
            var atv_image_layer = '<div class="atvImg-layer" data-img="' + img_src + '"/>';

            $atv_div.css('height',$atv_img.height() + 'px');
            $atv_div.append(atv_image_layer);

        });

        atvImg();
    },
    initSliderDesigner: function(){
        $('#sliderProductID').slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            centermode: false
        });
    },
    initSliderHome: function(){
        $('#autoplay-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            appendArrows: "#slider-container",
            prevArrow: '<a href="javascript:void(0)" class="slick-prev"><i class="material-icons">keyboard_arrow_left</i></a>',
            nextArrow: '<a href="javascript:void(0)" class="slick-next"><i class="material-icons">keyboard_arrow_right</i></a>',
            autoplay: !0,
            autoplaySpeed: 4e3
        });

        $('#center-slider').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 1,
            infinite: true,
            variableWidth: true,
            variableHeight: true,
            arrows: !0,
            appendArrows: "#features-slider-container",
            prevArrow: '<a href="javascript:void(0)" class="slick-prev"><i class="material-icons">keyboard_arrow_left</i></a>',
            nextArrow: '<a href="javascript:void(0)" class="slick-next"><i class="material-icons">keyboard_arrow_right</i></a>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1,
                        infinite: true,
                        variableWidth: true,
                        variableHeight: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: "unslick"
                }
            ]
        });
         /* Create testimonials slider settings */
        $('#testimonials-slider').slick({
            centerMode: true,
            centerPadding: '0',
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: 0,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerMode: true,
                        centerPadding: '0',
                        slidesToShow: 1,
                        infinite: true,
                        variableWidth: true,
                        variableHeight: true,
                        arrows: !0,
                        appendArrows: "#testimonials-slider",
                        prevArrow: '<a href="javascript:void(0)" class="slick-prev"><i class="material-icons">keyboard_arrow_left</i></a>',
                        nextArrow: '<a href="javascript:void(0)" class="slick-next"><i class="material-icons">keyboard_arrow_right</i></a>'
                    }
                }
            ]
        });
    },
    initSliderProducts: function(){
        $('.product-selector li a').click(function(e){
            e.preventDefault();
            $('.selected-product').html( $(this).html() + ' <b class="caret"></b>');
        });

        $('.colors-filter li a').click(function(e){
            e.preventDefault();
            $('.colors-filter li a').removeClass('active');
            $(this).addClass('active');
        });

        /* Create related products slider settings */
        $('#related-products-slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: 0,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerMode: true,
                        centerPadding: '0',
                        slidesToShow: 1,
                        infinite: true,
                        variableWidth: true,
                        variableHeight: true,
                        arrows: !0,
                        appendArrows: "#related-products-slider",
                        prevArrow: '<a href="javascript:void(0)" class="slick-prev"><i class="material-icons">keyboard_arrow_left</i></a>',
                        nextArrow: '<a href="javascript:void(0)" class="slick-next"><i class="material-icons">keyboard_arrow_right</i></a>'
                    }
                }
            ]
        });
    },
    initColoredShadows: function(){
        if(materialKit.misc.colored_shadows == true){

            if(!materialKit.misc.isWindows){
                $('.card:not([data-colored-shadow="false"]) .card-image').each(function(){
                    var $card_img = $(this);

                    is_on_dark_screen = $(this).closest('.section-dark, .section-image').length;

                    // we block the generator of the colored shadows on dark sections, because they are not natural
                    if(is_on_dark_screen == 0){
                        var img_source = $card_img.find('img').attr('src');
                        var is_rotating = $card_img.closest('.card-rotate').length == 1 ? true : false;
                        var $append_div = $card_img;

                        var colored_shadow_div = $('<div class="colored-shadow"/>');

                        if(is_rotating){
                            var card_image_height = $card_img.height();
                            var card_image_width = $card_img.width();

                            $(this).find('.back').css({
                                'height': card_image_height + 'px',
                                'width': card_image_width + 'px'
                            });
                            var $append_div = $card_img.find('.front');
                        }

                        colored_shadow_div.css({'background-image': 'url(' + img_source +')'}).appendTo($append_div);

                        if($card_img.width() > 700){
                            colored_shadow_div.addClass('colored-shadow-big');
                        }

                        setTimeout(function(){
                            colored_shadow_div.css('opacity',1);
                        }, 200)
                    }

                });
            }
        }
    },

     initRotateCard: debounce(function(){

         $('.card-rotate .card-image > .back').each(function(){
             var card_image_height = $(this).parent().height();
             var card_image_width = $(this).parent().width();

             $(this).css({
                 'height': card_image_height + 'px',
                 'width': card_image_width + 'px'
             });

             if($(this).hasClass('back-background')){
                 var img_src = $(this).siblings('.front').find('img').attr('src');
                 $(this).css('background-image','url("' + img_src + '")');
             }
         });
     }, 17),

     checkScrollForTransparentNavbar: debounce(function() {
             if($(document).scrollTop() > scroll_distance ) {
                 if(materialKit.misc.transparent) {
                     materialKit.misc.transparent = false;
                     $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                 }
             } else {
                 if( !materialKit.misc.transparent ) {
                     materialKit.misc.transparent = true;
                     $('.navbar-color-on-scroll').addClass('navbar-transparent');
                 }
             }
     }, 17),

     initSliders: function(){
         // Sliders for demo purpose
         var slider = document.getElementById('sliderRegular');

         noUiSlider.create(slider, {
             start: 40,
             connect: [true,false],
             range: {
                 min: 0,
                 max: 100
             }
         });

         var slider2 = document.getElementById('sliderDouble');

         noUiSlider.create(slider2, {
             start: [ 20, 60 ],
             connect: true,
             range: {
                 min:  0,
                 max:  100
             }
         });
     }
 }




 materialKitDemo = {

     checkScrollForParallax: debounce(function(){
        if(isElementInViewport(big_image)){
             var current_scroll = $(this).scrollTop();
             oVal = ($(window).scrollTop() / 3);
             big_image.css({
                 'transform':'translate3d(0,' + oVal +'px,0)',
                 '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
                 '-ms-transform':'translate3d(0,' + oVal +'px,0)',
                 '-o-transform':'translate3d(0,' + oVal +'px,0)'
             });
        }
     }, 4)
 }
 // Returns a function, that, as long as it continues to be invoked, will not
 // be triggered. The function will be called after it stops being called for
 // N milliseconds. If `immediate` is passed, trigger the function on the
 // leading edge, instead of the trailing.

 function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
 };


 function isElementInViewport(elem) {
     var $elem = $(elem);

     // Get the scroll position of the page.
     var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
     var viewportTop = $(scrollElem).scrollTop();
     var viewportBottom = viewportTop + $(window).height();

     // Get the position of the element on the page.
     var elemTop = Math.round( $elem.offset().top );
     var elemBottom = elemTop + $elem.height();

     return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
 }
 })(jQuery); 