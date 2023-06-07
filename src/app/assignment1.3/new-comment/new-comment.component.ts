import { Component } from '@angular/core';

export type CommentType = {
  name: string;
  comment: string;
  time: string;
};

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent {
  title = 'Assign1_3';
  index = -1;
  itemArr: CommentType[] = [];
  edittingItem: CommentType = {
    name: '',
    comment: '',
    time: '',
  };

  genDate() {
    let dt = new Date();
    return (
      dt.toLocaleString('en-US', { dateStyle: 'long' }) +
      ' ' +
      dt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  onSubmit() {
    if (this.index >= 0) {
      this.itemArr[this.index] = structuredClone({
        ...this.edittingItem,
        time: this.genDate(),
      });
      this.index = -1;
    } else {
      this.itemArr.push(
        structuredClone({
          ...this.edittingItem,
          time: this.genDate(),
        })
      );
    }

    this.edittingItem = {
      name: '',
      comment: '',
      time: '',
    };
  }

  onEdit = (arrIndex: number) => {
    this.index = arrIndex;
    this.edittingItem = structuredClone(this.itemArr[arrIndex]);
  };

  onDelete = (arrIndex: number) => {
    this.itemArr.splice(arrIndex, 1);
  };
}
