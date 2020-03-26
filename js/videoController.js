var iFrameElem = '<iframe width="1120" height="630" src="https://www.youtube.com/embed/9yCWG3lpcvo?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

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

$(document).keyup(function(e){
  //if keypress "r"
  if(e.keyCode === 82) { 
    console.log("r Keyboard")
    camAnim();
   }
});


//UI controllers
function show_backbutton(){
  $('.back-zoom').addClass('open');
}

$('.back-zoom').on('click', function(e){
  e.preventDefault();
  hide_backbutton();
  zoomCamOut();
});

function hide_backbutton() {
$('.back-zoom').removeClass('open');
};
