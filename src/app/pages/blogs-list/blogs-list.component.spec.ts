import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogsListPageComponent } from './blogs-list.component';


describe('BlogsListPageComponent', () => {
  let component: BlogsListPageComponent;
  let fixture: ComponentFixture<BlogsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
