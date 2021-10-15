function bestmove() {
  let prob = Math.random();
  let x;
  let y;
  let bestscore;
  //console.log(winp);
  
  if (prob <= winp)
    {
    bestscore = Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minmax(board, 0, true, human);
                board[i][j] = '';
              //console.log(score);
                if (score < bestscore) {
                    bestscore = score;
                    x =i;
                    y=j;
                }
            }
        }
    }
    }
      else
        {
          bestscore = -Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minmax(board, 0, false, human);
                board[i][j] = '';
                if (score > bestscore) {
                    bestscore = score;
                    x =i;
                    y=j;
                }
            }
        }
        }
    }
    board[x][y] = ai;
    currentplayer = human;
}

//let points = { 'X': 500, 'O': -500, 'draw': 0 };

function minmax(board, depth, maxm, player) {
    let result = checkwinner();
    if (result != null) {
        return (points[result]/(depth+1));
    }

    if (maxm == true) {
        let bestscore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = player;
                  if (player == 'X') { player='O';}
                  else {player = 'X';}
                    let score = minmax(board, depth + 1, false, player);
                    bestscore = Math.max(score, bestscore);
                    board[i][j] = '';
                }
            }
        }
        return bestscore;
    } else {
        let bestscore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = player;
                  if (player == 'X') { player='O';}
                  else {player = 'X';}
                    let score = minmax(board, depth + 1, true, player);
                bestscore = Math.min(score, bestscore);
                    board[i][j] = '';
                }
            }
        }
        return bestscore;
    }
}