import { User, DetalData} from "./type_common";

//ユーティリティ型編<utilText.mdで並行解説>
/*------------------------------------------------------------------------------------*/

//Pick = 指定したオブジェクト型からプロパティを抽出できる
type UserStatus = Pick<User, "name" | "age" | "onLine">;
type UserData = Pick<User, "data">;

const ojaruStatus: UserStatus = {
  name: "おじゃる丸",
  age: 5,
  onLine: true,
};

const ojaruData: UserData = {
  data: {
    email: "Yangotonaki@MiyabinaOkosama.com",
    barthDay: 10240101,
    liveJapan: true,
  },
};


//インターセクションを使って拡張もできます
type OjaruDataInfo = Pick<User, "name" | "onLine"> &
  Omit<DetalData, "accountId" | "userNumber"> & {
    friend: string;
    item: string;
  };

const ojaruDataInfo: OjaruDataInfo = {
  name: "おじゃる丸",
  onLine: false,
  lastLogin: "2024-07-30T10:47:07Z",
  friend: "Denbo",
  item: "syaku",
};

/*------------------------------------------------------------------------------------*/

//Omit = 指定した型からオブジェクト型から指定したプロパティを排除
type Status = Omit<User, "data">;
type Data = Omit<User, "name" | "age" | "onLine">;

const doraemonStatus: Status = {
  name: "どら焼き",
  age: 10,
  onLine: false,
};

const doraemonData: Data = {
  data: {
    email: "nezumi@daikirai.com",
    barthDay: 21120903,
    liveJapan: true,
  },
};

//インターセクションを使って拡張もできます
type DoraemonInfo = Pick<User, "name" | "onLine"> &
  Omit<DetalData, "lastLogin"> & {
    friend: string;
    item: string;
  };

const doraemonInfo: DoraemonInfo = {
  name: "NekoGataRobot(blue)",
  accountId: "darachan2525",
  onLine: true,
  userNumber: 190000,
  friend: "nobita",
  item: "takekoputar"
};

/*------------------------------------------------------------------------------------*/

//Record = キーと値の型を指定して新しい型を作成(同じ型ならまとめて指定できる)
type Tokuchou = "megane" | "kuishinbo" | "kechi";
type NintamaRantarou = Record<Tokuchou, string>;

const nintama: NintamaRantarou = {
  megane: "乱太郎",
  kuishinbo: "しんべえ",
  kechi: "きり丸",
};

//複数の型を渡すこともできます。(ただ全て同じ型になります。)
type Member = "sazaesan" | "maruko" | "tamachan" | 'newCharacter';
type MarukoCharacter = Record<Member, boolean | undefined>;

const chibiMarukoChan: MarukoCharacter = {
  sazaesan: false,
  maruko: true,
  tamachan: true,
  newCharacter: undefined,
};

/*------------------------------------------------------------------------------------*/

//Partial = オブジェクト内の全てをオプショナルに指定する
type OptionalUser = Partial<User>;

const optionalUser: OptionalUser = {
  name: "サザエさん",
  onLine: false,
};

//応用変(局所的な使い方)
//内部オブジェクト内も含めオプショナルにする方法
type PartialUser = Partial<User>;
type NewParitialUser = Omit<PartialUser, "data">;

type UpdateUser = NewParitialUser & {
  data?: Partial<User["data"]>;
};

const updateUser: UpdateUser = {
  name: "アンパンマン",
  data: {
    email: "yuuki100bai@anpanman.com",
  },
};

/*------------------------------------------------------------------------------------*/

//Required = オブジェクト内の全てを必須に指定する。
type RequiredUser = Required<PartialUser>;

const requiredUser: RequiredUser = {
  name: "サザエさん",
  age: 24,
  onLine: true,
  data: {
    email: "sazasan@yukaidana.com",
    barthDay: 19221122,
    liveJapan: true,
  }
}

//応用変(局所的な使い方)
//内部プロパティも必須化する場合
type NewRequiredUpdataUser = Omit<UpdateUser, 'data'> & {
  data: Required<User['data']>;
};

const requiredNewUpDateUser: NewRequiredUpdataUser = {
  name: "サザエさん",
  age: 24,
  onLine: true,
  data: {
    email: "sazasan@yukaidana.com",
    barthDay: 19221122,
    liveJapan: true,
  }
}

//検証
//UpDateUser時をRequiredした時(data内は必須化されない)
type RequiredUpdateUser = Required<UpdateUser>;

const requiredUpdateUser: RequiredUpdateUser = {
  name: "サザエさん",
  age: 24,
  onLine: true,
  data: {
    email: "sazasan@yukaidana.com",
  }
}

//NewRequiredUpdataUserで型付けした時
const newRequiredUpdateUser: NewRequiredUpdataUser = {
  name: "サザエさん",
  age: 24,
  onLine: true,
  data: {
    email: "sazasan@yukaidana.com",
    barthDay: 19221122,
    liveJapan: true,
  }
}
/*------------------------------------------------------------------------------------*/
