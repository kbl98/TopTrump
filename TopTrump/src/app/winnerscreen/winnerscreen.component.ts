import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winnerscreen',
  templateUrl: './winnerscreen.component.html',
  styleUrls: ['./winnerscreen.component.scss']
})
export class WinnerscreenComponent {
  @Input()winner:string=""
}
