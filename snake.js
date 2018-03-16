player = {};

game = {
    cellSize: 20,
    fillSize: 18,
    width: 40,
    height: 30,
    score: 0
}

fruit = {
    color:'red',
     x: 10,
     y: 10
}

cnv.width = game.width * game.cellSize;
cnv.height = game.height * game.cellSize;
ctx = cnv.getContext('2d');

tail = [];
snakeLength = 3;

function draw() {
    let direction = player.directionQueue.shift();
    if (direction == 'ArrowDown' && player.yDir != -1) {
        player.yDir = 1;
        player.xDir = 0;
    } else if (direction == 'ArrowUp'  && player.yDir != 1) {
        player.xDir = 0;
        player.yDir = -1;
    } else if (direction == "ArrowLeft" && player.xDir != 1) {
        player.xDir = -1;
        player.yDir = 0;
    } else if (direction == "ArrowRight" && player.xDir != -1) {
        player.xDir = 1;
        player.yDir = 0;
    }

    tail.push({x: player.x, y: player.y, color: 'green'});
    tail = tail.slice(-snakeLength);

    player.x = player.x + player.xDir;
    player.y = player.y + player.yDir;

    if (
        player.y < 0 
        || player.y >= game.height
        || player.x < 0 
        || player.x >= game.width
        || touchingTail()
    ) {
        gameOver()
    } else {
        if (player.x == fruit.x && player.y == fruit.y) {
            makeFruit();
        }

        ctx.clearRect(0,0,cnv.width,cnv.height);
        drawObject(player);
        tail.forEach(drawObject);
        drawObject(fruit);
    }
}

function touchingTail() {
    touching = tail.filter(function(piece) { return piece.x == player.x && piece.y == player.y });
    return touching.length > 0;
}

function makeFruit() {
    snakeLength += 3;
    fruit.x = getRandom(game.width);
    fruit.y = getRandom(game.height);
    game.score++;
    drawScore();
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function gameOver() {
    clearInterval(interval);
}

function keyHandler(e) {
    player.directionQueue.push(e.key)
}

function drawObject(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x * game.cellSize, obj.y * game.cellSize, game.fillSize, game.fillSize)
}

onkeydown = keyHandler;

function drawScore() {
    score.innerText = "Score: " + game.score;
}

function gameStart() {
    interval = setInterval(draw, 100);
    tail = [];
    snakeLength = 3;
    game.score = 0;
    player = {
        color:"green",
        x: 20,
        y: 20,
        xDir: 1,
        yDir: 0,
        directionQueue: []
    }
    drawScore();
}