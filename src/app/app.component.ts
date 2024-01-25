import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { StorageService } from './service/storage.service';
import { SnackbarService } from './service/snackbar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Kanban';
  errorMessage = '';
  constructor(private authService: AuthService, private storageService: StorageService, private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    this.authService.login('letscode', 'lets@123').subscribe({
      next: token => {
        this.storageService.setToken(token);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.error(this.errorMessage, err);
        this.snackBarService.showErrorSnack("Erro no login");
      }
    });
  }
}
