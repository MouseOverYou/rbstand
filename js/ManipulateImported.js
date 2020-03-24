function ChangeMaterials() {

    var redBay =new BABYLON.Color3.FromHexString("#d8575");
    var blueBay =new BABYLON.Color3.FromHexString("#0c83e2");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    var screenTex = new BABYLON.Texture("./assets/ascree.jpg", scene, true, false)
    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 254, scene);

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
    

    /*    var metalTex = new BABYLON.Texture("/assets/metal_tex.jpg", scene, true, false)
    metalTex.uScale = 10
    metalTex.vScale = 5
    scene.getMaterialByName("bodyEdges").albedoColor = redNagel
    scene.getMaterialByName("bodyEdges").metallic = 1
    scene.getMaterialByName("bodyEdges").roughness = 0.3
    scene.getMaterialByName("bodyEdges").reflectionTexture = hdrTexture
    //scene.getMaterialByName("bodyEdges").alpha = 0 //start alpha
    //scene.getMaterialByName("bodyEdges").transparencyMode = 2
    
    var sideAO = new BABYLON.Texture("/assets/bodySide_ao.jpg", scene, true, false)
    sideAO.level = 0.32
    scene.getMaterialByName("bodySide").albedoColor = redNagel
    scene.getMaterialByName("bodySide").ambientTexture = sideAO
    scene.getMaterialByName("bodySide").metallic = 0.8
    scene.getMaterialByName("bodySide").roughness = 0.14
    scene.getMaterialByName("bodySide").bumpTexture.level = 0.1
    scene.getMaterialByName("bodySide").reflectionTexture = hdrTexture
    //scene.getMaterialByName("bodySide").alpha = 0 //start alpha
    //scene.getMaterialByName("bodySide").transparencyMode = 2

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

    scene.getMaterialByName("buttonGray").metallic = 0.1
    scene.getMaterialByName("buttonGray").roughness = 1
    scene.getMaterialByName("buttonGray").reflectionTexture = hdrTexture
    //scene.getMaterialByName("buttonGray").alpha = 0 //start alpha
    //scene.getMaterialByName("buttonGray").transparencyMode = 2

    scene.getMaterialByName("buttonRed").metallic = 0.1
    scene.getMaterialByName("buttonRed").roughness = 1
    scene.getMaterialByName("buttonRed").reflectionTexture = hdrTexture
    //scene.getMaterialByName("buttonRed").alpha = 0 //start alpha
    //scene.getMaterialByName("buttonRed").transparencyMode = 2

    scene.getMaterialByName("hebelTop").albedoColor = redNagel
    scene.getMaterialByName("hebelTop").metallic = 1
    scene.getMaterialByName("hebelTop").roughness = 0.2
    scene.getMaterialByName("hebelTop").reflectionTexture = hdrTexture
    //scene.getMaterialByName("hebelTop").alpha = 0 //start alpha
    //scene.getMaterialByName("hebelTop").transparencyMode = 2

    scene.getMaterialByName("hebelUnten").albedoColor = blackNagel
    scene.getMaterialByName("hebelUnten").metallic = 1
    scene.getMaterialByName("hebelUnten").roughness = 0.2
    scene.getMaterialByName("hebelUnten").reflectionTexture = hdrTexture
    //scene.getMaterialByName("hebelUnten").alpha = 0 //start alpha
    //scene.getMaterialByName("hebelUnten").transparencyMode = 2

    scene.getMaterialByName("Kasten").albedoColor = blackNagel
    scene.getMaterialByName("Kasten").metallic = 1
    scene.getMaterialByName("Kasten").roughness = 0.2
    scene.getMaterialByName("Kasten").reflectionTexture = hdrTexture
    //scene.getMaterialByName("Kasten").alpha = 0 //start alpha
    //scene.getMaterialByName("Kasten").transparencyMode = 2

    scene.getMaterialByName("Metal").albedoColor = redNagel
    scene.getMaterialByName("Metal").metallic = 1
    scene.getMaterialByName("Metal").roughness = 0.
    scene.getMaterialByName("Metal").reflectionTexture = hdrTexture
    //scene.getMaterialByName("Metal").alpha = 0 //start alpha
    //scene.getMaterialByName("Metal").transparencyMode = 2

    scene.getMaterialByName("name1").albedoTexture.wrapU = 0
    scene.getMaterialByName("name1").metallic = 0.8
    scene.getMaterialByName("name1").roughness = 0.13
    scene.getMaterialByName("name1").reflectionTexture = hdrTexture
    scene.getMaterialByName("name1").alpha = 1 //start alpha
    scene.getMaterialByName("name1").transparencyMode = 2

    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 256, scene);
    scene.getMaterialByName("pointLights").emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    scene.getMaterialByName("pointLights").emissiveTexture = perlinText
    scene.getMaterialByName("pointLights").emissiveTexture.brightness =0.5
    scene.getMaterialByName("pointLights").emissiveTexture.octaves = 3
    scene.getMaterialByName("pointLights").emissiveTexture.persistence = 1.4
    scene.getMaterialByName("pointLights").emissiveTexture.animationSpeedFactor = 10
    //scene.getMaterialByName("wheelMitte").alpha = 0 //start alpha
    //scene.getMaterialByName("pointLights").transparencyMode = 2

    var tchiboMitte = new BABYLON.Texture("/assets/wheel_tchibo_mitte.png", scene, false, false)
    tchiboMitte.hasAlpha = true
    var tchiboSeiten = new BABYLON.Texture("/assets/wheel_tchibo_seiten.png", scene, false, false)
    tchiboSeiten.hasAlpha = true
    var tchiboEmissive = new BABYLON.Texture("/assets/tchibo_emissive.jpg", scene, true, false)

    scene.getMaterialByName("wheelMitte").albedoTexture = tchiboMitte
    scene.getMaterialByName("wheelMitte").metallic = 0.1
    scene.getMaterialByName("wheelMitte").emissiveColor = new BABYLON.Color3.FromHexString("#000000")
    scene.getMaterialByName("wheelMitte").emissiveTexture = tchiboEmissive
    scene.getMaterialByName("wheelMitte").roughness = 1
    scene.getMaterialByName("wheelMitte").reflectionTexture = hdrTexture
    //scene.getMaterialByName("wheelMitte").alpha = 0 //start alpha
    scene.getMaterialByName("wheelMitte").transparencyMode = 2

    scene.getMaterialByName("wheelSeiten").albedoTexture = tchiboSeiten
    scene.getMaterialByName("wheelSeiten").metallic = 0.1
    scene.getMaterialByName("wheelSeiten").emissiveTexture = tchiboEmissive
    scene.getMaterialByName("wheelSeiten").emissiveColor = new BABYLON.Color3.FromHexString("#000000")
    scene.getMaterialByName("wheelSeiten").roughness = 1
    scene.getMaterialByName("wheelSeiten").reflectionTexture = hdrTexture
    //scene.getMaterialByName("wheelSeite").alpha = 0 //start alpha
    scene.getMaterialByName("wheelSeiten").transparencyMode = 2

    scene.getMaterialByName("wheelWhite").albedoColor = new BABYLON.Color3.FromHexString("#ffffff")
    scene.getMaterialByName("wheelWhite").metallic = 0.0
    scene.getMaterialByName("wheelWhite").roughness = 0.0
    scene.getMaterialByName("wheelWhite").reflectionTexture = hdrTexture
    //scene.getMaterialByName("wheelWhite").alpha = 0 //start alpha
    scene.getMaterialByName("wheelWhite").transparencyMode = 2

    scene.getMaterialByName("slotLight").albedoColor = new BABYLON.Color3.FromHexString("#DB030F")
    scene.getMaterialByName("slotLight").reflectionTexture = hdrTexture
    //scene.getMaterialByName("slotLight").alpha = 0 //start alpha
    //scene.getMaterialByName("slotLight").transparencyMode = 2

    var arrowTex = new BABYLON.Texture("/assets/arrow_glow_b.jpg", scene, true, false)
    scene.getMaterialByName("arrowMat").emissiveTexture = arrowTex
    scene.getMaterialByName("arrowMat").albedoTexture = arrowTex
    scene.getMaterialByName("arrowMat").metallic = 0.0
    scene.getMaterialByName("arrowMat").roughness = 0.0
    scene.getMaterialByName("arrowMat").emissiveColor = new BABYLON.Color3.FromHexString("#797979")
    scene.getMaterialByName("arrowMat").reflectionTexture = hdrTexture
    //scene.getMaterialByName("arrowMat").alpha = 0 //start alpha

    scene.getMaterialByName("startMat").albedoColor = new BABYLON.Color3.FromHexString("#ffff00")
    scene.getMaterialByName("startMat").emissiveTexture = scene.getMaterialByName("startMat").albedoTexture
    scene.getMaterialByName("startMat").albedoTexture =""
    scene.getMaterialByName("startMat").metallic = 0.0
    scene.getMaterialByName("startMat").roughness = 0.0
    scene.getMaterialByName("startMat").emissiveColor = new BABYLON.Color3.FromHexString("#373737")
    scene.getMaterialByName("startMat").reflectionTexture = hdrTexture
    //scene.getMaterialByName("arrowMat").alpha = 0 //start alpha*/
}

