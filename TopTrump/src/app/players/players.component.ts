import { Component, Input, OnInit, inject } from '@angular/core';
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



@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit{
  constructor(private fb:Firestore){

  }

  ngOnInit(): void {

  }

  value="";
  selectedPlayer="";
  players=["Max","Leo"]

  async sendName(){
    console.log(this.selectedPlayer);
    const userCollection = collection(this.fb, 'user');

    // Erstellen Sie ein neues Dokument in der 'user'-Sammlung
    const newUserDocRef = await addDoc(userCollection, {
      name: this.value
    });
    console.log('Neuer Benutzer wurde zur "user"-Sammlung hinzugefügt. Dokument-ID:', newUserDocRef.id);
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

  }



