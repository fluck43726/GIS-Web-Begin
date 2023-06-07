import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Assignment13RoutingModule } from './assignment1.3-routing.module';
import { Assignment13Component } from './assignment1.3.component';
import { CommentComponent } from './comment/comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';

@NgModule({
  declarations: [Assignment13Component, NewCommentComponent, CommentComponent],
  imports: [Assignment13RoutingModule, FormsModule, CommonModule],
  bootstrap: [Assignment13Component],
})
export class Assignment13Module {}
