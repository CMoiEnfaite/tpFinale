import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  succesMessage: string = '';
  
  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    this.errorMessage = '';
    this.succesMessage = '';

    if (this.auth.verifPassword(this.password, this.confirmPassword)) {
      this.auth.register(this.username, this.email, this.password).subscribe({
        next: (data) => {
          this.succesMessage = 'Vous êtes bien inscrit';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue';
        }
      });
    } else {
      this.errorMessage = 'Le mot de passe est incorrect';
    }
  }
}