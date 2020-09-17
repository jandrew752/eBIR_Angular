import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrewerypageComponent } from './brewerypage/brewerypage.component';

const routes: Routes = [
  {path: "brewery/*", component:BrewerypageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
