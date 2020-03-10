import { Patient } from '../patient';
import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '../patient.service';
import { PatientListComponent } from '../patient-list/patient-list.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  @Input() patient: Patient;

  constructor(private patientService: PatientService, private listComponent: PatientListComponent) { }

  ngOnInit() {
  }

}
