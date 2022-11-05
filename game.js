let raceinprogress = true;
// Manage player movement
let player1_plane; // player 1 using arrow keys
let player2_plane; //player 2 using ws

// I've tried passing the node/node ID as a param but it kept returning null, so unfortunately redclaring the plane vars is necessary. Don't touch it
// calculate if player is in bounds and will still be in bounds once they move
const move_p1_up = (spd) => { 
    player1_plane = document.getElementById("player1"); 
    player1_plane.style.top = 10 < parseInt(player1_plane.style.top) - spd ? (parseInt(player1_plane.style.top) - spd) + 'px' : player1_plane.style.top;    
}
const move_p1_down = (spd) => { 
    player1_plane = document.getElementById("player1"); // player 1 using arrow keys
    player1_plane.style.top = parseInt(player1_plane.style.top) + parseInt(player1_plane.clientHeight) + 10 + spd < parseInt(window.innerHeight)/2 ? (parseInt(player1_plane.style.top) + spd) + 'px' : player1_plane.style.top; 
}
const move_p2_up = (spd) => { 
    player2_plane = document.getElementById("player2"); //player 2 using ws
    player2_plane.style.top = parseInt(window.innerHeight)/2 + 10 < parseInt(player2_plane.style.top) - spd? (parseInt(player2_plane.style.top) - spd) + 'px' : player2_plane.style.top; 
}
const move_p2_down = (spd) => { 
    player2_plane = document.getElementById("player2"); //player 2 using ws
    player2_plane.style.top = parseInt(player2_plane.style.top) + parseInt(player2_plane.clientHeight) + 10 + spd < parseInt(window.innerHeight) ? (parseInt(player2_plane.style.top) + spd) + 'px' : player2_plane.style.top; 
}

// I stole this code from some pong demo don't ask me to explain it rn 
const controller = {
    87: {pressed: false, func: move_p1_up, speed: 2.5},
    83: {pressed: false, func: move_p1_down, speed: 2.5},
    38: {pressed: false, func: move_p2_up, speed: 2.5},
    40: {pressed: false, func: move_p2_down, speed: 2.5},
}

const handleKeyDown = (e) => {
    controller[e.keyCode] && (controller[e.keyCode].pressed = true)
}

const handleKeyUp = (e) => {
    controller[e.keyCode] && (controller[e.keyCode].pressed = false)
}

const runPressedButtons = () => {
    Object.keys(controller).forEach(key => {
        controller[key].pressed && controller[key].func(controller[key].speed)
    })
}

document.addEventListener("keydown", handleKeyDown)
document.addEventListener("keyup", handleKeyUp)

document.getElementById("playagain").addEventListener("click", () => {
    console.log("Clicked")
    reset_race()
    raceinprogress = true;
    document.getElementById("playagain").style.display = "none"
    animate(5, 5)

})


// move background and jetstreams (i.e. move their x-pos /.left) on the top half
const moveBackgroundTop = (speed) => {
    let topHalf = document.getElementById("topID")
    topHalf.style.backgroundPositionX = parseFloat(topHalf.style.backgroundPositionX) - speed + "px"

    let jetStream = document.getElementById("topjetstream")
    jetStream.style.left = (parseFloat(jetStream.style.left) - speed) + "px"

    let finishline1 = document.getElementById("player1finish")
    finishline1.style.left = (parseFloat(finishline1.style.left) - speed) + "px"

}

// same thing but for bottom half
const moveBackgroundBottom = (speed) => {
    let bottomHalf = document.getElementById("bottomID")
    bottomHalf.style.backgroundPositionX = parseFloat(bottomHalf.style.backgroundPositionX) - speed + "px"    

    let jetStream = document.getElementById("bottomjetstream")
    jetStream.style.left = (parseFloat(jetStream.style.left) - speed) + "px"

    let finishline2 = document.getElementById("player2finish")
    finishline2.style.left = (parseFloat(finishline2.style.left) - speed) + "px"

}

const manageTopJetstream = (speed_start) => {

    //if (parseFloat(document.getElementById("player1finish").style.left) < window.innerWidth) {
      //  return speed_start
    //}

    let topStream = document.getElementById("topjetstream")
    if ((parseInt(topStream.style.left) < 0-parseInt(topStream.width) || topStream.style.top == "-1px") && parseFloat(document.getElementById("player1finish").style.left) > window.innerWidth) {
        topStream.style.left = parseInt(window.innerWidth) + 'px'
        topStream.style.top = (Math.random() * (parseInt(window.innerHeight)/2-topStream.height)) + "px"
    }

    player1_plane = document.getElementById("player1");

    let player1_nose = (parseInt(player1_plane.height) + parseInt(player1_plane.style.top))/2
    let topstream_center = (parseInt(topStream.height) + parseInt(topStream.style.top))/2

    if (parseInt(topStream.style.left) < parseInt(player1_plane.style.left) && parseInt(topStream.style.left) > 0-parseInt(topStream.width)) {           
        if (Math.abs(player1_nose - topstream_center) <= 25) {
            return speed_start + 5;    
        }
    }
    return speed_start
}

