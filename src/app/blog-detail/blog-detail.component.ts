import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../blog';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {

  blog$!: Observable<Blog>;

  constructor(readonly httpClient: HttpClient, readonly route: ActivatedRoute) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const blogId = routeParams.get('blogId');
    this.blog$ = this.httpClient.get<Blog>('blogs/' + blogId);
  }

}
