import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ColDef, GetRowNodeIdFunc, GridApi, GridReadyEvent, ICellRendererComp, ICellRendererParams, RowSpanParams } from 'ag-grid-community';
import { customStatsToolPanel } from "./custom-stats-tool-panel.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi;
  searchValue;
  frameworkComponents = { customStatsToolPanel: customStatsToolPanel };
  columnDefs: ColDef[] = [
    {
      field: 'ITEMS',
      cellRenderer: ShowCellRenderer,
      rowSpan: rowSpan,
      cellClassRules: {
        'show-cell': 'value !== undefined',
      },
      width: 200,
      autoHeight: true
    },
    { field: 'ORDER_QTY', editable: true },
    { field: 'TOTAL_PRICE' }
  ];

  rowData: any = [];

  public rowSelection = 'multiple';
  constructor(@Inject(DOCUMENT) private document: Document) { }
  ngOnInit(): void {
    this.resetValues();
  }

  onCellValueChanged(event) {
    var rowNode = this.gridApi.getRowNode(event.data.id)!;
    rowNode.setDataValue('TOTAL_PRICE', rowNode.data.ITEMS.UnitPrice * rowNode.data.ORDER_QTY);
    setTimeout(() => {
      let pinnedBottomData = this.generatePinnedBottomData();
      this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    }, 500);
  }

  resetValues() {
    this.rowData = [
    ];
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(() => {
      let pinnedBottomData = this.generatePinnedBottomData();
      this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
    }, 500);
  }

  generatePinnedBottomData() {
    // generate a row-data with null values
    let result = {};

    this.gridColumnApi.getAllGridColumns().forEach(item => {
      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }
  calculatePinnedBottomData(target: any) {
    //console.log(target);
    //list of columns fo aggregation
    let columnsWithAggregation = ['TOTAL_PRICE']
    columnsWithAggregation.forEach(element => {
      console.log('element', element);
      this.gridApi.forEachNodeAfterFilter((rowNode: any) => {
        //if(rowNode.index < 10){
        //console.log(rowNode);
        //}
        if (rowNode.data[element])
          target[element] += Number(rowNode.data[element].toFixed(2));
      });
      if (target[element])
        target[element] = `Net: ${target[element].toFixed(2)}`;
    })

    target['ORDER_QTY'] = 'Total Lines : ' + this.gridApi.getDisplayedRowCount();

    //console.log(target);
    return target;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  public getRowNodeId: GetRowNodeIdFunc = function (data) {
    return data.id;
  };

  refereshAllCell(value) {
    let objIndex = this.rowData.findIndex((obj => obj.id == value));
    if (objIndex != undefined) {

      if (objIndex < 0) {
        if (value == "ari")
          this.rowData.push({ id: "ari", ITEMS: { itemName: 'Ariel', UnitPrice: 8 }, ORDER_QTY: 1, TOTAL_PRICE: 8 });
        else if (value == "surf")
          this.rowData.push({ id: "surf", ITEMS: { itemName: 'Surf', UnitPrice: 80 }, ORDER_QTY: 1, TOTAL_PRICE: 80 });
        else if (value == "pampers")
          this.rowData.push({ id: "pampers", ITEMS: { itemName: 'Pampers', UnitPrice: 70 }, ORDER_QTY: 1, TOTAL_PRICE: 70 });
        else if (value == "biscuits")
          this.rowData.push({ id: "biscuits", ITEMS: { itemName: 'Biscuits', UnitPrice: 90 }, ORDER_QTY: 1, TOTAL_PRICE: 90 });
        else if (value == "shampoo")
          this.rowData.push({ id: "shampoo", ITEMS: { itemName: 'Shampoo', UnitPrice: 90 }, ORDER_QTY: 1, TOTAL_PRICE: 60 });
      }
      else
        this.rowData[objIndex].ORDER_QTY = parseInt(this.rowData[objIndex].ORDER_QTY) + 1;

      this.gridApi.setRowData(this.rowData);
      this.gridApi.applyTransaction({ update: this.rowData })!;
      var rowNode = this.gridApi.getRowNode(value)!;
      rowNode.setDataValue('TOTAL_PRICE', parseInt(rowNode.data.ITEMS.UnitPrice) * parseInt(rowNode.data.ORDER_QTY));
      setTimeout(() => {
        let pinnedBottomData = this.generatePinnedBottomData();
        this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
      }, 500);
    }
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    if(selectedData.length==0)
    alert("No Item Selected, Please select Item to remove");
    this.gridApi.applyTransaction({ remove: selectedData })!;
    this.rowData.splice(this.rowData.findIndex(a => a.id === selectedData[0].id), 1)
  }

  addAriel() {
    this.refereshAllCell("ari");
  }

  addPampers() {
    this.refereshAllCell("pampers");
  }

  addBiscuit() {
    this.refereshAllCell("biscuits");
  }

  addShampoo() {
    this.refereshAllCell("shampoo");
  }

  addSerf() {
    this.refereshAllCell("surf");
  }
}


///////// row spanning logic

class ShowCellRenderer implements ICellRendererComp {
  ui: any;

  init(params: ICellRendererParams) {
    const cellBlank = !params.value;
    if (cellBlank) {
      return;
    }

    this.ui = document.createElement('div');
    this.ui.innerHTML = params.value.itemName + "<br>" + 'Unit Price :' + params.value.UnitPrice;
  }

  getGui() {
    return this.ui;
  }

  refresh() {
    return false;
  }
}

function rowSpan(params: RowSpanParams) {
  if (params.data.show) {
    return 4;
  } else {
    return 1;
  }
}