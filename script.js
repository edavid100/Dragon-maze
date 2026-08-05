// ===============================
// Maze Dragon - script.js Part 1
// ===============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const drawBtn = document.getElementById("drawBtn");
const finishBtn = document.getElementById("finishBtn");
const restartBtn = document.getElementById("restartBtn");
const eraseBtn = document.getElementById("eraseBtn");

const timerText = document.getElementById("timer");
const message = document.getElementById("message");


// Game states

let drawing = true;
let erasing = false;
let gameStarted = false;
let gameWon = false;


// Maze storage

let walls = [];

let mouseDown = false;


// Timer

let startTime;
let timer;


// Dragon

let dragon = {
    x: 50,
    y: 50,
    size: 25,
    speed: 4
};


// Treasure

let treasure = {
    x: 900,
    y: 600,
    size: 30
};


// ===============================
// Canvas Setup
// ===============================

function clearCanvas(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawBackground();

    drawWalls();

    drawTreasure();

    drawDragon();

}


// Background

function drawBackground(){

    ctx.fillStyle="#eee";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // grid

    ctx.strokeStyle="#ddd";

    for(let x=0;x<canvas.width;x+=50){

        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();

    }


    for(let y=0;y<canvas.height;y+=50){

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();

    }

}


// ===============================
// Drawing Maze
// ===============================


canvas.addEventListener(
"mousedown",
(e)=>{

    if(!drawing)return;

    mouseDown=true;

});


canvas.addEventListener(
"mouseup",
()=>{

    mouseDown=false;

});


canvas.addEventListener(
"mousemove",
(e)=>{

    if(!drawing)return;
    if(!mouseDown)return;


    let rect=canvas.getBoundingClientRect();


    let x=e.clientX-rect.left;
    let y=e.clientY-rect.top;


    canvas.addEventListener(
"mousemove",
(e)=>{

    if(!drawing)return;
    if(!mouseDown)return;


    let rect=canvas.getBoundingClientRect();


    let x=e.clientX-rect.left;
    let y=e.clientY-rect.top;


    if(erasing){

        walls = walls.filter(w => {

            return !(
                x > w.x &&
                x < w.x+w.width &&
                y > w.y &&
                y < w.y+w.height
            );

        });

    }

    else{

        walls.push({

            x:x-5,
            y:y-5,
            width:10,
            height:10

        });

    }


    clearCanvas();

});


    clearCanvas();

});



// ===============================
// Buttons
// ===============================

eraseBtn.onclick=()=>{

    drawing=true;

    erasing=true;

    message.textContent=
    "Erase maze walls";

};

drawBtn.onclick=()=>{

    drawing=true;

    erasing=false;

    gameStarted=false;

    message.textContent=
    "Draw your maze!";

};



finishBtn.onclick=()=>{

    drawing=false;

    startGame();

};


restartBtn.onclick=()=>{

    resetGame();

};



// ===============================
// Start Game
// ===============================


function startGame(){

    gameStarted=true;

    message.textContent=
    "Fly the dragon to the treasure!";


    dragon.x=50;
    dragon.y=50;


    startTime=Date.now();


    timer=setInterval(()=>{

        let time=
        (Date.now()-startTime)/1000;

        timerText.textContent=
        time.toFixed(1);

    },100);

}



// ===============================
// Keyboard Movement
// ===============================


let keys={};


window.addEventListener(
"keydown",
(e)=>{

    keys[e.key]=true;

});


window.addEventListener(
"keyup",
(e)=>{

    keys[e.key]=false;

});



// ===============================
// Game Loop
// ===============================


function gameLoop(){

    if(gameStarted && !gameWon){

        moveDragon();

    }


    clearCanvas();


    requestAnimationFrame(gameLoop);

}


gameLoop();
clearCanvas();

// ===============================
// Maze Dragon - script.js Part 2
// ===============================


// ===============================
// Draw Dragon
// ===============================

function drawDragon(){

    // body

    ctx.fillStyle="green";

    ctx.beginPath();

    ctx.arc(
        dragon.x,
        dragon.y,
        dragon.size,
        0,
        Math.PI*2
    );

    ctx.fill();



    // wings

    ctx.fillStyle="darkgreen";


    ctx.beginPath();

    ctx.moveTo(
        dragon.x-20,
        dragon.y
    );

    ctx.lineTo(
        dragon.x-45,
        dragon.y-25
    );

    ctx.lineTo(
        dragon.x-10,
        dragon.y+10
    );

    ctx.fill();



    ctx.beginPath();

    ctx.moveTo(
        dragon.x+20,
        dragon.y
    );

    ctx.lineTo(
        dragon.x+45,
        dragon.y-25
    );

    ctx.lineTo(
        dragon.x+10,
        dragon.y+10
    );

    ctx.fill();



    // eyes

    ctx.fillStyle="yellow";


    ctx.beginPath();

    ctx.arc(
        dragon.x-8,
        dragon.y-8,
        5,
        0,
        Math.PI*2
    );

    ctx.fill();



    ctx.beginPath();

    ctx.arc(
        dragon.x+8,
        dragon.y-8,
        5,
        0,
        Math.PI*2
    );

    ctx.fill();



    // fire breath

    if(keys[" "] && gameStarted){

        ctx.fillStyle="orange";

        ctx.beginPath();

        ctx.moveTo(
            dragon.x+25,
            dragon.y
        );

        ctx.lineTo(
            dragon.x+80,
            dragon.y-15
        );

        ctx.lineTo(
            dragon.x+80,
            dragon.y+15
        );

        ctx.closePath();

        ctx.fill();

    }

}



