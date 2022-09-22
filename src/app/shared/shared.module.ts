import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { LoaderComponent } from './components/loader/loader.component';

const components = [ErrorDialogComponent, CategoryPipe, LoaderComponent];
@NgModule({
  declarations: [...components],
  imports: [CommonModule, AppMaterialModule],
  exports: [...components],
})
export class SharedModule {}
