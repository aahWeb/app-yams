import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

import { List, Pastrie } from './pastrie';
import { INGREDIENTS_LISTS, PASTRIES } from './mock-pastries';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PastriesService {
  private pastriesUrl = 'http://localhost:3001/api/pastries';
  private ingredientsListsUrl = 'http://localhost:3001/api/ingredientsLists';
  private pastriesUrlOrderQuantity = 'http://localhost:3001/api/pastries/order-quantity';
  private searchPastriesUrl = 'http://localhost:3001/api/pastries-search';
  private pastriesUrlCount = 'http://localhost:3001/api/pastries-count';
  private numberPastries: number = 0;
  private currentPage: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {
  }

  getPastries(): Observable<Pastrie[]> {

    return this.http.get<Pastrie[]>(this.pastriesUrl, httpOptions).pipe(
      map((pastries: Pastrie[]) => pastries.sort((a, b) => b.quantity - a.quantity))
    )
  }

  search(word: string): Observable<Pastrie[]> {

    return this.http.get<Pastrie[]>(this.searchPastriesUrl + `/${word}`, httpOptions);
  }

  paginate(start: number, end: number): Observable<Pastrie[]> {

    return this.http.get<Pastrie[]>(this.pastriesUrlOrderQuantity + `/${start}/${end}`, httpOptions);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.pastriesUrlCount , httpOptions);
  }

  setCurrentPage(page: number) {
    // observer
    this.currentPage.next(page); // next du subject notifie à l'observable
  }

  getCurrentPage(): Subject<number> {
    // observable
    return this.currentPage;
  }

}
