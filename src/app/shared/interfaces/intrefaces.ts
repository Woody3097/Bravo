export interface SectionDataInterface {
  displayedColumns: string[];
  dataSource: any;
  openModal: any;
  sortFunction: any;
  searchFunction: any;
}

export interface CustomerElement {
  customerName: string;
  customerNo: number;
  customerAddress: string;
  dayNames: string;
}

export interface CatalogElement {
  productCode: number;
  productName: number;
  productUnit: [];
  productsPrice: string;
  productAvailability: string;
}
