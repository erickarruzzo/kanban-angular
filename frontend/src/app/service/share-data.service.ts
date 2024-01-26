import { Injectable } from '@angular/core';
import { CardService } from './http-request/card.service';
import { doing, novo, todo } from '../core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor(private cardService: CardService) { }

  public todo: any[] = [];
  public doing: any[] = [];
  public done: any[] = [];
  public cards: any[] = [];

  emptyLists() {
    this.todo = [];
    this.doing = [];
    this.done = [];
  }

  async getCardsAndPopulateColumns(): Promise<void> {
    this.cards = await this.cardService.getCards();
    this.emptyLists();
    this.cards.forEach(card => {
      if (card.lista == todo) this.todo.push(card);
      else if (card.lista == doing) this.doing.push(card);
      else this.done.push(card);
    });
  }

}