export interface chatMessageType {
  type: string;
  id: number;
  message: string | string[];
  isMine: boolean;
}

export interface userInfoType {
  name: string;
  drug: string;
  selectQuestionList: string[];
}

export interface drugType {
  atpnQesitm: string;
  atpnWarnQesitm: string;
  depositMethodQesitm: string;
  efcyQesitm: string;
  entpName: string;
  intrcQesitm: string;
  itemImage: any; // as the type is not defined, you may use 'any' or replace it with the correct type when known
  itemName: string;
  itemSeq: string;
  openDe: string;
  seQesitm: string;
  updateDe: string;
  useMethodQesitm: string;
}
