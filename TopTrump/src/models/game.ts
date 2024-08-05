export class Game {
  id;
  players = [];
  activePlayer:any;
  playerCards:any;


  constructor(obj?:any) {
    this.players = obj ? obj.players : '';
    this.activePlayer = obj ? obj.activePlayer : "";
    this.id= obj ? obj.customIdName:"";
    this.playerCards=obj? obj.playerCards:"";
  }

  public toJSON() {
    return {
      players: this.players,
      activePlayer: this.activePlayer,
      playerCards:this.playerCards
    };
  }
 

  }



