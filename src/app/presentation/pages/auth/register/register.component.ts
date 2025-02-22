import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule,RouterModule],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '500ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
