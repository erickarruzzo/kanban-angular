import { Injectable } from '@angular/core';
import { CardService } from './http-request/card.service';
import { DOING, DONE, TODO } from '../core/constants/constants';
import { Column } from '../core/model/column.model';
import { Card } from '../core/model/card.model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor(private cardService: CardService) { }

  columns = [
    new Column("todoList", "To Do", TODO, undefined, DOING),
    new Column("doingList", "Doing", DOING, TODO, DONE),
    new Column("doneList", "Done", DONE, DOING, undefined)
  ];

  public todo: any[] = [];
  public doing: any[] = [];
  public done: any[] = [];
  public cards: any[] = [];

  emptyLists() {
    this.columns.forEach(column => column.cards = []);
  }

  async getCardsAndPopulateColumns(): Promise<void> {
    this.cards = await this.cardService.getCards();
    console.log("me chamando")
    this.emptyLists();
    this.cards.forEach((card: any) => {
      this.columns.forEach(column => {
        if (column.code == card.lista) column.cards?.push(card);
      })
    });
  }

}
