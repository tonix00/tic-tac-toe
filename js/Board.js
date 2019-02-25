import Box from "./Box.js";

export default class Board
{    
    static instance;
    static getInstance(){
        return Board.instance;
    }

    constructor(boxIDs,messageId,resetId){
        this.boxes = Array();
        for(let boxId in boxIDs){
            let box = new Box(boxIDs[boxId]);
            this.boxes.push(box);
        }
        this.winningCombinations =[
            [1,2,3],[4,5,6],[7,8,9],
            [1,4,7],[2,5,8],[3,6,9],
            [1,5,9],[3,5,7]
        ];
       
        this.msg = document.getElementById(messageId);
        this.button = document.getElementById(resetId);
        this.button.addEventListener('click',this.playAgain.bind(this));

        Board.instance = this;
    }

    checkWinner(){
        let hasWinner = 0;
        this.message("Nice one!");
        for(let key in this.winningCombinations){
            let userMoveCount = 0;
            let passMoveCount = 0; 
            for(let index in this.winningCombinations[key]){
                let boxIndex = this.winningCombinations[key][index]-1;

                if(this.boxes[boxIndex].value==1)
                    userMoveCount++;
                else if(this.boxes[boxIndex].value==2)
                    passMoveCount++;
            }  
            if(userMoveCount==3){
                this.message("<span id='win'>You win! Congratulation.</span>");
                this.endGame();
                hasWinner = 1;
                break;
            }else if(passMoveCount==3){
                this.message("<span id='loss'>You lose! Try again.</span>");
                this.endGame();
                hasWinner = 1;
                break;
            }
        }

        if(hasWinner){
            return hasWinner;
        }
        else if(this.isDraw()==1){
            this.message("It's a draw. Play again...");
            return 2;
        }else{
            return 0;
        }
    }

    message(text){
        this.msg.innerHTML = text;
    }

    endGame(){
        for(let key in this.boxes){
            if(this.boxes[key].value==0)
                this.boxes[key].div.style.pointerEvents = "none";
        }
    }

    playAgain(){
        
        for(let key in this.boxes){
            this.boxes[key].value=0;
            this.boxes[key].div.style.pointerEvents = "auto";
            this.boxes[key].div.innerHTML = "";
            this.boxes[key].div.classList.remove("mystyle");
        }
        this.message("Let's start. You go first.");
    }

    isDraw(){
        let draw = 1;
        for(let key in this.boxes){
            if(this.boxes[key].value==0){
                draw = 0;
                break;
            }
        }
        return draw;
    }
    
}