import Board from "./Board.js";
import VirtualPlayer from "./VirtualPlayer.js";


let ids = [
    "box1", "box2", "box3",
    "box4", "box5", "box6",
    "box7", "box8", "box9",
];

let messageId = "message";
let resetId = "reset";

let board = new Board(ids, messageId, resetId);
let player = new VirtualPlayer(board);

