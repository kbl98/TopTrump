import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import * as firebase from "firebase/app";

import { collection, addDoc, setDoc,getDocs  } from "firebase/firestore";

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
  @Output() onPlayername = new EventEmitter<any>()
  value="";
  selectedPlayer="";
  allPlayers:any=[];
  player:any;

  async sendName(){
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
}

exit(){
  let cards_i = this.activatedRoute.snapshot.params['cards'];
  this.router.navigateByUrl('main/'+cards_i)
}
  async sendInfos(){


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

    }

    async getAllPlayers(){
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
    }


  }



