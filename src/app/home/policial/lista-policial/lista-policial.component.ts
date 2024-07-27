import { Component } from '@angular/core';
import { Policial } from '../../../models/policial';
import { PolicialService } from '../../../services/policial.service';

@Component({
  selector: 'app-lista-policial',
  standalone: true,
  imports: [],
  templateUrl: './lista-policial.component.html',
  styleUrl: './lista-policial.component.scss',
})
export class ListaPolicialComponent {
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
