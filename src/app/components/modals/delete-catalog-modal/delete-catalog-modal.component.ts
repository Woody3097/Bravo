import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-catalog-modal',
  templateUrl: './delete-catalog-modal.component.html',
  styleUrls: ['./delete-catalog-modal.component.scss'],
})
export class DeleteCatalogModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteCatalogModalComponent>
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close({ isDelete: false });
  }

  submit(): void {
    this.dialogRef.close({ isDelete: true });
  }
}
