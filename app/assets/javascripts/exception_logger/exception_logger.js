// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function () {
  function CSRFProtection(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
  };

  function ajax_headers() {
    if ('ajaxPrefilter' in $) $.ajaxPrefilter(function(options, originalOptions, xhr){ CSRFProtection(xhr) });
    else $(document).ajaxSend(function(e, xhr){ CSRFProtection(xhr) });
  };
  
  ajax_headers(); 
  
  $('body').on('click', '.show_link', function(event) {
    $.get($(this).attr("href"));
    return false;
  }); 
  
  $('body').on('click', '.close_link', function(event) {
    $("#showpage").hide();
    return false;
  });
  
  $('body').on('click', '.delete_link', function(event) {
    $.ajax({
      url: $(this).attr("href"),
      type: 'DELETE'
    });
    return false;
  }); 
  
  $('body').on('click', '.delete_visible_link', function(event) {
    var arr=$('tr.exception').map(function() { var id = $(this).attr("id"); return parseInt(id.replace(/^\w+_/, '')); }).get();
    $.ajax({
      url: $(this).attr("href"),
      type: 'POST',
      data: $.param({ids: arr}),
      dataType: 'script'
    }); 
    return false;
  }); 
  
  $('body').on('click', '.filter_link', function(event) {
    $('.filter_link').removeClass('selected');
    $(this).addClass('selected');
    $.ajax({
      url: $(this).attr("href"),
      type: 'POST',
      dataType: 'script'
    });   
    return false;
  });
  
  $('body').on('click', '#query-form :submit', function(event) {
    $.ajax({
      url: $("#query-form").attr("action"),
      type: 'POST',
      data: $("#query-form").serialize(),
      dataType: 'script'
    });   
    return false;
  });
  
  $('body').on("click", '.pagination a', function() {
    $.getScript(this.href);   
    return false;
  });
});

