import { Component } from '@angular/core';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-page',
  imports: [
    NgbAlertModule,
    ButtonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
