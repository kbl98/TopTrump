import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import * as firebase from "firebase/app";

import { collection, addDoc, setDoc,getDocs,getDoc,doc  } from "firebase/firestore";

//Now import this
import 'firebase/firestore';
import {MatDividerModule} from '@angular/material/divider';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit{
  constructor(private fb:Firestore,private router:Router, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {

  }

  @Input()cards:any;
  @Output() closeEvent = new EventEmitter<string>();


  // Logik zum Schließen der Komponente und Übergeben der Game ID

  value="";
  selectedPlayer="";
  allPlayers:any=[];
  player:any;
  cards_1:any;
  cards_2:any;
  ErrorID:any=""

  @Input()game:any=""
  @Output() closeChild = new EventEmitter<any>();

  closeComponent() {
    const gameID = this.game; // Ersetze dies durch die tatsächliche Game ID


  }

  valueReset(){
    this.value="";
    this.ErrorID=""
  }

  async generateGame(){
    interface Game {
      players: [];
      playerCards: { [key: string]: string[] };
      p1_active: boolean;
      p2_active: boolean;
    }
    await this.mixCards()
    const gamesCollection = collection(this.fb, 'games');
    try {
      // Erstelle ein leeres Kartenarray für jeden Spieler

      let player1:any="p1";
      let player2:any="p2";
      // Erstelle ein neues Spielobjekt
      const newGame = {
        players: [],
        playerCards: {
          [player1]: this.cards_1,
          [player2]:this.cards_2,
        },
        activePlayer:"p1"
      };

      // Füge das neue Spiel zur "games"-Sammlung hinzu
      const docRef = await addDoc(gamesCollection,newGame);
      this.game=docRef.id
      console.log('Neues Spiel erstellt mit ID:', docRef.id);
      this.closeChild.emit(this.game);
    } catch (error) {
      console.error('Fehler beim Erstellen des Spiels:', error);
    }
  }

  async gameExists(ID:any){
    const gamesCollectionRef:any = collection(this.fb, 'games');
    const gameDocRef = doc(gamesCollectionRef, ID);
    try {
      const gameDoc = await getDoc(gameDocRef);

      if (gameDoc.exists()) {
        console.log(`Das Spiel mit der ID ${ID} existiert.`);
        this.game=ID;
        this.closeChild.emit(this.game);
      } else {
        console.log(`Das Spiel mit der ID ${ID} existiert nicht.`);
        this.ErrorID="Das Spiel mit der ID "+ID+ " existiert nicht."
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Spiels:', error);
      this.ErrorID="Datenbank wird nicht erreicht.."
    }
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

 /* async sendName(){
    await this.getAllPlayers();
    console.log(this.allPlayers)
    let i=this.allPlayers.filter((p:any)=>{return this.value==p});
    console.log(i)
    if(i.length==0){

    this.player=this.value
    console.log(this.selectedPlayer);
    const userCollection = collection(this.fb, 'user');

    // Erstellen Sie ein neues Dokument in der 'user'-Sammlung
    const newUserDocRef = await addDoc(userCollection, {
      name: this.value
    });
    this.onPlayername.emit(this.player);
    console.log('Neuer Benutzer wurde zur "user"-Sammlung hinzugefügt. Dokument-ID:', newUserDocRef.id);
  }else{
    console.log("Name schon vergeben")
    this.player=this.value;
    this.onPlayername.emit(this.player);
  }
}*/

exit(){
  let cards_i = this.activatedRoute.snapshot.params['cards'];
  this.router.navigateByUrl('main/'+cards_i)
}
/*  async sendInfos(){


    console.log(this.value);

      const userCollection = collection(this.fb, 'user');

      // Hole alle Dokumente aus der 'user'-Sammlung
      const querySnapshot = await getDocs(userCollection);
      console.log("Check2")
      // Überprüfen, ob es Dokumente gibt
      if (!querySnapshot.empty) {
        // Hole das erste Dokument
        const firstUserDoc = querySnapshot.docs[0];

        // Hole das Datenobjekt des Dokuments
        const userData = firstUserDoc.data();

        // Überprüfe, ob das Datenobjekt ein "name"-Feld hat
        if (userData && userData['name']) {
          const userName = userData['name'];
          console.log('Name des ersten Benutzers:', userName);
        } else {
          console.log('Der erste Benutzer hat kein "name"-Feld.');
        }
      } else {
        console.log('Es gibt keine Benutzer in der "user"-Sammlung.');
      }

    }*/

   /* async getAllPlayers(){
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
          this.allPlayers.push(userName);
        }
      });

      // Nachdem alle Namen abgerufen wurden, kannst du die Liste verwenden, wie du möchtest
      console.log('Alle Benutzernamen:', this.allPlayers);
    }*/


  }



