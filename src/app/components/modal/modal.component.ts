import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  closeModal(): void {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
  }

}
