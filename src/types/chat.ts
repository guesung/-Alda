export interface chatMessageType {
  id: number;
  message: string;
  isMine: boolean;
}

export interface userInfoType {
  name: string;
  drug: string;
  selectQuestionList: string[];
}
