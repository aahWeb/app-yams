import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { List, Pastrie } from './pastrie';
import { INGREDIENTS_LISTS, PASTRIES } from './mock-pastries';

@Injectable({
  providedIn: 'root'
})
export class PastriesService {
  private pastries: Pastrie[] = PASTRIES;
  private ingredientsList: List[] = INGREDIENTS_LISTS;
  private numberPastries: number = 0;
  private currentPage: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {
    this.numberPastries = this.pastries.length;
  }

  getPastries(): Pastrie[] {
    return this.pastries.sort((a, b) => b.quantity - a.quantity)
  }

  search(word: string): Pastrie[] {
    const re = new RegExp(word.trim(), 'i');

    return this.pastries.filter(p => p.name.match(re));
  }

  paginate(start: number, end: number) {

    return this.getPastries().slice(start, end);
  }

  count(): number {
    return this.numberPastries;
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
