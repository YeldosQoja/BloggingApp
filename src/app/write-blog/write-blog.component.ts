import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './write-blog.component.html',
  styleUrl: './write-blog.component.css',
})
export class WriteBlogComponent {
  blogForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    tagline: [''],
  });

  constructor(
    readonly formBuilder: FormBuilder,
    readonly httpClient: HttpClient
  ) {}

  onPublish() {
    this.httpClient.post('blogs/', {
      ...this.blogForm.value,
      created_at: Date.now(),
    }).subscribe({
      next: () => {
        window.alert('Blog post published successfully!');
      },
      error: (err) => {
        console.log(err);
        window.alert(err);
      },
    });
  }
}
