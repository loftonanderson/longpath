import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { City } from "src/app/models/city.model";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit, OnInit {
  
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  dropdownPopoverShow = false;
  public cities: City[] = []; 

  constructor(
    private cityDataService: DataService
  ) {}

  ngOnInit(): void {
    this.cityDataService.getData().toPromise().then(data => {
      this.cities = data;
    })
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}
