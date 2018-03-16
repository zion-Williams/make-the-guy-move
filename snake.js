player = {
    x: 20,
    y: 20,
    xDir: 1,
    yDir: 0
}

game = {
    cellSize: 20,
    fillSize: 18,
    width: 40,
    height: 30
}

fruit = {
     x: 40,
     y: 40
}

cnv.width = game.width * game.cellSize;
cnv.height = game.height * game.cellSize;
ctx = cnv.getContext('2d');

tail = [];
snakeLength = 3;

function draw() {
    tail.push({x: player.x, y: player.y});
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
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function gameOver() {
    clearInterval(interval);
    alert('Game Over!')
}

function keyHandler(e) {
    if (e.key == 'ArrowDown') {
        player.yDir = 1;
        player.xDir = 0;
    } else if (e.key == 'ArrowUp') {
        player.xDir = 0;
        player.yDir = -1;
    } else if (e.key == "ArrowLeft") {
        player.xDir = -1
        player.yDir = 0;
    } else if (e.key == "ArrowRight") {
        player.xDir = 1
        player.yDir = 0;
    }
}

function drawObject(obj) {
    ctx.fillRect(obj.x * game.cellSize, obj.y * game.cellSize, game.fillSize, game.fillSize)
}

makeFruit();
interval = setInterval(draw, 65);
onkeydown = keyHandler;