const manageBottomJetstream = (speed_start) => {
    
    let bottomStream = document.getElementById("bottomjetstream")
    if ((parseInt(bottomStream.style.left) < 0-parseInt(bottomStream.width) || bottomStream.style.top == "-1px") && parseFloat(document.getElementById("player2finish").style.left) > window.innerWidth) {
        bottomStream.style.left = parseInt(window.innerWidth) + 'px'
        bottomStream.style.top = (Math.random() * (parseInt(window.innerHeight)/2-bottomStream.height)) + (.51*parseInt(window.innerHeight)) + "px"
    }

    player2_plane = document.getElementById("player2");

    let player2_nose = (parseInt(player2_plane.height) + parseInt(player2_plane.style.top))/2
    let bottomstream_center = (2*parseInt(bottomStream.height) + parseInt(bottomStream.style.top))/2

    if (parseInt(bottomStream.style.left) < parseInt(player2_plane.style.left) && parseInt(bottomStream.style.left) > 0-parseInt(bottomStream.width)) {           
        if (Math.abs(player2_nose - bottomstream_center) <= 25) {
            return speed_start + 5;    
        }
    }
    return speed_start
}


let player1_speed, player2_speed;
const animate = (cur_speed1, cur_speed2) => {
    runPressedButtons()
    player1_speed= manageTopJetstream(cur_speed1) // add speed when jetstreams are hit
    player2_speed= manageBottomJetstream(cur_speed2)
    
    /*controller[87].speed = player1_speed
    controller[83].speed = player1_speed
    controller[38].speed = player2_speed
    controller[40].speed = player2_speed*/
    
    moveBackgroundTop(player1_speed)
    moveBackgroundBottom(player2_speed)

    
    if (checkForWin() > 0) {
        raceinprogress = false
    }

    if (raceinprogress) {
        window.requestAnimationFrame(() => {
            animate(cur_speed1+0.001, cur_speed2+0.001)
        })  
    } else {
        let but = document.getElementById("playagain")
        console.log(but)
        but.style.display = "block"
    }
}

let button = document.getElementById("buttonStart")
button.addEventListener("click",function(){animate(3,3)})

const checkForWin = () => {
    let finishline1 = document.getElementById("player1finish") 
    let finishLinePos1 = parseFloat(finishline1.style.left) + 2*parseFloat(finishline1.style.width)
    
    player1_plane = document.getElementById("player1");
    let player1pos = parseFloat(player1_plane.style.left) 

    let finishline2 = document.getElementById("player2finish") 
    let finishLinePos2 = parseFloat(finishline2.style.left) + 2*parseFloat(finishline2.style.width)
    
    player2_plane = document.getElementById("player2");
    let player2pos = parseFloat(player2_plane.style.left) 

    if (finishLinePos1 < player1pos && finishLinePos2 < player2_plane) {
        let winner = document.getElementById("winmessage")
        
        winner.textContent = "It's a tie!"
        winner.style.display="block"
        console.log("It's A Tie!")

        return 3
    } else if (finishLinePos1 < player1pos) {
        console.log("Player 1 Wins!")

        let winner = document.getElementById("winmessage")
        
        winner.textContent = "Player 1 Wins!"
        winner.style.color = "red"
        winner.style.display="block"

        return 1
    } else if (finishLinePos2 < player2pos) {
        console.log("Player 2 Wins!")

        let winner = document.getElementById("winmessage")
        
        winner.textContent = "Player 2 Wins!"
        winner.style.color="green"
        winner.style.display="block"

        return 2
    }

    // no winners yet
    return 0
}

const reset_race  = () => {
    // reset background
    document.getElementById("topID").style.backgroundPositionX = "0px"
    document.getElementById("bottomID").style.backgroundPositionX = "0px"

    //reset finish lines
    document.getElementById("player1finish").style.left = "5000px"
    document.getElementById("player2finish").style.left = "5000px"

    // reset planes
    document.getElementById("player1").style.top = parseInt(window.innerHeight/4) + 'px'
    document.getElementById("player2").style.top = parseInt(3*window.innerHeight/4) + 'px' 

    //remove text
    document.getElementById("winmessage").style.display = "none"
}

animate(5, 5)






