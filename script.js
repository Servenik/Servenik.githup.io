const board = document.getElementById("game-board");
const instrText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
var audio = new Audio(" mixkit-hip-hop-02-738.mp3")
let snake = [{
    x: 10,
    y: 10,
}];
let isGameStart = false;
let gameSpeed = 200;
let gridSize = 20;
let food = generateFood();
let wall = generateWall();
let Well = generateWell();
let direction = "left";
let highScore = 0;
let gameIntervalId;


function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore()
    drawWall()
    drawWell()
    audio.play();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement)

    });
}

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    // console.log(position.x);
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    if (isGameStart) {
        let foodElement = createElement("div", "food");
        setPosition(foodElement, food);
        board.appendChild(foodElement)
    }


}

function drawWall() {
    const currentScore = snake.length - 1;
    if (currentScore >=5 ) {
        let wallElement = createElement("div", "wall");
        setPosition(wallElement, wall);
        board.appendChild(wallElement)
    }


}

function drawWell() {
    const currentScore = snake.length - 1;
    if (currentScore >=10 ) {
        let wellElement = createElement("div", "Well");
        setPosition(wellElement, Well);
        board.appendChild(wellElement)
    }


}
function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function move() {
    let head = { ...snake[0] }
    console.log(snake);
    switch (direction) {
        case "up":
            head.y--
            break;
        case "down":
            head.y++
            break;
        case "left":
            head.x--
            break;
        case "right":
            head.x++
            break;
    }
    snake.unshift(head);
    // snake.pop();
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameIntervalId)
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeed);
    } else {
        snake.pop();
    }
}

document.addEventListener("keydown", handKeyPress);

function handKeyPress(event) {
    // console.log(event);
    if ((!isGameStart && event.code === "Space") ||
        (!isGameStart && event.key === " ")) {
        startGame();
    } else {
        switch (event.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down"
                break;
            case "ArrowLeft":
                direction = "left"
                break;
            case "ArrowRight":
                direction = "right"
                break;

        }
    }
}

function startGame() {
    isGameStart = true;

    logo.style.display = "none";
    instrText.style.display = "none"
    // drawWall()
    gameIntervalId = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeed);
 
}


function checkCollision() {

    let head = { ...snake[0] };

    if (head.x > gridSize || head.x < 1 || head.y > gridSize || head.y < 1) {
        resetGame();
    }
    if (head.x === wall.x && head.y === wall.y) {
        resetGame();
    }
    if (head.x === Well.x && head.y === Well.y) {
        resetGame();
    }
 

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            break;

        }

    }



}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeed = 200;
    updateScore()

}

function stopGame() {
    clearInterval(gameIntervalId);
    isGameStart = false;

    logo.style.display = "block";
    instrText.style.display = "block";

}


function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");

}


function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    changeSpeed(score)


    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}




function changeSpeed(score) {
    if (score >= 5 && gameSpeed === 200) {
        gameSpeed -= 10;
    }
    if (score >= 5 && gameSpeed === 190) {
        gameSpeed -= 10;
    }
    if (score >= 5 && gameSpeed === 180) {
        gameSpeed -= 10;
    }
    if (score >= 5 && gameSpeed === 170) {
        gameSpeed -= 10;
    }
    if (score >= 5 && gameSpeed === 160) {
        gameSpeed -= 10;
    }
    if (score >= 5 && gameSpeed === 150) {
        gameSpeed -= 10;
    }
    if (score >= 5 && gameSpeed === 140) {
        gameSpeed -= 10;
    }

}


function generateWall() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function generateWell() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

