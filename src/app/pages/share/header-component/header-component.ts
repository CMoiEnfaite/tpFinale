import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  isConnected = this.auth.isConnected;
  user = this.auth.user;

  logout() {
    this.auth.logout();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}