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

var iMat, iMatTextVideo, iMatText, mainScreenMat, mainScreenVid, videoMat
var colMat
var screenVideo, htmlVideo;
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

    videoMat = new BABYLON.PBRMaterial("textVid", scene);
    videoMat.emissiveTexture = new BABYLON.VideoTexture("video", "./assets/Messestand Format hb 2.mp4", scene,false,false,BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, {autoplay: "true", poster:"./assets/sky2.png"});
    videoMat.backFaceCulling = false;
    videoMat.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    //Applying materials
	
    htmlVideo = videoMat.emissiveTexture.video;
    htmlVideo.setAttribute('preload', 'false');
    htmlVideo.setAttribute('webkit-playsinline', 'webkit-playsinline');
    htmlVideo.setAttribute('playsinline', 'true');
    htmlVideo.setAttribute('muted', 'true');
    //htmlVideo.play();




/*

    //screenvideo materials
    mainScreenMat = new BABYLON.PBRMaterial("mainScreenMat", scene);
<<<<<<< HEAD
    mainScreenVid = new BABYLON.VideoTexture("mainScreenVid", "./assets/Messestand Format hb 2.mp4", scene, false);
=======
    mainScreenVid = new BABYLON.VideoTexture("mainScreenVid", "./assets/Messestand_Format_1.mp4", scene);
>>>>>>> e82ce2158c9a70ee27391855f20f97efcca336f6
    mainScreenVid.vScale = -1;
    mainScreenVid.uScale = 1;

    mainScreenMat.emissiveTexture = mainScreenVid
    mainScreenMat.albedoTexture = mainScreenVid
    mainScreenMat.reflectionTexture = hdrTexture;
    mainScreenMat.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    mainScreenMat.metallic = 0.75
    mainScreenMat.roughness = 0

<<<<<<< HEAD
    mainScreenMat.emissiveTexture.video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    mainScreenMat.emissiveTexture.video.setAttribute('playsinline', 'true');
    mainScreenMat.emissiveTexture.video.setAttribute('autoplay', 'true');
    mainScreenMat.emissiveTexture.video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    mainScreenMat.emissiveTexture.video.setAttribute('playsinline', 'true');
    mainScreenMat.emissiveTexture.video.setAttribute('muted', 'true');
    mainScreenMat.emissiveTexture.video.setAttribute('autoplay', 'true');
    
=======
    
    mainScreenVid.video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    mainScreenVid.video.setAttribute('playsinline', 'true');
    mainScreenVid.video.setAttribute('muted', 'true');
    mainScreenVid.video.setAttribute('autoplay', 'true');


>>>>>>> e82ce2158c9a70ee27391855f20f97efcca336f6
    screenMitte1 = new BABYLON.PBRMaterial("screenMitte1", scene);
    vidMitte1 = new BABYLON.VideoTexture("vidMitte1", "./assets/screenVert_ref 4_1.mp4", scene, {poster: "./assets/ascree.jpg"});
    vidMitte1.vScale = -1;
    vidMitte1.uScale = 1;
    vidMitte1.video.load();
    screenMitte1.emissiveTexture = vidMitte1
    screenMitte1.albedoTexture = vidMitte1
    screenMitte1.reflectionTexture = hdrTexture;
    screenMitte1.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte1.metallic = 0.75
    screenMitte1.roughness = 0

    screenMitte2 = new BABYLON.PBRMaterial("screenMitte2", scene);
    vidMitte2 = new BABYLON.VideoTexture("vidMitte2", "./assets/screenVert_ref 2.mp4", scene, {poster: "./assets/ascree.jpg"});
    vidMitte2.vScale = -1;
    vidMitte2.uScale = 1;
    vidMitte2.video.load();
    screenMitte2.emissiveTexture = vidMitte2
    screenMitte2.albedoTexture = vidMitte2
    screenMitte2.reflectionTexture = hdrTexture;
    screenMitte2.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte2.metallic = 0.75
    screenMitte2.roughness = 0

    screenMitte3 = new BABYLON.PBRMaterial("screenMitte3", scene);
    vidMitte3 = new BABYLON.VideoTexture("vidMitte3", "./assets/screenVert_ref 3.mp4", scene);
    vidMitte3.vScale = -1;
    vidMitte3.uScale = 1;
    vidMitte3.video.load();
    screenMitte3.emissiveTexture = vidMitte3
    screenMitte3.albedoTexture = vidMitte3
    screenMitte3.reflectionTexture = hdrTexture;
    screenMitte3.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte3.metallic = 0.75
    screenMitte3.roughness = 0

    screenMitte4 = new BABYLON.PBRMaterial("screenMitte4", scene);
    vidMitte4 = new BABYLON.VideoTexture("vidMitte4", "./assets/screenVert_ref.mp4", scene, {poster: "./assets/ascree.jpg"});
    vidMitte4.vScale = -1;
    vidMitte4.uScale = 1;
    vidMitte4.video.load();
    //vidMitte4.video.muted = "true"
    //vidMitte4.video.play()
    screenMitte4.emissiveTexture = vidMitte4
    screenMitte4.albedoTexture = vidMitte4
    screenMitte4.reflectionTexture = hdrTexture;
    screenMitte4.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte4.metallic = 0.75
    screenMitte4.roughness = 0
*/
    
}
function ChangeMeshesMaterials(){
    scene.getMeshByName("Screen_Main_1").material = videoMat;
    scene.getMeshByName("Screen_Main_2").material = videoMat;
    /*
    scene.getMeshByName("Screen_mitte_1").material = screenMitte1;
    scene.getMeshByName("Screen_mitte_2").material = screenMitte2;
    scene.getMeshByName("Screen_mitte_3").material = screenMitte3;
    scene.getMeshByName("Screen_mitte_4").material = screenMitte4;*/
} 
