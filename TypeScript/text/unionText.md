<!--
windows = Ctrl + Shift + V
mac = Cmd + Shift + V
vscodeで上記のコマンドで見ること推奨
-->

## ユニオン型

### 基本系

複数の型を指定する

```javascript
//使用したい型を | で指定する。

type TypeStrNumUnd = string | number | undefined;

//上記では3つ型を渡しているので、複数の値を使用できる。

const email: StringOrNumber = "union@type.com";
const numberID: StringOrNumber = 1194324310342;
const mixedArray: TypeStrNumUnd[] = ["Hello"];

//複数の型の値に対しての処理アプローチを実現できる。

const typeChekerForUserData = (value: TypeStrNumUnd) => {
  if (typeof value === "string") {
    return `値はstring型です :${value}`;
  } else if (typeof value === "number") {
    return `値はnumber型です: ${value}`;
  } else {
    return `値はありません: ${value}`;
  }
};

mixedArray.push(2024);
mixedArray.push(undefined);
//["Hello", "World", 2024, undefined]
```

<br>

#### 補足ポイント！

下記ような場合は string 型として扱われます。  
（文字列("")と　+　があるは文字列扱いになるため。）

```javascript
//型推論 = 型指定がない場合、JS側が値を見て自動的に型をつける。

let width = 20; //型推論: number
let height: number = 10; //型指定: number

const rectangle_1 = "長方形の面積: " + width * height;
//200 = x  "200" = ◯  型推論によりstring

const rectangle_2 = 20 + 10 + ": 足し算の結果です";
//30 = x   "30" = ◯  型推論によりstring

const isRight = "右ですか？: " + true;
//true(boolean) = x   "true" = ◯  型推論によりstring

const zeroStartNum = "0" + 123456789;
//0123456789 = x  '0123456789' = ◯  型推論によりstring
```

- 特に number 型は先頭に 0 表現ができないので、先頭を 0 にする場合は文字列として扱う必要があります。

  - why?

    - number 型の場合、0 = デフォルト値・数字として存在しない意味(null や undefined のような意味)がある為。

  - How?

    - 特に先頭 0 が入る想定の数値(電話番号など)は最初から string 型だけ指定する場合が多いです。

<br>

---

## リテラル型ユニオン

リテラル型を使うことで、変数や関数の引数などに指定できる値の範囲を限定できる。
各種リテラル型についてそれぞれ解説していきます！

### 文字リテラル型ユニオン

```javascript
//型に対して、任意の値を文字列で列挙

type ThreePrimaryColors = "Red" | "Green" | "Blue";

//ThreePrimaryColors型として、"Red"、"Green"、"Blue" を指定あげることで、代入できる値が"Red"、"Green"、"Blue"だけになる。

let threePrimaryColors: ThreePrimaryColors;

threePrimaryColors = "Red"; //OK
threePrimaryColors = "Green"; //OK
threePrimaryColors = "Blue"; //OK
threePrimaryColors = "white"; // Error: 定義されていない値のため型エラー。

//三原色のカラーコードを返す処理

const getColorHex = (color: ThreePrimaryColors) => {
  switch (color) {
    case "Red":
      return "#FF0000";
    case "Green":
      return "#00FF00";
    case "Blue":
      return "#0000FF";
    default:
      break;
  }
};

//引数にThreePrimaryColorsを指定しているので、"Red" ,"Green" , "Blue"以外が引数に入るとエラー

getColorHex("Red"); // "#FF0000"
getColorHex("Green"); // "#00FF00"
getColorHex("Blue"); //"#0000FF"
getColorHex("white"); //Error
```

<br>

---

### 数値リテラル型ユニオン

```javascript
//型に対して、任意の値を数値で列挙

type StatusCode = 200 | 404 | 500;

const success: StatusCode = 200;
const notFound: StatusCode = 404;
const serverError: StatusCode = 500;

//レスポンスに応じて表示させるメッセージ処理

const resMessage = (status: StatusCode) => {
  switch (status) {
    case 200:
      return `成功しました\nresult: ${success}`;

    case 404:
      return `リソースが見つかりません\nstatus: ${notFound}`;

    case 404:
      return `サーバーエラー\nstatus: ${serverError}`;

    default:
      break;
  }
};

resMessage(200);
/*
成功しました
result: 200
*/

resMessage(404);
/*
リソースが見つかりません
result: 404
*/

resMessage(500);
/*
サーバーエラー
result: 500
*/

resMessage(401);
//Error: 定義されていない値のため型エラー。
```

<br>

---

### オブジェクト型のユニオン

```javascript
type SuccessResponse = {
  status: "success",
  data: DetalData,
};

type ErrorResponse = {
  status: "error",
  message: string,
};

//成功と失敗のレスポンスのユニオン型
type ApiResponse = SuccessResponse | ErrorResponse;

const handleApiResponse = (response: ApiResponse) => {
  switch (response.status) {
    case "success":
      console.log(response.data);
      return `成功しました！: ${response.status}`;

    case "error":
      console.log(response.message);
      return `失敗しました。。。: ${response.status}`;
  }
};
```
