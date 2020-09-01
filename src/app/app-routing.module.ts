import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'single-contact',
    loadChildren: () => import('./pages/single-contact/single-contact.module').then( m => m.SingleContactPageModule)
  },
  {
    path: 'single-contact/:id',
    loadChildren: () => import('./pages/single-contact/single-contact.module').then( m => m.SingleContactPageModule)
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./pages/edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  },
  {
    path: 'new-contact',
    loadChildren: () => import('./pages/new-contact/new-contact.module').then( m => m.NewContactPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
