import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../blog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BlogListItemComponent } from '../blog-list-item/blog-list-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, BlogListItemComponent, CommonModule, BlogListItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  blogs$!: Observable<Blog[]>;
  constructor(readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.blogs$ = this.httpClient.get<Blog[]>('blogs/home/');
    this.blogs$.subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
