import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEscalaComponent } from './lista-escala.component';

describe('ListaEscalaComponent', () => {
  let component: ListaEscalaComponent;
  let fixture: ComponentFixture<ListaEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEscalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
