import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLocalComponent } from './lista-local.component';

describe('ListaLocalComponent', () => {
  let component: ListaLocalComponent;
  let fixture: ComponentFixture<ListaLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
