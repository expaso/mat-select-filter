import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class MatSelectFilterComponent implements OnInit, OnDestroy {
    private searchFormValueChangesSubscription;
    input: any;
    array: any;
    placeholder: string;
    color: string;
    displayMember: string;
    showSpinner: boolean;
    noResultsMessage: string;
    hasGroup: boolean;
    groupArrayName: string;
    noResults: boolean;
    localSpinner: boolean;
    filteredReturn: EventEmitter<any>;
    filteredItems: any;
    searchForm: FormGroup;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    handleKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSelectFilterComponent, "mat-select-filter", never, { "array": { "alias": "array"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "color": { "alias": "color"; "required": false; }; "displayMember": { "alias": "displayMember"; "required": false; }; "showSpinner": { "alias": "showSpinner"; "required": false; }; "noResultsMessage": { "alias": "noResultsMessage"; "required": false; }; "hasGroup": { "alias": "hasGroup"; "required": false; }; "groupArrayName": { "alias": "groupArrayName"; "required": false; }; }, { "filteredReturn": "filteredReturn"; }, never, never, false, never>;
}
