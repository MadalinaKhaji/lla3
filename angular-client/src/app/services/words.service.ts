import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Word } from '../models/word.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = '/api/word';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('Fetched words.')),
        catchError(this.handleError('getWords', []))
      );
  }

  getWord(id: number): Observable<Word> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Word>(url)
      .pipe(
        tap(_ => console.log(`Fetched word id=${id}`)),
        catchError(this.handleError<Word>(`getWord id=${id}`))
      );
  }

  addWord(word): Observable<Word> {
    return this.http.post<Word>(apiUrl, word, httpOptions)
      .pipe(
        tap((word: Word) => console.log(`Added word with id=${word._id}`)),
        catchError(this.handleError<Word>('addWord'))
      );
  }

  updateWord(id, word): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, word, httpOptions)
      .pipe(
        tap(_=> console.log(`Updated word id=${id}`)),
        catchError(this.handleError<any>('updateWord'))
      );
  }

  deleteWord (id): Observable<Word> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Word>(url, httpOptions)
      .pipe(
        tap(_=> console.log(`Deleted word id=${id}`)),
        catchError(this.handleError<Word>('deleteWord'))
      );
  }
}
