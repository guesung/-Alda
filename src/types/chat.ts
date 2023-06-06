export interface chatMessageType {
  type: string;
  id: number;
  message: string | string[];
  isMine: boolean;
}

export interface selectQuestionType {
  question: string;
  isSelected: boolean;
}

export interface userInfoType {
  name: string;
  drug: string;
  selectQuestionList: selectQuestionType[];
}

export interface drugType {
  atpnQesitm: string;
  atpnWarnQesitm: string;
  depositMethodQesitm: string;
  efcyQesitm: string;
  entpName: string;
  intrcQesitm: string;
  itemImage: string;
  itemName: string;
  itemSeq: string;
  openDe: string;
  seQesitm: string;
  updateDe: string;
  useMethodQesitm: string;
}
