const grid = document.querySelector('.grid');

const resultsDisplay = document.querySelector('#results');
let width = 15;
let results = 0;
let direction = 1;

let goingRight = true;

let aliensRemoved = [];
let invadersId;
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

let currentShooterIndex = 200;

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader');
        }
    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

draw();

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');
    let handled;
    if (e.key !== undefined) {
        switch(e.key) {
            case 'ArrowLeft':
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break;
        }
        squares[currentShooterIndex].classList.add('shooter');
        handled = true;
    } else if (e.keyCode !== undefined) {
        switch(e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;
            case 39:
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break;
        }
        squares[currentShooterIndex].classList.add('shooter');
        handled = true;
    }
    if (handled) {
        e.preventDefault();
    }
    
}

document.addEventListener('keyup', moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] +=  width + 1;
            direction = -1;
            goingRight = false;
        }
    } else if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    draw();

    if (squares[currentShooterIndex].classList.contains('invader') && squares[currentShooterIndex].classList.contains('shooter')) {
        clearInterval(invadersId);
        resultsDisplay.innerHTML = 'GameOver';
    }

    for (let i = squares.length - 1; i > 210; i--) {
        if (squares[i].classList.contains('invader')) {
            clearInterval(invadersId);
            resultsDisplay.innerHTML = 'GameOver';
        }
    }
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'You WIN!';
        clearInterval(invadersId);
    }
}

invadersId = setInterval(moveInvaders, 500);

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => {
                squares[currentLaserIndex].classList.remove('boom');
            }, 300);
            clearInterval(laserId);

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results += 1
            resultsDisplay.innerHTML = results;
            }
        }
        if (e.key !== undefined) {
            switch (e.key) {
                case 'ArrowUp':
                    laserId = setInterval(moveLaser, 100);
                    break;
            }
            handled = true;
        } else if (e.keyCode !== undefined) {
            switch (e.keyCode) {
                case 38:
                    laserId = setInterval(moveLaser, 100);
                    break;
            }
            handled = true;
        }
        if (handled) {
            e.preventDefault();
        }
}

document.addEventListener('keyup', shoot);