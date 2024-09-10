import { DetalData } from "./type_common";

//ユニオン型編<unionText.mdで並行解説>

/*------------------------------------------------------------------------------------*/

//基本系
//複数の型を指定する
type TypeStrNumUnd = string | number | undefined;

const email: TypeStrNumUnd = "union@type.com";
const numberID: TypeStrNumUnd = 1194324310342;
const mixedArray: TypeStrNumUnd[] = ["Hello"];

const typeChekerForUserData = (value: TypeStrNumUnd) => {
  if (typeof value === "string") {
    return `値はstring型です :${value}`;
  } else if (typeof value === "number") {
    return `値はnumber型です: ${value}`;
  } else {
    return `値はありません: ${value}`;
  }
};

mixedArray.push(2024); ////["Hello", "World", 2024]
mixedArray.push(undefined); //["Hello", "World", 2024, undefined]

/*------------------------------------------------------------------------------------*/

//文字リテラル型のユニオン
type ThreePrimaryColors = "Red" | "Green" | "Blue";

let threePrimaryColors: ThreePrimaryColors;

threePrimaryColors = "Red";
threePrimaryColors = "Green";
threePrimaryColors = "Blue";

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

/*------------------------------------------------------------------------------------*/

//数値リテラル型のユニオン
type StatusCode = 200 | 404 | 500;

const success: StatusCode = 200;
const notFound: StatusCode = 404;
const serverError: StatusCode = 500;

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
resMessage(404);
resMessage(500);
/*------------------------------------------------------------------------------------*/

//オブジェクト型のユニオン
type SuccessResponse = {
  status: "success";
  data: DetalData;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

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

/*------------------------------------------------------------------------------------*/
