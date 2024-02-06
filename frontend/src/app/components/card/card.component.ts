import { Component, Input } from '@angular/core';
import { ShareDataService } from '../../service/share-data.service';
import { Card } from '../../core/model/card.model';
import { CardService } from '../../service/http-request/card.service';
import { SnackbarService } from '../../service/snackbar.service';
import { DOING, DONE, TODO } from '../../core/constants/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(public sharedDataService: ShareDataService, private cardService: CardService, private snackBarService: SnackbarService) { }

  @Input() card: any;
  visualizationMode = true;

  dropCard(card: Card | undefined) {
    const idStr = card?.id;
    if (!idStr?.includes("novo")) {
      this.deleteCard(card);
    }

    switch (card?.lista) {
      case "todo": {
        this.sharedDataService.todo = this.sharedDataService.todo.filter((c: Card) => c.id !== card.id)
        break;
      }
      case "doing": {
        this.sharedDataService.doing = this.sharedDataService.doing.filter((c: Card) => c.id !== card.id)
        break;
      }
      case "done": {
        this.sharedDataService.done = this.sharedDataService.done.filter((c: Card) => c.id !== card.id)
        break;
      }
    }
  }

  createNewCard(card: any) {
    this.cardService.newCard(card).subscribe({
      next: async res => {
        this.sharedDataService.getCardsAndPopulateColumns();
        this.snackBarService.showSuccessSnack("O cartão foi criado com sucesso");
      },
      error: err => {
        console.error(err.message, err);
        this.snackBarService.showErrorSnack("Erro ao criar um novo card");
      }
    });
  }

  updateCard(card: Card, lista?:string) {
    debugger
    if (lista) card.lista = lista;
    this.cardService.updateCard(card).subscribe({
      next: () => {
        this.sharedDataService.getCardsAndPopulateColumns();
        this.snackBarService.showSuccessSnack("O cartão selecionado foi alterado com sucesso");
        
      },
      error: err => {
        console.error(err.message, err);
        this.snackBarService.showErrorSnack("Erro ao alterar um card");
      }
    });
  }

  deleteCard(card: any) {
    this.cardService.deleteCard(card).subscribe({
      next: res => {
        this.snackBarService.showSuccessSnack("O cartão selecionado foi excluído com sucesso");
      },
      error: err => {
        console.error(err.message, err);
        this.snackBarService.showErrorSnack("Erro ao deletar um card");
      }
    });
  }

  checkNextColumn(card: Card, tooltip?: boolean): any {
    const lista = card.lista;
    if (lista === TODO)
      return tooltip ? "Doing" : DOING;
    else if (lista === DOING)
      return tooltip ? "Done" : DONE
    return null;
  }

  checkPreviousColumn(card: Card, tooltip?: boolean): any {
    const lista = card.lista;
    if (lista === DOING)
      return tooltip ? "To Do" : TODO;
    else if (lista === DONE)
      return tooltip ? "Doing" : DOING
    return null;
  }
}

