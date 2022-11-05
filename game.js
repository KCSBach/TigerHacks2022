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
    87: {pressed: false, func: move_p1_up, speed: 0.75},
    83: {pressed: false, func: move_p1_down, speed: 0.75},
    38: {pressed: false, func: move_p2_up, speed: 0.75},
    40: {pressed: false, func: move_p2_down, speed: 0.75},
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


// move background and jetstreams (i.e. move their x-pos /.left) on the top half
const moveBackgroundTop = (speed) => {
    let topHalf = document.getElementById("topID")
    topHalf.style.backgroundPositionX = parseFloat(topHalf.style.backgroundPositionX) - speed + "px"

    let jetStream = document.getElementById("topjetstream")
    jetStream.style.left = (parseFloat(jetStream.style.left) - speed) + "px"
}

// same thing but for bottom half
const moveBackgroundBottom = (speed) => {
    let bottomHalf = document.getElementById("bottomID")
    bottomHalf.style.backgroundPositionX = parseFloat(bottomHalf.style.backgroundPositionX) - speed + "px"    

    let jetStream = document.getElementById("bottomjetstream")
    jetStream.style.left = (parseFloat(jetStream.style.left) - speed) + "px"

}




const manageTopJetstream = (speed_start) => {
    let topStream = document.getElementById("topjetstream")
    if (parseInt(topStream.style.left) < 0-parseInt(topStream.width)) {
        topStream.style.left = parseInt(window.innerWidth) + 'px'
        topStream.style.top = (Math.random() * (parseInt(window.innerHeight)/2-topStream.height)) + "px"
    }

    player1_plane = document.getElementById("player1");

    let player1_nose = (parseInt(player1_plane.height) + parseInt(player1_plane.style.top))/2
    let topstream_center = (parseInt(topStream.clientHeight) + parseInt(topStream.style.top))/2

    if (parseInt(topStream.style.left) < parseInt(player1_plane.style.left)) {           
        if (Math.abs(player1_nose - topstream_center) <= 15) {
            return speed_start + 0.03;    
        }
    }
    return speed_start
}

const manageBottomJetstream = (speed_start) => {
    let bottomStream = document.getElementById("bottomjetstream")
    if (parseInt(bottomStream.style.left) < 0-parseInt(bottomStream.width)) {
        bottomStream.style.left = parseInt(window.innerWidth) + 'px'
        bottomStream.style.top = (Math.random() * (parseInt(window.innerHeight)/2-bottomStream.height)) + (.51*parseInt(window.innerHeight)) + "px"
    }

    player2_plane = document.getElementById("player2");

    let player2_nose = (parseInt(player2_plane.height) + parseInt(player2_plane.style.top))/2
    let bottomstream_center = (parseInt(bottomStream.clientHeight) + parseInt(bottomStream.style.top))/2

    if (parseInt(bottomStream.style.left) < parseInt(player2_plane.style.left)) {           
        if (Math.abs(player2_nose - bottomstream_center) <= 15) {
            return speed_start + 0.03;    
        }
    }
    return speed_start
}




let player1_speed, player2_speed;
const animate = (cur_speed1, cur_speed2) => {
    runPressedButtons()
    player1_speed= manageTopJetstream(cur_speed1) // add speed when jetstreams are hit
    player2_speed= manageBottomJetstream(cur_speed2)
    
    console.log(player2_speed)
   
    controller[87].speed = player1_speed
    controller[83].speed = player1_speed
    controller[38].speed = player2_speed
    controller[40].speed = player2_speed
    
    moveBackgroundTop(cur_speed1)
    moveBackgroundBottom(cur_speed2)

    window.requestAnimationFrame(() => {
        animate(player1_speed, player2_speed)
    })  
    
    console.log(performance.now())
    
}

let button = document.getElementById("buttonStart")
button.addEventListener("click",function(){animate(3,3)})

 




