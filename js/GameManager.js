var lightAnimController
var SceneStarted = false;

function SpawnInfobox(mesh, cam){
    var pos = mesh.getAbsolutePosition()
    //calculate world to screen position of selected mesh
    var p = BABYLON.Vector3.Project(
        pos,
        BABYLON.Matrix.Identity(),
        scene.getTransformMatrix(),
        cam.viewport.toGlobal(engine.getRenderWidth(true), engine.getRenderHeight(true))
    ).normalize();
    console.log(p);

    lookValue = pos.subtract(cam.position);
    ibox.rotation.y =-Math.atan2(lookValue.z, lookValue.x) - Math.PI / 2

    //IS object on the left or right?
    if(p.x > 0.5){
        console.log("right");
        ibox.position = new BABYLON.Vector3(pos.x+0.25, pos.y+0.1, pos.z)
    }
    else{
        console.log("left")
        ibox.position = new BABYLON.Vector3(pos.x-0.25, pos.y+0.1, pos.z)
    }

    if(mesh.name == "HS Collider 6" || mesh.name == "HS Collider 7"){
        play_video();
    }
}
var ibox;

function CreateInfoBox(){
    //create infobox
    //var iBox_P = new BABYLON.TransformNode("")
    ibox = new BABYLON.MeshBuilder.CreatePlane("info plane ", { height: .608, width: .383, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene)
    ibox.position.y = -10;
    var iMat = new BABYLON.StandardMaterial("iboxMat", scene)
    var iMatText = new BABYLON.Texture("./assets/Infobox.png", scene, true, true);
    iMat.disableLighting = true;
    iMatText.uScale = -1
    iMat.emissiveTexture = iMatText;
    iMat.opacityTexture = iMatText;
    ibox.material = iMat;
}

function createUI() {
    myGUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    createWinBtn(myGUI)
    createLoseBtn(myGUI)
    createRevealBtn(myGUI)
    createRainButton(myGUI)
}

