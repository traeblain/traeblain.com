if(pageNum) {
 return;
} else {
 var pageNum = 2;
}

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

$(function () { $('time.time').timeago(); });

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

$(function() {
  $('.nextlist').text('Show More Posts');
  $('.nextlist').addClass('dynload');
  $('.prevlist').remove();
  $('section').delegate('.nextlist', 'click', function() {
    var toLoadUrl = $(this).attr('href');
    var toLoad = toLoadUrl + ' #main article';
    var divName = 'page' + pageNum;
    $('.nextlist').remove();
    $('.clearall').remove();
    $('#main').append('<div id="' + divName + '" class="addon">...One Moment Please...</div>');
      $.ajax({
        type: 'GET',
        url: toLoadUrl,
        dataType: 'html',
        cache: false,
        success : function(data){
          var jqObj = $('<html />').html(data);
          $('#main').append( jqObj.find('section#main article') );
          pageNum++;
          $('#main').append('<a class="nextlist dynload" href="/page' + pageNum + '/">Show More Posts</a>');
          $('#main').append('<div class="clearall"></div>');
          $('.addon').remove();
          $('time.time').timeago();
        },
        error : function(response, status, xhr){
          $('.addon').text('No More Posts...Don\'t Hate Me...');
          $('#main').append('<div class="clearall"></div>');
        }
      });
    return false;
  });
});