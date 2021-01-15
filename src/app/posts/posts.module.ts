import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule,
  ],
  exports: [PostCreateComponent, PostListComponent],
})
export class PostsModule {}
