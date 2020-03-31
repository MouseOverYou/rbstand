function ChangeMaterialProperties() {

    var redBay =new BABYLON.Color3.FromHexString("#d8575");
    var blueBay =new BABYLON.Color3.FromHexString("#0c83e2");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    scene.getMaterialByName("logo_schwarz").metallic = 0.75
    scene.getMaterialByName("logo_schwarz").roughness = 0.1

    scene.getMaterialByName("grau").metallic = 0.3
    scene.getMaterialByName("grau").roughness = 0.3

    scene.getMaterialByName("weiss").metallic = 0.1
    scene.getMaterialByName("weiss").roughness = 0.1

    scene.getMaterialByName("DarkWood").metallic = 0
    scene.getMaterialByName("DarkWood").roughness = 0.1

    scene.getMaterialByName("leder_schwarz").metallic = 0
    scene.getMaterialByName("leder_schwarz").roughness = 0.75
    scene.getMaterialByName("leder_schwarz").bumpTexture.level = 0.1

    scene.getMaterialByName("leder_weiss").metallic = 0
    scene.getMaterialByName("leder_weiss").roughness = 0.75
    scene.getMaterialByName("leder_weiss").bumpTexture.level = 0.1
    

    scene.getMaterialByName("Metal").albedoColor = darkGrayBay
    scene.getMaterialByName("Metal").metallic = 1
    scene.getMaterialByName("Metal").roughness = 0.5

    scene.getMaterialByName("screenVert").metallic = 0.75
    scene.getMaterialByName("screenVert").roughness = 0
    scene.getMaterialByName("screenHor").metallic = 0.75
    scene.getMaterialByName("screenHor").roughness = 0
    scene.getMaterialByName("screenMain").metallic = 0.75
    scene.getMaterialByName("screenMain").roughness = 0

    scene.getMaterialByName("varyconMat").metallic = 0.4
    scene.getMaterialByName("varyconMat").roughness = 0

    //icons
    scene.getMaterialByName("iconMatGlass").alpha = 0.75
    scene.getMaterialByName("iconMatWhite").metallic = 0.3
    scene.getMaterialByName("iconMatWhite").roughness = 0.1
    scene.getMaterialByName("iconMatRed").metallic = 1
    scene.getMaterialByName("iconMatRed").roughness = 1

    /*
    var screenTex = new BABYLON.Texture("./assets/ascree.jpg", scene, true, false)
    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 254, scene);

    */

    //handle All at once
    scene.materials.forEach(mat => {
        //add reflections
        mat.reflectionTexture = hdrTexture;
    });
    
}

var iMat, iMatTextVideo, iMatText, mainScreenMat, mainScreenVid
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
    colMat.wireframe = true
    colMat.alpha = 1

    //screenvideo materials
    mainScreenMat = new BABYLON.PBRMaterial("mainScreenMat", scene);
    mainScreenVid = new BABYLON.VideoTexture("mainScreenVid", "./assets/Messestand_Format_1.mp4", scene, true, false);
    mainScreenVid.vScale = -1;
    mainScreenVid.uScale = 1;
    mainScreenMat.emissiveTexture = mainScreenVid
    mainScreenMat.albedoTexture = mainScreenVid
    mainScreenMat.reflectionTexture = hdrTexture;
    mainScreenMat.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    mainScreenMat.metallic = 0.75
    mainScreenMat.roughness = 0

    var htmlVideo = mainScreenMat.emissiveTexture.video;
    htmlVideo.setAttribute('webkit-playsinline', 'webkit-playsinline');
    htmlVideo.setAttribute('playsinline', 'true');
    htmlVideo.setAttribute('muted', 'true');
    htmlVideo.setAttribute('autoplay', 'true');
    //htmlVideo.play();

    
}
function ChangeMeshesMaterials(){
    scene.getMeshByName("Screen_Main_1").material = mainScreenMat;
    scene.getMeshByName("Screen_Main_2").material = mainScreenMat;
}
