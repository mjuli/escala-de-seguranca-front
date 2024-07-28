import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hide = true;

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciais inválidas!');
    }
  }

  forgotPassword() {
    console.log('Forgot Password clicked');
  }
}
