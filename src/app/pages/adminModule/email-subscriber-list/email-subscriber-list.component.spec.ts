import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailSubscriberListComponent } from './email-subscriber-list.component';


describe('EmailSubscriberListComponent', () => {
  let component: EmailSubscriberListComponent;
  let fixture: ComponentFixture<EmailSubscriberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSubscriberListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSubscriberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
