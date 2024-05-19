import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    readonly formBuilder: FormBuilder,
    readonly httpClient: HttpClient,
    readonly router: Router,
  ) {}

  onLogin(): void {
    this.httpClient
      .post<{ access: string; refresh: string }>('token/', this.loginForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('ACCESS_TOKEN', res.access);
          localStorage.setItem('REFRESH_TOKEN', res.refresh);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
