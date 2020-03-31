var particleSystem, emitterReveal, swooshParticles, rainSystem, loseParticles
var tween = gsap.timeline();
var startTween = gsap.timeline();
let origin = new BABYLON.Vector3(0, 0.26, 0);

function camAnim() {

    //tween.fromTo(camera, {beta: 180*(Math.PI/180)}, {beta: 82*(Math.PI/180), duration: 1});
    //tween.set(camera, {alpha: 90*(Math.PI/180), beta: 82*(Math.PI/180)});
    tween.fromTo(camera, { alpha: 0 * (Math.PI / 180), beta: 180 * (Math.PI / 180) }, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180), duration: 1 });
}

function lookHS(mesh) {

    let v0 = new BABYLON.Vector3(0, 0.1, 0);
    let v1 = mesh.getAbsolutePosition().subtract(v0);

    v1.normalize();
    let angleAlpha = Math.atan2(v1.z, v1.x)
    let angleBeta = 100;
 
    let angleInDegree = BABYLON.Tools.ToDegrees(angleAlpha) +180
    console.log("angle is " + angleInDegree)
    
    //change values per selection
    switch(CurrentSelection){
        case "1":
            camera.setTarget(origin)
            tween.to(camera, { alpha: 90 * (Math.PI / 180), beta: 95 * (Math.PI / 180),  radius: 1.5, duration: 1} )
            break;
        case "2":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 10) * (Math.PI / 180),  radius: 0.005, duration: 1} )
            break;
        case "3":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 5) * (Math.PI / 180),  radius: 0.1, duration: 1} )
            break;
        case "4":
            //varycon
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 3.5) * (Math.PI / 180),  radius: 0.1, duration: 1} )
            break;
        case "5":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 5)* (Math.PI / 180),  radius: 0.07, duration: 1} )
            break;
        case "6":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 10) * (Math.PI / 180),  radius: 0.005, duration: 1} )
            break;
        case "7":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: angleBeta * (Math.PI / 180),  radius: 0.7, duration: 1} )
            break;
            
    }

    //camera.setTarget(origin)
    //tween.to(camera, { alpha: angleAlpha + Math.PI, beta: angleBeta * (Math.PI / 180),  radius: 0.1, duration: 1} )
}

function zoomCamOut(){
    camera.setTarget(origin)
    tween.to(camera, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180),  radius: 2.8, duration: 1} )
}

function TriggerLoopAnimations() {

    if (SceneStarted) {
        hsHolder.forEach(elem => {
            elem.rotation.y += 0.005;
        });
    }

}

function BufferStartAnimation(){
    LogosHolder.forEach(logo => {
        startTween.from(logo.scaling, {y:0, duration:0.1});
    });
    ArrowsHolder.forEach(arrow => {
        startTween.from(arrow.scaling, {y:0, duration:0.1});
    });
    startTween.pause()


}

