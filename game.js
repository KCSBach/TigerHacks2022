let player1_plane; // player 1 using arrow keys
let player2_plane; //player 2 using ws
let g = document.getElementById("topID")

const move_p1_up = () => { player1_plane = document.getElementById("player1"); // player 1 using arrow keys
player1_plane.style.top = 10 < parseInt(player1_plane.style.top) ? (parseInt(player1_plane.style.top) - 3) + 'px' : player1_plane.style.top; }
const move_p1_down = () => { player1_plane = document.getElementById("player1"); // player 1 using arrow keys
player1_plane.style.top = parseInt(player1_plane.style.top) + parseInt(player1_plane.clientHeight) + 10 < parseInt(window.innerHeight)/2 ? (parseInt(player1_plane.style.top) + 3) + 'px' : player1_plane.style.top; }

const move_p2_up = () => { player2_plane = document.getElementById("player2"); //player 2 using ws
player2_plane.style.top = parseInt(window.innerHeight)/2 + 10< parseInt(player2_plane.style.top) ? (parseInt(player2_plane.style.top) - 3) + 'px' : player2_plane.style.top; }
const move_p2_down = () => { player2_plane = document.getElementById("player2"); //player 2 using ws
player2_plane.style.top = parseInt(player2_plane.style.top) + parseInt(player2_plane.clientHeight) + 10< parseInt(window.innerHeight) ? (parseInt(player2_plane.style.top) + 3) + 'px' : player2_plane.style.top; }


const controller = {
    87: {pressed: false, func: move_p1_up},
    83: {pressed: false, func: move_p1_down},
    38: {pressed: false, func: move_p2_up},
    40: {pressed: false, func: move_p2_down},
}

const handleKeyDown = (e) => {
    controller[e.keyCode] && (controller[e.keyCode].pressed = true)
}

const handleKeyUp = (e) => {
    controller[e.keyCode] && (controller[e.keyCode].pressed = false)
}

const runPressedButtons = () => {
    Object.keys(controller).forEach(key => {
        controller[key].pressed && controller[key].func()
    })
}

const moveBackground = () => {

    g = document.getElementById("topID")

    g.style.backgroundPositionX = parseFloat(g.style.backgroundPositionX) + 0.5 + "%"

    let h = document.getElementById("bottomID")

    h.style.backgroundPositionX = parseFloat(h.style.backgroundPositionX) + 0.5 + "%"
    //console.log(g.style.backgroundPositionX)


    
}

document.addEventListener("keydown", handleKeyDown)
document.addEventListener("keyup", handleKeyUp)


const animate = () => {
    runPressedButtons()
    moveBackground()
    window.requestAnimationFrame(animate)   
    
}

let game_begin = false;
let on_game_end_screen = true;
let on_title_screen = false;

if (on_title_screen) {
    // insert title screen
} else if (game_begin) {
    animate()
} else if (on_game_end_screen) {
    // insert game end/play again screen
}
animate()
