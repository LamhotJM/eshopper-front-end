import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patient: Patient = new Patient();
  submitted = false;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  newPatient(): void {
    this.submitted = false;
    this.patient = new Patient();
  }

  save() {
    this.patientService.createPatient(this.patient)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patient = new Patient();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
