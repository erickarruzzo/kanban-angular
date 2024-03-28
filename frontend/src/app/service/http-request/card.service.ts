import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../core/model/card.model';
import { API_URL, FRONT_URL } from '../../core/constants/constants';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient, private storageService: StorageService) { }

  getCards() {
    return this.http.get<Card[]>(API_URL + "cards");
  }

  newCard(card: Card): Observable<any> {
    return this.http.post(API_URL + "cards", {
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: card.lista
    });
  }

  updateCard(card: Card): Observable<any> {
    return this.http.put(API_URL + "cards/" + card.id, {
      id: card.id,
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: card.lista
    });
  }

  deleteCard(card: Card): Observable<any> {
    return this.http.delete(API_URL + "cards/" + card.id);
  }
}
