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

  token = this.storageService.getToken();
  httpOptionsToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': FRONT_URL,
      'Access-Control-Allow-Methods': "PUT, POST, DELETE, GET, OPTIONS",
      'Access-Control-Allow-Headers': "Accept, Authorization, Content-Type",
      'Access-Control-Allow-Credentials': "true",
      'Authorization': `Bearer ${this.token}`
    })
  };


  getCards(): Promise<any> {
    return this.http.get(API_URL + "cards", this.httpOptionsToken).toPromise();
  }

  newCard(card: Card): Observable<any> {
    return this.http.post(API_URL + "cards", {
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: card.lista
    }, this.httpOptionsToken);
  }

  updateCard(card: Card): Observable<any> {
    return this.http.put(API_URL + "cards/" + card.id, {
      id: card.id,
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: card.lista
    }, this.httpOptionsToken);
  }

  deleteCard(card: Card): Observable<any> {
    return this.http.delete(API_URL + "cards/" + card.id, this.httpOptionsToken);
  }
}
