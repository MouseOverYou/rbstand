
function createDebugger(){
    /*
    
    var santaAnim = new BABYLON.GUI.TextBlock("debugger")
    santaAnim.text = "Hello world"
    santaAnim.color = "white"
    santaAnim.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    santaAnim.fontSize = 24
    santaAnim.isHitTestVisible =false
    myGUI.addControl(santaAnim);
  
    
    var timeAnim = new BABYLON.GUI.TextBlock("time");

    timeAnim.text = "myTimer.currentTime"
    timeAnim.color = "white"
    timeAnim.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    timeAnim.fontSize = 24;
    timeAnim.paddingTop= 30
    timeAnim.isHitTestVisible =false
    myGUI.addControl(timeAnim)*/

}

function createWinBtn(){
    console.log("creatred button")
    var winB = BABYLON.GUI.Button.CreateSimpleButton("win", "WIN")
    winB.top = 400
    winB.children[0].color = new BABYLON.Color3(69/255, 172/255, 131/255).toHexString()
    winB.children[0].fontSize = 35
    winB.children[0].top = "-13px"
    winB.children[0].left = "0px"
    winB.children[0].height ="60px"
    winB.isVisible = true
    winB.width ="150px"
    winB.height ="50px"
    winB.horizontalAlignment =BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    winB.color ="white"
    winB.cornerRadius = 10
    winB.thickness = 5
        winB.background = new BABYLON.Color3(248/255, 232/255, 142/255).toHexString()
    winB.color = new BABYLON.Color3(245/255, 176/255, 20/255).toHexString()
    winB.onPointerUpObservable.add(function(){
        console.log("buton clicked")
        //alert("you cliked")
        callWin()
    })
    myGUI.addControl(winB)
}
var rainOn = false
function createRainButton(){
    console.log("creatred button")
    var rainB = BABYLON.GUI.Button.CreateSimpleButton("rainB", "RAIN")
    rainB.top = -400
    rainB.children[0].color = new BABYLON.Color3(255/255, 255/255, 255/255).toHexString()
    rainB.children[0].fontSize = 35
    rainB.children[0].top = "-13px"
    rainB.children[0].left = "0px"
    rainB.children[0].height ="60px"
    rainB.isVisible = true
    rainB.width ="150px"
    rainB.height ="50px"
    rainB.horizontalAlignment =BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    rainB.color ="white"
    rainB.cornerRadius = 10
    rainB.thickness = 5
    rainB.background = new BABYLON.Color3(248/255, 232/255, 142/255).toHexString()
    rainB.color = new BABYLON.Color3(245/255, 176/255, 20/255).toHexString()
    rainB.onPointerUpObservable.add(function(){
        callRain()
    })
    myGUI.addControl(rainB)
}

function createLoseBtn(){
    var loseB = BABYLON.GUI.Button.CreateSimpleButton("lose", "LOSE")
    loseB.top = 400
    loseB.children[0].color = new BABYLON.Color3(255/255, 1/255, 1/255).toHexString()
    loseB.children[0].fontSize = 35
    loseB.children[0].top = "-13px"
    loseB.children[0].left = "0px"
    loseB.children[0].height ="60px"
    loseB.isVisible = true
    loseB.width ="150px"
    loseB.height ="50px"
    loseB.horizontalAlignment =BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    loseB.color ="white"
    loseB.cornerRadius = 10
    loseB.thickness = 5
        loseB.background = new BABYLON.Color3(248/255, 232/255, 142/255).toHexString()
        loseB.color = new BABYLON.Color3(245/255, 176/255, 20/255).toHexString()
        loseB.onPointerUpObservable.add(function(){
        console.log("buton clicked")
        //alert("you cliked")
        callLose()
    })
    myGUI.addControl(loseB)
}


function createRevealBtn(){
    var revealB = BABYLON.GUI.Button.CreateSimpleButton("revealB", "REVEAL")
    revealB.top = 10
    revealB.children[0].color = new BABYLON.Color3(255/255, 255/255, 255/255).toHexString()
    revealB.children[0].fontSize = 35
    revealB.children[0].top = "-13px"
    revealB.children[0].left = "0px"
    revealB.children[0].height ="60px"
    revealB.isVisible = true
    revealB.width ="150px"
    revealB.height ="50px"
    revealB.horizontalAlignment =BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    revealB.verticalAlignment =BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_
    revealB.color ="white"
    revealB.cornerRadius = 10
    revealB.thickness = 5
    revealB.background = new BABYLON.Color3(248/255, 232/255, 142/255).toHexString()
    revealB.color = new BABYLON.Color3(245/255, 176/255, 20/255).toHexString()
    revealB.onPointerUpObservable.add(function(){
        console.log("buton clicked")
        //alert("you cliked")
        callReveal()
    })
    myGUI.addControl(revealB)
}

