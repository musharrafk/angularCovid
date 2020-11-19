import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';


declare var $: any;
declare var require: any;


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ['Company', 'jobPostedDate', 'link', 'location', 'title', 'keyword', 'created_at'];
  dataSource = ELEMENT_DATA;
  currentPage: any;

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  public columnDefs: any[];
  public rowData: any[];
  public gridOptions: any;
  public info: string;
  public defaultColDef: any;
  public overlayLoadingTemplate;
  public pivotPanelShow;

  gridApi: any;
  columnApi: any;
  getDataSource: any;
  onCellValueChanged: any;
  SizeChangeEvent = false;
  html: any;
  private paginationNumberFormatter;
  pageLimit = 100;
  type: any;

  constructor(public ad: AdminService, public dialog: MatDialog, private router: Router) { }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  /******* Grid functions for pagewise dataload Start *******/
  private getRowData(startRow: number, endRow: number, sortModel: any, filterModel: any): Observable<any> {
    this.gridOptions.api.showLoadingOverlay()
    if (!startRow) {
      startRow = 0;
    } else {
      if (this.SizeChangeEvent) {
        startRow = 0;
      } else {

      }
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const brand = user.brand
    let types = '';
    // alert(this.router.url)
    if (this.router.url == '/admin/completed') {
      types = 'completed';
      this.type = 'Completed';
    } else if (this.router.url == '/admin/pending') {
      types = 'pending';
      this.type = 'Pending';

    } else {
      types = 'total';
      this.type = 'Total';

    }
    const newParams = { 'startRow': startRow, 'limit': this.pageLimit, 'filter': filterModel, 'sort': sortModel, 'brand': brand, 'type': types };

    // console.log('i am here');
    return this.ad.getIndeed(newParams);     // Service call for dataload on paging
  }

  onGridReady(params: any) {


    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();

    var datasource = {
      getRows: (params: any) => {
        console.log(params.startRow);
        this.info = "Getting datasource rows, start: " + params.startRow + ", end: " + params.endRow;
        // console.log(this.info);
        this.gridApi.showLoadingOverlay()

        this.getRowData(params.startRow, params.endRow, params.sortModel, params.filterModel)
          .subscribe(data => {
            console.log(data);
            // return
            if (data['err'] == "unauthorized") {
              alert('Session has been expire!!');
              // this.CS.Logout();
            }
            // return
            this.gridApi.hideOverlay();
            params.successCallback(data['data'], data["count"])
          });

      }
    };
    this.getDataSource = datasource; // Set datasource to display after delete.
    params.api.setDatasource(datasource);

  }

  ngOnInit() {
    // this.ad.getIndeed('param').subscribe((e: any) => {
    //   this.dataSource = e.result;
    // });

    var wfheight = $(window).height();
    $('.custom_grid').height(wfheight - 85);


    this.columnDefs = [
      {
        headerName: 'S.No.', valueGetter: 'node.rowIndex + 1', width: 80
      },
      {
        headerName: 'Account ID', width: 180, field: 'account_id', tooltipField: 'project_name', filter: "agTextColumnFilter",
        // filterParams: {
        //   filterOptions: ["equals", "lessThan", "greaterThan", "Like"],
        //   newRowsAction: "keep"
        // }
      },
      {
        headerName: 'Account Name', width: 230, field: 'account_name', tooltipField: 'Title', filter: "agTextColumnFilter",
      },
      // {
      //   headerName: 'Account Owner', field: 'account_owner', width: 180, cellStyle: { "text-align": "center" }
      // },
      // {
      //   headerName: 'Billing City', field: 'billing_city', tooltipField: 'creater_name', maxWidth: 180
      // },
      {
        headerName: 'Brand', field: 'brand_name', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      },
      // {
      //   headerName: 'Created By', field: 'created_by', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      // },
      // {
      //   headerName: 'Email', field: 'email_id', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      // },
      {
        headerName: 'Industry', field: 'industry_name', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      },
      {
        headerName: 'Sub Industry', field: 'sub_industry_name', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      },
      // {
      //   headerName: 'Mobile', field: 'mobile', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      // },
      // {
      //   headerName: 'Phone', field: 'phone', tooltipField: 'description', width: 180, cellStyle: { "text-align": "left" }
      // },
      {
        headerName: 'Billig State', field: 'billing_state', tooltipField: 'description', width: 150, cellStyle: { "text-align": "left" }
      },
      {
        headerName: 'Action', field: 'account_name', width: 100, cellRenderer: function (params: any) {

          return `<a href="javascript:void(0)" data-action-type='edit' title='Edit' class='mat-icon material-icons' style='color:#d42328;'>edit</a>`;
        }
      }


    ];
    this.defaultColDef = { resizable: true };
    this.paginationNumberFormatter = (params) => {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.overlayLoadingTemplate = '<span ><i class="fa fa-hourglass-half text-green">  </i> Please wait while your data is loading</span>';

    this.gridOptions = {
      rowSelection: 'multiple',
      cacheBlockSize: 100,
      maxBlocksInCache: 1,
      enableServerSideFilter: true,
      enableServerSideSorting: true,
      enableSorting: true,
      floatingFilter: true,
      animateRows: true,
      rowModelType: 'infinite',
      pagination: true,
      blockLoadDebounceMillis: false,

      rowGroupPanelShow: "always",
      // this.pivotPanelShow = "always",
      // paginationAutoPageSize: true,
      suppressColumnMoveAnimation: true,
      paginationPageSize: 20,
      enableBrowserTooltips: true
    };

    // this.goToPage()
  }

  onRowClicked(e) {
    console.log(e.data)
    console.log(e.event.target.getAttribute('data-action-type'));
    if (e.event.target !== undefined && e.event.target != null) {
      const data = e.event.target.getAttribute('data-action-type');
      if (data === 'edit') {
        this.onActionEditClick(e.data);

      } else {

      }
    }
  }


  onActionEditClick(row) {
    console.log('here')
    // console.log(row)
    console.log(this.gridApi.paginationProxy.currentPage)
    const subId = row.sub_industry;
    const indusId = row.industry;

    var rowData = {
      id: row.id,
      account_owner: row.account_owner,
      account_name: row.account_name,
      biling_state: row.biling_state,
      billing_street: row.billing_street,
      billing_city: row.billing_city,
      account_id: row.account_id,
      created_by: row.created_by,
      industry: indusId,
      sub_industry: subId,
      email_id: row.email_id,
      phone: row.phone,
      mobile: row.mobile,
      created_date: row.created_date,
      brand_name: row.brand_name,
      brand: row.brand,
    };
    // console.log(rowData)
    this.ad.populateForm(rowData);
    // console.log(row)
    // this.ad.projectId = true;
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // dialogConfig.height = "auto";
    // dialogConfig.data = { id: '' };
    // const dialogRef = this.dialog.open(EditDetailsComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   // Update grid while new school added
    //   console.log(result);
    //   this.currentPage = this.gridApi.paginationProxy.currentPage;
    //   // this.gridApi.setDatasource(this.getDataSource);




    // });
  }

  goToPage(value) {
    this.gridApi.paginationGoToPage(value);
  }




}
