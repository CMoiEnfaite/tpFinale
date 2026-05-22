import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/edit-profile/edit-profile';

export const routes: Routes = [
    {path: '', component: Home, title: 'Home'},
    {path: 'register', component: Register, title: 'Inscription'},
    {path: 'login', component: Login, title: 'Connexion'},
    {path: 'profile', component: Profile, title: 'Profil'},
    {path: 'edit', component: EditProfile, title: 'Modifier votre profil'},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
