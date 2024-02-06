import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { ShareDataService } from '../../service/share-data.service';
import { CardService } from '../../service/http-request/card.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { DONE, DOING, TODO } from '../../core/constants/constants';
import { MatIconModule } from '@angular/material/icon';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CreateCardComponent } from '../../dialog/create-card/create-card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockCardService = jasmine.createSpyObj('CardService', ['newCard', 'updateCard', 'deleteCard']);
  const mockSnackbarService = jasmine.createSpyObj('SnackbarService', ['showSuccessSnack', 'showErrorSnack']);
  const mockShareDataService = {
    todo: [],
    doing: [],
    done: [],
    getCardsAndPopulateColumns: jasmine.createSpy('getCardsAndPopulateColumns')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        { provide: CardService, useValue: mockCardService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: ShareDataService, useValue: mockShareDataService }
      ],
      imports: [CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterOutlet,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatToolbarModule,
        MatMenuModule,
        MatMenuTrigger,
        CdkDropList,
        CdkDrag,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        FormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        CreateCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = { id: 1, lista: TODO }; // Adjust card data as needed
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call newCard, getCardsAndPopulateColumns, and show success snack when createNewCard is called', () => {
    mockCardService.newCard.and.returnValue(of({}));
    component.createNewCard({});

    expect(mockCardService.newCard).toHaveBeenCalled();
    expect(mockShareDataService.getCardsAndPopulateColumns).toHaveBeenCalled();
    expect(mockSnackbarService.showSuccessSnack).toHaveBeenCalledWith('O cartão foi criado com sucesso');
  });

  it('should call updateCard, getCardsAndPopulateColumns, and show success snack when updateCard is called', () => {
    mockCardService.updateCard.and.returnValue(of({}));
    component.updateCard({ id: "1", lista: TODO }, DOING);

    expect(mockCardService.updateCard).toHaveBeenCalled();
    expect(mockShareDataService.getCardsAndPopulateColumns).toHaveBeenCalled();
    expect(mockSnackbarService.showSuccessSnack).toHaveBeenCalledWith('O cartão selecionado foi alterado com sucesso');
  });

  it('should call deleteCard and show success snack when deleteCard is called', () => {
    mockCardService.deleteCard.and.returnValue(of({}));
    component.deleteCard({ id: "1", lista: TODO });

    expect(mockCardService.deleteCard).toHaveBeenCalled();
    expect(mockSnackbarService.showSuccessSnack).toHaveBeenCalledWith('O cartão selecionado foi excluído com sucesso');
  });

  it('should return "Doing" or doing when checkNextColumn is called with appropriate parameters', () => {
    const card = { id: "1", lista: TODO };

    expect(component.checkNextColumn(card)).toBe(DOING);
    expect(component.checkNextColumn(card, true)).toBe('Doing');
  });

  it('should return "To Do" or todo when checkPreviousColumn is called with appropriate parameters', () => {
    const card = { id: "1", lista: DOING };

    expect(component.checkPreviousColumn(card)).toBe(TODO);
    expect(component.checkPreviousColumn(card, true)).toBe('To Do');
  });
});