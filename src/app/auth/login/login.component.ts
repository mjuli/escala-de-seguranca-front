import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { JWTTokenService } from '../../services/jwttoken.service'; // Ajuste o caminho de importação

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

  constructor(private router: Router, private jwtTokenService: JWTTokenService) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      this.jwtTokenService.setToken(token);
      this.router.navigate(['/home']);
    } else {
      alert('Credenciais inválidas!');
    }
  }

  forgotPassword() {
    console.log('Forgot Password clicked');
  }
}
