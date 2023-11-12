import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.scss'],


})
export class MycardsComponent {
  constructor() {}

@Input() cards:any="";


}
