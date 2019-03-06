import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  selectedLanguage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsService: WordsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.route.snapshot.params['language'];
    if(this.selectedLanguage) {
      this.wordForm = this.formBuilder.group({
        'text' : [null, Validators.required],
        'lang' : [this.selectedLanguage],
        'category' : [null, Validators.required],
        'translation' : [null],
        'description' : [null]
      });
    } else {
      this.wordForm = this.formBuilder.group({
        'text' : [null, Validators.required],
        'lang' : [null, Validators.required],
        'category' : [null, Validators.required],
        'translation' : [null],
        'description' : [null]
      });
    }
  }

  onFormSubmit(form: NgForm) {
    this.wordsService.addWord(form)
      .subscribe(res => {
        console.log('Added word');
        if(this.selectedLanguage) {
          this.router.navigate(['/words/' + this.selectedLanguage]);
        } else
        this.router.navigate(['/dashboard']);
      }, (err) => {
        console.log(err);
      });
  }

}
