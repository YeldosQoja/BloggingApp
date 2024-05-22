import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type RegisterFormGroup = {
  [Property in keyof User]: FormControl<User[Property]>;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup<RegisterFormGroup>({
    firstName: new FormControl('', {
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  destroyRef = inject(DestroyRef);

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService
      .register(this.registerForm.value as User)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
