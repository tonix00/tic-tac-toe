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

        let moveIndex = -1;

        //offense move
        moveIndex = this.analyze_detail(1,2);
        if(moveIndex >=0 )
            return this.board.boxes[moveIndex];
        
        //defense move
        moveIndex = this.analyze_detail(2,1);
        if(moveIndex >=0 )
            return this.board.boxes[moveIndex];

        // if center box taken?
        if(this.board.boxes[4].value==0)
            return this.board.boxes[4];
        
        
        // just get blank div
        for(let key in this.board.boxes){
            if(this.board.boxes[key].value==0){
                return this.board.boxes[key];
            }
        }
    }

    analyze_detail(counterMove,move){

        let moveIndex = -1;

        for(let key in this.board.winningCombinations){
            
            let moveCount = 0;
            let counterMoveCount = 0;
            let cleanSlotIndex = -1;

            for(let index in this.board.winningCombinations[key]){

                let boxIndex = this.board.winningCombinations[key][index]-1;

                if(this.board.boxes[boxIndex].value==move)
                    moveCount++;
                if(this.board.boxes[boxIndex].value==counterMove)
                    counterMoveCount++;
                if(this.board.boxes[boxIndex].value==0)
                    cleanSlotIndex = boxIndex;
                
            }  
            
            if(moveCount==2 && counterMoveCount==0){
                moveIndex = cleanSlotIndex;
                break;
            } 
        }
        return moveIndex;
    }

    myMoveAgainst(){
        let box = this.analyze();
        
        box.disableDivTag();
        box.value=2;

        setTimeout(function(){
            box.div.innerHTML="O";
            box.div.classList.add("mystyle");
        }, 300);
       
        if(this.board.checkWinner()){
            this.board.endGame();
        }
    }
}