function ChangeRenderingOrder() {
    //for mesh "rendering order"
    for (var h = 0; h < slotMeshTask.loadedMeshes.length; h++) {
        slotMeshTask.loadedMeshes[h].visibility = 0
   
        if (slotMeshTask.loadedMeshes[h].name == "slot_body" ||
            slotMeshTask.loadedMeshes[h].name == "slot_body_2" ||
            slotMeshTask.loadedMeshes[h].name == "slot_body_3" 
        ) {
            slotMeshTask.loadedMeshes[h].alphaIndex = 0.2
        }

        if (slotMeshTask.loadedMeshes[h].name == "Slot_label_0" ||
            slotMeshTask.loadedMeshes[h].name == "Slot_label_1" ||
            slotMeshTask.loadedMeshes[h].name == "Slot_label_2" ||
            slotMeshTask.loadedMeshes[h].name == "name"
        ) {
            slotMeshTask.loadedMeshes[h].alphaIndex = 0.4
        }
        else{
            slotMeshTask.loadedMeshes[h].alphaIndex = 0.3
        }

    }
}

var ground
function AddShadows() {
    ground = BABYLON.Mesh.CreatePlane('ground', 2500, scene)
    ground.rotation.x = Math.PI / 2
    ground.position.y = 553
    ground.parent = slot_P
    ground.material = new BABYLON.ShadowOnlyMaterial('mat', scene);
    ground.material.shadowColor = new BABYLON.Color3(1 / 255, 1 / 255, 1 / 255);
    ground.material.alpha = 0.5
    ground.receiveShadows = true


    shadowGenerator = new BABYLON.ShadowGenerator(1024, mainLight)
    shadowGenerator.useBlurExponentialShadowMap = true;

    for (l = 0; l < slotMeshTask.loadedMeshes.length; l++) {
        if (slotMeshTask.loadedMeshes[l].name == "Soderhamn" ||
            slotMeshTask.loadedMeshes[l].name == "strandmon" ||
            slotMeshTask.loadedMeshes[l].name == "wood_fence_painted" 
        ) {
            shadowGenerator.getShadowMap().renderList.push(slotMeshTask.loadedMeshes[l])
            console.log("shadow")
        }
    }

    shadowGenerator.getShadowMap().renderList.push(sphere)
    //DEBUGGER SPHERE

    /*
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
    sphere.position = new BABYLON.Vector3(0, 3, 0)
    pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    sphere.material = pbr;
    sphere.isVisible = true
    pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    pbr.metallic = 0.5;
    pbr.roughness = 0.2;
    pbr.environmentTexture = hdrTexture
    shadowGenerator.getShadowMap().renderList.push(sphere)*/


    
}

function AddGlow(){
        // Add lights to the scene
        var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
        gl.intensity = 0.85;
        scene.meshes.forEach(elem => {
            if(elem.name.startsWith("Screen_")){
                gl.addExcludedMesh(elem)
            }
        });

}