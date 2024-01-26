import { TestBed, inject } from '@angular/core/testing';
import { ShareDataService } from './share-data.service';
import { CardService } from './http-request/card.service';
import { Observable, of } from 'rxjs';
import { todo, doing } from '../core/constants/constants';

class MockCardService {
  getCards(): Observable<any[]> {
    // Simular a resposta do serviço
    return of([
      { id: 1, lista: todo },
      { id: 2, lista: doing },
      { id: 3, lista: todo },
    ]);
  }
}

describe('ShareDataService', () => {
  let service: ShareDataService;
  let cardService: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShareDataService,
        { provide: CardService, useClass: MockCardService },
      ],
    });

    service = TestBed.inject(ShareDataService);
    cardService = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear lists when calling emptyLists()', () => {
    // Inicializa as listas para simular algum estado atual
    service.todo = [{ id: 1, lista: todo }];
    service.doing = [{ id: 2, lista: doing }];
    service.done = [{ id: 3, lista: doing }];

    // Chama o método para esvaziar as listas
    service.emptyLists();

    // Verifica se as listas estão vazias
    expect(service.todo.length).toBe(0);
    expect(service.doing.length).toBe(0);
    expect(service.done.length).toBe(0);
  });
});