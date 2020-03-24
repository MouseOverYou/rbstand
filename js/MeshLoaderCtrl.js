var slot_P, Messe_P
var hdrTexture
var SceneMeshes
var slotMeshTask, startMeshTask, sphere, MesseLoaderTask

function LoadAssets(scene, assetsManager) {

    //ENV TASK
    var envTask = assetsManager.addCubeTextureTask("envTask", "./assets/environment.dds");

    envTask.onSuccess = function (task) {
        //alert('HDR LOADED');
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("./assets/environment.dds", scene);
        hdrTexture.rotationY = 140*(Math.PI/180);

        // Create Skybox
        var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        var hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = true;
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    envTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Messe_P = new BABYLON.TransformNode("Messe_P");
    MesseLoaderTask = assetsManager.addMeshTask("", "", "./assets/3dstand_v4.glb")

    MesseLoaderTask.onSuccess = function (task) {
        
        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 550
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].parent = Messe_P
        Messe_P.position.x = 0
        Messe_P.position.y = 0
        Messe_P.scaling = new BABYLON.Vector3(0.003, 0.003, 0.003)

    }

    MesseLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    //FINISH

    var pbr
    assetsManager.onFinish = function (task) {
        console.log("finish loading")
        scene.materials.forEach(mat => {
            mat.reflectionTexture = hdrTexture;
        });
        ChangeMaterials();
        AddGlow();
                /*
        AddShadows()

        
        scene.getMaterialByName("carpetRest").reflectionTexture = hdrTexture
        scene.getMaterialByName("Fortuny").reflectionTexture = hdrTexture
        
        scene.getMaterialByName("nimo").reflectionTexture = hdrTexture
        scene.getMaterialByName("nimo trans").reflectionTexture = hdrTexture
        scene.getMaterialByName("Soderhamn").reflectionTexture = hdrTexture

        scene.getMaterialByName("Soderhamn_Pillows").reflectionTexture = hdrTexture
        scene.getMaterialByName("Soderhamn_Pillows").metallic = 0.27
        scene.getMaterialByName("Soderhamn_Pillows").roughness = 0.37
        scene.getMaterialByName("Soderhamn_Pillows").bumpTexture.level = 1
        
        scene.getMaterialByName("wood_fence_painted").backFaceCulling = false
        scene.getMaterialByName("wood_fence_painted").reflectionTexture = hdrTexture

        scene.getMaterialByName("Soderhamn").reflectionTexture = hdrTexture
        scene.getMaterialByName("Soderhamn").metallic =0
        scene.getMaterialByName("Soderhamn").roughness =0.35
        

        scene.getMaterialByName("carpet").reflectionTexture = hdrTexture
        scene.getMaterialByName("carpet").roughness= 1
        scene.getMaterialByName("carpet").metallic =0

        scene.getMaterialByName("strandmon").reflectionTexture = hdrTexture
        scene.getMaterialByName("strandmon").bumpTexture.level = 1
        scene.getMaterialByName("strandmon").metallic = 0
        scene.getMaterialByName("strandmon").metallicTexture = new BABYLON.Texture("/assets/Strandmon_MetallicSmoothness.png", scene, false, false)
        scene.getMaterialByName("strandmon").useRoughnessFromMetallicTextureAlpha =true
        scene.getMaterialByName("strandmon").roughness =0.45

        scene.getMaterialByName("Fortuny").reflectionTexture = hdrTexture
        scene.getMaterialByName("Fortuny").bumpTexture.level = 0.1
        scene.getMaterialByName("Fortuny").metallic =0.5

        scene.getMaterialByName("jorid").albedoColor = new BABYLON.Color3.FromHexString("#282828") 
        scene.getMaterialByName("jorid").reflectionTexture = hdrTexture
        scene.getMaterialByName("jorid").metallic =1
        scene.getMaterialByName("jorid").roughness = 0.15
        scene.getMaterialByName("jorid").metallicTexture = new BABYLON.Texture("/assets/Jorid_MetallicSmoothness.png", scene, false, false)
        scene.getMaterialByName("jorid").useRoughnessFromMetallicTextureAlpha =true

        scene.getMaterialByName("Paint_Interior").reflectionTexture = hdrTexture
        scene.getMaterialByName("Paint_Interior").bumpTexture.level = 0.22
        scene.getMaterialByName("Paint_Interior").metallic = 0.04
        scene.getMaterialByName("Paint_Interior").roughness = 0.18
        
        scene.getMaterialByName("Wood_Floor").metallic = 1
        scene.getMaterialByName("Wood_Floor").roughness = 0.1
        scene.getMaterialByName("Wood_Floor").reflectionTexture = hdrTexture
        scene.getMaterialByName("Wood_Floor").bumpTexture.level = 0.1
        scene.getMaterialByName("Wood_Floor").metallicTexture = new BABYLON.Texture("/assets/wood_metallic.jpg", scene, false, false)

        
        sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.15 }, scene);
        sphere.position = new BABYLON.Vector3(0.005,2.29,0)
        sphere.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
        pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
        sphere.material = pbr;
        sphere.isVisible = true
        pbr.baseColor = new BABYLON.Color3(1.0, 1, 1);
        pbr.emissiveColor = new BABYLON.Color3(1.0, 1, 1);
        */


    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

