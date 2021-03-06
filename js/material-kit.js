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

function debounceAtv(func, wait, immediate) {
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

function atvImg(){

  var d = document,
    de = d.documentElement,
    bd = d.getElementsByTagName('body')[0],
    win = window,
    imgs = d.querySelectorAll('.atvImg'),
    totalImgs = imgs.length,
    supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

  if(totalImgs <= 0){
    return;
  }

  // build HTML
  for(var l=0;l<totalImgs;l++){

    var thisImg = imgs[l],
      layerElems = thisImg.querySelectorAll('.atvImg-layer'),
      totalLayerElems = layerElems.length;

    if(totalLayerElems <= 0){
      continue;
    }

    while(thisImg.firstChild) {
      thisImg.removeChild(thisImg.firstChild);
    }

    var containerHTML = d.createElement('div'),
      shineHTML = d.createElement('div'),
      shadowHTML = d.createElement('div'),
      layersHTML = d.createElement('div'),
      layers = [];

    thisImg.id = 'atvImg__'+l;
    containerHTML.className = 'atvImg-container';
    shineHTML.className = 'atvImg-shine';
    shadowHTML.className = 'atvImg-shadow';
    layersHTML.className = 'atvImg-layers';

    for(var i=0;i<totalLayerElems;i++){
      var layer = d.createElement('div'),
        imgSrc = layerElems[i].getAttribute('data-img');

      layer.className = 'atvImg-rendered-layer';
      layer.setAttribute('data-layer',i);
      layer.style.backgroundImage = 'url('+imgSrc+')';
      layersHTML.appendChild(layer);

      layers.push(layer);
    }

    containerHTML.appendChild(shadowHTML);
    containerHTML.appendChild(layersHTML);
    containerHTML.appendChild(shineHTML);
    thisImg.appendChild(containerHTML);

    var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
    thisImg.style.transform = 'perspective('+ w*3 +'px)';

    if(supportsTouch){
      win.preventScroll = false;

          (function(_thisImg,_layers,_totalLayers,_shine) {
        thisImg.addEventListener('touchmove', function(e){
          if (win.preventScroll){
            e.preventDefault();
          }
          processMovement(e,true,_thisImg,_layers,_totalLayers,_shine);
        });
              thisImg.addEventListener('touchstart', function(e){
                win.preventScroll = true;
          processEnter(e,_thisImg);
        });
        thisImg.addEventListener('touchend', function(e){
          win.preventScroll = false;
          processExit(e,_thisImg,_layers,_totalLayers,_shine);
        });
          })(thisImg,layers,totalLayerElems,shineHTML);
      } else {
        (function(_thisImg,_layers,_totalLayers,_shine) {
        thisImg.addEventListener('mousemove', function(e){
          processMovement(e,false,_thisImg,_layers,_totalLayers,_shine);
        });
              thisImg.addEventListener('mouseenter', function(e){
          processEnter(e,_thisImg);
        });
        thisImg.addEventListener('mouseleave', function(e){
          processExit(e,_thisImg,_layers,_totalLayers,_shine);
        });
          })(thisImg,layers,totalLayerElems,shineHTML);
      }
  }

  processMovement = debounceAtv(function(e, touchEnabled, elem, layers, totalLayers, shine){
    var bdst = $(window).scrollTop(),
      bdsl = bd.scrollLeft,
      pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
      pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
      offsets = elem.getBoundingClientRect(),
      w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth, // width
      h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight, // height
      wMultiple = 320/w,
      offsetX = 0.52 - (pageX - offsets.left - bdsl)/w, //cursor position X
      offsetY = 0.52 - (pageY - offsets.top - bdst)/h, //cursor position Y
      dy = (pageY - offsets.top - bdst) - h / 2, //@h/2 = center of container
      dx = (pageX - offsets.left - bdsl) - w / 2, //@w/2 = center of container
      yRotate = (offsetX - dx)*(0.07 * wMultiple), //rotation for container Y
      xRotate = (dy - offsetY)*(0.1 * wMultiple); //rotation for container X

      //xRotate = xRotate - 140;
      imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)' //img transform
      arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
      angle = arad * 180 / Math.PI - 90; //convert rad in degrees

    //get angle between 0-360
    if (angle < 0) {
      angle = angle + 360;
    }

    //container transform
    if(elem.firstChild.className.indexOf(' over') != -1){
      imgCSS += ' scale3d(1.07,1.07,1.07)';
    }
    elem.firstChild.style.transform = imgCSS;

    //gradient angle and opacity for shine
    //shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
    //shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';

    //parallax for each layer
    var revNum = totalLayers;
    for(var ly=0;ly<totalLayers;ly++){
      layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
      revNum--;
    }
  }, 5);

  function processEnter(e, elem){
    elem.firstChild.className += ' over';
  }

  function processExit(e, elem, layers, totalLayers, shine){
    var container = elem.firstChild;

    setTimeout(function(){
      container.className = container.className.replace(' over','');
      container.style.transform = '';
      shine.style.cssText = '';

      for(var ly=0;ly<totalLayers;ly++){
        layers[ly].style.transform = '';
      }

    }, 50);


  }
}
(function ($) {
  $(document).ready(function () {

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    window_width = $(window).width();

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    $navbar_collapse = $('.navbar').find('.navbar-collapse');
    
    /**$(".noclick").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    });**/
    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    //    Activate bootstrap-select
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker();
    }

    function unselectAllElements() {
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
    $(document).click(function (e) {
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
    //var tagClass = $('.tagsinput').data('color');

    //$('.tagsinput').tagsinput({
    //    tagClass: ' tag-'+ tagClass +' '
    //});

    if ($('.navbar-color-on-scroll').length != 0) {
      $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    if (window_width >= 768) {
      big_image = $('.page-header[data-parallax="true"]');
      if (big_image.length != 0) {
        $(window).on('scroll', materialKitDemo.checkScrollForParallax);
      }

    }
  });

  $(window).on("load", function () {
    //initialise rotating cards
    materialKit.initRotateCard();

    //initialise colored shadow
    materialKit.initColoredShadows();

    //initialise animation effect on images
    materialKit.initAtvImg();
  });

  $(document).on('click', '.card-rotate .btn-rotate', function () {
    var $rotating_card_container = $(this).closest('.rotating-card-container');

    if ($rotating_card_container.hasClass('hover')) {
      $rotating_card_container.removeClass('hover');
    } else {
      $rotating_card_container.addClass('hover');
    }
  });

  $(document).on('click', '.navbar-toggle', function () {
    $toggle = $(this);

    if (materialKit.misc.navbar_menu_visible == 1) {
      $('html').removeClass('nav-open');
      materialKit.misc.navbar_menu_visible = 0;
      $('#bodyClick').remove();
      setTimeout(function () {
        $toggle.removeClass('toggled');
      }, 550);

      $('html').removeClass('nav-open-absolute');
    } else {
      setTimeout(function () {
        $toggle.addClass('toggled');
      }, 580);


      div = '<div id="bodyClick"></div>';
      $(div).appendTo("body").click(function () {
        $('html').removeClass('nav-open');

        if ($('nav').hasClass('navbar-absolute')) {
          $('html').removeClass('nav-open-absolute');
        }
        materialKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function () {
          $toggle.removeClass('toggled');
        }, 550);
      });

      if ($('nav').hasClass('navbar-absolute')) {
        $('html').addClass('nav-open-absolute');
      }

      $('html').addClass('nav-open');
      materialKit.misc.navbar_menu_visible = 1;
    }
  });

  $(window).on('resize', function () {
    materialKit.initRotateCard();
  });

  materialKit = {
    misc: {
      navbar_menu_visible: 0,
      window_width: 0,
      transparent: true,
      colored_shadows: true,
      fixedTop: false,
      navbar_initialized: false,
      isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
    },
    convertPrintImg: function(product, canvasPNG, side){
      //var canvasParse = canvas.toDataURL('png');
      if(side == "front"){
        var canvas = document.getElementById('frontPrint');
      }else{
        var canvas = document.getElementById('backPrint');
      }
      canvas.width = 593;
      canvas.height = 593;
      var context = canvas.getContext('2d');
      //Put design
      var img1 = loadImage(product, main);
      var img2 = loadImage(canvasPNG, main);
      var imagesLoaded = 0;
      function main() {
          imagesLoaded += 1;
          if(imagesLoaded == 2) {
              context.save();
              context.drawImage(img1, 0, 0, 592, 592);
              context.drawImage(img2, 0, 0, 592, 592);
              context.imageSmoothingQuality = 'high';
              context.restore();
          }
      }
      function loadImage(src, onload) {
          var img = new Image();
          img.onload = onload;
          img.src = src;
          return img;
      }
    },
    initAtvImg: function () {
      $('.card-atv').each(function () {
        var $atv_div = $(this).find('.atvImg');
        var $atv_img = $atv_div.find('img');

        var img_src = $atv_img.attr('src');
        var atv_image_layer = '<div class="atvImg-layer" data-img="' + img_src + '"/>';

        $atv_div.css('height', $atv_img.height() + 'px');
        $atv_div.append(atv_image_layer);

      });

      atvImg();
    },
    initSliderDesigner: function () {
      $('#sliderProductID').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        centermode: false
      });
    },
    initSliderHome: function () {
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
        autoplay: true,
        autoplaySpeed: 3000,
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
              arrows: !0,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1,
              infinite: true,
              variableWidth: true,
              variableHeight: true
            }
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
    initGoToPAYU: function () {
      $('body').block({
        message: "Thank you for your order. We are now redirecting you to PayU Latam to make payment.",
        baseZ: 99999,
        overlayCSS:
        {
          background: "#fff",
          opacity: 0.6
        },
        css: {
              padding:        "20px",
              zindex:         "9999999",
              textAlign:      "center",
              color:          "#555",
              border:         "3px solid #aaa",
              backgroundColor:"#fff",
              cursor:         "wait",
              lineHeight:   "24px",
          }
      });
      $('#submit_payulatam_payment_form').click();
    },
    initScrollTo: function () {
       $('body').scrollspy({target: '#sidebar', offset: 150});
       $('body').scrollspy('refresh');

       $('#sidebar').localScroll({
           duration: 500,
           hash: true,
           offset: -80
       });
    },
    initNotFound: function () {

         var lFollowX = 0,
           lFollowY = 0,
           x = 0,
           y = 0,
           friction = 1 / 30;

         function animate() {
           x += (lFollowX - x) * friction;
           y += (lFollowY - y) * friction;
           
           translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

           $('#parallax-bg').css({
             '-webit-transform': translate,
             '-moz-transform': translate,
             'transform': translate
           });

           window.requestAnimationFrame(animate);
         }

         $(window).on('mousemove click', function(e) {
           var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
           var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
           lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
           lFollowY = (10 * lMouseY) / 100;
         });

         animate();

   },
    initModalHeader: function () {
      $('.colors-filter li a').click(function () {
        $('.colors-filter li a').removeClass('active');
        $(this).addClass('active');
      });

      $('#sliderJollyJokerPro').slick({
        centerMode: true,
        centerPadding: '0',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        appendArrows: "#sliderJollyJokerPro",
        prevArrow: '<a href="javascript:void(0)" class="slick-prev"><i class="material-icons">keyboard_arrow_left</i></a>',
        nextArrow: '<a href="javascript:void(0)" class="slick-next"><i class="material-icons">keyboard_arrow_right</i></a>',
        dots: !0
      });
    },
    initSliderProducts: function () {
      $('.product-selector li a').click(function (e) {
        e.preventDefault();
        $('.selected-product').html($(this).html() + ' <b class="caret"></b>');
      });

      $('.colors-filter li a').click(function (e) {
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
    initColoredShadows: function () {
      if (materialKit.misc.colored_shadows == true) {

        if (!materialKit.misc.isWindows) {
          $('.card:not([data-colored-shadow="false"]) .card-image').each(function () {
            var $card_img = $(this);

            is_on_dark_screen = $(this).closest('.section-dark, .section-image').length;

            // we block the generator of the colored shadows on dark sections, because they are not natural
            if (is_on_dark_screen == 0) {
              var img_source = $card_img.find('img').attr('src');
              var is_rotating = $card_img.closest('.card-rotate').length == 1 ? true : false;
              var $append_div = $card_img;

              var colored_shadow_div = $('<div class="colored-shadow"/>');

              if (is_rotating) {
                var card_image_height = $card_img.height();
                var card_image_width = $card_img.width();

                $(this).find('.back').css({
                  'height': card_image_height + 'px',
                  'width': card_image_width + 'px'
                });
                var $append_div = $card_img.find('.front');
              }

              colored_shadow_div.css({'background-image': 'url(' + img_source + ')'}).appendTo($append_div);

              if ($card_img.width() > 700) {
                colored_shadow_div.addClass('colored-shadow-big');
              }

              setTimeout(function () {
                colored_shadow_div.css('opacity', 1);
              }, 200)
            }

          });
        }
      }
    },

    initRotateCard: debounce(function () {

      $('.card-rotate .card-image > .back').each(function () {
        var card_image_height = $(this).parent().height();
        var card_image_width = $(this).parent().width();

        $(this).css({
          'height': card_image_height + 'px',
          'width': card_image_width + 'px'
        });

        if ($(this).hasClass('back-background')) {
          var img_src = $(this).siblings('.front').find('img').attr('src');
          $(this).css('background-image', 'url("' + img_src + '")');
        }
      });
    }, 17),

    checkScrollForTransparentNavbar: debounce(function () {
      if ($(document).scrollTop() > scroll_distance) {
        if (materialKit.misc.transparent) {
          materialKit.misc.transparent = false;
          $('.navbar-color-on-scroll').removeClass('navbar-transparent');
        }
      } else {
        if (!materialKit.misc.transparent) {
          materialKit.misc.transparent = true;
          $('.navbar-color-on-scroll').addClass('navbar-transparent');
        }
      }
    }, 17),

    initSliders: function () {
      // Sliders for demo purpose
      var slider = document.getElementById('sliderRegular');

      noUiSlider.create(slider, {
        start: 40,
        connect: [true, false],
        range: {
          min: 0,
          max: 100
        }
      });

      var slider2 = document.getElementById('sliderDouble');

      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });
    }
  }


  materialKitDemo = {

    checkScrollForParallax: debounce(function () {
      if (isElementInViewport(big_image)) {
        var current_scroll = $(this).scrollTop();
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
          'transform': 'translate3d(0,' + oVal + 'px,0)',
          '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
          '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
          '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
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
    return function () {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
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
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
  }
})(jQuery);
