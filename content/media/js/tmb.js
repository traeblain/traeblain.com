function sticky_relocate() {
  var window_top = $(window).scrollTop() + 50;
  var div_top = $('#main').offset().top;
  if (window_top > div_top)
    $('#share').addClass('sticky');
  else
    $('#share').removeClass('sticky');
}

function title_appear() {
  var window_top = $(window).scrollTop() + 50;
  var div_top = $('#main').offset().top;
  if (window_top > div_top) {
    $('.menu_title').css('opacity', 1);
  } else {
    $('.menu_title').css('opacity', 0);
  }
}

$( function () {
  var ss = new Array(0);
  for(var index = 0; index < $("img").length; index++) {
    var s = $("img").eq(index).attr("title");
    ss.push(s);
    if (s.indexOf( "alignright" ) >= 0) {
      $("img").eq(index).addClass("alignright");
    } else if (s.indexOf( "alignleft" ) >= 0) {
      $("img").eq(index).addClass("alignleft");
    }
  }
});


$(document).ready(function() {
  $("time.time").timeago();
});

$(function () {
  $("body").html(function(i, html) {
    return html.replace(/<p>(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)\s?<\/p>/g, "<iframe width=\"600\" height=\"335\" src=\"http://www.youtube.com/embed/$1?rel=0&amp;hd=1\" frameborder=\"0\" allowfullscreen style=\"width: 600px; height: 365px;\"></iframe>");
  });
  $('.social a').hover( function () {
    $('img', this).attr('src', $('img', this).attr('src').substring(0, $('img', this).attr('src').length-4) + '_hover.svg');
  }, function () {
    $('img', this).attr('src', $('img', this).attr('src').substring(0, $('img', this).attr('src').length-10) + '.svg');
  });
});

$(function () {
  $(".search-link").click(function () {
    $(".search").toggleClass( "search-down", "slow" );
    return false;
  });
    $("#searchtext").focus(function () {
    $(this).addClass("focus");
  });
  $("#searchtext").blur(function () {
    if (!$(this).val()) {
      $(this).removeClass("focus");
    }
  });
});

$(function() {
  $(window).scroll(sticky_relocate);
  sticky_relocate();
  $(window).scroll(title_appear);
  title_appear();
});