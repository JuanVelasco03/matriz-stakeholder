export interface matriz {
  internComunication: row[][];
  externComunication: row[][];
  Marketing: row[][];
}

export interface row {
  public: string;
  caracters: string;
  influence: string;
  need: string;
  offer: string;
  languaje: string;
  messages: string;
  existsComunication: string;
}
