import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  private auth = inject(Auth);
  private router = inject(Router);

  user = this.auth.user;

  username: string = '';
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  succesMessage: string = '';

  ngOnInit() {
    this.username = this.auth.user()?.username ?? '';
    this.email = this.auth.user()?.email ?? '';
  }

  updateProfile() {
    const id = this.auth.user()?.id;
    if (!id) return;

    this.errorMessage = '';
    this.succesMessage = '';

    if (this.currentPassword || this.newPassword) {
      if (!this.auth.verifPassword(this.newPassword, this.confirmPassword)) {
        this.errorMessage = 'Le mot de passe doit contenir 8 caractères minimum, une majuscule et un chiffre';
        return;
      }

      this.auth.changePassword(id, this.currentPassword, this.newPassword).subscribe({
        next: () => {
          this.succesMessage = 'Mot de passe changé avec succès !';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue';
        }
      });

    } else {
      this.auth.updateProfile(id, this.username, this.email).subscribe({
        next: (data) => {
          this.auth.user.set(data);
          this.succesMessage = 'Profil mis à jour avec succès !';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue';
        }
      });
    }
  }

  removeProfile(){
    const id = this.auth.user()?.id;
    if (!id) return;

    this.auth.deleteProfile(id).subscribe({
        next: () => {
          this.succesMessage = 'Profil supprimer avec succès !';
          this.auth.logout();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue';
        }
      });
  }
}