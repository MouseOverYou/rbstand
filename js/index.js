
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var myGUI
var fillLight, lightLinks, lightRechts, shadowGenerator
var camera;
var CurrentSelection


/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", 90 * (Math.PI / 180), 82 * (Math.PI / 180), 2.8, new BABYLON.Vector3(0, 0.1, 0), scene);
    camera.minZ = 0.1
    camera.lowerRadiusLimit = 0
    camera.upperRadiusLimit = 4
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 100
    camera.attachControl(canvas, true, false, false);
    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)

    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-60, -41,-90), scene);
    lightLinks.position = new BABYLON.Vector3(1, 1, 0);
    lightLinks.intensity = 2

    lightRechts = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(120, -41, -90), scene);
    lightRechts.position = new BABYLON.Vector3(-1, 1, 0);
    lightRechts.intensity = 2

    // Sky material
    var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.cameraOffset.y = 50;
    skyboxMaterial.luminance = 0.05;
    //skyboxMaterial._cachedDefines.FOG = true;

    // Sky mesh (box)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;

    //var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75, camera);

    // https://doc.babylonjs.com/api/classes/babylon.defaultrenderingpipeline
    var defaultPipeline = new BABYLON.DefaultRenderingPipeline(
        "DefaultRenderingPipeline",
        true, // is HDR?
        scene,
        scene.cameras
    );
    if (defaultPipeline.isSupported) {
        /* imageProcessing */
        defaultPipeline.imageProcessingEnabled = true; //true by default
        if (defaultPipeline.imageProcessingEnabled) {
            /* tone mapping*/
            defaultPipeline.imageProcessing.toneMappingEnabled = true
            defaultPipeline.imageProcessing.toneMappingType = 1
            defaultPipeline.imageProcessing.contrast = 1.8; // 1 by default
            defaultPipeline.imageProcessing.exposure = 1; // 1 by default
            /* vignette */
            defaultPipeline.imageProcessing.vignetteEnabled = true
            defaultPipeline.imageProcessing.vignetteWeight = 3.1
            defaultPipeline.imageProcessing.vignetteFOV = 0.5
            /* color grading */
            defaultPipeline.imageProcessing.colorGradingEnabled = false; // false by default
            if (defaultPipeline.imageProcessing.colorGradingEnabled) {
                // using .3dl (best) :
                defaultPipeline.imageProcessing.colorGradingTexture = new BABYLON.ColorGradingTexture("textures/LateSunset.3dl", scene);
                // using .png :
                /*
                var colorGradingTexture = new BABYLON.Texture("textures/colorGrade-highContrast.png", scene, true, false);
                colorGradingTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                colorGradingTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;                
                defaultPipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
                defaultPipeline.imageProcessing.colorGradingWithGreenDepth = false;
                */
            }
            /* color curves */
            defaultPipeline.imageProcessing.colorCurvesEnabled = false; // false by default
            if (defaultPipeline.imageProcessing.colorCurvesEnabled) {
                var curve = new BABYLON.ColorCurves();
                curve.globalDensity = 0; // 0 by default
                curve.globalExposure = 0; // 0 by default
                curve.globalHue = 30; // 30 by default
                curve.globalSaturation = 0; // 0 by default
                curve.highlightsDensity = 0; // 0 by default
                curve.highlightsExposure = 0; // 0 by default
                curve.highlightsHue = 30; // 30 by default
                curve.highlightsSaturation = 0; // 0 by default
                curve.midtonesDensity = 0; // 0 by default
                curve.midtonesExposure = 0; // 0 by default
                curve.midtonesHue = 30; // 30 by default
                curve.midtonesSaturation = 0; // 0 by default
                curve.shadowsDensity = 0; // 0 by default
                curve.shadowsExposure = 0; // 0 by default
                curve.shadowsHue = 30; // 30 by default
                curve.shadowsDensity = 80;
                curve.shadowsSaturation = 0; // 0 by default;
                defaultPipeline.imageProcessing.colorCurves = curve;
            }
        }
        /* bloom */
        defaultPipeline.bloomEnabled = false; // false by default
        if (defaultPipeline.bloomEnabled) {
            defaultPipeline.bloomKernel = 64; // 64 by default
            defaultPipeline.bloomScale = 0.5; // 0.5 by default
            defaultPipeline.bloomThreshold = 0.9; // 0.9 by default
            defaultPipeline.bloomWeight = 0.15; // 0.15 by default
        }
        /* chromatic abberation */
        defaultPipeline.chromaticAberrationEnabled = false; // false by default
        if (defaultPipeline.chromaticAberrationEnabled) {
            defaultPipeline.chromaticAberration.aberrationAmount = 30; // 30 by default
            defaultPipeline.chromaticAberration.adaptScaleToCurrentViewport = false; // false by default
            defaultPipeline.chromaticAberration.alphaMode = 0; // 0 by default
            defaultPipeline.chromaticAberration.alwaysForcePOT = false; // false by default
            defaultPipeline.chromaticAberration.enablePixelPerfectMode = false; // false by default
            defaultPipeline.chromaticAberration.forceFullscreenViewport = true; // true by default
        }
        /* DOF */
        defaultPipeline.depthOfFieldEnabled = false; // false by default
        if (defaultPipeline.depthOfFieldEnabled && defaultPipeline.depthOfField.isSupported) {
            defaultPipeline.depthOfFieldBlurLevel = 0; // 0 by default
            defaultPipeline.depthOfField.fStop = 1.4; // 1.4 by default
            defaultPipeline.depthOfField.focalLength = 50; // 50 by default, mm
            defaultPipeline.depthOfField.focusDistance = 2000; // 2000 by default, mm
            defaultPipeline.depthOfField.lensSize = 50; // 50 by default
        }
        /* FXAA */
        defaultPipeline.fxaaEnabled = true; // false by default
        if (defaultPipeline.fxaaEnabled) {
            defaultPipeline.fxaa.samples = 1; // 1 by default
            defaultPipeline.fxaa.adaptScaleToCurrentViewport = false; // false by default
        }
        /* glowLayer */
        defaultPipeline.glowLayerEnabled = false;
        if (defaultPipeline.glowLayerEnabled) {
            defaultPipeline.glowLayer.blurKernelSize = 16; // 16 by default
            defaultPipeline.glowLayer.intensity = 1; // 1 by default
        }
        /* grain */
        defaultPipeline.grainEnabled = false;
        if (defaultPipeline.grainEnabled) {
            defaultPipeline.grain.adaptScaleToCurrentViewport = false; // false by default
            defaultPipeline.grain.animated = false; // false by default
            defaultPipeline.grain.intensity = 30; // 30 by default
        }
        /* MSAA */
        defaultPipeline.samples = 2; // 1 by default
        /* sharpen */
        defaultPipeline.sharpenEnabled = false;
        if (defaultPipeline.sharpenEnabled) {
            defaultPipeline.sharpen.adaptScaleToCurrentViewport = false; // false by default
            defaultPipeline.sharpen.edgeAmount = 0.3; // 0.3 by default
            defaultPipeline.sharpen.colorAmount = 1; // 1 by default
        }
    }

    scene.onPointerDown = function (evt) {

        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh.name !== "ground1" && mesh.isPickable; });
        if (pickInfo && pickInfo.pickedMesh) {
            console.log(pickInfo.pickedMesh.name);
            CurrentSelection = pickInfo.pickedMesh.name.split('hs Collider ')[1];
            console.log(CurrentSelection)
            //openInfoUI(currentSelection)
            SpawnInfobox(pickInfo.pickedMesh, camera)

        }
    }
    var count =0;
    scene.onPointerUp = function () {

        if(count == 0){
            mainScreenVid.video.play();
        }

        count++;
        debugLabel.innerHTML = "number of pointer ups " +count;
    }
    return scene;
};
/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function
//scene.debugLayer.show();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
    TriggeroopAnimations()
    var fpsLabel = document.getElementById("fpsLabel");
    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});