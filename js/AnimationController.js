var particleSystem, emitterReveal, swooshParticles, rainSystem, loseParticles
var tween = gsap.timeline();
var startTween = gsap.timeline();
var startCamTween = gsap.timeline();
var uiTween = gsap.timeline()
let origin = new BABYLON.Vector3(0, 0.26, 0);

function camAnim() {

    //tween.fromTo(camera, {beta: 180*(Math.PI/180)}, {beta: 82*(Math.PI/180), duration: 1});
    startCamTween.set(camera, {alpha: 0*(Math.PI/180), beta: 180*(Math.PI/180)});
    startCamTween.fromTo(camera, { alpha: 0 * (Math.PI / 180), beta: 180 * (Math.PI / 180) }, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180), duration: 1 }, 1);
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
var rate =0;
function animateBoden(){
    let startColor = new BABYLON.Color3.FromHexString("#00000")
    let endColor = new BABYLON.Color3.FromHexString("#0c83e2")

    if (SceneStarted && rate < 1) {
        scene.getMaterialByName("light_logo").emissiveColor = new BABYLON.Color3.Lerp(startColor, endColor, rate)
        rate += 0.05

    }
}

function BufferStartAnimation(){
    scene.getTransformNodeByName("logo holder").setEnabled(false)
    scene.getTransformNodeByName("Welcome").rotationQuaternion = null
    scene.getTransformNodeByName("Welcome").scaling = new BABYLON.Vector3(0,0,0)
    startTween.set(camera, {alpha: 0*(Math.PI/180), beta: 180*(Math.PI/180)});
    startTween.from(camera, {radius:2.5, duration: 3})
    startTween.fromTo(camera, { alpha: 0 * (Math.PI / 180), beta: 180 * (Math.PI / 180) }, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180), duration: 2, ease: "power3.inOut" }, ">-2"); //1 second before end of last timeline

    let offsetLogos = 2.5;
    let rot = new BABYLON.Quaternion(0, 1.5, 0, 1)
    for(var i = 0; i <= 6; i++){
        let offString = offsetLogos.toString();
        ArrowsHolder[i].rotationQuaternion = null // should allow to animate "rotation"
        startTween.from(ArrowsHolder[i].scaling, {y:0, duration:2, ease: "elastic"}, offsetLogos);
        startTween.from(ArrowsHolder[i].rotation, {y:  -180 * (Math.PI / 180), duration: 2, ease: "elastic"},"<" );
        startTween.from(LogosHolder[i].scaling, {y:0, duration:2, ease: "elastic"}, "<0.1")
        startTween.from(LogosHolder[i].position, {y:  LogosHolder[i].position.y-50, duration: 0.5, ease: "back"},"<" );
;
    offsetLogos += 0.1
    }
    
    startTween.fromTo(scene.getTransformNodeByName("Welcome").rotation, {x: 180 * (Math.PI / 180)}, {x:  90 * (Math.PI / 180), duration: 2, ease: "elastic"},">" );
    startTween.set(scene.getTransformNodeByName("Welcome").scaling, {x: 0.528, y: 0.804, z: 0.804},"<" );
    startTween.from(scene.getMeshByName("RB logo full Instance.1").scaling, {y: 0, duration: 0.5, ease: "back"},">0.5" );


}


function openInfoContent(){
    $('.bg-overlay').addClass('open');
    uiTween.fromTo(".project-overlay", {left: -1200, opacity: 0},{left: 0, opacity: 1, duration: 0.5, delay: 0.25})
}

function closeInfoContent(){
    uiTween.fromTo(".project-overlay", {left: 0, opacity: 1}, {left: -1200, opacity: 0, duration: 0.5})
}