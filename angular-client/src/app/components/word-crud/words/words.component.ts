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

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    this.wordsService.getWords()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
      }, err => {
        console.log(err);
      });
  }

}
