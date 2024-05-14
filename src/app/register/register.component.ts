import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    username: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(
    readonly formBuilder: FormBuilder,
    readonly httpClient: HttpClient
  ) {}

  onRegister() {
    this.httpClient.post("http://localhost:8000/api/user/register/", this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
