import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppMovieDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close('movie');
  }

  ngOnInit() {
  }

}