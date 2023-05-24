import { Component, OnInit } from '@angular/core';
import { PASTRIES, Max } from '../mock-pastries';
import { Paginate, Pastrie, PreferencePastries } from '../pastrie';
import { PastriesService } from '../pastries.service';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.scss'],
})
export class PastriesComponent implements OnInit {
  pastries: Pastrie[] = PASTRIES;
  titlePage: string = 'Page principale : liste des pâtisseries à gagner';
  preferencePastries: PreferencePastries[] = [];
  count: number = 0;
  color : string = "#009688";

  foo: string = 'hello';
  currentPastrie: Pastrie | null = null;

  constructor(private ps : PastriesService) {
    console.log('Constructor');
    this.ps.get().subscribe(pastries => {
      console.log("PASTRIES")
      console.log(pastries)
      console.log("PASTRIES")
    })
  }

  ngOnInit(): void {
    console.log('Monter dans le DOM ...');
  }

  // (click) = récupère la pastrie
  onSelect(pastrie: Pastrie):void {
    console.log(pastrie);

    this.currentPastrie = pastrie;
  }

  changeParentPreference($event: string) :void{
    console.log($event);

    const pastrie: Pastrie | undefined = this.pastries.find(
      (p) => p.id == $event
    );

    if (pastrie) {
      pastrie.choice = !pastrie.choice;

      if (pastrie.choice && this.count < Max) this.count++;
      if (!pastrie.choice && this.count > 0 ) this.count--;

    }
  }

  search($event : Pastrie[]):void{
    this.pastries = $event ;
  }

  paginate($event: Paginate):void{
    const { start, end } = $event ;
    this.pastries = this.ps.paginate(start, end) ;
  }
}
