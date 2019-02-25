export default class VirtualPlayer
{
    static instance;
    static getInstance(){
        return VirtualPlayer.instance;
    }

    constructor(board){          
        this.board = board;
        VirtualPlayer.instance = this;
    }

    analyze(){

        let myMove = 0;
        for(let key in this.board.winningCombinations){

            let userMoveCount = 0;
            let passMoveCount = 0;
            let myMoveIndex = Array();

            for(let index in this.board.winningCombinations[key]){
                let boxIndex = this.board.winningCombinations[key][index]-1;

                if(this.board.boxes[boxIndex].value==0)
                    myMoveIndex.push(boxIndex);
                else if(this.board.boxes[boxIndex].value==1)
                    userMoveCount++;
                else if(this.board.boxes[boxIndex].value==2)
                    passMoveCount++;
            }  
            myMove = myMoveIndex[0];

            if(userMoveCount==0 && passMoveCount==2){  // offense
                break;
            }else if(userMoveCount==2 && passMoveCount==0){  // defense
                break;
            }else if(userMoveCount==3){
                break;
            }else if(passMoveCount==3){
                break;
            }       
        }
        return this.board.boxes[myMove];
    }

    myMoveAgainst(){
        let box = this.analyze();
        
        if(typeof box !== "undefined"){
            box.disableDivTag();
            box.value=2;
            box.div.innerHTML="O";
        }else{
            for(let key in this.board.boxes){
                if(this.board.boxes[key].value==0){
                    this.board.boxes[key].disableDivTag(); 
                    this.board.boxes[key].value = 2; 
                    this.board.boxes[key].div.innerHTML="O";
                    break;
                }
            }
        }

        if(this.board.checkWinner()){
            this.board.endGame();
        }
    }
}