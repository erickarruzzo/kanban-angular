import { TestBed, inject } from '@angular/core/testing';
import { ShareDataService } from './share-data.service';
import { CardService } from './http-request/card.service';
import { Observable, of } from 'rxjs';
import { TODO, DOING } from '../core/constants/constants';

class MockCardService {
  getCards(): Observable<any[]> {
    // Simular a resposta do serviço
    return of([
      { id: 1, lista: TODO },
      { id: 2, lista: DOING },
      { id: 3, lista: TODO },
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
    service.todo = [{ id: 1, lista: TODO }];
    service.doing = [{ id: 2, lista: DOING }];
    service.done = [{ id: 3, lista: DOING }];

    // Chama o método para esvaziar as listas
    service.emptyLists();

    // Verifica se as listas estão vazias
    expect(service.todo.length).toBe(0);
    expect(service.doing.length).toBe(0);
    expect(service.done.length).toBe(0);
  });
});