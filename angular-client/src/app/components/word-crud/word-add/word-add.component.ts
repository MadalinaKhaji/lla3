import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordsService } from '../../../services/words.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-word-add',
  templateUrl: './word-add.component.html',
  styleUrls: ['./word-add.component.css']
})
export class WordAddComponent implements OnInit {

  wordForm: FormGroup;
  text: String = '';
  lang: String = '';
  category: String = '';
  translation: String = 'No';
  description: String = 'None';

  constructor(
    private router: Router,
    private wordsService: WordsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.wordForm = this.formBuilder.group({
      'text' : [null, Validators.required],
      'lang' : [null, Validators.required],
      'category' : [null, Validators.required],
      'translation' : [null],
      'description' : [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.wordsService.addWord(form)
      .subscribe(res => {
        console.log('Added word');
        this.router.navigate(['/words']);
      }, (err) => {
        console.log(err);
      });
  }

}
