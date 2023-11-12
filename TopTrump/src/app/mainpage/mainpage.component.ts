import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent{
  constructor(){

  }
  cards=[{"name":"1","subname":"Der Dicke","Kraft":"1","Faehigkeit":"2","Groesse":"3","List":"4","Vertrauen":"5","png":"./assets/imgs/pinky.png"},{"name":"2","subname":"Der Göttervater","Kraft":"6","Faehigkeit":"7","Groesse":"8","List":"9","Vertrauen":"10","png":"./assets/imgs/dragy.png"},{"name":"3","subname":"Der Beständige","Kraft":"11","Faehigkeit":"12","Groesse":"13","List":"14","Vertrauen":"15","png":"./assets/imgs/greeny.png"},{"name":"4","subname":"Der Neue","Kraft":"16","Faehigkeit":"17","Groesse":"18","List":"19","Vertrauen":"20","png":"./assets/imgs/yelli.png"}]
  cards_1:any=[];
  cards_2:any=[];
  open2=false;
  open1=false;
  winner="";
  active=true;
  keys=["Kraft","Faehigkeit","Groesse","List","Vertrauen"];
  pcChoice="";
  infoText="Starte Spiel - oben links";
  PCIsactive=false;
  move=false;
  cardview=0;



  startGame(){
    this.mixCards();
    this.open1=true;
    this.open2=false;
    this.winner="";
    this.active=true;
    this.infoText="Waehle die Eigenschaft Deiner (linken) Karte, mit der Du vergleichen möchtest.."
  }

  mixCards(){
    this.cards_1=[];
    this.cards_2=[]
    this.cards.sort(() => Math.random() - 0.5);
    console.log(this.cards_1)
    for (let i=0;i<this.cards.length;i++){

      if(i%2==0 || i==0){
        this.cards_1.push(this.cards[i])

      }else{
        this.cards_2.push(this.cards[i])
      }

    }
    console.log("Ich habe "+this.cards_1.length +" Karten")
  }


log(skill:any){
  if(this.active){
  this.active=false;
  this.open2=true
  this.checkCards(skill)
  }
}

checkCards(skill:string){
  //this.showPcCard();
  if(!this.PCIsactive){
  this.infoText="Du hast "+ skill + this.cards_1[0][skill]+" gewählt. Der PC hat hier"+ this.cards_2[0][skill]+"."
  }else{
  this.infoText="Der PC kat "+ skill + this.cards_2[0][skill]+" gewählt. Du hast hier"+ this.cards_1[0][skill]+"."
  }
  if (Number(this.cards_1[0][skill])>Number(this.cards_2[0][skill])){

    //TextINFO!!!
    this.infoText+=this.cards_1[0][skill]+" ist grösser "+this.cards_2[0][skill]
    this.PCIsactive=false;
    this.open2=true;

    this.active=true;
    this.move=true;

    //this.moveCards(this.cards_1,this.cards_2)



    this.infoText+="Du hast gestochen";
    this.pcChoice="";
    this.checkWinner();
  }else{
    this.open2=true;
    this.infoText+=this.cards_2[0][skill]+" ist grösser "+this.cards_1[0][skill]
    //this.moveCards(this.cards_2,this.cards_1)

    this.move=true;
    this.active=false;
    console.log("Ich habe "+this.cards_1.length +" Karten und bin nicht dran")
    this.infoText+="Der PC hast gestochen";

    this.pcChoice="";
    if(!this.checkWinner()){
    this.PCIsactive=true;
    //this.computerTurn()
  }
  }



}


moveCards(winner:any,loser:any){

  winner.push(loser[0]);
  loser.shift();
  winner.push(winner[0]);
  winner.shift();
  this.open2=false;
  this.move=false;
  this.infoText="";
  this.checkWinner();
}

checkWinner(){
  if(this.cards_2.length==0){
    this.winner="Du hast"
    return true;
  }
  if(this.cards_1.length==0){
    this.winner="Der Computer hat"
    return true;
  }
  return false;
}

computerTurn(){
  this.PCIsactive=true;
  let i=Math.floor(Math.random()*this.keys.length);
  this.pcChoice=this.keys[i];
  console.log("Der PC wählt:"+this.pcChoice)
  this.infoText="Der PC wählt:"+this.pcChoice
  //this.checkCards(this.pcChoice);

}

showPcCard(){
  this.open2=true;
  setTimeout(()=>this.open2=false,5000)
}

PCactive(){

  this.checkCards(this.pcChoice);

}

toggleCardview(){
  if(this.cardview==0){
    this.cardview=1
  }else{
    this.cardview=0
  }
}

}
