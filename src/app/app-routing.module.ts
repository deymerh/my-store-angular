import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

// import { CustomPreloadService } from './services/custom-preload.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('./website/website.module').then(m=>m.WebsiteModule),
    // data: { preload: true}
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: ()=>import('./cms/cms.module').then(m=>m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // **Inicio**
    //Esa estrategia solo es buena para apps pequeñas
    // preloadingStrategy: PreloadAllModules
    // **Fin**
    
    // **Inicio**
    //Esa recomendable esta para aplicaiones grandes
    // preloadingStrategy: CustomPreloadService
    // **Fin**
    
    // **Inicio**
    //Esta es la mejor
    preloadingStrategy: QuicklinkStrategy
    // **Fin**

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }