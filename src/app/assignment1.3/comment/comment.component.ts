import { Component, Input } from '@angular/core';
import { CommentType } from '../new-comment/new-comment.component';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() item: CommentType;
  @Input() index: number;
  @Input() onEditFunc: (arrIndex: number) => void;
  @Input() onDeleteFunc: (arrIndex: number) => void;
}
