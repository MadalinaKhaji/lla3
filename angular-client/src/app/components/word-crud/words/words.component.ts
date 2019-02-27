import { Component, OnInit } from '@angular/core';
import { WordsService} from '../../../services/words.service'
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  data: Word[] = [];
  selectedWord: Word;

  constructor(private wordService: WordsService) { }

  ngOnInit() {
    this.wordService.getWords()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
      }, err => {
        console.log(err);
      });
  }

  selectWord(wordToSelect) {
    this.selectedWord = wordToSelect;
    console.log(this.selectedWord.text);
  }

}
