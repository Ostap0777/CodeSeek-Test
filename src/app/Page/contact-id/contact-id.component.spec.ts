import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactIdComponent } from './contact-id.component';

describe('ContactIdComponent', () => {
  let component: ContactIdComponent;
  let fixture: ComponentFixture<ContactIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
