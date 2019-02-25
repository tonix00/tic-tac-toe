import VirtualPlayer from "./VirtualPlayer.js";
import Board from "./Board.js";

export default class Box
{
    value = 0;
    constructor(id){
        this.div = document.getElementById(id);
        this.div.addEventListener('click',this.userMove.bind(this));
    }

    userMove(){    
        
        // apply user move
        this.div.innerHTML="x";
        this.disableDivTag(); 
        this.value =1;
        
        // get the board 
        let board = Board.getInstance();
        let hasWinner = board.checkWinner();

        // 0 means no winner yet
        if(hasWinner==0){
            let player = VirtualPlayer.getInstance();
            player.myMoveAgainst();
        }
    }

    disableDivTag(){
        this.div.style.pointerEvents = "none";
    }
}