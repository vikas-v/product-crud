import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/(?=.*[A-Z])/)])]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.isSubmitted = false;
      this.errorMsg = '';
      this.router.navigateByUrl('/');
    }, (error) => {
      this.errorMsg = error;
      this.isSubmitted = false;
    });
  }
}
