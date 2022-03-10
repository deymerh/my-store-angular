import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from '../website/directives/highlight.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ImgComponent } from './components/img/img.component';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductComponent,
    ProductsListComponent,
    ImgComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductComponent,
    ProductsListComponent,
    ImgComponent
  ]
})
export class SharedModule { }