// ===============================
// Draw Treasure
// ===============================


function drawTreasure(){

    ctx.fillStyle="gold";

    ctx.fillRect(
        treasure.x,
        treasure.y,
        treasure.size,
        treasure.size
    );


    ctx.fillStyle="#fff";

    ctx.fillRect(
        treasure.x+8,
        treasure.y+8,
        14,
        14
    );

}



// ===============================
// Draw Walls
// ===============================


function drawWalls(){

    ctx.fillStyle="#333";


    walls.forEach(w=>{

        ctx.fillRect(
            w.x,
            w.y,
            w.width,
            w.height
        );

    });

}



// ===============================
// Move Dragon
// ===============================


function moveDragon(){

    let oldX=dragon.x;
    let oldY=dragon.y;


    if(keys["ArrowUp"] || keys["w"]){

        dragon.y-=dragon.speed;

    }

    if(keys["ArrowDown"] || keys["s"]){

        dragon.y+=dragon.speed;

    }

    if(keys["ArrowLeft"] || keys["a"]){

        dragon.x-=dragon.speed;

    }

    if(keys["ArrowRight"] || keys["d"]){

        dragon.x+=dragon.speed;

    }



    // keep dragon inside canvas

    if(
        dragon.x<dragon.size ||
        dragon.x>canvas.width-dragon.size ||
        dragon.y<dragon.size ||
        dragon.y>canvas.height-dragon.size
    ){

        dragon.x=oldX;
        dragon.y=oldY;

    }



    // wall collision

    for(let wall of walls){

        if(circleRectCollision(
    dragon,
    wall
)){

    dragon.x=50;
    dragon.y=50;

    message.textContent=
    "ð¥ Hit a wall! Back to start!";

}
    }



    checkWin();

}



// ===============================
// Collision Detection
// ===============================


function circleRectCollision(circle,rect){

    let closestX=Math.max(
        rect.x,
        Math.min(
            circle.x,
            rect.x+rect.width
        )
    );


    let closestY=Math.max(
        rect.y,
        Math.min(
            circle.y,
            rect.y+rect.height
        )
    );


    let distanceX=
    circle.x-closestX;


    let distanceY=
    circle.y-closestY;


    let distance=
    Math.sqrt(
        distanceX*distanceX+
        distanceY*distanceY
    );


    return distance < circle.size;

}



// ===============================
// Win Check
// ===============================


function checkWin(){

    let distance=
    Math.sqrt(
        (dragon.x-treasure.x)**2+
        (dragon.y-treasure.y)**2
    );


    if(distance < dragon.size+treasure.size){

        gameWon=true;

        clearInterval(timer);


        message.textContent=
        "ð Dragon Victory!";


        setTimeout(()=>{

            alert(
            "ð¥ You found the treasure!"
            );

        },200);

    }

}

// ===============================
// Maze Dragon - script.js Part 3
// Final Upgrade
// ===============================


// Fire particles

let fireParticles = [];


// ===============================
// Animated Dragon Fire
// ===============================

function createFire(){

    if(!keys[" "] || !gameStarted)
        return;


    fireParticles.push({

        x:dragon.x+35,
        y:dragon.y,

        size:
        Math.random()*8+4,

        life:30

    });

}



function drawFire(){

    fireParticles.forEach((p,index)=>{


        ctx.fillStyle="orange";


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI*2
        );

        ctx.fill();


        p.x+=5;

        p.life--;


        if(p.life<=0){

            fireParticles.splice(
                index,
                1
            );

        }

    });

}



// ===============================
// Improved Game Loop
// ===============================

function enhancedLoop(){

    createFire();

    drawFire();


    requestAnimationFrame(
        enhancedLoop
    );

}


enhancedLoop();



// ===============================
// Random Treasure
// ===============================

function randomTreasure(){

    let padding = 60;

    treasure.x =
    Math.floor(
        Math.random() *
        (canvas.width - treasure.size - padding)
    ) + padding;


    treasure.y =
    Math.floor(
        Math.random() *
        (canvas.height - treasure.size - padding)
    ) + padding;

}



// ===============================
// Better Restart
// ===============================

function resetGame(){

    clearInterval(timer);


    walls=[];

    drawing=true;

    gameStarted=false;

    gameWon=false;


    timerText.textContent="0.0";


    message.textContent=
    "Draw your maze!";


    dragon.x=50;
    dragon.y=50;


    fireParticles=[];


    randomTreasure();


    clearCanvas();

}



// ===============================
// Victory Screen
// ===============================

function showVictory(){

    let screen=
    document.createElement("div");


    screen.id="winScreen";


    screen.innerHTML=`

        <h2>ð Victory!</h2>

        <p>
        The dragon found the treasure!
        </p>

        <button>
        Create New Maze
        </button>

    `;


    document.body.appendChild(screen);


    screen.style.display="flex";


    screen.querySelector("button")
    .onclick=()=>{

        screen.remove();

        resetGame();

    };

}



// Replace old win behavior

let oldCheckWin=checkWin;


checkWin=function(){

    let distance=
    Math.sqrt(
        (dragon.x-treasure.x)**2+
        (dragon.y-treasure.y)**2
    );


    if(distance < dragon.size+treasure.size){

        gameWon=true;


        clearInterval(timer);


        message.textContent=
        "ð Dragon Victory!";


        showVictory();

    }

};



// Start with random treasure

randomTreasure();

clearCanvas();