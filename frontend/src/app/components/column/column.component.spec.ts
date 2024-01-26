import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';
import { ShareDataService } from '../../service/share-data.service';
import { CardService } from '../../service/http-request/card.service';
import { SnackbarService } from '../../service/snackbar.service';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CreateCardComponent } from '../../dialog/create-card/create-card.component';
import { CardComponent } from '../card/card.component';
import { ContainerComponent } from '../container/container.component';
import { HeaderComponent } from '../header/header.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  const mockCardService = jasmine.createSpyObj('CardService', ['updateCard']);
  const mockSnackbarService = jasmine.createSpyObj('SnackbarService', ['showErrorSnack']);
  const mockShareDataService = {
    todo: [{ id: "1", lista: 'todo' }],
    getCardsAndPopulateColumns: jasmine.createSpy('getCardsAndPopulateColumns')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent,
        ColumnComponent,
        ContainerComponent,
        HeaderComponent],
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
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCardsAndPopulateColumns on construction', () => {
    expect(mockShareDataService.getCardsAndPopulateColumns).toHaveBeenCalled();
  });

  it('should return true if there is a new card in the todo list', () => {
    expect(component.existsNewCard()).toBe(false);

    mockShareDataService.todo.push({ id: 'novo-1', lista: 'todo' });

    expect(component.existsNewCard()).toBe(true);
  });
});