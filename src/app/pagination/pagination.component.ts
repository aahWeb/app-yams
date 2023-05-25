import { Component, EventEmitter, Output } from '@angular/core';
import { PastriesService } from '../pastries.service';
import { Paginate } from '../pastrie';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  perPage: number = 3; // nombre de patisseries par page
  currentPage: number = 1;
  numberPages: number = 0;
  total: number = 0;
  pages: number[] = [];
  @Output() paginate: EventEmitter<Paginate> = new EventEmitter();

  constructor(private ps: PastriesService) {

    // l'api nous retourne le nombre de pastries on attendra d'avoir cette information
    // avant de faire les autres calculs pour la pagination.
    this.ps.count().subscribe((count) => {
      console.log(count, 'PAGINATION');

      this.total = count;
      this.numberPages = Math.ceil(this.total / this.perPage);
      // Array est un generateur de nombre en puissance 
      this.pages = [...Array(this.numberPages).keys()].map(page => page + 1);
      // on écoute le subject quoi qu'il arrive
    });

    this.ps.getCurrentPage().subscribe(page => {
      console.log(`PAGE NUMBER : ${page}`);
      /**
       * le composant qui a changé l'item de la navigation le notifie pour
       * lui-même et donc pour les autres, dans ce cas si un composant paginate
       * n'était sur la même page il se met à jour.
       */
      this.currentPage = page;
    });
  }

  next() {
    this.currentPage = (this.currentPage == this.numberPages) ? 1 : this.currentPage + 1;
    this.paginate.emit(this.calculPaginate(this.currentPage));
    this.ps.setCurrentPage(this.currentPage);
  }

  previous() {
    this.currentPage = (this.currentPage == 1) ? this.numberPages : this.currentPage - 1;
    this.paginate.emit(this.calculPaginate(this.currentPage));
    this.ps.setCurrentPage(this.currentPage);
  }

  selectedPage(page: number) {
    this.currentPage = page;
    this.paginate.emit(this.calculPaginate(this.currentPage));
    this.ps.setCurrentPage(this.currentPage);
  }

  calculPaginate(page: number): Paginate {
    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;

    return { start, end };
  }

}
