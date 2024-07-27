import { Component } from '@angular/core';
import { Policial } from '../../models/policial';
import { PolicialService } from '../../services/policial.service';

@Component({
  selector: 'app-policial',
  standalone: true,
  imports: [],
  templateUrl: './policial.component.html',
  styleUrl: './policial.component.scss',
})
export class PolicialComponent {
  policiais: Policial[] = [];

  constructor(private service: PolicialService) {}

  ngOnInit(): void {
    this.service.getPoliciais().subscribe((data) => {
      this.policiais = data;
    });
  }

  navigateTo(route: string) {
    window.location.href = route;
  }
}
