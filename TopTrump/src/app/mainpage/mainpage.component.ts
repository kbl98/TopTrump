import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Observer } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MycardsComponent } from '../mycards/mycards.component';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  constructor(
    private router:Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,




) {
}

cardsLoaded:boolean=false;
async ngOnInit(): Promise<void>{
this.cardsLoaded=false;
    let cards_i = this.activatedRoute.snapshot.params['cards'];
    console.log(cards_i);

   /*this.getPokeCards().subscribe(() => {
    console.log("Karten sind geladen:"+this.cardsLoaded)

    });

  }*/

  this.getPokeCards().subscribe({
    next: () => {
      console.log("Next called, card array is growing");
    },
    complete: () => {
      this.cardsLoaded = true;
      console.log("Cards have been loaded");
    }
  });
}
  imageLoaded: boolean = false;
  cards: any = [
    /*{
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
    },*/
  ];
  cards_1: any = [];
  cards_2: any = [];
  open2 = false;
  open1 = false;
  winner = '';
  active = true;
  keys = [
    'Gewicht',
    'Geschwindigkeit',
    'hp',
    'moves',
    'Attacke',
    'Spez_Verteidigung',
    'Spez_Attacke',
    'Verteidigung'
  ];
  pcChoice: string = '';
  infoText = 'Starte Spiel - oben links';
  PCIsactive = false;
  move = false;
  equalCards: any = [];
  equal = false;
  cardview: any = false;
  start_i: any = 1;
  stop_i: any = 50;

  async startGame() {
    console.log("startGame hat geladene Karten"+this.cardsLoaded)
    if(this.cardsLoaded){
    console.log(this.cards.length)
    this.mixCards();
    this.open1 = true;
    this.open2 = false;
    this.winner = '';
    this.active = true;
    this.PCIsactive = false;
    this.infoText =
      'Waehle die Eigenschaft Deiner (linken) Karte, mit der Du vergleichen möchtest..';
    //await this.getPokeCards();
  }}

  mixCards() {
    console.log("Es sind"+this.cards.length+"Karten zu verteilen.")
    this.cards_1 = [];
    this.cards_2 = [];
   this.cards.sort(() => Math.random() - 0.5);
    console.log("Du hast jetzt"+this.cards_1.length);
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
      setTimeout(this.checkWinner,3000);
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
      setTimeout(this.checkWinner,3000);
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
    let max = 0;
    let skill = '';
    for (let key in this.cards_2[0]) {
      if (Number(this.cards_2[0][key]) > max) {
        max = this.cards_2[0][key];
        skill = key;
      }
    }
    this.pcChoice = skill;
    //let i = Math.floor(Math.random() * this.keys.length);
    //this.pcChoice = this.keys[i];
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

  /*async getPokeCards(){
    for (let i = 1; i <= 5; i++) {
      let url_poke =await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
      let pokemon = await url_poke.json();
      console.log(pokemon)

      console.log("Name: "+pokemon["name"])
      //for(let j=0;j>7;j++){
       // console.log("Zusatz:"+pokemon.stats[0]["base_stat"]["stat"]["name"]+":"+pokemon.stats[0]["base_stat"])
     // }
      console.log("Erfahrung: "+pokemon["base_experience"])
      console.log("Gewicht: "+pokemon["Gewicht"])
      console.log("Grösse: "+pokemon["height"])
      console.log("Moves: "+pokemon["moves"].length)

      console.log("Bild: "+pokemon["sprites"]["other"]["official-artwork"]["front_default"])
      let s1=pokemon["stats"][0]["stat"]["name"]
      let s2=pokemon["stats"][1]["stat"]["name"]
      let s3=pokemon["stats"][2]["stat"]["name"]
      let s4=pokemon["stats"][3]["stat"]["name"]
      let s5=pokemon["stats"][4]["stat"]["name"]
      let s6=pokemon["stats"][5]["stat"]["name"]
      console.log(pokemon["stats"][0]["stat"]["name"]+":"+pokemon["stats"][0]["base_stat"])
      let newCard:any={"name":pokemon["name"],"experience":pokemon["base_experience"],"Gewicht":pokemon["Gewicht"],"height":pokemon["height"],"moves":pokemon["moves"],s1:pokemon["stats"][0]["stat"]["name"],s2:pokemon["stats"][1]["base_stat"],s3:pokemon["stats"][2]["base_stat"],s4:pokemon["stats"][3]["base_stat"],s5:pokemon["stats"][4]["base_stat"],s6:pokemon["stats"][5]["base_stat"],"src":pokemon["sprites"]["other"]["official-artwork"]["front_default"]}
      this.cards.push(newCard)
      console.log(this.cards)
    }

}*/

getPokeCards(): Observable<void> {
  return new Observable<void>((observer: Observer<void>) => {
    const fetchPokemon = async () => {
      let cards_i = await this.activatedRoute.snapshot.params['cards'];
      let end = Number(cards_i) + 49;

      while (this.cards.length < 40) {
        let j=Math.floor(Math.random()*1001)
        let url_poke = await fetch('https://pokeapi.co/api/v2/pokemon/' + j);
        let pokemon = await url_poke.json();
        //console.log(pokemon);
        //console.log('Name: ' + pokemon['name']);
        //for(let j=0;j>7;j++){
        // console.log("Zusatz:"+pokemon.stats[0]["base_stat"]["stat"]["name"]+":"+pokemon.stats[0]["base_stat"])
        // }

        console.log(
          pokemon['stats'][0]['stat']['name'] +
            ':' +
            pokemon['stats'][0]['base_stat']
        );
        let newCard: any = {
          name: pokemon['name'].toUpperCase(),
          //experience: pokemon['base_experience'],
          Gewicht: pokemon['weight'] / 10,
          //height: pokemon['height'],
          moves: pokemon['moves'].length,
          hp: pokemon['stats'][0]['base_stat'],
          Attacke: pokemon['stats'][1]['base_stat'],
          Verteidigung: pokemon['stats'][2]['base_stat'],
          'Spez_Attacke': pokemon['stats'][3]['base_stat'],
          'Spez_Verteidigung': pokemon['stats'][4]['base_stat'],
          Geschwindigkeit: pokemon['stats'][5]['base_stat'],
          src: pokemon['sprites']['other']['official-artwork'][
            'front_default'
          ],
        };
        //this.cards.push(newCard);
        // Add card only if it is not already in the array
        if (!this.cards.some((card:any) => card.name === newCard.name)) {
          this.cards.push(newCard);
          //console.log("Du hast " + newCard['name']);
      }
        //console.log("Du hast"+newCard['name']);

        //if (i === cards_i + 50) {

        //}
      }
      observer.next();
          observer.complete();
    };
    fetchPokemon();


  });
}

  navigateTwo(){
    let cards_i = this.activatedRoute.snapshot.params['cards'];
    this.router.navigateByUrl('two/'+cards_i)
  }
}
