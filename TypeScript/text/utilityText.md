<!--
windows = Ctrl + Shift + V
mac = Cmd + Shift + V
vscodeで上記のコマンドで見ること推奨
-->

## ユーティリティ型

### 参照元型定義([type_commnon.ts 参照](../type_common.ts))

```javascript
type RegistData = {
  email: string,
  barthDay: number,
  liveJapan: boolean,
};

type DetalData = {
  accountId: string,
  userNumber: number,
  lastLogin: string,
};

type User = {
  name: string,
  age: number,
  onLine: boolean,
  data: RegistData,
};
```

---

- ### Pick 解説

<br>

```javascript
//1.参照元から使用したいものを下記の形で抽出します。
//Pick<参照する型,抽出したいキー(ユニオン型)>

type UserStatus = Pick<User, "name" | "age" | "onLine">;
type UserData = Pick<User, "data">;

//2.抽出すると内部的に下記の型定義になります。

type UserStatus = {
  name: string,
  age: number,
  onLine: boolean,
};

type UserData = {
  data: {
    email: string,
    barthDay: number,
    liveJapan: boolean,
  },
};

//3.定数に渡すとこうなります。

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

//インターセクションを使うと自由に複合/拡張もできます
type OjaruDataInfo = Pick<User, "name" | "onLine"> &
  Omit<DetalData, "accountId" | "userNumber"> & {
    friend: string,
    item: string,
  };

const ojaruDataInfo: OjaruDataInfo = {
  name: "おじゃる丸",
  onLine: false,
  lastLogin: "2024-07-30T10:47:07Z",
  friend: "Denbo",
  item: "syaku",
};
```

---

- ### Omit 解説

<br>

```javascript
//1.参照元から使用したいものを下記の形で排除します。
//Omit<参照する型,抽出したいキー(ユニオン型)>

type Status = Omit<User, "data">;
type Data = Omit<User, "name" | "age" | "onLine">;

//2.抽出すると内部的に下記の型定義になります。

type Status = {
  name: string,
  age: number,
  onLine: boolean,
};

type Data = {
  data: {
    email: string,
    barthDay: number,
    liveJapan: boolean,
  },
};

//3.定数に渡すとこのようになります。

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

//4.インターセクションを使うと自由に複合/拡張も自由にできます

type DoraemonInfo = Pick<User, "name" | "onLine"> &
  Omit<DetalData, "lastLogin"> & {
    friend: string,
    item: string,
  };

const doraemonInfo: DoraemonInfo = {
  name: "NekoGataRobot(blue)",
  accountId: "darachan2525",
  onLine: true,
  userNumber: 190000,
  friend: "nobita",
  item: "takekoputar",
};
```

---

<br>

- ### Record 解説

<br>

```javascript
//1.まずユニオン型で定義

type Tokuchou = "megane" | "kuishinbo" | "kechi";

//2.上記からリストを作成し、プロパティに指定した型を渡します。
//Record<参照する型,渡したい型>

type NintamaRantarou = Record<Tokuchou, string>;

//3.内部的に下記の型定義になります。

type NintamaRantarou = {
  megane: string,
  kuishinbo: string,
  kechi: string,
};

//補足
//= Record<T,U>
//= 指定した T のユニオン型をキーとして、各キーに対して U 型の値を持つオブジェクト型を作成

//4.定数に渡す。

const nintama: NintamaRantarou = {
  megane: "乱太郎",
  kuishinbo: "しんべえ",
  kechi: "きり丸",
};

//5.また型複数渡すことも可能です（ただし全て同じ型になります）

type Member = "sazaesan" | "maruko" | "tamachan" | "newCharacter";

type IsChibiMarukoChan = Record<Member, boolean | undefined>;

//6.内部的に下記の型定義になります。

type ChibiMarukoChan = {
  maruko: boolean | undefined,
  tamachan: boolean | undefined,
  newCharacter: boolean | undefined,
};

//7.定数に渡す。

const chibiMarukoChan: MarukoCharacter = {
  sazaesan: false,
  maruko: true,
  tamachan: true,
  newCharacter: undefined,
};
```

