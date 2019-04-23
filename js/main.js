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


  $(".js-slider").slick({
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: true,
    slide: ".slider__item",
    draggable: false
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
            center: [56.640911, 47.902115],
            zoom: 17,
            controls: []
          }),
          
          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'ул. Советская, 95',
            balloonContent: 'ул. Советская, 95'
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/icons/pin.png',
            iconImageSize: [31, 50],
            iconImageOffset: [15, -50]
          });
          
      myMap.behaviors.disable('scrollZoom');
      myMap.geoObjects.add(myPlacemark);

      if ($("#contacts-map").length != 0) {
        var myMap2 = new ymaps.Map('contacts-map', {
              center: [56.640911, 47.902115],
              zoom: 17,
              controls: []
            }),

            myPlacemark2 = new ymaps.Placemark(myMap2.getCenter(), {
              hintContent: 'ул. Советская, 95',
              balloonContent: 'ул. Советская, 95'
            }, {
              iconLayout: 'default#image',
              iconImageHref: 'images/icons/pin.png',
              iconImageSize: [31, 50],
              iconImageOffset: [15, -50]
            });
        myMap2.behaviors.disable('scrollZoom');
        myMap2.geoObjects.add(myPlacemark2);
        }
    });
  }  
});