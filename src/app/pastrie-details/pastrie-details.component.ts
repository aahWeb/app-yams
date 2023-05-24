import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pastrie } from '../pastrie';
import { INGREDIENTS_LISTS as ingredients } from '../mock-pastries';
import { Max } from "../mock-pastries"

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrls: ['./pastrie-details.component.scss'],
})
export class PastrieDetailsComponent {
  @Input() bar: string = '';
  @Input() pastrie: Pastrie | null = null;
  @Input() count: number | null = null;
  // pour sortir de l'enfant vers ... Un parent avec un emit 
  @Output() changePreference : EventEmitter<string> = new EventEmitter();
  maxPreference : number = Max ; // éviter le hardcoding = un seul fichier pour les constantes

  getIngredients(id: string): string[] | null {
    const i = ingredients.find(i => i.id == id) ;

    if(i) return i.list ;
    
    return null ;
  }

  preference(id : string){
    // console.log(id);

    // emit une valeur qui passera par le selector vers le parent
    this.changePreference.emit(id);
  }
}
