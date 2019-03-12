import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../services/words.service';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  data: Word[] = [];

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    this.wordsService.getLanguages()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
  }
}
