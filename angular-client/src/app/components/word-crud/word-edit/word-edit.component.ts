import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WordsService } from '../../../services/words.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.css']
})
export class WordEditComponent implements OnInit {

  wordForm: FormGroup;
  _id: Number;
  text: String = '';
  lang: String = '';
  category: String = '';
  translation: String = 'No';
  description: String = 'None';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wordsService: WordsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getWord(this.route.snapshot.params['id']);
    this.wordForm = this.formBuilder.group({
      'text' : [null, Validators.required],
      'lang' : [null, Validators.required],
      'category' : [null, Validators.required],
      'translation' : [null],
      'description' : [null]
    });
  }

  getWord(id) {
    this.wordsService.getWord(id)
      .subscribe(data => {
        this._id = data._id;
        this.wordForm.setValue({
          text: data.text,
          lang: data.lang,
          category: data.category,
          translation: data.translation,
          description: data.description
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.wordsService.updateWord(this._id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/word-detail', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
