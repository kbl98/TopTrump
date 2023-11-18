import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MycardsComponent } from './mycards/mycards.component';
import { ImpressumComponent } from './impressum/impressum.component';

const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'main/:cards', component: MainpageComponent,
  children: [
    {path:'myCards',component:MycardsComponent}
  ]  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
