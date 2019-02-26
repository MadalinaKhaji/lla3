import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { WordsComponent } from './components/word-crud/words/words.component';
import { WordDetailComponent } from './components/word-crud/word-detail/word-detail.component';
import { WordAddComponent } from './components/word-crud/word-add/word-add.component';
import { WordEditComponent } from './components/word-crud/word-edit/word-edit.component';

const routes: Routes = [
  { path: "", component: WordsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "about", component: AboutComponent },
  { path: "words", component: WordsComponent },
  { path: "word-detail/:id", component: WordDetailComponent },
  { path: "word-add", component: WordAddComponent },
  { path: "word-edit/:id", component: WordEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
