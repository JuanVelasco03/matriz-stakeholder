import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { row } from '../../interfaces/matriz.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


import { MatExpansionModule } from '@angular/material/expansion';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-matriz-stakeholder',
  standalone: true,
  imports: [ TranslateModule, ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule, MatExpansionModule, MatSelectModule],
  templateUrl: './matriz-stakeholder.component.html',
  styleUrl: './matriz-stakeholder.component.css'
})
export class MatrizStakeholderComponent implements OnInit {

  fb = inject(FormBuilder);

  ngOnInit(): void {
    // setInterval(() => {
    //   this.addRow(this.internComunication);
    // }, 2000);

    // setTimeout(() => {
    //   this.deleteRow(0, this.internComunication)
    // }, 2000)

    // setInterval(() => {
    //   this.getValuesForms()
    // }, 1000)
  }

  degreesPower = [
    'Alta', 'Media', 'Baja'
  ]

  internComunication: FormGroup[] = [
    this.getFormRow()
  ];

  externComunication: FormGroup[] = [
    this.getFormRow()
  ];

  marketingComunication: FormGroup[] = [
    this.getFormRow()
  ];

  getFormRow(){
    const formRow: FormGroup = this.fb.group({
      public: ['', Validators.required],
      caracters: ['', Validators.required],
      influence: ['', Validators.required],
      need: ['', Validators.required],
      offer: ['', Validators.required],
      languaje: ['', Validators.required],
      messages: ['', Validators.required],
      existsComunication: ['', Validators.required]
    });

    return formRow;
  }

  addRow(array: FormGroup[]){
    const rowForm = this.getFormRow()
    array.push(rowForm);
  }

  deleteRow($index: number, array: FormGroup[]) {
    console.log($index);
    const selectedFormRow = array[$index];

    if (selectedFormRow) {
      const entriesForm = Object.entries(selectedFormRow.value);

      // Verificar si hay algún campo diligenciado
      const hasFilledFields = entriesForm.some(([key, value]) => value !== '');

      if (hasFilledFields) {
        // Mostrar alerta si hay campos diligenciados
        Swal.fire({
          icon: 'warning',
          text: '¿Estás seguro que deseas eliminar esta fila?, perderás la información diligenciada.',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            array.splice($index, 1);
          }
        });
      } else {
        // Eliminar la fila directamente si todos los campos están vacíos
        array.splice($index, 1);
      }
    }
  }

  saveValuesForms(){
    this.internComunication.forEach(element => {
      console.log(element.valid);
      if(element.invalid){
        this.showAlertEmptyForm();
        return;
      }
    });

    this.externComunication.forEach(element => {
      console.log(element.valid);
      if(element.invalid){
        this.showAlertEmptyForm();
        return;
      }
    });

    this.marketingComunication.forEach(element => {
      console.log(element.valid);
      if(element.invalid){
        this.showAlertEmptyForm();
        return;
      }
    });
  }

  showAlertEmptyForm(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor llena todos los campos...',
    })
  }



}
