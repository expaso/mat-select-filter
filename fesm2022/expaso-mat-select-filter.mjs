import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { A, Z, ZERO, NINE, SPACE } from '@angular/cdk/keycodes';
import * as i1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class MatSelectFilterService {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class MatSelectFilterComponent {
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

class MatSelectFilterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterModule, declarations: [MatSelectFilterComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatProgressSpinnerModule], exports: [MatSelectFilterComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatProgressSpinnerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MatSelectFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MatSelectFilterComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatProgressSpinnerModule
                    ],
                    exports: [MatSelectFilterComponent]
                }]
        }] });

/*
 * Public API Surface of mat-select-filter
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatSelectFilterComponent, MatSelectFilterModule, MatSelectFilterService };
//# sourceMappingURL=expaso-mat-select-filter.mjs.map
