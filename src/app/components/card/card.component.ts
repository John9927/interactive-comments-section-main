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

  constructor(public controls: ControlsService) { }

  ngOnInit(): void {
    this.controls.getAll().subscribe((data: Comments[]) => {
      console.log(data);
      this.allData = data;
      this.allData.map((res: any) => {
        this.allReplies = res.replies;
        console.log("Risposte: ", this.allReplies);
      })
  })
}

onClickReply(id: number, username: string) {
  console.log(id)
  console.log(username)
}

}
