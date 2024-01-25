import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Card } from '../../core/model/card.model';
import { ShareDataService } from '../../service/share-data.service';
import { CardService } from '../../service/http-request/card.service';
import { novo } from '../../core/constants/constants';
import { SnackbarService } from '../../service/snackbar.service';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  constructor(public sharedDataService: ShareDataService, private cardService: CardService, private snackBarService: SnackbarService) {
    this.sharedDataService.getCardsAndPopulateColumns();
  }

  drop(event: CdkDragDrop<any[]>, listTo: string) {
    if (event.item.data.id.includes(novo)) return;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateCard(event.item.data, listTo);
    }
  }

  updateCard(card: Card, lista: string) {
    card.lista = lista;
    this.cardService.updateCard(card).subscribe({
      next: res => {
        this.sharedDataService.getCardsAndPopulateColumns();
      },
      error: err => {
        console.error(err.message, err);
        this.snackBarService.showErrorSnack("Erro ao alterar um card");
      }
    });
  }

  existsNewCard(): boolean {
    var retorno = false;
    this.sharedDataService.todo.forEach(card => {
      if (card.id.includes(novo)) retorno = true;
    })
    return retorno;
  }

}
