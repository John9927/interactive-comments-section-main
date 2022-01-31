import { ControlsService } from './../../../service/controls.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public controls: ControlsService) { }

  ngOnInit(): void {
    this.controls.getData();
  }

  onClickReply() {

  }

}
