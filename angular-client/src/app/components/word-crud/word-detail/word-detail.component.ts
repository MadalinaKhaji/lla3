import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from '../../../services/words.service';
import { Word } from '../../../models/word.model';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {

  word: Word = {
    _id: null,
    text: '',
    lang: '',
    translation: '',
    category: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private wordsService: WordsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getWordDetails(this.route.snapshot.params['id']);
  }

  getWordDetails(id) {
    this.wordsService.getWord(id)
      .subscribe(data => {
        this.word = data;
        console.log(this.word);
      });
  }

  deleteWord(id) {
    this.wordsService.deleteWord(id)
      .subscribe(res => {
        console.log("Deleted word!");
        this.router.navigate(['/words']);
      }, (err) => {
        console.log(err);
      });
  }

}
