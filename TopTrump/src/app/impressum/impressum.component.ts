import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent {
  constructor(
    private router: Router,

  ){}

  navigateMain(){
    this.router.navigateByUrl('main/:cards');
  }
}
