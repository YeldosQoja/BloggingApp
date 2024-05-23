import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../blog';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BlogListItemComponent } from '../blog-list-item/blog-list-item.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogListItemComponent, AsyncPipe, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  blogs$!: Observable<Blog[]>;
  destroyRef = inject(DestroyRef);

  constructor(readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.blogs$ = this.httpClient
      .get<Blog[]>('blogs/home/')
      .pipe(takeUntilDestroyed(this.destroyRef));
    this.blogs$.subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
