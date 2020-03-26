var particleSystem, emitterReveal, swooshParticles, rainSystem, loseParticles
var camTween = gsap.timeline();
let origin = new BABYLON.Vector3(0, 0.26, 0);

function camAnim() {

    //camTween.fromTo(camera, {beta: 180*(Math.PI/180)}, {beta: 82*(Math.PI/180), duration: 1});
    //camTween.set(camera, {alpha: 90*(Math.PI/180), beta: 82*(Math.PI/180)});
    camTween.fromTo(camera, { alpha: 0 * (Math.PI / 180), beta: 180 * (Math.PI / 180) }, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180), duration: 1 });
}

function lookHS(mesh) {

    let v0 = new BABYLON.Vector3(0, 0.1, 0);
    let v1 = mesh.getAbsolutePosition().subtract(v0);

    v1.normalize();
    let angle = Math.atan2(v1.z, v1.x) 
    let angleInDegree = BABYLON.Tools.ToDegrees(angle) +180
    //let newAlpha = angleInDegree - 90 ;
    console.log("angle is " + angleInDegree)
    
    camera.setTarget(origin)
    camTween.to(camera, { alpha: angle + Math.PI, beta: 100 * (Math.PI / 180),  radius: 0.3, duration: 1} )
}

function zoomCamOut(){
    camera.setTarget(origin)
    camTween.to(camera, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180),  radius: 2.8, duration: 1} )
}

function TriggeroopAnimations() {

    if (SceneStarted) {
        HS_P.getChildren().forEach(elem => {
            elem.rotation.y += 0.005;
        });
    }

}

function createWinParticles() {

    // Emitters
    var emitterWin = BABYLON.Mesh.CreateBox("emitterwin", 0.1, scene);
    emitterWin.position.z = -1
    emitterWin.isVisible = false;

    // Particles
    particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("/assets/fireplane.jpg", scene);
    particleSystem.minAngularSpeed = -0.5;
    particleSystem.maxAngularSpeed = 0.5;
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;
    particleSystem.minLifeTime = 0.5;
    particleSystem.maxLifeTime = 2.0;
    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 4.0;
    particleSystem.emitter = emitterWin;
    particleSystem.emitRate = 3000;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    particleSystem.direction1 = new BABYLON.Vector3(-0.5, 1, 0);
    particleSystem.direction2 = new BABYLON.Vector3(0.5, 1, 0);
    particleSystem.color1 = new BABYLON.Color3(219 / 255, 3 / 255, 15 / 255);//nagels rot
    //particleSystem.color1 = new BABYLON.Color3(211/255, 211/255, 211/255);//silver
    particleSystem.color2 = new BABYLON.Color3(250 / 255, 250 / 255, 210 / 255); //light gold
    //particleSystem.color2 = new BABYLON.Color3(218/255, 165/255, 32/255); //hard gold
    particleSystem.gravity = new BABYLON.Vector3(0, -3, 0);
    //velocity at birth
    particleSystem.addVelocityGradient(0, 0.5, 0.8);
    //velocity reached at dead
    particleSystem.addVelocityGradient(1.0, 3, 4);
}

