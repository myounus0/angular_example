import { Component } from "@angular/core";

import { IToolPanel, IToolPanelParams } from "ag-grid-community";

@Component({
    selector: 'custom-stats',
    template: ` `

})
export class customStatsToolPanel implements IToolPanel {
    private params!: IToolPanelParams;

    agInit(params: IToolPanelParams): void {
        this.params = params;
    }
    export() {
        this.params.api.exportDataAsCsv()
    }
    refresh() { }
}
