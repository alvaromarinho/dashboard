import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from '../../shared/modal/modal.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent, ModalComponent],
      imports: [HttpClientModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
