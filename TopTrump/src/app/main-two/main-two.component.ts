import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'card_interface';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

@Component({
  selector: 'app-main-two',
  templateUrl: './main-two.component.html',
  styleUrls: ['./main-two.component.scss'],
})
export class MainTwoComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: Firestore,
    private activatedRoute: ActivatedRoute
  ) {
    this.getMyCardsFb(this.me, this.antiplayer);
  }

  ngOnInit(): void {
    let cards_i = this.activatedRoute.snapshot.params['cards'];
    console.log(cards_i);
    this.getPokeCards().subscribe(() => {});
  }

  // Methode, die aufgerufen wird, wenn die ChildComponent geschlossen wird
  onChildClose(gameID: string) {
    this.game = gameID;
    // Hier kannst du weitere Logik implementieren, die auf die geschlossene Game ID reagiert
  }

  cards_1: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cards_2: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  activePlayer: BehaviorSubject<String> = new BehaviorSubject<String>('');

  @Input() players: any = [];
  imageLoaded: boolean = false;
  cards: any = [];

  /*cards_1: any = [];
  cards_2: any = [];*/
  myData: any = {};
  me: any = '';
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
    'Verteidigung',
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
  game: any;
  playerlist: any = false;
  selectedPlayer = '';
  allPlayers: any = [];
  antiplayer: any = '';

  /*setPlayer(player: any) {
    this.player = player;
  }*/

  getGameID(game: any) {
    this.game = game;
  }

  async startGame() {
    await this.getCardsFromFb();
    await this.setActive('p1');
    this.open1 = true;
    this.getInfoTextChoose();
    /*von main..:

    this.mixCards();

    this.open1 = true;
    this.open2 = false;
    this.winner = '';
    this.active = true;
    this.PCIsactive = false;
    this.infoText =
      'Waehle die Eigenschaft Deiner (linken) Karte, mit der Du vergleichen möchtest..';
    await this.getPokeCards();*/
  }

  /*mixCards() {
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
  }*/

  log(skill: any) {
    this.open2 = true;
    this.checkCards(skill);
  }

  checkCards(skill: any) {
    let firstCard1: any = this.cards_1.value?.[0];
    let firstCard2: any = this.cards_2.value?.[0];
    //this.showPcCard();

    this.infoText =
      'Du hast ' +
      skill +
      ' ' +
      firstCard1[skill] +
      ' gewählt. Gegenspieler hat hier ' +
      firstCard2[skill] +
      '.';

    this.checkMyValue(skill, firstCard1, firstCard2);

    //this.checkPCValue(skill);

    //this.checkEqual(skill);
  }
  checkMyValue(skill: any, c1: any, c2: any) {
    console.log(Number(c1[skill]));

    if (c1 && c2 && Number(c1[skill]) > Number(c2[skill])) {
      console.log(Number(c1[skill]));
      //this.pushEqualCards(this.cards_1);
      //TextINFO!!!
      this.infoText += Number(c1[skill]) + ' ist grösser ' + Number(c2[skill]);
      //this.activePlayer = this.me;
      let cards1=JSON.stringify(this.cards_1.value);
      let cards2=JSON.stringify(this.cards_2.value);
      this.open2 = true;
      console.log("Karten vor move: "+ JSON.stringify(this.cards_2.value))
      //this.active=true;
      this.move = true;

      this.moveCards(cards1, cards2,"1" );

      this.infoText += '. Du hast gestochen.';
      this.setActive(this.me);
      console.log(this.activePlayer);
      //this.checkWinner();
    } else if (c1 && c2 && Number(c2[skill]) > Number(c1[skill])) {
      console.log(Number(c1[skill]));
      this.infoText += Number(c2[skill]) + ' ist grösser ' + Number(c1[skill]);

      this.open2 = true;
      let cards1=JSON.stringify(this.cards_1.value);
      let cards2=JSON.stringify(this.cards_2.value);
      //this.active=true;
      this.move = true;
      console.log("Karten vor move: "+ JSON.stringify(this.cards_2.value))
     this.moveCards(cards2, cards1,"2");

      this.infoText += '. Dein Gegner hat gestochen.';

      this.setActive(this.antiplayer);
      console.log(this.activePlayer.value);
      //this.checkWinner();
    }
  }
  /*
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
*/
  moveCards(winner: any, loser: any,win:any) {
    console.log("Start move")

    console.log("Loser loser:"+loser)

    let winnerJson=JSON.parse(winner)
    let loserJson=JSON.parse(loser)

    /*if (winner == this.cards_1) {
      this.active = true;
    }*/
    /*console.log(this.cards_1.value[0]);
    console.log(this.cards_2.value[0]);
    console.log(this.cards_1.value[1]);
    console.log(this.cards_2.value[1]);*/
   winnerJson.push(loserJson[0]);
    loserJson.shift();
    winnerJson.push(winnerJson[0]);
    winnerJson.shift();

    console.log("Länge1: "+winnerJson.length)
    console.log("Länge2: "+loserJson.length)

    /*winner.push(loser[0]);
    loser.shift();
    winner.push(winner[0]);
    winner.shift();*/

    if(win==1){
      this.updateCards(winnerJson,loserJson)
    }
    if(win==2){
      this.updateCards(loserJson,winnerJson)
    }

    this.open2 = false;
    this.move = false;
    //this.infoText = '';
    //this.checkWinner();
  }
  /*
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
  }*/

  navigateOne() {
    let cards_i = this.activatedRoute.snapshot.params['cards'];
    this.router.navigateByUrl('main/' + cards_i);
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
            Spez_Attacke: pokemon['stats'][3]['base_stat'],
            Spez_Verteidigung: pokemon['stats'][4]['base_stat'],
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

  /*async getPlayers() {
    if (this.playerlist == false) {
      await this.getAllPlayers();
      this.playerlist = true;
    } else {
      this.playerlist = false;
    }
  }*/

  sendSelection() {
    console.log('Ausgewählter Spieler wird gesendet:' + this.selectedPlayer);
    this.playerlist = false;
    let gameID = this.setGameID();
  }

  /* async getAllPlayers() {
    const userCollection = collection(this.fb, 'user');

    // Hole alle Dokumente aus der 'user'-Sammlung
    const querySnapshot = await getDocs(userCollection);

    // Iteriere durch jedes Dokument im querySnapshot
    querySnapshot.forEach((doc) => {
      // Hole die Daten des Dokuments
      const userData = doc.data();

      // Überprüfe, ob das Dokument ein "name"-Feld hat
      if (userData && userData['name']) {
        const userName = userData['name'];

        // Füge den Namen zur Liste allPlayers hinzu
        if (userName !== this.player) {
          this.allPlayers.push(userName);
        }
      }
    });

    // Nachdem alle Namen abgerufen wurden, kannst du die Liste verwenden, wie du möchtest
    console.log('Alle Benutzernamen:', this.allPlayers);
  }*/

  exitPlayers() {
    this.selectedPlayer = '';
    this.playerlist = false;
  }

  /*async getSetGame(){


const userCollection=collection(this.fb,'user');
const querySnapshot = await getDocs(userCollection);
const firstDoc = querySnapshot.docs[0];

      // Holen Sie sich die Daten des Dokuments
      const userData = firstDoc.data();

      // Jetzt haben Sie das gesamte JSON unter der ersten ID in der Sammlung "user"

      if(!userData["gameID"]){
        console.log('New Game for:', userData);
      }

    }*/

  async setGameID() {
    const gamesCollection = collection(this.fb, 'games');

    try {
      // Fügen Sie ein neues Dokument zur Sammlung "games" hinzu
      const newGameRef = await addDoc(gamesCollection, {
        /* Hier können Sie die Daten für das neue Spiel angeben */
      });

      // Holen Sie sich die ID des neu erstellten Spiels
      const newGameId = newGameRef.id;

      // Rückgabe der ID
      console.log('GameID' + newGameId);
      return newGameId;
    } catch (error) {
      console.error('Fehler beim Erstellen eines neuen Spiels:', error);
      throw error; // Optional: Fehler weiterwerfen, um ihn in der aufrufenden Funktion zu behandeln
    }
  }

  async getCardsFromFb() {
    const gamesCollectionRef: any = collection(this.fb, 'games');
    const gameDocRef = doc(gamesCollectionRef, this.game);
    try {
      const gameDoc = await getDoc(gameDocRef);

      if (gameDoc.exists()) {
        const gameData = gameDoc.data();

        if (gameData && gameData['players'][0]) {
          console.log('p1 schon gesetzt. ');
          this.me = 'p2';
          this.antiplayer = 'p1';
          console.log('Du bist Spieler p2');
        } else if (
          gameData &&
          gameData['players'][0] &&
          gameData['players'][1]
        ) {
          console.log('Alle Spieler bereits gesetzt...');
        } else if (gameData && !gameData['players'][0]) {
          console.log('Noch kein Spieler. Du bist p1');
          this.me = 'p1';
          this.antiplayer = 'p2';
        } else {
          console.log('Ein Fehler ist aufgetreten. Zurück zu Start..');
          this.router.navigateByUrl('main');
        }
        this.getMyCardsFb(this.me, this.antiplayer);
      }
    } catch {}
  }

  async getMyCardsFb(me: any, anti: any) {
    const gamesCollectionRef: any = await collection(this.fb, 'games');
    const gameDocRef = await doc(gamesCollectionRef, this.game);

    try {
      /*const gameDoc = await getDoc(gameDocRef);

      let gamedata=await gameDoc.data()
      if (gamedata && gamedata["playerCards"] && gamedata["playerCards"][me] && gamedata["playerCards"][anti]){
      this.cards_1=gamedata["playerCards"][me];
      console.log('Meine Behavior-Karten:'+this.cards_1[0])
      this.cards_2=gamedata["playerCards"][anti];*/

      const onsub = onSnapshot(doc(this.fb, 'games', this.game), (doc) => {
        this.myData = doc.data();
        console.log(this.myData['playerCards'][this.me]);
        let newCardsData1 = this.myData['playerCards'][this.me];
        console.log("Type Cards from FB:"+typeof(newCardsData1))
        let newCardsData2 = this.myData['playerCards'][this.antiplayer];
        let activePlayerData = this.myData['activePlayer'];
        this.cards_1;

        this.cards_1.next(newCardsData1);
        this.cards_2.next(newCardsData2);
        this.activePlayer.next(activePlayerData);
      });

      /*onSnapshot(gameDocRef, (snapshot) => {


          const updatedGameData = doc.data();
          if (updatedGameData && updatedGameData["playerCards"] && updatedGameData["playerCards"][me] && updatedGameData["playerCards"][anti]) {
            this.cards_1.next(updatedGameData["playerCards"][me]);
            this.cards_2.next(updatedGameData["playerCards"][anti]);

            console.log(`Aktualisierte Karten von Spieler ${me}:`, this.cards_1);}

        }*/
    } catch {}
  }
  async setActive(player: any) {
    const gamesCollectionRef: any = await collection(this.fb, 'games');
    const gameDocRef = await doc(gamesCollectionRef, this.game);

    try {
      const gameDoc = await getDoc(gameDocRef);

      if (gameDoc.exists()) {
        // Holen Sie sich die aktuellen Daten
        const currentGameData = gameDoc.data();

        // Aktualisieren Sie das activePlayer-Feld
        const updatedGameData = { ...currentGameData, activePlayer: player };

        // Aktualisieren Sie das Firestore-Dokument
        await updateDoc(gameDocRef, updatedGameData);

        console.log('activePlayer aktualisiert:', player);
      } else {
        console.log('Dokument nicht gefunden:', this.game);
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des activePlayer:', error);
    }
  }

  async updateCards(cards1:any,cards2:any){


    console.log("cards1: "+cards1)
    console.log('start update cards')
    const gamesCollectionRef: any = await collection(this.fb, 'games');
    const gameDocRef = await doc(gamesCollectionRef, this.game);
    console.log("Karten für update: "+cards1.length)
    console.log("Karten für update: "+cards2.length)

    try {
      const gameDoc = await getDoc(gameDocRef);

      if (gameDoc.exists()) {
        // Holen Sie sich die aktuellen Daten
        const currentGameData = gameDoc.data();
        console.log(currentGameData)
        // Aktualisieren Sie das activePlayer-Feld

        console.log("Karten für update: "+typeof(JSON.parse(JSON.stringify(cards1))))
        console.log("Karten für update: "+cards2.length)
        // Aktualisieren Sie das Firestore-Dokument
        //await updateDoc(gameDocRef, updatedGameData);
        let pl1=this.me
        let pl2=this.antiplayer
const updatedGameData = { ...currentGameData,
  playerCards: {
    ...currentGameData["playerCards"],
    pl1:cards1,
    pl2:cards2,
    activePlayer:this.activePlayer.value
  }};
  console.log("Karten für update: "+cards1.length)
  console.log("Karten für update: "+cards2.length)
  console.log(updatedGameData)
  await updateDoc(gameDocRef, updatedGameData);
        console.log('Game aktualisiert:', updatedGameData);
      } else {
        console.log('Dokument nicht gefunden:', this.game);
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des activePlayer:', error);
   // }
  }
  console.log("Neue Values: "+this.cards_1.value.length+ this.cards_2.value.length)
  }

  getInfoTextChoose() {
    console.log(this.me);
    console.log(this.activePlayer.value);
    if (this.me == this.activePlayer.value) {
      this.infoText = 'Wähle eine Eigenschaft..';
    } else {
      this.infoText = 'Dein Gegner wählt eine Eigenschaft..';
    }
  }
}
