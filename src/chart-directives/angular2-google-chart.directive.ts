import {Directive, ElementRef, Input, Output, OnChanges, EventEmitter, HostBinding, HostListener} from '@angular/core';
declare const google: any;
declare let googleLoaded: any;
declare const googleChartsPackagesToLoad: any;
@Directive({
    selector: '[GoogleChart]'
})
export class GoogleChart implements OnChanges {
    public _element: any;
    @Input('chartType') public chartType: string;
    @Input('chartOptions') public chartOptions: Object;
    @Input('loadingDelay') public loadingDelay = 0;
    @Input('chartData') public chartData: Object;
    @Output('itemSelect') public itemSelect: EventEmitter<{ row: number, column: number }> = new EventEmitter();
    @Output('itemDeselect') public itemDeselect: EventEmitter<void> = new EventEmitter<void>();

    constructor(public element: ElementRef) {
        this._element = this.element.nativeElement;
    }

    ngOnChanges() {
        if (!googleLoaded) {
            googleLoaded = true;
            google.charts.load('current', {'packages': ['corechart', 'gauge']['orgchart']});
        }
        setTimeout(() => this.drawGraph(this.chartOptions, this.chartType, this.chartData, this._element), this.loadingDelay);
    }

    @HostListener('window:resize') onResize(event: Event) {
        this.drawGraph(this.chartOptions, this.chartType, this.chartData, this._element);
    }

    drawGraph(chartOptions, chartType, chartData, ele) {
        google.charts.setOnLoadCallback(drawChart);
        const self = this;

        function drawChart() {
            const data = new google.visualization.DataTable();
            const wrapper = new google.visualization.ChartWrapper({
                chartType: chartType,
                dataTable: chartData,
                options: chartOptions || {}
            });
            wrapper.draw(ele);
            google.visualization.events.addListener(wrapper, 'select', function () {                
                const selectedItem = wrapper.getChart().getSelection()[0];                
                // if (selectedItem) {
                //     let msg;
                //     if (selectedItem !== undefined) {
                //         const selectedRowValues = [];
                //         if (selectedItem.row !== null) {
                //             selectedRowValues.push(wrapper.getDataTable().getValue(selectedItem.row, 0));
                //             selectedRowValues.push(wrapper.getDataTable().getValue(selectedItem.row, selectedItem.column));
                //             msg = {
                //                 message: 'select',
                //                 row: selectedItem.row,
                //                 column: selectedItem.column,
                //                 selectedRowValues: selectedRowValues
                //             };
                //         }
                //     }
                //     self.itemSelect.emit(msg);
                // } else
                //     self.itemDeselect.emit();
            });
            let runOnce = google.visualization.events.addListener(wrapper, 'ready', function () {
                // remove the listener so that it doesn't stack up multiple events               
                google.visualization.events.removeListener(runOnce);                
                // add a mouseover event handler to highlight the bar
                google.visualization.events.addListener(wrapper.getChart(), 'onmouseover', function (e) {            
                 
                //console.log("e",e);
                // wrapper.setSelection([{row: e.row}]);
               
                   // alert(e.row);
                // set the view to remove the moused over elements from the first series and add them to the second series
                //wrapper.setView({
                    // rows: [0, {
                    //     type: 'number',
                    //     label: data.getRowLabel(1),
                    //     calc: function (dt, row) {
                    //         return (row == e.row) ? null : {v: dt.getValue(row, 1), f: dt.getFormattedValue(row, 1)};
                    //     }
                    // }, {
                    //     type: 'number',
                    //     label: data.getRowLabel(1),
                    //     calc: function (dt, row) {
                    //         return (row == e.row) ? {v: dt.getValue(row, 1), f: dt.getFormattedValue(row, 1)} : null;
                    //     }
                    // }]
               // });
               // wrapper.draw();
            });
            
            // add a mouseout event handler to clear highlighting
                // google.visualization.events.addListener(wrapper.getChart(), 'onmouseout', function () {
                    
                //     wrapper.setView();
                //     wrapper.draw();
                // });
            });    
        };
    };
}
