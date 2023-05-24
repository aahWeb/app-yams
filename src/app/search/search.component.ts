import { Component, EventEmitter, Output } from '@angular/core';
import { PastriesService } from '../pastries.service';
import { NgForm, NgModel } from '@angular/forms';
import { Pastrie } from '../pastrie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  word: string = '';
  @Output() searchPastries: EventEmitter<Pastrie[]> = new EventEmitter();

  constructor(private ps: PastriesService) { }

  // onSubmit(form: NgForm) {
  //   const word = form.value.word;
  //   const pastries: Pastrie[] = this.ps.search(word);

  //   this.searchPastries.emit(pastries)
  // }

  onChangeEmit(w: string) {
    const pastries: Pastrie[] = this.ps.search(w);
    console.log(pastries);

    this.searchPastries.emit(pastries)
  }

  onReload() {
    this.word = "";
    this.ps.getPastries().subscribe(pastries => this.searchPastries.emit(pastries));

  }
}
