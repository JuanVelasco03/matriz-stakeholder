import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { row } from '../../interfaces/matriz.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-matriz-stakeholder',
  standalone: true,
  imports: [ TranslateModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './matriz-stakeholder.component.html',
  styleUrl: './matriz-stakeholder.component.css'
})
export class MatrizStakeholderComponent implements OnInit{


  fb = inject(FormBuilder);

  ngOnInit(): void {
    // setInterval(() => {
    //   this.addRow(this.internComunication);
    // }, 2000);

    // setTimeout(() => {
    //   this.deleteRow(0, this.internComunication)
    // }, 2000)
  }


  formRow: FormGroup = this.fb.group({
    public: ['', [ Validators.required ]],
    caracters: ['', [ Validators.required ]],
    influence: ['', [ Validators.required ]],
    need: ['', [ Validators.required ]],
    offer: ['', [ Validators.required ]],
    languaje: ['', [ Validators.required ]],
    messages: ['', [ Validators.required ]],
    existsComunication: ['', [ Validators.required ]]
  });

  internComunication: FormGroup[] = [
    this.formRow
  ];

  externComunication: FormGroup[] = [
    this.formRow
  ];

  marketingComunication: FormGroup[] = [
    this.formRow
  ];

  addRow(array: FormGroup[]){
    array.push(this.formRow);
  }

  deleteRow(index: number, array: FormGroup[]){
    array.splice(index, 1);
  }


}
