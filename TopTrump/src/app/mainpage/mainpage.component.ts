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

  cards=[{"name":"Herkules","subname":"Der Starke","Kraft":"120","Fähigkeit":"50","Grösse":"122","List":"7","Vertrauen":"10"},{"name":"Zeus","subname":"Der Göttervater","Kraft":"110","Fähigkeit":"60","Grösse":"112","List":"10","Vertrauen":"25"},{"name":"Hera","subname":"Der Beständige","Kraft":"30","Fähigkeit":"20","Grösse":"77","List":"6","Vertrauen":"54"},{"name":"Neu","subname":"Der Neue","Kraft":"120","Fähigkeit":"50","Grösse":"122","List":"7","Vertrauen":"10"}]
  cards_1:any=[];
  cards_2:any=[];
  open2=false;
  open1=false;
  winner="";
  active=true;
  keys=["Kraft","Fähigkeit","Grösse","List","Vertrauen"];
  pcChoice="";

  startGame(){
    this.mixCards();
    this.open1=true;
    this.open2=false;
    this.winner="";
    this.active=true;
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
  console.log("Geprüfter Skill:"+skill)
  console.log(this.cards_2[0])
  this.showPcCard()
  if (this.cards_1[0][skill]>this.cards_2[0][skill]){
    console.log(this.cards_1.length)
    this.cards_2.shift();
    this.cards_1.push(this.cards_2[0]);
    this.cards_1.push(this.cards_1[0]);
    this.cards_1.shift();
    this.open2=false;
    this.active=true;
    console.log("Ich habe "+this.cards_1.length +" Karten")
    this.pcChoice=""
    this.checkWinner()
  }else{
    this.cards_1.shift();
    this.cards_2.push(this.cards_2[0]);
    this.cards_2.push(this.cards_1[0]);
    this.cards_2.shift();
    this.open2=true;
    this.active=false;
    console.log("Ich habe "+this.cards_1.length +" Karten und bin nicht dran")
    this.pcChoice="";
    if(!this.checkWinner()){
    this.computerTurn()}
  }



}

checkWinner(){
  if(this.cards_1.length==0){
    this.winner="Du hast"
    return true;
  }
  if(this.cards_2.length==0){
    this.winner="Der Computer hat"
    return true;
  }
  return false;
}

computerTurn(){
  let i=Math.floor(Math.random()*this.keys.length);
  this.pcChoice=this.keys[i];
  console.log("Der PC wählt:"+this.pcChoice)
  this.checkCards(this.pcChoice);

}

showPcCard(){
  this.open2=true;
  setTimeout(()=>this.open2=false,2000)
}



}
