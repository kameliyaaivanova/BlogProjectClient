import { Routes } from '@angular/router';
import { AboutMeComponent } from './core/about-me/about-me.component';
import { CategoriesComponent } from './core/categories/categories.component';
import { CategoryDetailComponent } from './core/categories/category-detail/category-detail.component';
import { ContactComponent } from './core/contact/contact.component';
import { HomeComponent } from './core/home/home.component';
import { PostOverviewComponent } from './core/home/post-overview/post-overview.component';
import { LoginComponent } from './core/login/login.component';
import { PostDetailComponent } from './core/posts/post-detail/post-detail.component';
import { PostsComponent } from './core/posts/posts.component';
import { RegisterComponent } from './core/register/register.component';
import { RoleDetailComponent } from './core/roles/role-detail/role-detail.component';
import { RolesComponent } from './core/roles/roles.component';
import { ActivityComponent } from './core/stats/activity/activity.component';
import { DeletedFilesComponent } from './core/stats/deleted-files/deleted-files.component';
import { UserDetailComponent } from './core/users/user-detail/user-detail.component';
import { UsersComponent } from './core/users/users.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { categoryGuard } from './shared/guards/category.guard';
import { postGuard } from './shared/guards/post.guard';
import { roleGuard } from './shared/guards/role.guard';
import { statsGuard } from './shared/guards/stats.guard';
import { userGuard } from './shared/guards/user.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'p/:id', component: PostOverviewComponent, canActivate: [AuthGuard] },

  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard, categoryGuard] },
  { path: 'categories/:id', component: CategoryDetailComponent, canActivate: [AuthGuard, categoryGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard, roleGuard] },
  { path: 'roles/:id', component: RoleDetailComponent, canActivate: [AuthGuard, roleGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, userGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard, userGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard, postGuard] },
  { path: 'posts/:id', component: PostDetailComponent, canActivate: [AuthGuard, postGuard] },
  { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard, statsGuard] },
  { path: 'deleted-files', component: DeletedFilesComponent, canActivate: [AuthGuard, statsGuard] },
  { path: '**', component: NotFoundComponent }
];
