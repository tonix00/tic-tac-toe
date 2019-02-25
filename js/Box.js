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
        
        this.div.innerHTML="X";
        this.disableDivTag(); 
        this.value =1;
        
        let board = Board.getInstance();
        let hasWinner = board.checkWinner();

        if(hasWinner==0){
            let player = VirtualPlayer.getInstance();
            player.myMoveAgainst();
        }
    }

    disableDivTag(){
        this.div.style.pointerEvents = "none";
    }
}