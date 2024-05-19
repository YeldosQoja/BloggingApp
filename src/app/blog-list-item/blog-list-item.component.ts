import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list-item.component.html',
  styleUrl: './blog-list-item.component.css',
})
export class BlogListItemComponent implements OnInit {
  @Input() blog!: Blog;
  isLiked: boolean = false;
  likeCount: number = 0;

  constructor(readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    const { is_liked, num_likes } = this.blog;
    this.isLiked = is_liked;
    this.likeCount = num_likes;
  }

  onLike(event: Event) {
    event.stopPropagation();
    if (this.isLiked) {
      this.httpClient.delete(`blogs/${this.blog.id}/like/`).subscribe({
        next: (res) => {
          console.log(
            `You have deleted like from blog with id: ${this.blog.id}`,
            res
          );
          this.likeCount -= 1;
        },
      });
    } else {
      this.httpClient.post(`blogs/${this.blog.id}/like/`, {}).subscribe({
        next: (res) => {
          console.log(`You have liked blog with id: ${this.blog.id}`, res);
          this.likeCount += 1;
        },
      });
    }
    this.isLiked = !this.isLiked;
  }
}
