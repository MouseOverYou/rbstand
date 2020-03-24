
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var myGUI
var fillLight, mainLight, shadowGenerator

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.ArcRotateCamera("Camera", 90*(Math.PI/180), 82*(Math.PI/180), 2.8, new BABYLON.Vector3(0, 0, 0), scene);
    camera.minZ = 0.1
    camera.lowerRadiusLimit = 1
    camera.upperRadiusLimit = 2.8
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 100
    camera.attachControl(canvas, true);
    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)

    mainLight = new BABYLON.DirectionalLight("mainLight", new BABYLON.Vector3(1,-90, -180), scene);
    mainLight.position = new BABYLON.Vector3(0,2,0);
    mainLight.intensity = 1.5

    var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0.005,2.29,0), scene);
    pointLight.intensity =0.00

    	// Sky material
	var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.cameraOffset.y = 50;
    skyboxMaterial.luminance = 0.05;
	//skyboxMaterial._cachedDefines.FOG = true;

	// Sky mesh (box)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;

    	/*
	* Keys:
	* - 1: Day
	* - 2: Evening
	* - 3: Increase Luminance
	* - 4: Decrease Luminance
	* - 5: Increase Turbidity
	* - 6: Decrease Turbidity
    * - 7: Move horizon to -50
    * - 8: Restore horizon to 0
	*/
	var setSkyConfig = function (property, from, to) {
		var keys = [
            { frame: 0, value: from },
			{ frame: 100, value: to }
        ];
		
		var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);
		
		scene.stopAnimation(skybox);
		scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
	};
	
	window.addEventListener("keydown", function (evt) {
		switch (evt.keyCode) {
			case 49: setSkyConfig("material.inclination", skyboxMaterial.inclination, 0); break; // 1
			case 50: setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5); break; // 2

			case 51: setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1); break; // 3
			case 52: setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0); break; // 4
			
			case 53: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 40); break; // 5
			case 54: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5); break; // 6
			
            case 55: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50); break; // 7
            case 56: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0); break;  // 8
			default: break;
		}
    });
	

    /*
    fillLight = new BABYLON.DirectionalLight("fillLight", new BABYLON.Vector3(0,2, 0), scene);
    fillLight.position = new BABYLON.Vector3(-1,0,-0.5);
    fillLight.intensity = 0.1
    */



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
            defaultPipeline.imageProcessing.vignetteEnabled =true
            defaultPipeline.imageProcessing.vignetteWeight =3.1
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