---

<br>

- ### Patrial 解説

```javascript
//1.参照元を下記の形で定義します。
//Partial<参照する型>

type OptionalUser = Partial<User>;

//2.内部的に下記の型定義になります

type OptionalUser = {
  name?: string,
  age?: number,
  onLine?: boolean,
  data?: RegistData,
};

//3.定数に入れると

const optionalUser: OptionalUser = {
  name: "サザエさん",
  onLine: false,
};
```

#### 注意点！

<div style="font-size:14px;">
全てプリミィティブ型(string や number など)で指定している場合は全て完全なオプショナルになりますが、
</div>
<div style="font-size:14px;">
上記の data: RegistData のように内部でオブジェクト型で指定されてるものに関しては、型内部のキーはオプショナルにはなりません。
  <div>
    (dataが存在する場場合、内部のプロパティは全て必須)
  <div>
</div>
<div style="font-size:14px;">
また、一番下で説明しているRequiresも内部のブジェクト型で指定されてるかつオプショナルな場合、必須指定になりません。(Requiredで簡単に説明)
</div>

<br>

<p style="font-size:14px;">実際に構造を説明すると</p>

```javascript
type OptionalUser = {
  name?: string
  age?: number
  onLine?: boolean
  data?: {
      accountId: string,
      userNumber: number,
      lastLogin: string,
    }
};
```

<br>

<div style="font-size:14px;">内部的にこうなっています。</div>
<div style="font-size:14px;">型指定したオブジェクト内部もオプショナルにしたい場合は下記参照。</div>

<br>

<div style="font-size:14px;">内部のオブジェクト型の中身をオプショナルにする方法。</div>

<br>

```javascript
//1.まずは全てオプショナルに

type PartialUser = Partial<User>;

//2.一度オブジェクト型を指定しているプロパティをOmitで排除 or Pickで抽出

type NewParitialUser = Omit<PartialUser, "data">;

//3.NewParitialUserの内部状態

type NewParitialUser = {
  name?: string | undefined,
  age?: number | undefined,
  onLine?: boolean | undefined,
};

//4.
//→ Omit or Pickした型をインターセクションし、オプショナル指定で追加
//→ Patialで内部のオブジェクト型をオプショナル化

type UpdateUser = NewParitialUser & {
  data?: Partial<User["data"]>,
};

//5.UpdateUserの内部状態

type UpdateUser = {
  name?: string,
  age?: number,
  onLine?: boolean,
  data?: {
    email?: string,
    barthDay?: number,
    liveJapan?: boolean,
  },
};
```

---

<br>

- ### Required 解説

```javascript
//1.参照元を下記の形で定義します。
//Required<参照する型>

//先ほどParticalで作成した型を使用
type RequiredUser = Required<ParticalUser>;
type RequiredUpdateUser = Required<UpdateUser>;

//2.内部状態(内部オブジェクト内のプロパティは必須になりません)

type UpdateUser = {
  name: string,
  age: number,
  onLine: boolean,
  data: {
    email?: string,
    barthDay?: number,
    liveJapan?: boolean,
  },
};

type RequiredUpdateUser = {
  name: string,
  age: number,
  onLine: boolean,
  data: {
    email: string,
    barthDay: number,
    liveJapan: boolean,
  },
};

//3.Particalの逆でオブジェクト内も必須にしたい時
//dataを廃城して、インターセクターでdataを必須にして付与。

type NewRequiredUpdataUser = Omit<UpdateUser, "data"> & {
  data: Required<User["data"]>,
};

const newRequiredUpdateUser: NewRequiredUpdataUser = {
  name: "サザエさん",
  age: 24,
  onLine: true,
  data: {
    email: "sazasan@yukaidana.com",
    barthDay: 19221122,
    liveJapan: true,
  },
};
```

---
