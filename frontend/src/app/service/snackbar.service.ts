import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  showErrorSnack(message: string) {
    this._snackBar.open(message, "", {
      duration: 4000,
      panelClass: ['red-snackbar']
    });
  }

  showSuccessSnack(message: string) {
    this._snackBar.open(message, "", {
      duration: 4000,
      panelClass: ['green-snackbar']
    });
  }

  showInfoSnack(message: string) {
    this._snackBar.open(message, "", {
      duration: 4000,
      panelClass: ['white-snackbar']
    });
  }
  
}
