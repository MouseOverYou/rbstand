let hsHolder = []
let LogosHolder = []
let ArrowsHolder = []

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
    let hsCounter = 0;
    let arrowCounter = 0;
    let Hs_Clones = []

    //TO DO: ALL LOOPS IN ONE
    scene.meshes.forEach(elem => {
        //make all unpickable
        elem.isPickable = false; 

        if(elem.name.startsWith("ref_Hotspot_")){
            //elem.setEnabled(false)
            elem.visibility = 0;
            hsCounter ++;
            //create icon
            var clone = HSIconTask.loadedMeshes[0].instantiateHierarchy(elem, undefined, (source, clone) => {
                //clone.position = elem.position;
                clone.scaling = new BABYLON.Vector3(1, 1, 1);
            })
            //clone.position = elem.position;
            clone.rotation = BABYLON.Quaternion.FromEulerAngles(0, Math.random() * 2 * Math.PI, 0);
            clone.name = "HS Clone " + hsCounter

            hsColl = new BABYLON.MeshBuilder.CreateBox("hs Collider " + hsCounter, { height: 40, width: 40, depth: 10 }, scene)
            hsColl.material = colMat
            hsColl.parent = clone;
            hsColl.isPickable = true;
            BABYLON.Tags.EnableFor(hsColl)
            BABYLON.Tags.AddTagsTo(hsColl, "hs_coll");
            hsHolder.push(clone);
        }
        else if(elem.name.startsWith("Arrow_")){
            arrowCounter++;
            //create Colliders
            elem.visibility = false;
            ArrowsHolder.push(elem.parent)
            FeedWithLogo(elem.name.split("_")[1], elem)
            
            arrowColl = new BABYLON.MeshBuilder.CreateBox("Arrow Collider " + arrowCounter, { height: 80, width: 80, depth: 10 }, scene)
            arrowColl.material = colMat
            arrowColl.parent = elem;
            arrowColl.position.y =20
            arrowColl.isPickable = true;
            BABYLON.Tags.EnableFor(arrowColl)
            BABYLON.Tags.AddTagsTo(arrowColl, "arrow_coll");
            
        }
        else if(elem.name.startsWith("ref_Anchor_")){
            elem.visibility = false;
        }
    });

}

function FeedWithLogo(name, parent){
    //console.log(LogosLoaderTask.loadedMeshes[0])
    switch(name){
        case "1":
            //console.log("contact station");
            PositionLogo()
            break;
        case "2":
            //console.log("linde station");
            PositionLogo()
            break;
        case "3":
            //console.log("ar station")
            PositionLogo()
            break;
        case "4":
            //console.log("varycon station");
            PositionLogo()
            break;
        case "5":
            //console.log("vr station");
            PositionLogo()
            break;
        case "6":
            //console.log("telekom staion");
            PositionLogo()
            break;
        case "7":
            //console.log("bombardier station");
            PositionLogo()
            break;
    }

    function PositionLogo(num) {
        var logoMesh = LogosLoaderTask.loadedMeshes[0].getChildMeshes()[0]
        logoMesh.parent = parent.parent.parent
        logoMesh.position = new BABYLON.Vector3(parent.parent.position.x, parent.parent.position.y + 55, parent.parent.position.z)
        //holder for start animation
        LogosHolder.push(logoMesh);
    }
}