import { ControlsService } from '../../service/controls.service';
import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/interface/comments';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  allData: Comments[] = [];
  allReplies: Comments[] = [];
  currentUser: any;

  constructor(public controls: ControlsService) { }

  ngOnInit(): void {
    this.controls.getAll().subscribe((data: Comments[]) => {
      console.log("AllData: ", data);
      this.allData = data;
    });

    this.controls.getCurrentUser().subscribe((data: any) => {
      var currentUser = data;
      this.currentUser = currentUser.username;
      console.log("CurrentUser: ", this.currentUser);
    });


  }

  onClickReply(id: number, username: string) {
    console.log("Id: ", id, "Username: ", username);
  }

  onClickEdit(id: number, username: string) {
    console.log("edit");

  }

  onClickDelete(id: number, username: string) {
    console.log("Id: ", id, "Username: ", username);

  }

}
