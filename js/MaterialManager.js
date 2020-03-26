function ChangeMaterialProperties() {

    var redBay =new BABYLON.Color3.FromHexString("#d8575");
    var blueBay =new BABYLON.Color3.FromHexString("#0c83e2");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    var screenTex = new BABYLON.Texture("./assets/ascree.jpg", scene, true, false)
    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 254, scene);

    //icons
    scene.getMaterialByName("iconMatGlass").alpha = 0.9
    scene.getMaterialByName("leuchteMat").albedoColor = lightGrayBay;

    scene.getMaterialByName("screensMat").emissiveTexture = screenTex
    scene.getMaterialByName("screensMat").emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    scene.getMaterialByName("screensMat").metallic = 0
    scene.getMaterialByName("screensMat").roughness = 0

    scene.getMaterialByName("bGrayGloss").albedoColor = darkGrayBay;
    scene.getMaterialByName("bGrayGloss").metallic = 0.5
    scene.getMaterialByName("bGrayGloss").roughness = 0.12

    scene.getMaterialByName("bayLightGloss").metallic = 0.2
    scene.getMaterialByName("bayLightGloss").roughness = 0.12

    scene.getMaterialByName("glassMat").albedoColor = lightGrayBay
    scene.getMaterialByName("glassMat").alpha = 0.5
    scene.getMaterialByName("glassMat").metallic = 0
    scene.getMaterialByName("glassMat").roughness = 0

    scene.getMaterialByName("Metal").albedoColor = lightGrayBay
    scene.getMaterialByName("Metal").metallic = 1
    scene.getMaterialByName("Metal").roughness = 0.5

    scene.getMaterialByName("frauMat").metallic = 0;
    scene.getMaterialByName("frauMat").roughness = 1;

    scene.getMaterialByName("flageMatMediumMat").albedoTexture.vOffset = 0.08;
    scene.getMaterialByName("flageMatMediumMat").roughness = 1;
    scene.getMaterialByName("flageMatLargeMat").roughness = 1;

    scene.getMaterialByName("leatherWhiteMat").metallic = 0.2
    scene.getMaterialByName("leatherWhiteMat").roughness = 0.15

    //handle All at once
    scene.materials.forEach(mat => {
        //add reflections
        mat.reflectionTexture = hdrTexture;
    });
    

    /* 

    var frontAO = new BABYLON.Texture("/assets/bodyFront_ao.jpg", scene, true, false)
    frontAO.level = 0.32
    scene.getMaterialByName("bodyFront").albedoColor = redNagel
    scene.getMaterialByName("bodyFront").ambientTexture = frontAO
    scene.getMaterialByName("bodyFront").metallic = 0.8
    scene.getMaterialByName("bodyFront").roughness = 0.1
    scene.getMaterialByName("bodyFront").bumpTexture.level = 0.35
    scene.getMaterialByName("bodyFront").reflectionTexture = hdrTexture
    //scene.getMaterialByName("bodyFront").alpha = 0 //start alpha
    //scene.getMaterialByName("bodyFront").transparencyMode = 2


    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 256, scene);
    scene.getMaterialByName("pointLights").emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    scene.getMaterialByName("pointLights").emissiveTexture = perlinText
    scene.getMaterialByName("pointLights").emissiveTexture.brightness =0.5
    scene.getMaterialByName("pointLights").emissiveTexture.octaves = 3
    scene.getMaterialByName("pointLights").emissiveTexture.persistence = 1.4
    scene.getMaterialByName("pointLights").emissiveTexture.animationSpeedFactor = 10
    //scene.getMaterialByName("wheelMitte").alpha = 0 //start alpha
    //scene.getMaterialByName("pointLights").transparencyMode = 2
    */

}

var iMat, iMatTextVideo, iMatText, mainScreenMat
var colMat
function CreateCustomMaterials(){
    //Infoboxes materials
    iMat = new BABYLON.StandardMaterial("iBoxMat", scene);
    iMat.disableLighting = true;

    iMatText = new BABYLON.Texture("./assets/Infobox.png", scene, true, true);
    iMatTextVideo = new BABYLON.Texture("./assets/Infobox_Video.png", scene, true, true);
    iMatText.uScale = -1;
    iMatTextVideo.uScale = -1;
    iMat.emissiveTexture = iMatTextVideo;
    iMat.opacityTexture = iMatTextVideo;

    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = false
    colMat.alpha = 0

    //screenvideo materials
    mainScreenMat = new BABYLON.PBRMaterial("mainScreenMat", scene);
    mainScreenVid = new BABYLON.VideoTexture("mainScreenVid", "./assets/Messestand_Format_1.mp4", scene, true, false);
    mainScreenVid.vScale = -1;
    mainScreenMat.emissiveTexture = mainScreenVid
    mainScreenMat.albedoTexture = mainScreenVid
    mainScreenMat.reflectionTexture = hdrTexture;
    mainScreenMat.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    mainScreenMat.metallic = 0
    mainScreenMat.roughness = 0

    
}
function ChangeMeshesMaterials(){
    scene.getMeshByName("Screen_Main_1").material = mainScreenMat;
    scene.getMeshByName("Screen_Main_2").material = mainScreenMat;
}