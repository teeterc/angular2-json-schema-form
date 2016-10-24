import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { buildTitleMap, JsonPointer } from '../utilities/index';

@Component({
  selector: 'select-widget',
  template: `
    <div *ngIf="layoutNode?.pointer" [formGroup]="formControlGroup">
      <select
        [formControlName]="layoutNode?.name"
        [id]="layoutNode?.pointer"
        [class]="layoutNode?.fieldHtmlClass"
        [name]="layoutNode?.name"
        [attr.readonly]="layoutNode?.readonly ? 'readonly' : null"
        [attr.required]="layoutNode?.required">
        <option [value]="item.value" *ngFor="let item of titleMap">{{item.name}}</option>
      </select>
    </div>
    <select *ngIf="!layoutNode?.pointer"
      [class]="layoutNode?.fieldHtmlClass"
      [name]="layoutNode?.name"
      [attr.readonly]="layoutNode?.readonly ? 'readonly' : null"
      [attr.required]="layoutNode?.required">
      <option [value]="item.value" *ngFor="let item of titleMap">{{item.name}}</option>
    </select>`,
})
export class SelectComponent implements OnInit {
  private formControlGroup: any;
  private titleMap: any[] = [];
  @Input() formGroup: FormGroup;
  @Input() layoutNode: any;
  @Input() formOptions: any;

  ngOnInit() {
    if ('pointer' in this.layoutNode) {
      this.formControlGroup =
        JsonPointer.getFromFormGroup(this.formGroup, this.layoutNode.pointer, true);
    }
    this.titleMap = buildTitleMap(this.layoutNode.titleMap,
      this.layoutNode.enum, !!this.layoutNode.required);
  }
}