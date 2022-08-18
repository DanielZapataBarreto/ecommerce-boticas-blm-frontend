import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showReport } from 'src/app/shared/utils/messages.util';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  id: string;

  constructor(private router: Router) {
    this.id = localStorage.getItem('_id')!;
  }

  ngOnInit(): void {
    if (this.id) {
      showReport(
        'success',
        'Pago exitoso',
        'Se ha realizado correctamente el pago'
      );
    }
    this.router.navigate(['/']);
  }
}
