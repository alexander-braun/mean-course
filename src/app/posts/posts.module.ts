import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [PostCreateComponent, PostListComponent],
})
export class PostsModule {}
