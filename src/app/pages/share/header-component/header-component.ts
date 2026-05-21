import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  isConnected = signal(false); // ← signal

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.isConnected.set(this.auth.isLoggedIn()); // ← .set() pour modifier
  }

  logout() {
    this.auth.logout();
    this.isConnected.set(false); // ← met à jour le signal
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}