import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from "@angular/forms";
import { HouseData } from 'src/app/model/houseData';
import { HousePriceService } from 'src/app/service/house-price.service';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  public houseData!:HouseData;
  public housePredictedPrice!:string;
  public popup: string = "modal fade"
  public readonly FORM_NAME = {
    MSZONING: 'MSZoning',
    BLDGTYPE: 'BldgType',
    HEATINGQC: 'HeatingQC',
    YEARBUILT: 'YearBuilt',
    HEATING: 'Heating',
    KITCHENQUAL: 'KitchenQual',
    GARAGECARS: 'GarageCars',
    FULLBATH: 'FullBath',
    SALETYPE: 'SaleType',
    SALECONDITION: 'SaleCondition',
  }

  housePriceFormGroup: FormGroup = this.fb.group({
    [this.FORM_NAME.MSZONING]: [null],
    [this.FORM_NAME.BLDGTYPE]: [null],
    [this.FORM_NAME.HEATINGQC]: [null],
    [this.FORM_NAME.YEARBUILT]: [null],
    [this.FORM_NAME.HEATING]: [null],
    [this.FORM_NAME.KITCHENQUAL]: [null],
    [this.FORM_NAME.GARAGECARS]: [null],
    [this.FORM_NAME.FULLBATH]: [null],
    [this.FORM_NAME.SALETYPE]: [null],
    [this.FORM_NAME.SALECONDITION]: [null],
  });

  constructor(private readonly fb: FormBuilder,private housePriceService: HousePriceService,
              config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.housePriceService.getAll().subscribe(
      (results: HouseData) =>{
        this.houseData=results;
      }
    )
  }

  clear() {
    this.housePriceFormGroup.reset();
  }

  onSubmit() {
    this.housePriceService.askForPrice(this.housePriceFormGroup.value).subscribe(result => {
      this.housePredictedPrice = result
    });
    this.popup = "modal fade show";

  }

  onClick() {
    this.popup = "modal fade";
  }

  clickOther(event: any) {
    this.popup = event.target.id === "exampleModalCenter" || "closeButton" ? "modal fade" : "modal fade show";
    this.clear()
  }
}
