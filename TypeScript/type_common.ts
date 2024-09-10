type Gender = "male" | "female" | "non-binary" | "other";

export type LearningType = {
  name: string;
  email: string;
  userName: string;
  age: number;
  phoneNumber: number;
  liveJapan: boolean;
  gender: Gender;
};

//ユーティリティ型: 参照元
type RegistData = {
  email: string;
  barthDay: number;
  liveJapan: boolean;
};

export type DetalData = {
  accountId: string;
  userNumber: number;
  lastLogin: string;
};

export type User = {
  name: string;
  age: number;
  onLine: boolean;
  data: RegistData;
};
