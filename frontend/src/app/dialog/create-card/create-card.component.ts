import { Component, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Card } from '../../core/model/card.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NOVO, TODO } from '../../core/constants/constants';
import { ShareDataService } from '../../service/share-data.service';
import { CardService } from '../../service/http-request/card.service';
import { SnackbarService } from '../../service/snackbar.service';

export interface DialogData {
  card: any;
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule]
})
export class CreateCardComponent {
  @Input() disabled: boolean = false;
  @Input() callbackFunction!: (args: any) => void;
  data: any;
  card!: Card;

  constructor(public dialog: MatDialog, public sharedDataService: ShareDataService, private cardService: CardService, private snackBarService: SnackbarService) { }

  openDialog(): void {
    const card: Card = {
      id: NOVO,
      titulo: "",
      conteudo: "",
      lista: TODO
    }
    const dialogRef = this.dialog.open(CreateCardDialogComponent, {
      data: { card: card },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.newCard(result.card).subscribe({
          next: () => {
            this.sharedDataService.getCardsAndPopulateColumns();
          },
          error: err => {
            console.error(err.message, err);
            this.snackBarService.showErrorSnack("Erro tentar abrir a dialog");
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-create-card-dialog',
  templateUrl: 'create-card-dialog.component.html',
  styleUrl: './create-card-dialog.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
})
export class CreateCardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick() {
    if (this.dialogRef) this.dialogRef.close()
    return;
  }
}