function createSwooshReveal() {
    // Emitters
    emitterReveal = BABYLON.Mesh.CreateBox("emitterReveal", 0.2, scene);
    emitterReveal.position.x = 1.5
    emitterReveal.isVisible = false
    emitterReveal.parent = SceneMeshes
    SceneMeshes.position.y = -0.3

    var yRot = new BABYLON.Animation("yRot", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keyFramesR = []
    keyFramesR.push({ frame: 0, value: 0 - Math.PI / 2 })
    keyFramesR.push({ frame: 60, value: Math.PI * 8 })

    var yPos = new BABYLON.Animation("yPos", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keyFramesP = []
    keyFramesP.push({ frame: 0, value: -0.3 })
    keyFramesP.push({ frame: 60, value: 3 })

    var yScl = new BABYLON.Animation("yScl", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keyFramesS = []
    keyFramesS.push({ frame: 0, value: 1 })
    keyFramesS.push({ frame: 60, value: 0.5 })

    yRot.setKeys(keyFramesR)
    yPos.setKeys(keyFramesP)
    yScl.setKeys(keyFramesS)

    SceneMeshes.animations = []
    SceneMeshes.animations.push(yRot)
    SceneMeshes.animations.push(yPos)
    SceneMeshes.animations.push(yScl)

    // Particles
    swooshParticles = new BABYLON.ParticleSystem("swooshParticles", 10000, scene);
    swooshParticles.particleTexture = new BABYLON.Texture("/assets/fireplane.jpg", scene);
    swooshParticles.minAngularSpeed = -0.5;
    swooshParticles.maxAngularSpeed = 0.5;
    swooshParticles.minSize = 0.2;
    swooshParticles.maxSize = 0.7;
    swooshParticles.minLifeTime = 0.5;
    swooshParticles.maxLifeTime = 2.0;
    swooshParticles.minEmitPower = 0.5;
    swooshParticles.maxEmitPower = 4.0;
    swooshParticles.emitter = emitterReveal;
    swooshParticles.emitRate = 1000;
    swooshParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE
    swooshParticles.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    swooshParticles.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    swooshParticles.direction1 = new BABYLON.Vector3(-0.3, -0.1, -0.2);
    swooshParticles.direction2 = new BABYLON.Vector3(0.3, 0.1, 0.2);
    swooshParticles.color1 = new BABYLON.Color3(219 / 255, 3 / 255, 15 / 255);//nagels rot
    //swooshParticles.color1 = new BABYLON.Color3(211/255, 211/255, 211/255);//silver
    swooshParticles.color2 = new BABYLON.Color3(250 / 255, 250 / 255, 210 / 255); //light gold
    //swooshParticles.color2 = new BABYLON.Color3(218/255, 165/255, 32/255); //hard gold
    swooshParticles.gravity = new BABYLON.Vector3(0, -1, 0);
}

var visAnim, startAnim, closeAnim
var revealAnimGroup
var winAnimGroup
function createRevealAnim() {
    revealAnimGroup = new BABYLON.AnimationGroup("revealAnimGroup");
    revealAnimGroup.onAnimationGroupEndObservable.add(() => { ground.visibility = 1 })//late reveal because it was cutting the slot
    revealAnimGroup.onAnimationGroupPlayObservable.add(() => { ground.visibility = 0 })

    visAnim = new BABYLON.Animation("visAnim", "visibility", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keyFramesM = []
    keyFramesM.push({ frame: 0, value: 0 })
    keyFramesM.push({ frame: 30, value: 0.2 })
    keyFramesM.push({ frame: 100, value: 1 })

    visAnim.setKeys(keyFramesM)

    for (var j = 0; j < slotMeshTask.loadedMeshes.length; j++) {
        revealAnimGroup.addTargetedAnimation(visAnim, slotMeshTask.loadedMeshes[j])
    }

    startAnim = new BABYLON.Animation("startAnim", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keysStart = []
    keysStart.push({ frame: 0, value: new BABYLON.Vector3(0, 0, 0) })
    keysStart.push({ frame: 60, value: new BABYLON.Vector3(0, 0, 0) })
    keysStart.push({ frame: 70, value: new BABYLON.Vector3(1.1, 1.1, 1.1) })
    keysStart.push({ frame: 75, value: new BABYLON.Vector3(1, 1, 1) })
    startAnim.setKeys(keysStart)
    revealAnimGroup.addTargetedAnimation(startAnim, startMeshTask.loadedMeshes[0])

    console.log(startMeshTask.loadedMeshes)
}

function createLightBlink() {
    winAnimGroup = new BABYLON.AnimationGroup("winAnimGroup")
    var lightAnim = new BABYLON.Animation("lightAnim", "emissiveColor", 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keyFrameC = []
    keyFrameC.push({ frame: 0, value: new BABYLON.Color3.FromHexString("#000000") })
    keyFrameC.push({ frame: 15, value: new BABYLON.Color3.FromHexString("#663333") })
    keyFrameC.push({ frame: 30, value: new BABYLON.Color3.FromHexString("#000000") })

    lightAnim.setKeys(keyFrameC)
    winAnimGroup.addTargetedAnimation(lightAnim, scene.getMaterialByName("slotLight"))
    winAnimGroup.addTargetedAnimation(lightAnim, scene.getMaterialByName("wheelMitte"))
    winAnimGroup.addTargetedAnimation(lightAnim, scene.getMaterialByName("wheelSeiten"))

}

function addRevealAnim(meshToReveal) {
    scene.getMaterialByName(meshToReveal).animations = []
    scene.getMaterialByName(meshToReveal).animations.push(visAnim)
}

function createRain() {
    // Fountain object
    var rainP = BABYLON.Mesh.CreateBox("rain", 1.0, scene);
    //rainP.rotation.x = Math.PI / 2
    rainP.position.y = 6
    rainP.parent = SceneMeshes
    rainSystem = new BABYLON.ParticleSystem("rain", 1000, scene, null, true);
    rainSystem.particleTexture = new BABYLON.Texture("assets/Luck icons.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);
    rainSystem.spriteRandomStartCell = true
    rainSystem.startSpriteCellID = 0;
    rainSystem.endSpriteCellID = 4;
    rainSystem.spriteCellHeight = 512;
    rainSystem.spriteCellWidth = 512;
    rainSystem.spriteCellLoop = true;
    rainSystem.spriteCellChangeSpeed = 0;

    rainSystem.preWarmCycles = 25
    // Where the particles come from
    rainSystem.emitter = rainP; // the starting object, the emitter
    rainSystem.minEmitBox = new BABYLON.Vector3(-5, 0, -4); // Starting all from
    rainSystem.maxEmitBox = new BABYLON.Vector3(5, 0, 4); // To...

    // Size of each particle (random between...
    rainSystem.minSize = .4;
    rainSystem.maxSize = .8;

    // Life time of each particle (random between...
    rainSystem.minLifeTime = 0.2;
    rainSystem.maxLifeTime = 0.4;

    // Emission rate
    rainSystem.emitRate = 200;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    rainSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLYADD;

    // Set the gravity of all particles
    rainSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    rainSystem.direction1 = new BABYLON.Vector3(0, -20, 0);
    rainSystem.direction2 = new BABYLON.Vector3(0, -20, 0);

    // Angular speed, in radians
    rainSystem.minAngularSpeed = 0;
    rainSystem.maxAngularSpeed = Math.PI;

    // Speed
    rainSystem.minEmitPower = 1;
    rainSystem.maxEmitPower = 3;
    rainSystem.updateSpeed = 0.001;

    // Start the particle system

}

function createLoseAnim() {
    // Fountain object
    var loseP = BABYLON.Mesh.CreateBox("loseRain", 1.0, scene);
    //rainP.rotation.x = Math.PI / 2
    loseP.position.y = 6
    loseP.parent = SceneMeshes

    loseParticles = new BABYLON.ParticleSystem("lose", 1000, scene);
    loseParticles.particleTexture = new BABYLON.Texture("/assets/sad face.png", scene);

    //loseParticles.preWarmCycles = 25
    // Where the particles come from
    loseParticles.emitter = loseP; // the starting object, the emitter
    loseParticles.minEmitBox = new BABYLON.Vector3(-5, 0, -4); // Starting all from
    loseParticles.maxEmitBox = new BABYLON.Vector3(5, 0, 4); // To...

    // Size of each particle (random between...
    loseParticles.minSize = 0.4;
    loseParticles.maxSize = 1;

    // Life time of each particle (random between...
    loseParticles.minLifeTime = 0.1;
    loseParticles.maxLifeTime = 0.25;

    // Emission rate
    loseParticles.emitRate = 1000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    loseParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    loseParticles.color1 = new BABYLON.Color3(219 / 255, 3 / 255, 15 / 255);

    // Set the gravity of all particles
    loseParticles.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    loseParticles.direction1 = new BABYLON.Vector3(0, -30, 0);
    loseParticles.direction2 = new BABYLON.Vector3(0, -30, 0);

    // Angular speed, in radians
    loseParticles.minAngularSpeed = -Math.PI * 4;
    loseParticles.maxAngularSpeed = Math.PI * 4;

    // Speed
    loseParticles.minEmitPower = 1;
    loseParticles.maxEmitPower = 3;
    loseParticles.updateSpeed = 0.001;

    // Start the particle system

}