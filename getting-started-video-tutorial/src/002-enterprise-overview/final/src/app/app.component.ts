import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef,AgChartThemeOverrides,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', chartDataType:'category'},
    { field: 'age'},
    { field: 'country' },
    { field: 'year', chartDataType:'series'},
    { field: 'date'},
    { field: 'sport'},
    { field: 'gold'},
    { field: 'silver'},
    { field: 'bronze'},
    { field: 'total'},
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    enableRowGroup: true
  };

  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      title: {
        enabled: true,
        text: 'Medals by Age',
      },
    },
    column: {
      axes: {
        category: {
          label: {
            rotation: 0,
          },
        },
      },
    },
  };
  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json');
  }
}
