var lightAnimController
var SceneStarted = false;

function SetScene() {
    console.log("finish loading")

    ChangeMaterialProperties();
    CreateCustomMaterials();
    ChangeMeshesMaterials();
    AddGlow();
    SpawnHotspots();
    CreateInfoBox();
    SceneStarted = true;
}

function SpawnInfobox(mesh, cam) {
    //console.log("hast collider tag?")
    //console.log(BABYLON.Tags.MatchesQuery(mesh, "hs_coll"))
    var { pos, p } = WorldPosToScreenPos(mesh, cam);
    //console.log(p);

    if (BABYLON.Tags.MatchesQuery(mesh, "hs_coll")) {
        if (mesh.name == "HS Collider 6" || mesh.name == "HS Collider 7") {
            //play_video();
            handleIBox(true);
        }
        else {
            handleIBox(false);
        }

        LookAt_Y(pos, cam);
        //IS object on the left or right?
        if (p.x > 0.5) {
            //console.log("right");
            IBox_P.position = new BABYLON.Vector3(pos.x + 0.25, pos.y + 0.1, pos.z)
        }
        else {
            //console.log("left")
            IBox_P.position = new BABYLON.Vector3(pos.x - 0.25, pos.y + 0.1, pos.z)
        }
    }

    if(BABYLON.Tags.MatchesQuery(mesh, "vid_coll")){
        play_video();
    }

}

//HELPERS
function LookAt_Y(pos, cam) {
    lookValue = pos.subtract(cam.position);
    IBox_P.rotation.y = -Math.atan2(lookValue.z, lookValue.x) - Math.PI / 2;
}

function WorldPosToScreenPos(mesh, cam) {
    var pos = mesh.getAbsolutePosition();
    //calculate world to screen position of selected mesh
    var p = BABYLON.Vector3.Project(pos, BABYLON.Matrix.Identity(), scene.getTransformMatrix(), cam.viewport.toGlobal(engine.getRenderWidth(true), engine.getRenderHeight(true))).normalize();
    return { pos, p };
}

var IBox, IBox_P, videoCollider;

function handleIBox(hasVideo) {
    // other params to text, pos, scl
    if (hasVideo) {
        console.log("video change")
        IBox.scaling = new BABYLON.Vector3(0.383, 0.793, 1)
        iMat.emissiveTexture = iMatTextVideo;
        iMat.opacityTexture = iMatTextVideo;
        videoCollider.isPickable = true;
    }
    else {
        console.log("to normaltext change")
        IBox.scaling = new BABYLON.Vector3(0.383, 0.608, 1)
        iMat.emissiveTexture = iMatText;
        iMat.opacityTexture = iMatText;
        videoCollider.isPickable = false;
    }
}

function CreateInfoBox() {
    //create infobox
    //var IBox_P = new BABYLON.TransformNode("")
    //IBox = new BABYLON.MeshBuilder.CreatePlane("info plane ", { height: .608, width: .383, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene)
    IBox_P = new BABYLON.TransformNode("infoBox_P")
    IBox = new BABYLON.MeshBuilder.CreatePlane("infoBox", { height: 1, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene)
    IBox_P.position.y = -10;
    IBox.material = iMat;
    IBox.isPickable = false;
    IBox.parent = IBox_P;

    //create video collider
    videoCollider = new BABYLON.MeshBuilder.CreateBox("videoCollider", { height: .15, width: .15, depth: .05 }, scene)
    videoCollider.position.y = 0.3
    videoCollider.material = colMat
    videoCollider.parent = IBox_P;
    videoCollider.isPickable = true;
    BABYLON.Tags.AddTagsTo(videoCollider, "vid_coll");
}

function createUI() {
    myGUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    createWinBtn(myGUI)
    createLoseBtn(myGUI)
    createRevealBtn(myGUI)
    createRainButton(myGUI)
}

