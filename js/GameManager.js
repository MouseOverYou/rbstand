var lightAnimController

function createUI() {
    myGUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    createWinBtn(myGUI)
    createLoseBtn(myGUI)
    createRevealBtn(myGUI)
    createRainButton(myGUI)
}

function callWin() {

    scene.animationGroups[0].play(false);//slot gewonnen
    //hide Arrow Start
    for (var j = 0; j < startMeshTask.loadedMeshes.length; j++) {
        startMeshTask.loadedMeshes[j].visibility = 0
    }
    //trigger animation after 3,5 seconds
    window.setTimeout(() => {
        particleSystem.start();
        winAnimGroup.play(true)
        window.setTimeout(() => {
            particleSystem.stop();
        }, 1000)//stop particle system
    },
        3500)
}

function callLose() {

    for (var j = 0; j < startMeshTask.loadedMeshes.length; j++) {
        startMeshTask.loadedMeshes[j].visibility = 0
    }

    scene.animationGroups[2].play(false);//slot verloren
    winAnimGroup.reset()
    winAnimGroup.stop()

    window.setTimeout(() => {
        loseParticles.start()
        window.setTimeout(() => {
            loseParticles.stop()
        }, 1500)

    }, 3000)
}


function callReveal() {

    swooshParticles.start(false)//emit reveal particles
    scene.beginAnimation(SceneMeshes, 0, 60, false)//rotation particles
    window.setTimeout(() => { swooshParticles.stop() }, 2000)//stop emitting
    console.log(scene.getMaterialByName("SlotMitte"))
    //reveal package
    window.setTimeout(() => {
        revealAnimGroup.play(false);
    }, 1500)
}

function callRain() {
    rainOn = !rainOn

    if (rainOn) {
        rainSystem.start();
    }
    else {
        rainSystem.stop();
    }
}

function setIdleAnim(g){
    //scene.animationGroups[g].pause();
    scene.animationGroups[g].stop();
}

/*
function playEveryReveal(meshToPlay) {
    scene.beginAnimation(scene.getMaterialByName(meshToPlay), 0, 100, false)
}

function lateReveal(j) {
    return function () {
        console.log("BEGIN ANIM " + j);
        scene.beginAnimation(slotMeshTask.loadedMeshes[j], 0, 100, false);
    };
}
function TriggerAlphaAnim() {
    for (var j = 0; j < slotMeshTask.loadedMeshes.length; j++) {
        if (slotMeshTask.loadedMeshes[j].name == "Slot_label_0") {
            window.setTimeout(lateReveal(j), 2000);
        }
    }
}
        playEveryReveal("bodyEdges")
        playEveryReveal("bodyFront")
        playEveryReveal("bodySide")
        playEveryReveal("buttonGray")
        playEveryReveal("buttonRed")
        playEveryReveal("hebelTop")
        playEveryReveal("hebelUnten")
        playEveryReveal("Kasten")
        playEveryReveal("Metal")
        playEveryReveal("name2")
        playEveryReveal("slotLight")
        playEveryReveal("spinBody")
        playEveryReveal("spinEdges")
        playEveryReveal("spinMitte")
        playEveryReveal("spinSeite")*/

/*
for (var j = 0; j < slotMeshTask.loadedMeshes.length; j++) {
console.log(slotMeshTask.loadedMeshes[j].name)
scene.beginAnimation(slotMeshTask.loadedMeshes[j], 0, 100, false)
if (slotMeshTask.loadedMeshes[j].name != 'Slot_label_0'){

}
//TriggerAlphaAnim()
}
for (var j = 0; j < edgesMeshTask.loadedMeshes.length; j++) {
console.log(edgesMeshTask.loadedMeshes[j].name)
scene.beginAnimation(edgesMeshTask.loadedMeshes[j], 0, 100, false)
}*/