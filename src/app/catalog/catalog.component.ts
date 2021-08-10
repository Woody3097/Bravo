import { Component, OnInit } from '@angular/core';
import {SectionDataInterface} from "../shared/interfaces/intrefaces";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  catalogData: SectionDataInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
