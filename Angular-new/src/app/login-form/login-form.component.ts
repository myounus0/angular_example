import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private fb: FormBuilder,
    private router: Router) { }


  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  login() {
    if (this.loginForm.controls['username'].value == "admin" && this.loginForm.controls['password'].value == "admin")
      this.router.navigate(['/home']);
    else {
      alert("Invalid username or password")
    }
  }

}
