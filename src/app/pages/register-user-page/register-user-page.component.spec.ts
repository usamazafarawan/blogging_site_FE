import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationUserComponent } from './register-user-page.component';


describe('RegistrationUserComponent', () => {
  let component: RegistrationUserComponent;
  let fixture: ComponentFixture<RegistrationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
