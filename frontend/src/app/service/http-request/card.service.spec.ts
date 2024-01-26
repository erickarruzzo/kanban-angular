import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CardService } from './card.service';
import { StorageService } from '../storage.service';
import { Card } from '../../core/model/card.model';
import { API_URL, FRONT_URL } from '../../core/constants/constants';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;
  const storageServiceStub = {
    getToken: () => 'mocked-token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CardService,
        { provide: StorageService, useValue: storageServiceStub }
      ]
    });

    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve cards from API', (done) => {
    const mockCards: Card[] = [
      { id: "1", titulo: 'Card 1', conteudo: 'Conteudo 1', lista: 'todo' },
      { id: "2", titulo: 'Card 2', conteudo: 'Conteudo 2', lista: 'doing' }
    ];

    service.getCards().then((result) => {
      expect(result).toEqual(mockCards);
      done();
    });

    const request = httpMock.expectOne(API_URL + 'cards');
    expect(request.request.method).toBe('GET');
    request.flush(mockCards);
  });

  it('should add a new card via API', () => {
    const mockCard: Card = { id: "1", titulo: 'New Card', conteudo: 'New Content', lista: 'New List' };

    service.newCard(mockCard).subscribe(() => {
      // Assertion or additional logic if needed
    });

    const request = httpMock.expectOne(API_URL + 'cards');
    expect(request.request.method).toBe('POST');
    request.flush({});
  });

  it('should update an existing card via API', () => {
    const mockCard: Card = { id: "1", titulo: 'Updated Card', conteudo: 'Updated Content', lista: 'Updated List' };

    service.updateCard(mockCard).subscribe(() => {
      // Assertion or additional logic if needed
    });

    const request = httpMock.expectOne(API_URL + 'cards/1');
    expect(request.request.method).toBe('PUT');
    request.flush({});
  });

  it('should delete an existing card via API', () => {
    const mockCard: Card = { id: "1", titulo: 'Card to Delete', conteudo: 'Content to Delete', lista: 'List to Delete' };

    service.deleteCard(mockCard).subscribe(() => {
      // Assertion or additional logic if needed
    });

    const request = httpMock.expectOne(API_URL + 'cards/1');
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});