var iFrameElem = '<iframe width="1120" height="630" src="https://www.youtube.com/embed/9yCWG3lpcvo?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

$(document).keyup(function(e){
  //if keypress "p"
  if(e.keyCode === 80) { 
    e.preventDefault();
  $('#video-overlay').addClass('open');
  $("#video-overlay").append(iFrameElem);
   }
   //this is a commetn and can be erased)
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
    //startTween.restart()
    startTween.restart();
   }
});


//UI controllers
//Back button
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


//Infobox button
//callinfobox button
let showInfo = false;
$(document).keyup(function(e){
  //if keypress "i"
  if(e.keyCode === 73) { 
    console.log("i Keyboard")
    showInfo =! showInfo;
    if(showInfo){
      show_Info_Overlay();
    }
    else{
      hide_Info_Overlay();
    }

   }
});

function show_Info_Overlay(){
  $('.info-overlay').addClass('open')
  $('.info-overlay').removeClass('close')
  $('.infobox').addClass('open')
  $('.infobox').removeClass('close')
  $('.videobox').addClass('open')
  $('.videobox').removeClass('close')
}

function hide_Info_Overlay(){
 $('.info-overlay').addClass('close')
 $('.info-overlay').removeClass('open')
 $('.infobox').addClass('close')
 $('.infobox').removeClass('open')
 $('.videobox').addClass('close')
 $('.videobox').removeClass('open')
}