import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-main-two',
  templateUrl: './main-two.component.html',
  styleUrls: ['./main-two.component.scss']
})
export class MainTwoComponent implements OnInit{
  constructor(private router:Router,

    private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {
    let cards_i = this.activatedRoute.snapshot.params['cards'];
    console.log(cards_i);
    this.getPokeCards().subscribe(() => {});
  }

  imageLoaded: boolean = false;
  cards: any = []
  players="";
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
    this.mixCards();
    this.open1 = true;
    this.open2 = false;
    this.winner = '';
    this.active = true;
    this.PCIsactive = false;
    this.infoText =
      'Waehle die Eigenschaft Deiner (linken) Karte, mit der Du vergleichen möchtest..';
    await this.getPokeCards();
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

  navigateOne(){
    let cards_i = this.activatedRoute.snapshot.params['cards'];
    this.router.navigateByUrl('main/'+cards_i)
  }

  toggleCardView() {
    console.log(this.cardview);
    if (this.cardview == false) {
      this.cardview = true;
    } else {
      this.cardview = false;
    }
  }


  getPokeCards(): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      const fetchPokemon = async () => {
        let cards_i = await this.activatedRoute.snapshot.params['cards'];
        let end = Number(cards_i) + 49;

        for (let i = cards_i; i <= end; i++) {
          let url_poke = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
          let pokemon = await url_poke.json();
          console.log(pokemon);
          console.log('Name: ' + pokemon['name']);
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
          this.cards.push(newCard);
          console.log(this.cards);

          if (i === cards_i + 50) {
            observer.next();
            observer.complete();
          }
        }
      };
      fetchPokemon();
    });
  }

}
