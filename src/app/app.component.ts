import { Component, OnInit } from '@angular/core';
import { ClockService } from './clock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-yams';
  numbers : number[] = [1, 2, 3, 6];
  clock$: Observable<string>|null = null;
  //clock$! : Observable<string> ;

  constructor(private so : ClockService){ 
   console.log("constructor");
  }

  ngOnInit(): void {
    console.log("oninit");
    this.clock$ = this.so.get();
  }

  onSelect(num : number):void{
    console.log(num);
  }

}
