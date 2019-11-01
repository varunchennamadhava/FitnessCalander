import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderAPIComponent } from './calander-api.component';

describe('CalanderAPIComponent', () => {
  let component: CalanderAPIComponent;
  let fixture: ComponentFixture<CalanderAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalanderAPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalanderAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
