import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
})
export class PrintPageComponent implements OnInit, OnDestroy {
  printData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.printData = localStorage.getItem('printData') as string;
    this.printData = JSON.parse(this.printData);
  }
  ngOnDestroy(): void {
    localStorage.removeItem('printData');
  }

  print(): void {
    window.print();
  }
  goBack(): void {
    localStorage.removeItem('printData');
    this.router.navigate(['/main/orders']);
  }
}
