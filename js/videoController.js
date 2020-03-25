var iFrameElem = '<iframe width="560" height="315" src="https://www.youtube.com/embed/9yCWG3lpcvo?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

$(document).keyup(function(e){
  //if keypress "p"
  if(e.keyCode === 80) { 
    e.preventDefault();
  $('#video-overlay').addClass('open');
  $("#video-overlay").append(iFrameElem);
   }
});

$('.video-overlay, .video-overlay-close').on('click', function(e){
  e.preventDefault();
  close_video();
});

function play_video(){
    $('#video-overlay').addClass('open');
    $("#video-overlay").append(iFrameElem);
}


function close_video() {
  $('.video-overlay.open').removeClass('open').find('iframe').remove();
};


$(document).keyup(function(e){
  if(e.keyCode === 27) { close_video(); }
});