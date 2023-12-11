import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraExitoComponent } from './compra-exito.component';

describe('CompraExitoComponent', () => {
  let component: CompraExitoComponent;
  let fixture: ComponentFixture<CompraExitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraExitoComponent]
    });
    fixture = TestBed.createComponent(CompraExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
