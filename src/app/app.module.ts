import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, provideRouter } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { ColumnComponent } from './components/column/column.component';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CreateCardComponent } from "./dialog/create-card/create-card.component";




@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        ColumnComponent,
        ContainerComponent,
        HeaderComponent
    ],
    providers: [httpInterceptorProviders, provideAnimations()],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
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
        CreateCardComponent
    ]
})
export class AppModule { }
