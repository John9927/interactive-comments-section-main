import { ControlsService } from './../../service/controls.service';
import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/interface/comments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filter_array: any = [];
  filter: any = [];
  array: any;
  arrayPadre: any = [];
  arrayRisposte: any = [];

  constructor(public control: ControlsService) { }

  ngOnInit(): void { }

  onClickButton(value: string) {
    // Reset filter array
    this.filter_array = [];

    // RICERCA ID TRA I COMMENTI E LE RISPOSTE
    if (value == "no") {
      this.control.showDelete = false;
    } else {
      // TROVO TUTTO IL CONTENUTO DEL COMMENTO
      this.control.getId(this.control.idPadre).subscribe((res: any) => {
        this.arrayPadre = res;
        this.arrayRisposte = res.replies;
        // SE ID PADRE E' UGUALE A ID CARD ALLORA ELIMINA IL COMMENTO
        if (this.control.idPadre == this.control.idCard) {
          this.control.deleteReply(this.control.idPadre);
        } else {
          // FILTRO LE RISPOSTE
          var filter = this.arrayPadre.replies.filter((results: any) => {
            return results.id == this.control.idCard;
          });

          // ELIMINO LA RISPOSTA FILTRANDO QUELLE CHE SONO DIVERSE DALL'ID
          var new__array__replies = this.arrayRisposte.filter((res: any) => {
            return res.id !== filter[0].id;
          });

          // AZZERO LE RISPOSTE PUSHANDO QUELLE NUOVE NELL'ARRAY DEL PADRE
          this.arrayRisposte = [];
          this.arrayRisposte = new__array__replies;
          this.arrayPadre.replies = [];
          this.arrayPadre.replies.push(...this.arrayRisposte);

          // AGGIUNGO IL NUOVO ARRAY NEL FILE JSON
          this.control.createReply(this.arrayPadre.id, this.arrayPadre);
        }
      })
    }
  }
}
