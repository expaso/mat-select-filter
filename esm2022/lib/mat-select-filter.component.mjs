import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { A, Z, ZERO, NINE, SPACE, } from '@angular/cdk/keycodes';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/progress-spinner";
export class MatSelectFilterComponent {
    searchFormValueChangesSubscription;
    input;
    array;
    placeholder;
    color;
    displayMember;
    showSpinner = true;
    noResultsMessage = 'No results';
    hasGroup;
    groupArrayName;
    noResults = false;
    localSpinner = false;
    filteredReturn = new EventEmitter();
    filteredItems = [];
    searchForm;
    constructor(fb) {
        this.searchForm = fb.group({
            value: ''
        });
    }
    ngOnInit() {
        this.searchFormValueChangesSubscription = this.searchForm.valueChanges.subscribe(value => {
            if (this.showSpinner) {
                this.localSpinner = true;
            }
            if (value['value']) {
                // IF THE DISPLAY MEMBER INPUT IS SET WE CHECK THE SPECIFIC PROPERTY
                if (this.displayMember == null) {
                    this.filteredItems = this.array.filter(name => name.toLowerCase().includes(value['value'].toLowerCase()));
                    // OTHERWISE, WE CHECK THE ENTIRE STRING
                }
                else if (this.hasGroup && this.groupArrayName && this.displayMember) {
                    this.filteredItems = this.array.map(a => {
                        const objCopy = Object.assign({}, a);
                        objCopy[this.groupArrayName] = objCopy[this.groupArrayName].filter(g => g[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
                        return objCopy;
                    }).filter(x => x[this.groupArrayName].length > 0);
                }
                else {
                    this.filteredItems = this.array.filter(name => name[this.displayMember].toLowerCase().includes(value['value'].toLowerCase()));
                }
                // NO RESULTS VALIDATION
                this.noResults = this.filteredItems == null || this.filteredItems.length === 0;
            }
            else {
                this.filteredItems = this.array.slice();
                this.noResults = false;
            }
            this.filteredReturn.emit(this.filteredItems);
            setTimeout(() => {
                if (this.showSpinner) {
                    this.localSpinner = false;
                }
            }, 2000);
        });
        setTimeout(() => {
            this.input.nativeElement.focus();
        }, 500);
        if (!this.placeholder) {
            this.placeholder = 'Search...';
        }
    }
    handleKeydown(event) {
        // PREVENT PROPAGATION FOR ALL ALPHANUMERIC CHARACTERS IN ORDER TO AVOID SELECTION ISSUES
        if ((event.key && event.key.length === 1) ||
            (event.keyCode >= A && event.keyCode <= Z) ||
            (event.keyCode >= ZERO && event.keyCode <= NINE) ||
            (event.keyCode === SPACE)) {
            event.stopPropagation();
        }
    }
    ngOnDestroy() {
        this.filteredReturn.emit(this.array);
        this.searchFormValueChangesSubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MatSelectFilterComponent, selector: "mat-select-filter", inputs: { array: "array", placeholder: "placeholder", color: "color", displayMember: "displayMember", showSpinner: "showSpinner", noResultsMessage: "noResultsMessage", hasGroup: "hasGroup", groupArrayName: "groupArrayName" }, outputs: { filteredReturn: "filteredReturn" }, viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
  <form [formGroup]="searchForm" class="mat-filter" [ngStyle]="{'background-color': color ? color : 'white'}">
  <div>
  <input #input class="mat-filter-input" matInput placeholder="{{placeholder}}" formControlName="value" (keydown)="handleKeydown($event)">
    <mat-spinner *ngIf="localSpinner" class="spinner" diameter="16"></mat-spinner>
  </div>
  <div *ngIf="noResults"
     class="noResultsMessage">
  {{noResultsMessage}}
</div>
</form>
  `, isInline: true, styles: [".mat-filter{position:sticky;top:0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;z-index:100;font-size:inherit;box-shadow:none;border-radius:0;padding:16px;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-filter-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border:0;background-color:unset;color:gray;width:100%}.spinner{position:absolute;right:16px;top:calc(50% - 8px)}.noResultsMessage{margin-top:10px;font-family:Roboto,Helvetica Neue,sans-serif;font-size:16px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-select-filter', template: `
  <form [formGroup]="searchForm" class="mat-filter" [ngStyle]="{'background-color': color ? color : 'white'}">
  <div>
  <input #input class="mat-filter-input" matInput placeholder="{{placeholder}}" formControlName="value" (keydown)="handleKeydown($event)">
    <mat-spinner *ngIf="localSpinner" class="spinner" diameter="16"></mat-spinner>
  </div>
  <div *ngIf="noResults"
     class="noResultsMessage">
  {{noResultsMessage}}
</div>
</form>
  `, styles: [".mat-filter{position:sticky;top:0;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;z-index:100;font-size:inherit;box-shadow:none;border-radius:0;padding:16px;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-filter-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border:0;background-color:unset;color:gray;width:100%}.spinner{position:absolute;right:16px;top:calc(50% - 8px)}.noResultsMessage{margin-top:10px;font-family:Roboto,Helvetica Neue,sans-serif;font-size:16px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }], propDecorators: { input: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], array: [{
                type: Input,
                args: ['array']
            }], placeholder: [{
                type: Input,
                args: ['placeholder']
            }], color: [{
                type: Input,
                args: ['color']
            }], displayMember: [{
                type: Input,
                args: ['displayMember']
            }], showSpinner: [{
                type: Input,
                args: ['showSpinner']
            }], noResultsMessage: [{
                type: Input,
                args: ['noResultsMessage']
            }], hasGroup: [{
                type: Input,
                args: ['hasGroup']
            }], groupArrayName: [{
                type: Input,
                args: ['groupArrayName']
            }], filteredReturn: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tYXQtc2VsZWN0LWZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFckcsT0FBTyxFQUNMLENBQUMsRUFDRCxDQUFDLEVBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEdBQ04sTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFrQi9CLE1BQU0sT0FBTyx3QkFBd0I7SUFDM0Isa0NBQWtDLENBQWU7SUFDbkIsS0FBSyxDQUFDO0lBRTVCLEtBQUssQ0FBTTtJQUNMLFdBQVcsQ0FBUztJQUMxQixLQUFLLENBQVM7SUFDTixhQUFhLENBQVM7SUFDeEIsV0FBVyxHQUFHLElBQUksQ0FBQztJQUNkLGdCQUFnQixHQUFHLFlBQVksQ0FBQztJQUN4QyxRQUFRLENBQVU7SUFDWixjQUFjLENBQVM7SUFFaEQsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUVsQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ1gsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFFNUMsYUFBYSxHQUFRLEVBQUUsQ0FBQztJQUN4QixVQUFVLENBQVk7SUFFN0IsWUFBWSxFQUFlO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN6QixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGtDQUFrQyxHQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4RixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckIsSUFB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dUJBQUMsZ0JBQWdCO2dCQUtiLGNBQWM7c0JBQXZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIEEsXHJcbiAgWixcclxuICBaRVJPLFxyXG4gIE5JTkUsXHJcbiAgU1BBQ0UsIEVORCwgSE9NRSxcclxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtc2VsZWN0LWZpbHRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICA8Zm9ybSBbZm9ybUdyb3VwXT1cInNlYXJjaEZvcm1cIiBjbGFzcz1cIm1hdC1maWx0ZXJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvciA/IGNvbG9yIDogJ3doaXRlJ31cIj5cclxuICA8ZGl2PlxyXG4gIDxpbnB1dCAjaW5wdXQgY2xhc3M9XCJtYXQtZmlsdGVyLWlucHV0XCIgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiIChrZXlkb3duKT1cImhhbmRsZUtleWRvd24oJGV2ZW50KVwiPlxyXG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwibG9jYWxTcGlubmVyXCIgY2xhc3M9XCJzcGlubmVyXCIgZGlhbWV0ZXI9XCIxNlwiPjwvbWF0LXNwaW5uZXI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIm5vUmVzdWx0c1wiXHJcbiAgICAgY2xhc3M9XCJub1Jlc3VsdHNNZXNzYWdlXCI+XHJcbiAge3tub1Jlc3VsdHNNZXNzYWdlfX1cclxuPC9kaXY+XHJcbjwvZm9ybT5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL21hdC1zZWxlY3QtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHNlYXJjaEZvcm1WYWx1ZUNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIGlucHV0O1xyXG5cclxuICBASW5wdXQoJ2FycmF5JykgYXJyYXk6IGFueTtcclxuICBASW5wdXQoJ3BsYWNlaG9sZGVyJykgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBASW5wdXQoJ2NvbG9yJykgY29sb3I6IHN0cmluZztcclxuICBASW5wdXQoJ2Rpc3BsYXlNZW1iZXInKSBkaXNwbGF5TWVtYmVyOiBzdHJpbmc7XHJcbiAgQElucHV0KCdzaG93U3Bpbm5lcicpIHNob3dTcGlubmVyID0gdHJ1ZTtcclxuICBASW5wdXQoJ25vUmVzdWx0c01lc3NhZ2UnKSBub1Jlc3VsdHNNZXNzYWdlID0gJ05vIHJlc3VsdHMnO1xyXG4gIEBJbnB1dCgnaGFzR3JvdXAnKSBoYXNHcm91cDogYm9vbGVhbjtcclxuICBASW5wdXQoJ2dyb3VwQXJyYXlOYW1lJykgZ3JvdXBBcnJheU5hbWU6IHN0cmluZztcclxuXHJcbiAgbm9SZXN1bHRzID0gZmFsc2U7XHJcblxyXG4gIGxvY2FsU3Bpbm5lciA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBmaWx0ZXJlZFJldHVybiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBwdWJsaWMgZmlsdGVyZWRJdGVtczogYW55ID0gW107XHJcbiAgcHVibGljIHNlYXJjaEZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgY29uc3RydWN0b3IoZmI6IEZvcm1CdWlsZGVyKSB7XHJcbiAgICB0aGlzLnNlYXJjaEZvcm0gPSBmYi5ncm91cCh7XHJcbiAgICAgIHZhbHVlOiAnJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VhcmNoRm9ybVZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9ICB0aGlzLnNlYXJjaEZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnNob3dTcGlubmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhbFNwaW5uZXIgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZVsndmFsdWUnXSkge1xyXG4gICAgICAgIC8vIElGIFRIRSBESVNQTEFZIE1FTUJFUiBJTlBVVCBJUyBTRVQgV0UgQ0hFQ0sgVEhFIFNQRUNJRklDIFBST1BFUlRZXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheU1lbWJlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSB0aGlzLmFycmF5LmZpbHRlcihuYW1lID0+IG5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZVsndmFsdWUnXS50b0xvd2VyQ2FzZSgpKSk7XHJcbiAgICAgICAgICAvLyBPVEhFUldJU0UsIFdFIENIRUNLIFRIRSBFTlRJUkUgU1RSSU5HXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0dyb3VwICYmIHRoaXMuZ3JvdXBBcnJheU5hbWUgJiYgdGhpcy5kaXNwbGF5TWVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSB0aGlzLmFycmF5Lm1hcChhID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqQ29weSA9IE9iamVjdC5hc3NpZ24oe30sIGEpO1xyXG4gICAgICAgICAgICBvYmpDb3B5W3RoaXMuZ3JvdXBBcnJheU5hbWVdID0gb2JqQ29weVt0aGlzLmdyb3VwQXJyYXlOYW1lXS5maWx0ZXIoZyA9PiBnW3RoaXMuZGlzcGxheU1lbWJlcl0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZVsndmFsdWUnXS50b0xvd2VyQ2FzZSgpKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmpDb3B5O1xyXG4gICAgICAgICAgfSkuZmlsdGVyKHggPT4geFt0aGlzLmdyb3VwQXJyYXlOYW1lXS5sZW5ndGggPiAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5maWx0ZXJlZEl0ZW1zID0gdGhpcy5hcnJheS5maWx0ZXIobmFtZSA9PiBuYW1lW3RoaXMuZGlzcGxheU1lbWJlcl0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZVsndmFsdWUnXS50b0xvd2VyQ2FzZSgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5PIFJFU1VMVFMgVkFMSURBVElPTlxyXG5cclxuICAgICAgICB0aGlzLm5vUmVzdWx0cyA9IHRoaXMuZmlsdGVyZWRJdGVtcyA9PSBudWxsIHx8IHRoaXMuZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDA7XHJcblxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSB0aGlzLmFycmF5LnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy5ub1Jlc3VsdHMgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpbHRlcmVkUmV0dXJuLmVtaXQodGhpcy5maWx0ZXJlZEl0ZW1zKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1NwaW5uZXIpIHtcclxuICAgICAgICAgIHRoaXMubG9jYWxTcGlubmVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXIpIHtcclxuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgLy8gUFJFVkVOVCBQUk9QQUdBVElPTiBGT1IgQUxMIEFMUEhBTlVNRVJJQyBDSEFSQUNURVJTIElOIE9SREVSIFRPIEFWT0lEIFNFTEVDVElPTiBJU1NVRVNcclxuICAgIGlmICgoZXZlbnQua2V5ICYmIGV2ZW50LmtleS5sZW5ndGggPT09IDEpIHx8XHJcbiAgICAgIChldmVudC5rZXlDb2RlID49IEEgJiYgZXZlbnQua2V5Q29kZSA8PSBaKSB8fFxyXG4gICAgICAoZXZlbnQua2V5Q29kZSA+PSBaRVJPICYmIGV2ZW50LmtleUNvZGUgPD0gTklORSkgfHxcclxuICAgICAgKGV2ZW50LmtleUNvZGUgPT09IFNQQUNFKSkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZpbHRlcmVkUmV0dXJuLmVtaXQodGhpcy5hcnJheSk7XHJcbiAgICB0aGlzLnNlYXJjaEZvcm1WYWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19