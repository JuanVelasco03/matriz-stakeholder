import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatrizRow } from '../../interfaces/matriz.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatExpansionModule } from '@angular/material/expansion';
import Swal from 'sweetalert2';

import { MatrizStakeholderService } from '../../services/matriz-stakeholder.service';


@Component({
  selector: 'app-matriz-stakeholder',
  standalone: true,
  imports: [ TranslateModule, ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule, MatButtonModule, MatExpansionModule, MatSelectModule],
  templateUrl: './matriz-stakeholder.component.html',
  styleUrl: './matriz-stakeholder.component.css'
})
export class MatrizStakeholderComponent implements OnInit {

  fb = inject(FormBuilder);

  matrizStakeholderService = inject( MatrizStakeholderService );

  submitted: boolean = false;

  matrizFinished = false;

  degreesPower = [
    'Alta', 'Media', 'Baja'
  ]

  internComunication: FormGroup[] = [];

  externComunication: FormGroup[] = [];

  marketingComunication: FormGroup[] = [];

  ngOnInit(): void {
    this.initRowForms()
    this.getDataMatrizStakeholder();
  }

  initRowForms(){
    this.internComunication = [
      this.getFormRow()
    ]

    this.externComunication = [
      this.getFormRow()
    ]

    this.marketingComunication = [
      this.getFormRow()
    ]
  }

  getDataMatrizStakeholder(){
    const data = this.matrizStakeholderService.getDataMatrizStakeholder();
    const { internComunication, externComunication, Marketing } = data;

    if( internComunication && externComunication && Marketing ){
      this.internComunication = this.buildFormsRow( internComunication );
      this.externComunication = this.buildFormsRow( externComunication );
      this.marketingComunication = this.buildFormsRow( Marketing );
      this.matrizFinished = true;
    }

  }

  buildFormsRow( MatrizRow: MatrizRow[] ): FormGroup[] {
    return MatrizRow.map( (row) => {
      //Construye el formulario.
      const form = this.fb.group( row );
      //Deshabilita el formulario.
      form.disable();
      //Devuelve el formulario con los valores y deshabilitado.
      return form;
    });
  }

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
          cancelButtonText: 'Cancelar',
          didOpen: () => {
            document.body.style.overflowY= 'auto';
          }
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

    this.submitted = true;

    const validForms = this.validateForms([ ...this.internComunication, ...this.externComunication, ...this.marketingComunication ])

    const internComunication = this.internComunication.map( (form) => form.value );
    const externComunication = this.externComunication.map( (form) => form.value );
    const Marketing = this.marketingComunication.map( (form) => form.value );

    if(!validForms) return this.showAlertEmptyForm();

    const resSaveMatriz = this.matrizStakeholderService.saveDataMatrizStakeholder({ internComunication, externComunication, Marketing });

    if( resSaveMatriz ){
      this.matrizFinished = true;
      Swal.fire({
        title: 'Matriz guardada!',
        text: 'La matriz ha sido guardada correctamente.',
        icon: 'success',
        didOpen: () => {
          document.body.style.overflowY= 'auto';
        }
      })
      this.matrizStakeholderService.generatePdf();
      this.getDataMatrizStakeholder();
    }

  }

  validateForms(formValidate: FormGroup[]): boolean {
    // Verificar si alguno de los formularios no es válido
    const hasInvalidForm = formValidate.some(form => form.invalid);

    // Retornar false si hay al menos un formulario inválido, true en caso contrario.
    return !hasInvalidForm;
  }

  downloadMatrizStakeholder(){
    this.matrizStakeholderService.generatePdf();
  }

  showAlertEmptyForm(){
    Swal.fire({
      title: '',
      text: 'Por favor, completa todos los campos.',
      icon: 'warning',
      didOpen: () => {
        document.body.style.overflowY= 'auto';
      }
    })
  }

  clearMatrizStakeholder(){
    Swal.fire({
      title: '¿Estás seguro que deseas limpiar la matriz?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, limpiar',
      didOpen: () => {
        document.body.style.overflowY= 'auto';
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.matrizStakeholderService.clearMatrizStakeholder();
        this.initRowForms();
        this.matrizFinished = false;
        Swal.fire({
          title: 'Matriz limpiada!',
          text: 'La matriz ha sido limpiada correctamente.',
          icon: 'success',
          didOpen: () => {
            document.body.style.overflowY= 'auto';
          }
        })
      }
      });
  }

}
