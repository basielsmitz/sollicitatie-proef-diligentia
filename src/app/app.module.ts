import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SceneListComponent } from './scene-list/scene-list.component';
import { SceneComponent } from './scene-list/scene/scene.component';


import { AppComponent } from './app.component';

// Routes for the overview, detail and redirection from "home"
const appRoutes: Routes = [
  { path: 'scenes', component: SceneListComponent },
  { path: '', redirectTo: '/scenes', pathMatch: 'full' },
  { path: 'scene/:id', component: SceneComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    SceneListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
