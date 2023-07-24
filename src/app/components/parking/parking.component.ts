import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Parking } from 'src/app/models/parking';
import { Plate } from 'src/app/models/plate';
import { sharedService } from 'src/app/service/shared.service';
import { ParkingService } from 'src/app/service/parking.service';
import { PlateService } from 'src/app/service/plate.service';
import { UserService } from 'src/app/service/user.service';
import { SessionService } from 'src/app/service/session.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html'
})
export class ParkingComponent {
  plates: Plate[] = [];
  pendingParking: boolean = false;
  parking!: Parking;
  errorMessage: string | null = null;
  successMessage: string = "";

  @ViewChild('plateForm') plateForm!: NgForm;

  constructor(private userService: UserService,
    private sessionService: SessionService,
    private plateService: PlateService,
    private parkingService: ParkingService,
    private sharedService: sharedService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.pendingParking = false;
    this.getPlates();
    this.getPendingParking();
  }

  getPlates(): void {
    this.userService.getPlates().subscribe((response: HttpResponse<any>) => { 
      this.plates = response.body; 
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  getPendingParking(): void {
    this.parkingService.getPendingParking(this.sessionService.getSessionId()).subscribe((response: HttpResponse<any>) => {
      if (response.body != null) {
        this.parking = response.body;
        this.pendingParking = true;
      }
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  addPlate(plate: string): void {
    if(!plate) { 
      this.errorMessage = "Debe ingresar el numero de patente"; 
      return;
    };
    this.plateService.addPlate(plate).subscribe((reponse: HttpResponse<any>) => {
      this.plates.push(reponse.body);
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  startParking(plate: string) {
    this.parkingService.startParking(plate).subscribe((response: HttpResponse<any>) => {
      this.successMessage = response.body;
      this.getPendingParking();
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
      this.getPendingParking();
    });
  }

  finishParking(id: number) {
    this.parkingService.finishParking(id).subscribe((response: HttpResponse<any>) => {
      this.successMessage = response.body;
      this.pendingParking = false;
      this.sharedService.notifyUpdatedAccount();
    }, () => {
      this.errorMessage = this.errorMessageService.getErrorMessage();
    });
  }

  closeAlert() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  reset() {
    this.plateForm.reset({
        "plate": ""
    });
  }

}
