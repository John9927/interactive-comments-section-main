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
  imageUser: any;
  showReply: Boolean = false;
  showReplyComments: Boolean = false;
  showEdit: Boolean = false;

  constructor(public controls: ControlsService) { }

  ngOnInit(): void {
    this.controls.getAll().subscribe((data: Comments[]) => {
      console.log("AllData: ", data);
      this.allData = data;
    });

    this.controls.getCurrentUser().subscribe((data: any) => {
      var currentUser = data;
      this.imageUser = currentUser.image.png;
      this.currentUser = currentUser.username;
    });
  }

  idReply: any;
  usernameReply: any;
  idReplyComments: any;
  usernameReplyComments: any;
  arrayReplies: any;

  onClickReply(id: number, username: string) {
    console.log("Id: ", id, "Username: ", username);
    this.idReply = id;
    this.usernameReply = username;
    this.showReply = true;

    this.controls.getId(id).subscribe((res: any) => {
      this.arrayReplies = res;
    })
  }

  onClickReplyComments(id: number, username: string, idPadre: number) {
    console.log("Id: ", id, "Username: ", username, "Id Padre: ", idPadre);
    this.idReplyComments = id;
    this.usernameReplyComments = username;
    this.showReplyComments = true;
  }

  onClickEdit(id: number, username: string) {
    console.log("edit");
  }

  arrayPadre: any = [];
  arrayFiglio: any = [];
  idReplyEdit: any;
  onClickEditReply(id: number, username: string, idPadreReply: number) {
    this.idReplyEdit = id;
    // Recupero l'oggetto del padre e del figlio
    this.controls.getId(idPadreReply).subscribe((res: any) => {
      this.arrayPadre = res;
      this.arrayFiglio = this.arrayPadre.replies.filter((result: any) => {
        return result.id == id;
      })
      this.showEdit = true;
    })
  }

  onClickUpdate(value: string) {
    var totale = value;
    var arr = this.arrayPadre.replies.filter((result: any) => {
      return result.id == this.idReplyEdit;
    });
    var arrFi = this.arrayPadre.replies.filter((result: any) => {
      return result.id !== this.idReplyEdit;
    })
    arr[0].content = [];
    arr[0].content = totale;
    // Pusho l'array replies rimasti con l-array replies nuovo
    arrFi.push(...arr);
    // Pusho l'array padre con i replies nuovi
    this.arrayPadre.replies = [];
    this.arrayPadre.replies.push(...arrFi);
    // Creo il nuovo array nel json
    this.controls.createReply(this.arrayPadre.id, this.arrayPadre);
  }

  onClickDelete(id: number, username: string, idPadre: number) {
    console.log("Id: ", id, "Username: ", username, "Id Padre: ", idPadre);
    this.controls.idPadre = idPadre;
    this.controls.showDelete = true;
    this.controls.idCard = id;
  }

  submit(image: string, username: string, text: string) {
    var user = { image: { png: image }, username: username };
    var idRandom = this.controls.randomNumber(1, 1000);
    var comments = { id: idRandom, content: text, createdAt: "1 day ago", score: 0, user: user, replies: [] };
    this.controls.createComment(comments)
  }

  submitReply(image: string, username: string, text: string, replyingTo: string) {
    var user = { image: { png: image }, username: username };
    var idRandom = this.controls.randomNumber(1, 1000);
    var comments = { id: idRandom, content: text, createdAt: "1 day ago", score: 0, replyingTo: replyingTo, user: user };
    this.arrayReplies.replies.push(comments);
    this.controls.createReply(this.idReply, this.arrayReplies)
  }

}
