export interface MarcacaoEscala {
  marcacaoEscalaId: number;
  policialId: number;
  escalaId: number;
  localId: number;
}

export interface MarcacaoEscalaOutput {
  marcacaoEscalaId: number;
  policialId: number;
  escalaId: number;
  localId: number;
  policialNome: string;
  dataHoraEntrada: Date;
  dataHoraSaida: Date;
  localNome: string;
}
