import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMarcacaoEscalaComponent } from './lista-marcacao-escala.component';

describe('ListaMarcacaoEscalaComponent', () => {
  let component: ListaMarcacaoEscalaComponent;
  let fixture: ComponentFixture<ListaMarcacaoEscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMarcacaoEscalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMarcacaoEscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
