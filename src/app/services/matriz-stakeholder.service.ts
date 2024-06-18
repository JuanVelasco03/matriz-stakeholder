import { Injectable } from '@angular/core';
import { MatrizRow, MatrizStakeHolder } from '../interfaces/matriz.interface';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-BoldItalic.ttf'
  }
};

@Injectable({
  providedIn: 'root'
})
export class MatrizStakeholderService {

  constructor() { }

  getDataMatrizStakeholder(): MatrizStakeHolder {
    return JSON.parse( localStorage.getItem('MatrizStakeHolder') || '{}' );
  }

  saveDataMatrizStakeholder( data: MatrizStakeHolder ): boolean {
    localStorage.setItem( 'MatrizStakeHolder', JSON.stringify( data ) );

    return true;
  }

  clearMatrizStakeholder(){
    localStorage.removeItem('MatrizStakeHolder');
  }

  generatePdf(){
    const data: MatrizStakeHolder = JSON.parse(localStorage.getItem('MatrizStakeHolder') || '{}');
    const { internComunication, externComunication, Marketing } = data;

    if( !internComunication && !externComunication && !Marketing ) return;

    let bodyTable: any = [
      [
        { bold: true, text: 'Público' }, { bold: true, text: 'Características' },
        { bold: true, text: 'Grado de poder e influencia' }, { bold: true, text: 'Qué espero o qué necesito' },
        { bold: true, text: 'Qué le ofrezco' }, { bold: true, text: 'Lenguaje' },
        { bold: true, text: 'Mensajes' }, { bold: true, text: 'Medios de comunicación existentes' },
      ],

      [ { text: 'Comunicación Interna', style: 'tableHeader', colSpan: 8 }, {}, {}, {}, {}, {}, {}, {} ],
      ...internComunication.map( this.buildRowTable ),

      [ { text: 'Comunicación Externa', style: 'tableHeader', colSpan: 8 }, {}, {}, {}, {}, {}, {}, {} ],
      ...externComunication.map( this.buildRowTable ),

      [ { text: 'Marketing', style: 'tableHeader', colSpan: 8 }, {}, {}, {}, {}, {}, {}, {} ],
      ...Marketing.map( this.buildRowTable ),

    ];

    let table: any = [
      {
        text: 'Matriz de Stakeholder',
        style: 'title',
        alignment: 'center',
      },
      {
        style: 'tableExample',
        table: {
          widths: ['13%', '13%', '9%', '13%', '13%', '13%', '13%', '13%'],
          body: bodyTable,
        }
      },
    ];

    const documentDefinition: any = {
      pageMargins: [20, 10, 20, 10],
      pageOrientation: 'landscape', // Orientación horizontal
      content: table,
      styles: {
        title: {
          alignment: 'center',
          color: '#282a70',
          margin: [0, 0, 0, 10],
          bold: true,
          fontSize: 24,
        },
        tableHeader: {
          alignment: 'center',
          fillColor: '#5A639C',
          bold: true,
          color: 'white'
        }
      },
      columnGap: 20, // Espacio entre las columnas
      alignment: 'center',
    };

    pdfMake.createPdf( documentDefinition ).download( 'matriz_stakeholder.pdf' );
  }

  private buildRowTable( row: MatrizRow ): { text: string }[] {
    return [
      { text: row.public }, { text: row.caracters },
      { text: row.influence }, { text: row.need },
      { text: row.offer }, { text: row.languaje },
      { text: row.messages }, { text: row.existsComunication },
    ];
  }

}


