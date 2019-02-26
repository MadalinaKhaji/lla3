import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { WordsComponent } from './components/word-crud/words/words.component';
import { WordDetailComponent } from './components/word-crud/word-detail/word-detail.component';
import { WordAddComponent } from './components/word-crud/word-add/word-add.component';
import { WordEditComponent } from './components/word-crud/word-edit/word-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AboutComponent,
    WordsComponent,
    WordDetailComponent,
    WordAddComponent,
    WordEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
