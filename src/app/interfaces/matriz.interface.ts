export interface MatrizStakeHolder {
  internComunication: MatrizRow[];
  externComunication: MatrizRow[];
  Marketing: MatrizRow[];
}

export interface MatrizRow {
  public: string;
  caracters: string;
  influence: string;
  need: string;
  offer: string;
  languaje: string;
  messages: string;
  existsComunication: string;
}
