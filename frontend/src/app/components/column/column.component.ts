import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Card } from '../../core/model/card.model';
import { ShareDataService } from '../../service/share-data.service';
import { CardService } from '../../service/http-request/card.service';
import { NOVO } from '../../core/constants/constants';
import { SnackbarService } from '../../service/snackbar.service';
import { Column } from '../../core/model/column.model';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  @Input() columnName: string | undefined;
  @Input() columnCode: string | undefined;
  @Input() columnID: string = "";
  @Input() beforeList: string | undefined;
  @Input() afterList: string | undefined;
  @Input() columnCards!: Card[];


  constructor(public sharedDataService: ShareDataService, private cardService: CardService, private snackBarService: SnackbarService) {
  }

  drop(event: CdkDragDrop<any[]>, listTo?: string) {
    if (event.item.data.id.includes(NOVO)) return;
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

  updateCard(card: Card, lista?: string) {
    card.lista = lista;
    this.cardService.updateCard(card).subscribe({
      next: () => {
        this.snackBarService.showSuccessSnack("O cartão selecionado foi alterado com sucesso");
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
      if (card.id.includes(NOVO)) retorno = true;
    })
    return retorno;
  }

}
