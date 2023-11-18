import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
})
export class StartpageComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  createdCards: any;

  createCards() {
    let i = Math.floor(Math.random() * 1001);

    this.createdCards = i;
    this.navigateMain();
  }

  navigateMain() {
    this.router.navigateByUrl('main/' + this.createdCards);
  }
}
