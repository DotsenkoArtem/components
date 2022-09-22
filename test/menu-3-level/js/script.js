function showSuccessMessage() {
  $("#successMessageModal").find("span").text("Спасибо за заявку");
  $("#successMessageModal").find("p").text("С вами скоро свяжутся!");
  $("#successMessageModal").modal("show");
}

function showSuccessSendReview() {
  $("#successMessageModal").find("span").text("Спасибо за отзыв!");
  $("#successMessageModal")
    .find("p")
    .html("Ваш отзыв будет проверен <br>модератором.");
  $("#successMessageModal").modal("show");
}

function errorCaptchaMessage() {
  $("#successMessageModal").find("span").text("Ошибка!");
  $("#successMessageModal").find("p").text("Вы неверно разгадали капчу!");
  $("#successMessageModal").modal("show");
}

function errorOtherMessage(message) {
  $("#successMessageModal").find("span").text("Ошибка!");
  $("#successMessageModal")
    .find("p")
    .html(
      '<div style="font-size:14px">Произошла ошибка при отправке <br>формы на сервер: <br>' +
        message +
        "</div>"
    );
  $("#successMessageModal").modal("show");
}

$(document).ready(function () {
  $(".slide").slick({
    infinite: true,
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 882,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
});

var loaderBr = function () {
  if (window.pageLoaded) return;
  window.pageLoaded = true;
  $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
};
$(window).load(loaderBr);
setTimeout(loaderBr, 5000);

// accordion: faq
$(function () {
  var $uiAccordion = $(".js-ui-accordion");

  $uiAccordion.accordion({
    collapsible: true,
    heightStyle: "content",

    activate: function activate(event, ui) {
      var newHeaderId = ui.newHeader.attr("id");

      if (newHeaderId) {
        // history.pushState(null, null, `#${newHeaderId}`);
      }
    },

    create: function create(event, ui) {
      var $this = $(event.target);
      var $activeAccordion = $(window.location.hash);

      if ($this.find($activeAccordion).length) {
        $this.accordion(
          "option",
          "active",
          $this
            .find($this.accordion("option", "header"))
            .index($activeAccordion)
        );
      }
    },
  });

  $(window).on("hashchange", function (event) {
    var $activeAccordion = $(window.location.hash);
    var $parentAccordion = $activeAccordion.parents(".js-ui-accordion");

    if ($activeAccordion.length) {
      $parentAccordion.accordion(
        "option",
        "active",
        $parentAccordion
          .find($uiAccordion.accordion("option", "header"))
          .index($activeAccordion)
      );
    }
  });
});

// после загрузки веб-страницы
$(function () {
  // при нажатии на кнопку Обновить
  $("#reload-captcha,#reload-captchat").click(function () {
    // выводим новый код капча
    $("#img-captcha,#img-captchat").attr(
      "src",
      "/captcha?id=" + Math.random() + ""
    );
  });

  $(".contactForm").submit(function (event) {
    var form = this;
    // отменяем стандартное действие браузера
    event.preventDefault();
    // заводим переменную, которая будет говорить о том валидна форма или нет
    var formValid = true;
    // перебираем все элементы управления формы (input и textarea)
    $("input,textarea", form).each(function () {
      // проверяем является ли данный элемент капчей
      // если это так, то не выполняем его проверку
      if ($(this).attr("id") == "text-captcha") {
        return true;
      }
      // находим предков, имеющих класс .form-group (для установления success/error)
      var formGroup = $(this).parents(".form-group");
      // находим glyphicon (иконка успеха или ошибки)
      var glyphicon = formGroup.find(".form-control-feedback");
      // выполняем валидацию данных с помощью HTML5 функции checkValidity
      if (this.checkValidity()) {
        // добавляем к formGroup класс .has-success и удаляем .has-error
        formGroup.addClass("has-success").removeClass("has-error");
        // добавляем к glyphicon класс .glyphicon-ok и удаляем .glyphicon-remove
        glyphicon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
      } else {
        // добавляем к formGroup класс .has-error и удаляем .has-success
        formGroup.addClass("has-error").removeClass("has-success");
        // добавляем к glyphicon класс glyphicon-remove и удаляем glyphicon-ok
        glyphicon.addClass("glyphicon-remove").removeClass("glyphicon-ok");
        // если элемент не прошёл проверку, то отмечаем форму как не валидную
        formValid = false;
      }
    });
    // проверяем элемент, содержащий код капчи
    // получаем значение элемента input, который содержит код капчи
    var captcha = $("#text-captcha,#text-captchat", form).val();
    // если количество символов в коде капчи не равно 6,
    // то отмечаем капчу как невалидную и не отправляем форму на сервер
    if (captcha.length != 6) {
      // получаем элемент, содержащий капчу
      inputCaptcha = $("#text-captcha,#text-captchat", form);
      // находим предка, имеющего класс .form-group (для установления success/error)
      formGroupCaptcha = inputCaptcha.parents(".form-group");
      // находим glyphicon (иконка успеха или ошибки)
      glyphiconCaptcha = formGroupCaptcha.find(".form-control-feedback");
      // добавляем к formGroup класс .has-error и удаляем .has-success
      formGroupCaptcha.addClass("has-error").removeClass("has-success");
      // добавляем к glyphicon класс glyphicon-remove и удаляем glyphicon-ok
      glyphiconCaptcha.addClass("glyphicon-remove").removeClass("glyphicon-ok");
    }
    // если форма валидна и длина капчи равно 6 символам, то отправляем форму на сервер (AJAX)
    if (formValid && captcha.length == 6) {
      //получаем имя, которое ввёл пользователь
      var name = $("#name,#namet", form).val();
      //получаем email, который ввёл пользователь
      var email = $("#email,#emailt", form).val();
      //получаем сообщение, которое ввёл пользователь
      var message = $("#message,#messaget", form).val();
      //получаем капчу, которую ввёл пользователь
      var captcha = $("#text-captcha,#text-captchat", form).val();

      // объект, посредством которого будем кодировать форму перед отправкой её на сервер
      var formData = new FormData();
      // добавить в formData значение 'name'=значение_поля_name
      formData.append("name", name);
      // добавить в formData значение 'email'=значение_поля_email
      formData.append("email", email);
      // добавить в formData значение 'message'=значение_поля_message
      formData.append("message", message);
      // добавить в formData значение 'captcha'=значение_поля_captcha
      formData.append("captcha", captcha);

      //отправляем данные на сервер (AJAX)
      $.post("/contacts", $(this).serialize(), function (data) {
        // разбираем строку JSON, полученную от сервера
        var $data = JSON.parse(data);
        // устанавливаем элементу, содержащему текст ошибки, пустую строку
        $("#error", form).text("");

        // если сервер вернул ответ success (данные получены)
        if ($data.result == "success") {
          //очищаем форму
          $("input,textarea", form).each(function () {
            var formGroup = $(this).parents(".form-group");
            // находим glyphicon (иконка успеха или ошибки)
            var glyphicon = formGroup.find(".form-control-feedback");
            // добавляем к formGroup класс .has-success и удаляем .has-error
            formGroup.addClass("has-success").removeClass("has-error");
            // добавляем к glyphicon класс .glyphicon-ok и удаляем .glyphicon-remove
            glyphicon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
          });
          // обновляем форму:
          $("input,textarea", form).val("");
          $("input,textarea", form).css("background-color", "#fff");
          // выводим новый код капча
          $("#img-captcha,#img-captchat").attr(
            "src",
            "/captcha?id=" + Math.random() + ""
          );
          // отображаем модальное окно об успехе
          showSuccessMessage();
        } else if ($data.result == "invalidCaptcha") {
          // если сервер вернул ответ invalidcaptcha, то делаем следующее...
          // получаем элемент, содержащий капчу
          inputCaptcha = $("#text-captcha,#text-captchat", form);
          // находим предка, имеющего класс .form-group (для установления success/error)
          formGroupCaptcha = inputCaptcha.parents(".form-group");
          // находим glyphicon (иконка успеха или ошибки)
          glyphiconCaptcha = formGroupCaptcha.find(".form-control-feedback");
          // добавляем к formGroup класс .has-error и удаляем .has-success
          formGroupCaptcha.addClass("has-error").removeClass("has-success");
          // добавляем к glyphicon класс glyphicon-remove и удаляем glyphicon-ok
          glyphiconCaptcha
            .addClass("glyphicon-remove")
            .removeClass("glyphicon-ok");
          // выводим новый код капчи
          $("#img-captcha,#img-captchat").attr(
            "src",
            "/captcha?id=" + Math.random() + ""
          );
          // устанавливаем полю, с помощью которого осуществляем ввод капчи пустое значение
          $("#text-captcha,#text-captchat", form).val("");

          errorCaptchaMessage();
        } else {
          // если сервер вернул ответ error, то делаем следующее...
          errorOtherMessage($data.result);
          //$('#error').text('Произошли ошибки при отправке формы на сервер.');
        }
      });
    }
  });

  $(".orderForm").submit(function (event) {
    event.preventDefault();
    var formValid = true;

    $.post("/prices", $(this).serialize(), function (data) {
      // разбираем строку JSON, полученную от сервера
      var $data = JSON.parse(data);
      // устанавливаем элементу, содержащему текст ошибки, пустую строку
      $("#error").text("");

      $(".fancybox-close").click();

      // если сервер вернул ответ success (данные получены)
      if ($data.result == "success") {
        // отображаем модальное окно об успехе

        //очищаем форму
        $('.orderForm input[type="email"]').val("");

        showSuccessMessage();
      } else {
        // если сервер вернул ответ error, то делаем следующее...
        errorOtherMessage($data.result);
      }
    });
  });
});

// main
// <ol> <li> list-style number vertical
// <ol class="discharge-preview cols" rel="2">
// As soon as the document structure has been loaded:
document.addEventListener("DOMContentLoaded", function () {
  // For each html elem:
  elems = document.getElementsByTagName("*"); // OL and UL wanted: chose all (*) here and select later.
  for (var e = 0; e < elems.length; e++) {
    // Check if elem is a list (ordered/unordered) and has class name "cols":
    if (
      (elems[e].tagName == "OL" || elems[e].tagName == "UL") &&
      elems[e].className.search("cols") > -1
    ) {
      // Collect list items and number of columns (from the rel attribute):
      var list = elems[e];
      var listItems = list.getElementsByTagName("LI");
      var Ncols = list.getAttribute("rel") * 1; // *1 converts rel from string to int.
      // Determine total number of items, items per column and column width:
      var Ntotal = listItems.length;
      var Npercol = Math.ceil(Ntotal / Ncols);
      var colWidth = Math.floor(100 / Ncols) + "%";
      // For each column:
      for (var c = 0; c < Ncols; c++) {
        // Create column div:
        var colDiv = document.createElement("DIV");
        colDiv.style.cssFloat = "left";
        colDiv.style.width = colWidth;
        // Add list items to column div:
        var i_start = c * Npercol;
        var i_end = Math.min((c + 1) * Npercol, Ntotal);
        for (var i = i_start; i < i_end; i++) colDiv.appendChild(listItems[0]); // Using listItems[0] instead of listItems[i], because items are moved to colDiv!
        // Add column div to list:
        list.appendChild(colDiv);
      }
    }
  }
});

// main
// <ol> <li> list-style number vertical
// $(function(){

// 	var setState = function() {
// 		if( width > 900) {
// 			$( '#discharge-preview > div' ).css( {
// 				width: "50%"
// 			} );
// 		} else {
// 			$( '#discharge-preview > div' ).css( {
// 				width: "100%"
// 			} );
// 		}
// 	}
// 	var width = $(window).width();
// 	setTimeout(function() {
// 		$( window ).resize(function() {
// 			width = $(window).width();
// 			setState();
// 		})
// 	}, 100);

// });

// js html file
// jQuery(document).ready(function() {
// 	jQuery(".main_gall li a").fancybox();
// });

jQuery(document).ready(function () {
  $(".fancybox").fancybox({
    helpers: {
      overlay: {
        locked: true,
      },
    },
  });
});

// prices popup blue
// jQuery(document).ready(function() {
// 	jQuery(".btn-button_order a").fancybox();
// });

$(document).ready(function () {
  $("#orderPopup").fancybox({
    maxWidth: 646,
    maxHeight: 600,
    fitToView: false,
    width: "70%",
    height: "auto",
    autoSize: false,
    closeClick: false,
    openEffect: "none",
    closeEffect: "none",
  });
});

$(document).ready(function () {
  $("#orderPopup2").fancybox({
    maxWidth: 646,
    fitToView: false,
    width: "70%",
    height: "auto",
    autoSize: false,
    closeClick: false,
    openEffect: "none",
    closeEffect: "none",
  });
});
// popupVoicesLiving-hidden
// popupVoicesRobot-hidden

// $(document).ready(function(){
// 	$(".f_mnu").on("click","a", function (event) {
// 			//отменяем стандартную обработку нажатия по ссылке
// 			event.preventDefault();
//
// 			//забираем идентификатор бока с атрибута href
// 			var id  = $(this).attr('href'),
//
// 			//узнаем высоту от начала страницы до блока на который ссылается якорь
// 			top = $(id).offset().top;
//
// 			//анимируем переход на расстояние - top за 1500 мс
// 			$('body,html').animate({scrollTop: top-60}, 1500);
// 		});
// });

// $(document).ready(function(){
// 	$(".main_mnu").on("click","a", function (event) {
// 			//отменяем стандартную обработку нажатия по ссылке
// 			event.preventDefault();
//
// 			//забираем идентификатор бока с атрибута href
// 			var id  = $(this).attr('href'),
//
// 			//узнаем высоту от начала страницы до блока на который ссылается якорь
// 			top = $(id).offset().top;
//
// 			//анимируем переход на расстояние - top за 1500 мс
// 			$('body,html').animate({scrollTop: top-60}, 1500);
// 		});
// });

// Cache selectors
// $(function(){
// 	var lastId,
// 		topMenu = $("#menu-center"),
// 		topMenuHeight = topMenu.outerHeight()+150,
// 		// All list items
// 		menuItems = topMenu.find("a"),
// 		// Anchors corresponding to menu items
// 		scrollItems = menuItems.map(function(){
// 			var item = $($(this).attr("href"));
// 			if (item.length) { return item; }
// 		});
//
// 		// Bind click handler to menu items
// 		// so we can get a fancy scroll animation
// 		menuItems.click(function(e){
// 			var href = $(this).attr("href"),
// 			offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
// 			$('html, body').stop().animate({
// 				scrollTop: offsetTop
// 			}, 300);
// 			e.preventDefault();
// 		});
// });

// // Bind to scroll
// $(window).scroll(function(){
// 	// Get container scroll position
// 	var fromTop = $(this).scrollTop()+topMenuHeight;
//
// 	// Get id of current scroll item
// 	var cur = scrollItems.map(function(){
// 		if ($(this).offset().top < fromTop)
// 		return this;
// 	});
// 	// Get the id of the current element
// 	cur = cur[cur.length-1];
// 	var id = cur && cur.length ? cur[0].id : "";
//
// 	if (lastId !== id) {
// 		lastId = id;
// 		 // Set/remove active class
// 		 menuItems
// 		 	.parent().removeClass("active")
// 		 	.end().filter("[href='#"+id+"']").parent().addClass("active");
// 	}
// });

// scroll-top
// $(window).scroll(function() {
// 	if ($(this).scrollTop() > 1){
// 		$('.page_head').addClass("sticky");
// 	}
// 	else{
// 		$('.page_head').removeClass("sticky");
// 	}
// });

$(".navbar-toggle").click(function () {
  $(".main_mnu ul").toggleClass("expand");
});

// BEGIN JIVOSITE CODE {literal}
(function () {
  var widget_id = "q9oCSLS68Z";
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "//code.jivosite.com/script/widget/" + widget_id;
  var ss = document.getElementsByTagName("script")[0];
  ss.parentNode.insertBefore(s, ss);
})();
// {/literal} END JIVOSITE CODE

// feedback/script.js
// после загрузки веб-страницы
$(function () {
  // при отправке формы reviewForm на сервер (id="reviewForm")
  $("#reviewForm").submit(function (event) {
    // отменяем стандартное действие браузера
    event.preventDefault();
    // заводим переменную, которая будет говорить о том валидна форма или нет
    var formValid = true;
    // перебираем все элементы управления формы (input и textarea)
    $("#reviewForm input:text,textarea").each(function () {
      // проверяем является ли данный элемент капчей
      // если это так, то не выполняем его проверку
      if ($(this).attr("id") == "text-captchat") {
        return true;
      }
      // находим предков, имеющих класс .form-group (для установления success/error)
      var formGroup = $(this).parents(".form-group");
      // находим glyphicon (иконка успеха или ошибки)
      var glyphicon = formGroup.find(".form-control-feedback");
      // выполняем валидацию данных с помощью HTML5 функции checkValidity
      if (this.checkValidity()) {
        // добавляем к formGroup класс .has-success и удаляем .has-error
        formGroup.addClass("has-success").removeClass("has-error");
        // добавляем к glyphicon класс .glyphicon-ok и удаляем .glyphicon-remove
        glyphicon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
      } else {
        // добавляем к formGroup класс .has-error и удаляем .has-success
        formGroup.addClass("has-error").removeClass("has-success");
        // добавляем к glyphicon класс glyphicon-remove и удаляем glyphicon-ok
        glyphicon.addClass("glyphicon-remove").removeClass("glyphicon-ok");
        // если элемент не прошёл проверку, то отмечаем форму как не валидную
        formValid = false;
      }
    });
    // проверяем элемент, содержащий код капчи
    // получаем значение элемента input, который содержит код капчи
    var captcha = $("#text-captchat").val();
    // если количество символов в коде капчи не равно 6,
    // то отмечаем капчу как невалидную и не отправляем форму на сервер
    if (captcha.length != 6) {
      // получаем элемент, содержащий капчу
      inputCaptcha = $("#text-captchat");
      // находим предка, имеющего класс .form-group (для установления success/error)
      formGroupCaptcha = inputCaptcha.parents(".form-group");
      // находим glyphicon (иконка успеха или ошибки)
      glyphiconCaptcha = formGroupCaptcha.find(".form-control-feedback");
      // добавляем к formGroup класс .has-error и удаляем .has-success
      formGroupCaptcha.addClass("has-error").removeClass("has-success");
      // добавляем к glyphicon класс glyphicon-remove и удаляем glyphicon-ok
      glyphiconCaptcha.addClass("glyphicon-remove").removeClass("glyphicon-ok");
    }
    // если форма валидна и длина капчи равно 6 символам, то отправляем форму на сервер (AJAX)
    if (formValid && captcha.length == 6) {
      //получаем имя, которое ввёл пользователь
      var namet = $("#namet").val();
      //получаем email, который ввёл пользователь
      var emailt = $("#emailt").val();
      //получаем сообщение, которое ввёл пользователь
      var messaget = $("#messaget").val();
      //получаем капчу, которую ввёл пользователь
      var captcha = $("#text-captchat").val();

      $.post("/reviews", $(this).serialize(), function (data) {
        // разбираем строку JSON, полученную от сервера
        var $data = JSON.parse(data);
        // устанавливаем элементу, содержащему текст ошибки, пустую строку
        $("#error").text("");

        // если сервер вернул ответ success (данные получены)
        if ($data.result == "success") {
          //очищаем форму
          $("#reviewForm input:text,textarea").each(function () {
            var formGroup = $(this).parents(".form-group");
            // находим glyphicon (иконка успеха или ошибки)
            var glyphicon = formGroup.find(".form-control-feedback");
            // добавляем к formGroup класс .has-success и удаляем .has-error
            formGroup.addClass("has-success").removeClass("has-error");
            // добавляем к glyphicon класс .glyphicon-ok и удаляем .glyphicon-remove
            glyphicon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
          });
          // обновляем форму:
          $("#reviewForm input:text,textarea").val("");
          $("#reviewForm input:text,textarea").css("background-color", "#fff");
          // выводим новый код капча
          $("#img-captchat").attr("src", "/captcha?id=" + Math.random() + "");
          // отображаем модальное окно об успехе
          showSuccessSendReview();
        } else if ($data.result == "invalidCaptcha") {
          // если сервер вернул ответ invalidcaptcha, то делаем следующее...
          // получаем элемент, содержащий капчу
          inputCaptcha = $("#text-captchat");
          // находим предка, имеющего класс .form-group (для установления success/error)
          formGroupCaptcha = inputCaptcha.parents(".form-group");
          // находим glyphicon (иконка успеха или ошибки)
          glyphiconCaptcha = formGroupCaptcha.find(".form-control-feedback");
          // добавляем к formGroup класс .has-error и удаляем .has-success
          formGroupCaptcha.addClass("has-error").removeClass("has-success");
          // добавляем к glyphicon класс glyphicon-remove и удаляем glyphicon-ok
          glyphiconCaptcha
            .addClass("glyphicon-remove")
            .removeClass("glyphicon-ok");
          // выводим новый код капчи
          $("#img-captchat").attr("src", "/captcha?id=" + Math.random() + "");
          // устанавливаем полю, с помощью которого осуществляем ввод капчи пустое значение
          $("#text-captchat").val("");

          errorCaptchaMessage();
        } else {
          // если сервер вернул ответ error, то делаем следующее...
          errorOtherMessage($data.result);
          // $('#error').text('Произошли ошибки при отправке формы на сервер.');
        }
      });
    }
  });
});

$(function () {
  $(".main-block__content img").each(function () {
    if ($(this).css("float") == "right") {
      $(this).css({
        "margin-right": "0",
        "margin-left": "32px",
      });
    }
  });
});

// GAL-SLIDER settings
let galSlider = undefined;
function initGalSlider() {
  let screenWidth = document.documentElement.clientWidth;

  if (screenWidth < 600 && galSlider == undefined) {
    galSlider = $(".gall-slider").slick({
      centerMode: true,
      centerPadding: "calc((100% - 280px) / 2)",
      slidesToShow: 1,
      arrows: false,
    });
  } else if (screenWidth >= 600 && galSlider != undefined) {
    galSlider.slick("unslick");
    galSlider = undefined;
  }
}

initGalSlider();

// End of GAL-SLIDER settings

// FEATURES-SLIDER settings
let featuresSlider = undefined;
function initFeaturesSlider() {
  let screenWidth = document.documentElement.clientWidth;

  if (screenWidth < 600 && featuresSlider == undefined) {
    featuresSlider = $(".features-slider").slick({
      autoplay: true,
      slidesToShow: 1,
    });
  } else if (screenWidth >= 600 && featuresSlider != undefined) {
    featuresSlider.slick("unslick");
    featuresSlider = undefined;
  }
}

initFeaturesSlider();

window.onresize = function () {
  initGalSlider();
  initFeaturesSlider();
};
// End of GAL-SLIDER settings
