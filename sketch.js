let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let w;
let h;
let human;
let ai;
let currentplayer;
let points;



if (ply == 'player2') {
    human = 'O';
    ai = 'X';
    points = { 'X': -500, 'O': 500, 'draw': 0 };
    currentplayer = ai;
    bestmove();
} else {
    human = 'X';
    ai = 'O';
    points = { 'X': 500, 'O': -500, 'draw': 0 };
    currentplayer = human;
}

function setup() {
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;

}

function checkwinner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '') {
            winner = board[i][0];
            return winner;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '') {
            winner = board[0][i];
            return winner;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
        winner = board[0][0];
        return winner;
    }

    if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != '') {
        winner = board[1][1];
        return winner;
    }

    let left = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                left++;
            }
        }
    }

    if (left == 0 && winner == null) {
        return 'draw';
    } else {
        return winner;
    }
}

function mousePressed() {
    if (currentplayer == human) {
        let j = floor(mouseX / w);
        let i = floor(mouseY / h);
        console.log(i);
        console.log(j);
        if (board[i][j] === '') {
            board[i][j] = human;
            currentplayer = ai;
            let result = checkwinner();
            if (result == null) {
                bestmove();
            }
        }
    }

}

function draw() {

    background(220);
    strokeWeight(4);


    line(w, 0, w, height)
    line(2 * w, 0, 2 * w, height)
    line(0, h, width, h)
    line(0, 2 * h, width, 2 * h)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = j * w + w / 2;
            let y = i * h + h / 2;
            let spot = board[i][j];
            textSize(32);
            if (spot == 'X') {
                line(x - w / 4, y - h / 4, x + w / 4, y + w / 4);
                line(x + w / 4, y - h / 4, x - w / 4, y + h / 4);
            } else if (spot == 'O') {
                ellipse(x, y, w / 2);
                noFill();
            }
        }
    }
    let result = checkwinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'draw') {
            resultP.html('Draw!');
        } else {
            resultP.html(`${result} wins!`);
        }
    }
}