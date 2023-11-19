import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.scss'],


})
export class MycardsComponent {
  constructor() {}

@Input() cards:any="";

firstCard(card:any){
  if(this.cards.length<=3){
  this.cards.unshift(                      // add to the front of the array
  this.cards.splice(                     // the result of deleting items
    this.cards.findIndex(                // starting with the index where
      (e:any) => e === card), // the name is Sarah
  1)[0]                             // and continuing for one item
)
}}
}
