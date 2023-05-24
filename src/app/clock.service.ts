import { Injectable } from '@angular/core';
import { interval, Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  constructor() { }

  get(): Observable<string> {
    return interval(1000).
      pipe(
        map(_ => {
          const d = new Date();

          return `${d.getHours()}h ${d.getMinutes()}min ${d.getSeconds()}s`
        } )
      );
  }
}
