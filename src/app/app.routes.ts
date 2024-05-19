import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'write/blogs', component: WriteBlogComponent },
  { path: 'blogs/:blogId', component: BlogDetailComponent },
];
