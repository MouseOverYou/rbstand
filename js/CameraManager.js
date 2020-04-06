var walkerCam, ground, InfoColliders, arrowColliders, pointerFake
var walkerSelection;
function SetupCameras(scene) {
    //collect infocolliders

    CreateRotateCam(scene)
    CreateWalkerCam(scene)


    //Controls...Mouse
    //We start without being locked.
    var isLocked = true;

    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {
        //console.log("isLocked ? " + isLocked)
        //continue with shooting requests or whatever :P
        
        //(left mouse click)
        //evt === 1 (mouse wheel click (not scrolling))
        //evt === 2 (right mouse click)
        //true/false check if we're locked, faster than checking pointerlock on each single click.
        if (scene.activeCamera == walkerCam) {
            console.log("click while walker cam")
            checkInfoHit();
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }
        }

        else if (scene.activeCamera == camera) {
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return ( BABYLON.Tags.MatchesQuery(mesh, "arrow_coll") || BABYLON.Tags.MatchesQuery(mesh, "hs_coll") ) && mesh.isPickable; });
            if (pickInfo && pickInfo.pickedMesh && BABYLON.Tags.MatchesQuery(pickInfo.pickedMesh, "arrow_coll")) {
                console.log(pickInfo.pickedMesh.name);
                CurrentSelection = pickInfo.pickedMesh.name.split('Arrow Collider ')[1];
                console.log(CurrentSelection)
                TravelRotateCamTo(CurrentSelection);//send corresponding infobox to travel to
                show_backbutton();
                RevealInfopoints(true)
                //after time show all info buttons
            }
            else if (pickInfo && pickInfo.pickedMesh && BABYLON.Tags.MatchesQuery(pickInfo.pickedMesh, "hs_coll")){
                console.log(pickInfo.pickedMesh.name);
                CurrentSelection = pickInfo.pickedMesh.name.split('hs Collider ')[1];
                openInfoUI(CurrentSelection)
                $('.x-icon').addClass('open');
            }
        }


    };



    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;

        // If the user is already locked
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            isLocked = false;
        } else {
            //camera.attachControl(canvas);
            isLocked = true;
        }
    };

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    CreateWalkerColliders();
}

function CreateWalkerColliders() {
    //Bounding box Geometry
    ground = BABYLON.Mesh.CreateBox("ground", 1, scene);
    ground.scaling = new BABYLON.Vector3(10, 0.1, 10);
    ground.position.y = -0.04;
    ground.checkCollisions = true;
    ground.isVisible = false;

    var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
    border0.scaling = new BABYLON.Vector3(0.1, 1, 5);
    border0.position.x = 1.2;
    border0.position.z = 1.2;
    border0.position.y = 0.5
    border0.checkCollisions = true;
    border0.isVisible = false;


    var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
    border1.scaling = new BABYLON.Vector3(0.1, 1, 5);
    border1.position.x = -1.2;
    border1.position.y = 0.5;
    border1.position.z = 1.2;
    border1.checkCollisions = true;
    border1.isVisible = false;

    var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
    border2.scaling = new BABYLON.Vector3(2.5, 1, 0.1);
    border2.position.z = -1.2;
    border2.position.y = 0.5;
    border2.checkCollisions = true;
    border2.isVisible = false;


    var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
    border3.scaling = new BABYLON.Vector3(2.5, 1, 0.1);
    border3.position.z = 3;
    border3.position.y = 0.5;
    border3.checkCollisions = true;
    border3.isVisible = false;

}

function CreateWalkerCam(scene){ 
        // Parameters : name, position, scene
        walkerCam = new BABYLON.UniversalCamera("walkerCam", new BABYLON.Vector3(0, 0.2, 2.5), scene);

        // Targets the camera to a particular position. In this case the scene origin
        walkerCam.setTarget(BABYLON.Vector3.Zero());
        walkerCam.angularSensibility = 4000
    
        // Attach the camera to the canvas
        walkerCam.applyGravity = true;
        walkerCam.ellipsoid = new BABYLON.Vector3(0.02, 0.1, 0.05);
        walkerCam.checkCollisions = true;
        walkerCam.minZ = 0.05
    
        //Controls  WASD
        walkerCam.keysUp.push(87);
        walkerCam.keysDown.push(83);
        walkerCam.keysRight.push(68);
        walkerCam.keysLeft.push(65);
        walkerCam.speed = 0.025
    
        //scene.activeCamera = walkerCam
        walkerCam.attachControl(canvas, true);

}

function CreateRotateCam(scene){
    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", 90 * (Math.PI / 180), 82 * (Math.PI / 180), 2.8, new BABYLON.Vector3(0, 0.1, 0), scene);
    camera.minZ = 0.1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 0
    camera.upperRadiusLimit = 4
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 100
    camera.attachControl(canvas, true, true, false);

}
//Jump
function jump(rate) {
    walkerCam.cameraDirection.y = rate;
}

function checkInfoHit(){
    if(walkerSelection != ""){

        var walkerSelectionNum = walkerSelection.split('hs Collider ')[1];
        openInfoUI(walkerSelectionNum)
        $('.x-icon').addClass('open');
        document.exitPointerLock()
    }
    else{
        console.log("nothing was hit")
    }
}

function CreateRaycast(scene) {
    InfoColliders = scene.getMeshesByTags("hs_coll")
    console.log(InfoColliders)

    pointerFake = BABYLON.MeshBuilder.CreateSphere('pointerFake', { diameter: .00075 }, scene);
    pointerFake.parent = walkerCam
    pointerFake.position.z = 0.06;

    var ray = new BABYLON.Ray();
    var rayHelper = new BABYLON.RayHelper(ray);

    var localMeshDirection = new BABYLON.Vector3(0, 0, 1);
    var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
    var length = 2;

    rayHelper.attachToMesh(walkerCam, localMeshDirection, localMeshOrigin, length);

    //rayHelper.show(scene, new BABYLON.Color3(1,0,0));

    var pointerMesh = BABYLON.MeshBuilder.CreateSphere('', { diameter: .03 }, scene);
    pointerMat = new BABYLON.PBRMaterial("pointerMat", scene);
    pointerMat.unlit = true
    pointerMat.albedoColor = new BABYLON.Color3(0, 0, 0)
    pointerMesh.material = pointerMat
    pointerMesh.setEnabled(false);


    scene.registerBeforeRender(function () {

        var hitInfo = ray.intersectsMeshes(InfoColliders, true);

        if (hitInfo.length) {
            console.log(hitInfo[0].pickedMesh.name);
            walkerSelection = hitInfo[0].pickedMesh.name;
            pointerMesh.setEnabled(true);
            pointerFake.setEnabled(false)
            pointerMesh.position.copyFrom(hitInfo[0].pickedPoint);
            pointerMat.albedoColor = new BABYLON.Color3(0, 0, 0)

        } else {
            walkerSelection = "";
            //console.log("hitting nothing");
            pointerMesh.setEnabled(false);
            pointerFake.setEnabled(true)
        }
    });
}