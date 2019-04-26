$(function(){
  $.ajax({
    type:'POST',
    url:'/?do=call',
    data:{getcsrf:1},
    success: function(data) {
      $('form').attr('data-csrf',data);
    }
  })

  $('form.call-form').submit(function(e) {
    e.preventDefault();
    $('input[type=submit]',this).prop('disabled',true).css({opacity:.5})
    $.ajax({
      type:'POST',
      url:`/?do=call&setcsrf=${$('form.call-form').data('csrf')}`,
      data: $(this).serialize(),
      success: function(data) {
        console.log(data);
        if (data == 'success') {
          $(".popup-block").hide();
          $("#popup-success").show();
          $(".popup").addClass("popup--show");
        }
        else {
          
        }
      }
    })
  });
})

$(document).ready(function(){

  $("#projects").on( 'mousemove', function( e ) {
    var amountMovedX = 60 * ( (e.pageX + 1) / $( document ).width() ) - 100;
    var amountMovedY = 60 * ( (e.pageY + 1) / $( window ).height() ) + 100;

    $( '#move-sheets-left' ).css('left', amountMovedX + 'px ');
    $( '#move-sheets-left' ).css('top', amountMovedY + 'px' );

    $( '#move-sheets-right' ).css('right', amountMovedX + 'px ');
    $( '#move-sheets-right' ).css('top', amountMovedY + 'px' );
  } ); 

  $(".js-getcall").click(function(){
    $(".popup-block").hide();
    $("#popup-getcall").show();
    $(".popup").addClass("popup--show");
  });
  $(".js-getmap").click(function(){
    $(".popup-block").hide();
    $("#popup-map").show();
    $(".popup").addClass("popup--show");
  });
  $(".js-getpriem").click(function(){
    $(".popup-block").hide();
    $("#popup-priem").show();
    $(".popup").addClass("popup--show");
  });
  $(".popup-close").click(function(){
    $(".popup").removeClass("popup--show");
  });
  $(".popup-bg").click(function(){
    $(".popup").removeClass("popup--show");
  });

  $("#pod-usadku").click(function(){
    $(".komplects__block").hide();
    $(".komplects__block--usadka").show();
  });
  $("#pod-kluch").click(function(){
    $(".komplects__block").hide();
    $(".komplects__block--kluch").show();
  });

  $(".menu__item_arrow").click(function(){
    $(this).parent(".menu__item").toggleClass("menu__item--open");
  });
  $(".butter").click(function(){
    $(".menu").addClass("menu--show");
  });
  $(".menu-close").click(function(){
    $(".menu").removeClass("menu--show");
  });


  $(".js-slider").slick({
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: true,
    draggable: false
  });

  $('.js-slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-slider-nav'
  });
  $('.js-slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.js-slider-for',
    dots: false,
    arrows: true,
    focusOnSelect: true
  });



  var a = 0;
  $(window).on('scroll load resize', function() {

    if ($('#counter').length > 0) {
      var oTop = $('#counter').offset().top - window.innerHeight + 200;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function() {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
              countNum: countTo
            },

            {
              duration: 2000,
              easing: 'swing',
              step: function() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                $this.text(this.countNum);
              }

            });
        });
        a = 1;
      }
    }

  });



  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top});
    return false;
  });
  
  
  $(function() {
    $("[type=tel]").mask("+7 (999) 999-99-99");
  });
  $('form input[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
        $(this).parents("form").find("input[type='submit']").attr("disabled", false);
    } else {
        $(this).parents("form").find("input[type='submit']").attr("disabled", true);
    }
  });

  if ($("#map").length != 0) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
            center: [56.643702, 47.986668],
            zoom: 12,
            controls: []
          }),
          
          myPlacemark = new ymaps.Placemark([56.637164, 47.884256], {
            hintContent: 'Адрес офиса: бульвар Победы, 5',
            balloonContent: 'Адрес офиса: бульвар Победы, 5'
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/pin-map.png',
            iconImageSize: [55, 69],
            iconImageOffset: [-27, -69]
          });
          myPlacemark2 = new ymaps.Placemark([56.642115502854054,48.09462169320679], {
            hintContent: 'Адрес производства: деревня Паганур',
            balloonContent: 'Адрес производства: деревня Паганур'
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/pin-map.png',
            iconImageSize: [55, 69],
            iconImageOffset: [-27, -69]
          });
          
      myMap.behaviors.disable('scrollZoom');
      myMap.geoObjects.add(myPlacemark);
      myMap.geoObjects.add(myPlacemark2);
    });
  }  
});