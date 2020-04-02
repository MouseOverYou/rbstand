var walkerCam1
function createWalker(scene) {
    scene.collisionsEnabled = true;
    //scene.enablePhysics();

    // Parameters : name, position, scene
    walkerCam = new BABYLON.UniversalCamera("walkerCam", new BABYLON.Vector3(0, 0.2, 2.5), scene);

    // Targets the camera to a particular position. In this case the scene origin
    walkerCam.setTarget(BABYLON.Vector3.Zero());
    walkerCam.angularSensibility = 4000
    //walkerCam.rotation.x = 180 * (Math.PI / 180);
    //walkerCam.rotation.y = 0 * (Math.PI / 180);

    // Attach the camera to the canvas
    walkerCam.applyGravity = true;
    walkerCam.ellipsoid = new BABYLON.Vector3(0.01, 0.1, 0.01);
    walkerCam.checkCollisions = true;
    walkerCam.minZ = 0.05

    //Controls  WASD
    walkerCam.keysUp.push(87);
    walkerCam.keysDown.push(83);
    walkerCam.keysRight.push(68);
    walkerCam.keysLeft.push(65);
    walkerCam.speed = 0.025


    //Bounding box Geometry

    var ground = BABYLON.Mesh.CreateBox("ground", 1, scene);
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

function addWalkerListener() {

    scene.activeCamera = walkerCam
    // Attach events to the document
    camera.detachControl(canvas);
    walkerCam.attachControl(canvas, true);
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

}

function removeWalkerListener() {
    // Detach events to the document
    document.removeEventListener("pointerlockchange", pointerlockchange, false);
    document.removeEventListener("mspointerlockchange", pointerlockchange, false);
    document.removeEventListener("mozpointerlockchange", pointerlockchange, false);
    document.removeEventListener("webkitpointerlockchange", pointerlockchange, false);
    walkerCam.detachControl(canvas);
    camera.attachControl(canvas, true, true, false);
    scene.activeCamera = camera


}

//Jump
function jump(rate) {
    walkerCam.cameraDirection.y = rate;
}

//We start without being locked.
var isLocked = false;
//this is call every pointerdown
function walkerPointerLock() {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
    }

    if (!isLocked) {

    }
}

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

