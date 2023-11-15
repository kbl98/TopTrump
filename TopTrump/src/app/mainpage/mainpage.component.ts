import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MycardsComponent } from '../mycards/mycards.component';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent {
  constructor(public dialog: MatDialog) {}
  cards = [
    {
      name: '1',
      subname: 'Der Dicke',
      Kraft: '1',
      Faehigkeit: '2',
      Groesse: '3',
      List: '4',
      Vertrauen: '5',
      png: './assets/imgs/pinky.png',
    },
    {
      name: '2',
      subname: 'Der Göttervater',
      Kraft: '2',
      Faehigkeit: '7',
      Groesse: '8',
      List: '9',
      Vertrauen: '10',
      png: './assets/imgs/dragy.png',
    },
    {
      name: '3',
      subname: 'Der Beständige',
      Kraft: '1',
      Faehigkeit: '7',
      Groesse: '13',
      List: '14',
      Vertrauen: '15',
      png: './assets/imgs/greeny.png',
    },
    {
      name: '4',
      subname: 'Der Neue',
      Kraft: '1',
      Faehigkeit: '17',
      Groesse: '18',
      List: '19',
      Vertrauen: '20',
      png: './assets/imgs/yelli.png',
    },
    {
      name: '1',
      subname: 'Der Dicke',
      Kraft: '3',
      Faehigkeit: '6',
      Groesse: '11',
      List: '0',
      Vertrauen: '30',
      png: './assets/imgs/reh.png',
    },
    {
      name: '1',
      subname: 'Der Dicke',
      Kraft: '5',
      Faehigkeit: '12',
      Groesse: '8',
      List: '5',
      Vertrauen: '25',
      png: './assets/imgs/wildy.png',
    },
  ];
  cards_1: any = [];
  cards_2: any = [];
  open2 = false;
  open1 = false;
  winner = '';
  active = true;
  keys = ['Kraft', 'Faehigkeit', 'Groesse', 'List', 'Vertrauen'];
  pcChoice = '';
  infoText = 'Starte Spiel - oben links';
  PCIsactive = false;
  move = false;
  equalCards: any = [];
  equal = false;
  cardview: any = false;

  startGame() {
    this.mixCards();
    this.open1 = true;
    this.open2 = false;
    this.winner = '';
    this.active = true;
    this.PCIsactive = false;
    this.infoText =
      'Waehle die Eigenschaft Deiner (linken) Karte, mit der Du vergleichen möchtest..';
  }

  mixCards() {
    this.cards_1 = [];
    this.cards_2 = [];
    this.cards.sort(() => Math.random() - 0.5);
    console.log(this.cards_1);
    for (let i = 0; i < this.cards.length; i++) {
      if (i % 2 == 0 || i == 0) {
        this.cards_1.push(this.cards[i]);
      } else {
        this.cards_2.push(this.cards[i]);
      }
    }
    console.log('Ich habe ' + this.cards_1.length + ' Karten');
  }

  log(skill: any) {
    if (this.active) {
      this.active = false;
      this.open2 = true;
      this.checkCards(skill);
    }
  }

  checkCards(skill: string) {
    //this.showPcCard();
    if (!this.PCIsactive) {
      this.infoText =
        'Du hast ' +
        skill +
        ' ' +
        this.cards_1[0][skill] +
        ' gewählt. Der PC hat hier ' +
        this.cards_2[0][skill] +
        '.';
    } else {
      this.infoText =
        'Der PC hat ' +
        skill +
        ' ' +
        this.cards_2[0][skill] +
        ' gewählt. Du hast hier ' +
        this.cards_1[0][skill] +
        '.';
    }
    this.checkMyValue(skill);
    /*if (Number(this.cards_1[0][skill])>Number(this.cards_2[0][skill])){
    this.pushEqualCards(this.cards_1)
    //TextINFO!!!
    this.infoText+=this.cards_1[0][skill]+" ist grösser "+this.cards_2[0][skill]
    this.PCIsactive=false;
    this.open2=true;

    //this.active=true;
    this.move=true;

    //this.moveCards(this.cards_1,this.cards_2)



    this.infoText+=". Du hast gestochen.";
    this.pcChoice="";
    this.checkWinner();
  }*/
    this.checkPCValue(skill);
    /*else if (Number(this.cards_2[0][skill])>Number(this.cards_1[0][skill])){
    this.pushEqualCards(this.cards_2)
    this.open2=true;
    this.infoText+=this.cards_2[0][skill]+" ist grösser "+this.cards_1[0][skill]
    //this.moveCards(this.cards_2,this.cards_1)

    this.move=true;
    this.active=false;
    console.log("Ich habe "+this.cards_1.length +" Karten und bin nicht dran.")
    this.infoText+=". Der PC hat gestochen.";

    this.pcChoice="";
    if(!this.checkWinner()){
    this.PCIsactive=true;
    //this.computerTurn()
  }
  }
  else{
    this.infoText+=this.cards_1[0][skill]+" ist gleich "+this.cards_2[0][skill]
    this.open2=true;
    this.equal=true;
    this.equalCards.push(this.cards_1[0]);
    this.equalCards.push(this.cards_2[0]);
    this.cards_1.shift();
    this.cards_2.shift();
    this.checkWinner();
    this.checkCards(skill);


  }*/
    this.checkEqual(skill);
  }

  checkMyValue(skill: string) {
    if (Number(this.cards_1[0][skill]) > Number(this.cards_2[0][skill])) {
      this.pushEqualCards(this.cards_1);
      //TextINFO!!!
      this.infoText +=
        this.cards_1[0][skill] + ' ist grösser ' + this.cards_2[0][skill];
      this.PCIsactive = false;
      this.open2 = true;

      //this.active=true;
      this.move = true;

      //this.moveCards(this.cards_1,this.cards_2)

      this.infoText += '. Du hast gestochen.';
      this.pcChoice = '';
      this.checkWinner();
    }
  }

  checkPCValue(skill: string) {
    if (Number(this.cards_2[0][skill]) > Number(this.cards_1[0][skill])) {
      this.pushEqualCards(this.cards_2);
      this.open2 = true;
      this.infoText +=
        this.cards_2[0][skill] + ' ist grösser ' + this.cards_1[0][skill];
      //this.moveCards(this.cards_2,this.cards_1)

      this.move = true;
      this.active = false;
      console.log(
        'Ich habe ' + this.cards_1.length + ' Karten und bin nicht dran.'
      );
      this.infoText += '. Der PC hat gestochen.';

      this.pcChoice = '';
      if (!this.checkWinner()) {
        this.PCIsactive = true;
        //this.computerTurn()
      }
    }
  }

  checkEqual(skill: string) {
    if (Number(this.cards_2[0][skill]) == Number(this.cards_1[0][skill])) {
      this.infoText +=
        this.cards_1[0][skill] + ' ist gleich ' + this.cards_2[0][skill];
      this.open2 = true;
      this.equal = true;
      this.equalCards.push(this.cards_1[0]);
      this.equalCards.push(this.cards_2[0]);
      this.cards_1.shift();
      this.cards_2.shift();
      this.checkWinner();
      this.checkCards(skill);
    }
  }

  moveCards(winner: any, loser: any) {
    if (winner == this.cards_1) {
      this.active = true;
    }
    winner.push(loser[0]);
    loser.shift();
    winner.push(winner[0]);
    winner.shift();

    this.open2 = false;
    this.move = false;
    this.infoText = '';
    this.checkWinner();
  }

  checkWinner() {
    if (this.cards_2.length == 0) {
      this.winner = 'Du hast ';
      return true;
    }
    if (this.cards_1.length == 0) {
      this.winner = 'Der Computer hat ';
      return true;
    }
    return false;
  }

  computerTurn() {
    this.PCIsactive = true;
    let i = Math.floor(Math.random() * this.keys.length);
    this.pcChoice = this.keys[i];
    console.log('Der PC wählt: ' + this.pcChoice);
    this.infoText = 'Der PC wählt: ' + this.pcChoice;
    //this.checkCards(this.pcChoice);
  }

  showPcCard() {
    this.open2 = true;
    setTimeout(() => (this.open2 = false), 5000);
  }

  PCactive() {
    this.checkCards(this.pcChoice);
  }

  pushEqualCards(winner: any) {
    for (let i: any; i < this.equalCards.length; i++) {
      winner.push(this.equalCards[i]);
    }
    this.equalCards = [];
  }

  toggleCardView() {
    console.log(this.cardview);
    if (this.cardview == false) {
      this.cardview = true;
    } else {
      this.cardview = false;
    }
  }
}
