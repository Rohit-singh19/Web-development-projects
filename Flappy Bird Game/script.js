document.addEventListener('DOMContentLoaded', ()=> {
    const bird = document.querySelector('.bird');
    const display = document.querySelector('.game-container');
    const land = document.querySelector('.land');

    let birdBottom = 250;
    let birdLeft = 200;
    let gravity = 4;
    let gameOverIndicator = false;

    function startGame(){
        birdBottom -= gravity;
        bird.style.left = birdLeft +'px';
        bird.style.bottom = birdBottom +'px';

        if(birdBottom < 0 ){
            gameOverIndicator = true;
            gameOver();
        }

        bird.classList.add('down');
        bird.classList.remove('up');
    }

    let gameTimer = setInterval(startGame, 20);

    function pressButton(e){
        if(e.keyCode === 32){
            jump();
        }
    }

    function jump(){
        birdBottom += 50;
        bird.style.bottom = birdBottom +'px';
        bird.classList.add('up');
        bird.classList.remove('down');
    }

    document.addEventListener('keyup',pressButton);

    function makeObstacles(){
        let ostacleLeft = 500;
        
        let randomHeight = Math.random()*70;
        
        let obstacleBottom = randomHeight;
        let topObstacleBottom = obstacleBottom +450;

        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        
        if(!gameOverIndicator){
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('top-obstacle');
        }

        display.appendChild(obstacle);
        display.appendChild(topObstacle);

        obstacle.style.left = ostacleLeft +'px';
        topObstacle.style.left = ostacleLeft +'px';
        
        obstacle.style.bottom = obstacleBottom +'px';
        topObstacle.style.bottom = topObstacleBottom +'px';

        function moveObstacle(){
            ostacleLeft -= 2;

            obstacle.style.left = ostacleLeft +'px';
            topObstacle.style.left = ostacleLeft +'px';


            if(ostacleLeft === -60){
                clearInterval(obstacleMoveTimer);
                display.removeChild(obstacle);
                display.removeChild(topObstacle);
            }

            if(
                ostacleLeft > 200 && ostacleLeft <260 && birdLeft === 200 &&
                (birdBottom < obstacleBottom +150 || birdBottom >obstacleBottom + 450 - 210)||birdBottom === 0
            ){
                gameOverIndicator = true;
                gameOver();
                clearInterval(obstacleMoveTimer);
            }
        }
        let obstacleMoveTimer = setInterval(moveObstacle,20);
        if(!gameOverIndicator) setTimeout(makeObstacles,3000);
    }

    makeObstacles();

    function gameOver(){
        clearInterval(gameTimer);
        gameOverIndicator = true;
        document.removeEventListener('keyup', pressButton);
    }
  
});
