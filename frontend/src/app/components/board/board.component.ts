import { Component } from '@angular/core';
import { ShareDataService } from '../../service/share-data.service';
import { NOVO } from '../../core/constants/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  public constructor(public sharedDataService: ShareDataService){
    this.sharedDataService.getCardsAndPopulateColumns();
  }

  existsNewCard(): boolean {
    var retorno = false;
    this.sharedDataService.todo.forEach(card => {
      if (card.id.includes(NOVO)) retorno = true;
    })
    return retorno;
  }

}
