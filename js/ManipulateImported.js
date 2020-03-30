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
        gl.intensity = 0.7;
        scene.meshes.forEach(elem => {
            if(elem.name.startsWith("Screen_")){
                gl.addExcludedMesh(elem)
            }
        });

}


function SpawnHotspots(){
    let counter = 0;
    let Hs_Clones = []

    //TO DO: ALL LOOPS IN ONE
    scene.meshes.forEach(elem => {
        //make all unpickable
        elem.isPickable = false; 

        if(elem.name.startsWith("Hotspot_")){
            elem.setEnabled(false)
            counter ++;
            //create icon
            var clone = HSIconTask.loadedMeshes[0].instantiateHierarchy(HS_P, undefined, (source, clone) => {
                //clone.position = elem.position;
                clone.scaling = new BABYLON.Vector3(1, 1, 1);
            })
            clone.position = elem.position;
            clone.rotation = BABYLON.Quaternion.FromEulerAngles(0, Math.random() * 2 * Math.PI, 0);
            clone.name = "HS Clone " + counter

            //create Colliders
            hsColl = new BABYLON.MeshBuilder.CreateBox("HS Collider " + counter, { height: 40, width: 40, depth: 10 }, scene)
            hsColl.material = colMat
            hsColl.parent = clone.getChildTransformNodes()[0];
            hsColl.isPickable = true;
            BABYLON.Tags.AddTagsTo(hsColl, "hs_coll");
        }
    });

}