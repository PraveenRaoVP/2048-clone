document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');

    const width = 4;
    let squares = [];
    let score = 0;

    let colors = ['gray','blue', 'blue', 'blue', 'red', 'red', 'yellow', 'yellow', 'yellow', 'yellow', 'green'];

    // 2,4,8,16,32,64,128,256,512,1024,2048


    //create board
    const createBoard = () => {
        for(let i=0;i<width*width;i++) {
            let square = document.createElement('div');
            square.innerHTML = 0;
            if(square.innerHTML===0){
                square.classList.add("display-none"); 
            }
            gridDisplay.appendChild(square);
            squares.push(square)
        }
        generateNumber();
        generateNumber();
    }

    
    const checkWin = () => {
        for(let i=0;i<squares.length; i++ ){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Won!';
                document.removeEventListener('keyup', controls);
            }
        }
    }

    const checkLose = () => {
        let countZeroes = 0;
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 0){
                countZeroes++;
            }
        }

        if(countZeroes === 0){
            resultDisplay.innerHTML = "You Lost :-(";
            document.removeEventListener('keyup', controls); 
        }
    }


    //move right
    const swipeRight = () => {
        for(let i=0;i<width*width;i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num)
                let missing = 4-filteredRow.length;

                let zeroes = Array(missing).fill(0);
                let newRow = zeroes.concat(filteredRow)

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];


            }   
        }
    }

    //move left
    const swipeLeft = () => {
        for(let i=0;i<width*width;i++) {
            if(i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num)
                let missing = 4-filteredRow.length;

                let zeroes = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeroes);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];


            }   
        }
    }

    // move down
    const swipeDown = () => {
        for(let i=0;i<width;i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalFour = squares[i+(width*3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            const filteredColumn = column.filter(num => num);
            let missing = 4-filteredColumn.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = zeroes.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+width*2].innerHTML = newColumn[2];
            squares[i+width*3].innerHTML = newColumn[3];

        }
    }
    
    // move up
    const swipeUp = () => {
        for(let i=0;i<width;i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalFour = squares[i+(width*3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            const filteredColumn = column.filter(num => num);
            let missing = 4-filteredColumn.length;
            let zeroes = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeroes);

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+width*2].innerHTML = newColumn[2];
            squares[i+width*3].innerHTML = newColumn[3];

        }
    }


    const generateNumber = () => {
        //try{
        let randomNumber = Math.floor(Math.random() * squares.length);
        // console.log(randomNumber);
        if(squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML = 2;
            checkLose();
        } else generateNumber()
    /*} catch(RangeError){
        resultDisplay.innerHTML = "You lost!";
        document.removeEventListener('keyup', controls) 
    }*/
    }

    //add row values
    const combineRow = () => {
        for(let i=0;i<(width*width)-1; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].
                innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;
                score+=combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }

    //TODO: review code
    // add column values
    const combineColumn = () => {
        for(let i=0;i<(width*width)-width; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                 let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].
                innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;
                score+=combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }

    // assign keys

    const controls = (e) => {
        if(e.keyCode === 39){
            keyRight();
        } else if(e.keyCode === 37){
            keyLeft();
        } else if(e.keyCode === 38){
            keyUp();
        } else if(e.keyCode === 40){
            keyDown();
        }
    }

    document.addEventListener('keyup', controls);

    // when we press right key
    const keyRight = () => {
        swipeRight();
        combineRow();
        swipeRight();
        generateNumber();
    }

    // when we press left key
    const keyLeft = () => {
        swipeLeft();
        combineRow();
        swipeLeft();
        generateNumber();
    }

    //when we press down key
    const keyDown = () => {
        swipeDown();
        combineColumn();
        swipeDown();
        generateNumber();
    }

    const keyUp = () => {
        swipeUp();
        combineColumn();
        swipeUp();
        generateNumber();
    }

    createBoard();

    
    

})
