import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { BlogListItemComponent } from '../blog-list-item/blog-list-item.component';
import { Observable } from 'rxjs';
import { Blog } from '../blog';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-profile-blogs',
  standalone: true,
  imports: [BlogListItemComponent, NgForOf, AsyncPipe],
  templateUrl: './profile-blogs.component.html',
  styleUrl: './profile-blogs.component.css'
})
export class ProfileBlogsComponent implements OnInit {
  blogs$!: Observable<Blog[]>;
  destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.blogs$ = this.http.get<Blog[]>('blogs/').pipe(takeUntilDestroyed(this.destroyRef));
  }
}
