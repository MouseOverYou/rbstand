showDebug = true;

$(document).keyup(function (e) {
    //"d" pressed
    if (e.keyCode === 68) { handleDebugLayer(); }
});

function handleDebugLayer() {
    console.log("d pressed")
    showDebug =!showDebug;
    if (showDebug) {

        scene.debugLayer.show();
    }
    else {

        scene.debugLayer.hide();
    }
}