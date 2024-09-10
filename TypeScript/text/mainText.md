<!--
windows = Ctrl + Shift + V
mac = Cmd + Shift + V
vscodeで上記のコマンドで見ること推奨
-->

## What type technique ? (型のテクニックってなんやねん？)

### ユニオン型

- ある変数やプロパティが複数の異なる型を持つことや、いずれかの型を持つことができること。

  → **柔軟な型付けがしやすい**

      = 一つの値に複数の型を持つことができる・型安全性を守りながら型の自由度が高くなる！

<br>

### ユーティリティ型

- TypeScript 特有の特別な型で、型の操作や変換を簡単・効率的に行える。

  → **型付けに対する手間が省ける、動的に型付けをすることができる!**

      = 型定義がコンパクトになる・可読性が高くなる・コーディングが爆速になる！

<br>

## Why use it? (なんで使うねん？)

<ul>
  <li style="font-size:16px;">無駄な型定義を省ける</li>
  <li style="font-size:16px;">型を共通化することができる</li>
  <li style="font-size:16px;">型の縛りから外すことなく、柔軟に型安全性を保てる。</li>
  <li style="font-size:16px;">要所で使い分けることによって、コードがコンパクトかつ可読性が高まる</li>
</ul>

<br>

## Use Case（そもそもいつ使うねん？）<div style="font-size:12px;">※使い方は各添付のコードとテキストを両参照。</div>

### ユニオン型

[[type_union.ts](../type_union.ts)]  
[[unionText.ts](unionText.md)]

- 2 つ以上の型を持たせたい時。
- 1 つの型に 2 つ以上の値を持たせたい時。
- 入ってくる値を固定値にしたい時。
- 関数の引数や戻り値で複数の型を扱いたいとき
- 条件によって異なる型のデータを処理したいとき
- 後述するユーティリティ型の可読性を高めたり、記述を省略できる

<br>

### ユーティリティ型

[[type_utility.ts](../type_utility.ts)]  
[[utilityText.md](utilityText.md)]

<p style="font-size:16px;">Pick = 指定したオブジェクト型から、指定したプロパティを抽出</p>

- 各画面でいちいち型つけるのめんどくさいなぁ〜
- 画面単位(もしく区画)で一つのファイルに型定義しておいてそれを参照したいなぁ〜

<br>

<p style="font-size:16px;">Omit = 指定したオブジェクト型から、指定したプロパティを排除</p>

- このオブジェクト型使いたいけど、このキーだけいらないんだよなぁ
- 参照先の型定義からいらないものだけ排除して使いたいなぁ〜
- キーの多いオブジェクト型から抽出するよりも排除したほうが楽

<br>

<p style="font-size:16px;">Record = キーと値の型を指定して全て同じ型のオブジェクト型を作成</p>

- このオブジェクト型のキー、全部同じ型だし書くのめんどくさいなぁ
- 同じ型指定の際、書く無駄を省きたい

<br>

<p style="font-size:16px;">Partial = オブジェクト内の全てのキーをオプショナル(undefined許容)定する(補足※3)</p>

- 使用頻度はたまに使うこともあるくらい。（複雑な型定義の場合によく使用）
- 更新系の作業では重宝する時がある。(任意項目にする場合など)
- 参照元の型定義自体でこれを使用すると型チェックに大影響が出る（実質 any 型になりかける）ので、コーディング規約などのお作法は守った上で使用。
- この状況/場合だけオプショナルにしたい！と言う時に使用する。
- 特定だけのキーだけオプショナルにする応用技も載せておきます。

<br>

<p style="font-size:16px;">Required = 指定された型のすべてのプロパティを必須にする(補足※3)</p>

- ぶっちゃけあまり使いません笑（Partial と併用が多いのと、Patial も Required もクセが強い）
- Partial でカスタムした際に使うと絶大な効果がある時はあります。(ごく稀)
- あまりないと思いますが、参照元の型定義が全てオプショナル(?付き)の場合にはこれが一番。(ほぼないですが)

<br>

## 補足

### ※1 プリミィティブ型

- 基本的なデータ型！(全 7 つ)

  - string 型(文字列型): "Hello World"のような文字列。
  - number 型(数値型): 0 や 0.1 のような数値。
  - boolean 型(論理型): true または false の真偽値。
  - undefined 型: 値が未定義であることを表す型。(補足※2)
  - null 型: 値がないことを表す型。(補足※2)
  - symbol 型(シンボル型): 一意で不変の値。
  - bigint 型(長整数型): 9007199254740992n のような number 型では扱えない大きな整数型。

  → **プリミィティブ型だけイミュータブルなので(値を直接変更できない)、プロパティを持たない**

      = JS/TSにおいてプリミティブ型以外は、オブジェクト型なので値を変更できる！
      （ちゃんと説明すると難しく長いので割愛します。イミュターブルと覚えておけばOK!）

<br>

### ※2 undefined と null について

・両者の違いを簡単に解説しておきます！

- undefiend（「値が未定義」）

  - 意味: 変数やプロパティが宣言されたが、まだ値が設定されていない状態。
  - 状態: 値が入る予定があるが、現時点では空の状態。
  - イメージ: 値が入ってくる予定があるが、今は空のイメージ。
  - JavaScript 特有
    - JS では変数を宣言したが初期化しなかった場合や、関数が何も返さないときに自動的に undefined が設定されます。

<br>

- null (「何もない」)

  - 意味: 明示的に「何もない」状態を示すために使用される。
  - 状態: 値が意図的に存在しないことを示す。
  - イメージ: 「ここには値が存在しない」と意図的に示すための空の状態、何も存在しない状態。
  - 他言語では一般的
    - null は他のプログラミング言語でもある概念であり、「空」や「何も存在しない」を意図的に表すために使われます。

<br>

#### ・まとめと例

- undefiende は JS/TS 特有のもので JAVA や C など他言語でいう null と同じ意味合い。
- JS/TS では基本的に undefined を使用することが多い。
- ただ undefiened と null を両方使っている時はそれに合わせて処理を考える必要性はあります。(以下に違いが出る例を挙げます。)

変数の初期化

```javascript
//①
let a;
console.log(a); // 出力: undefined
//変数aは値が何も定義されていないのでundefinedが自動で返ってくる。　= デフォルトで「値が未定義」になる状態。

//②
let a = undefined;
console.log(a); // 出力: undefined
//変数aがundefinedで初期化されている。 = 「値が未定義」を指定している状態。

//③
let b = null;
console.log(b); // 出力: null
//変数bはnullで初期化されている。 = 値に対して明示的に「何もない」を表している状態。

//①と②は同じ処理になります。
//この場合のnullとundefinedの違いを簡単に説明すると、
//「初期化する行為は同じで内容は違う」・「JSの場合、値が無ければ自動的にundefinedが割り振られる」といった感じです。
```

関数の戻り値

```javascript
function foo() {
  // 何も返さない
}
console.log(foo()); // 出力: undefined

function bar() {
  return null;
}
console.log(bar()); // 出力: null
```

比較・分岐

```javascript
let x = undefined;
let y = null;

console.log(x == y); // 出力: true (型変換されて比較されるため)
console.log(x === y); // 出力: false (型が異なるため)

//ポイント！
//①上記例にもあるように、バグを防ぐために厳密等価演算子(===)を使って型整合も含めて比較評価することが大事！（JSでは基本絶対）
//②等価演算子(==)だと型を自動的に変換して比較するため、値は一緒でも型は違う場合、意図しない挙動になることがある。

//注意ポイント！
//上記の例だと、値がない(型:null) と 値がない(型:undefined)を比較している為、==は値がtrueだが、===は型も含めるのでfalseになる
//上記は例としてletを使用していますが、下記の事象が起こりやすいので条件分岐・比較では極力constの使用をおすすめします！
//⚠️letを使用して意図しない値が代入された場合、比較・分岐の内容が変わる =　意図しないバグが発生する。⚠️

//まとめ
//しっかり、const(定数)と厳密等価演算子(===)と型指定(この値は何なのか)をしてあげることで、安全かつバグを防げる！
```

<br>

### ※3 オプショナル指定({name?: string})とユニオン型で指定する undefiend({name: string | undefied})の違いについて

<p style="font-size:16px;">下記の1と２は一見すると同じような意味に見えますが、実は結構な違いがあります。</p>

```javascript
//１
type FirstNameOptional = {
  firstName?: string,
  lastName: string,
};

//２
type FirstNameRequired = {
  firstName: string | undefined,
  lastName: string,
};
```

<br>

### １と 2 の違い

<ul>
  <li style="font-size:14px;">1の場合</li>
  <ul>
    <li>
      <div style="font-size:14px;">
        firstName・lastName の型定義としては 2 の string|undefined と同じになりますが、オプショナルの指定(?: プロパティが存在しない可能性があること意味する)がある為、
      </div>
    <div style="font-size:14px; font:bold;">string 型の値の場合・値が未定義の場合・プロパティが存在しない場合の 3 つが許容されます。</div> 
    </li>
  </ul>
</ul>

- 2 の場合
  - firstName はオプショナルの指定がなく、必須プロパティとして扱われる為、string 型の値の場合・値が未定義の場合の 2 つだけ許容されます。

<br>

```javascript
//1の場合
const MyName: FirstNameOptional = {
  firstName: "ジョン",
  lastName: "マイケル",
};
//OK

const MyName: FirstNameOptional = {
  firstName: undefined,
  lastName: "マイケル",
};
//OK

const MyName: FirstNameRequired = {
  lastName: "マイケル",
};
//OK
```

<br>

```javascript
//2の場合
const MyName: FirstNameOptional = {
  firstName: "ジョン",
  lastName: "マイケル",
};
//OK

const MyName: FirstNameOptional = {
  firstName: undefined,
  lastName: "マイケル",
};
//OK

const MyName: FirstNameRequired = {
  lastName: "マイケル",
};
//Error
```

<br>

##### まとめ

- ?でオプショナル指定したものはプロパティが無くても許容される。
- オプショナル指定のない型定義{key: type | undefined}の場合は、プロパティがある状態で undefined を許容する。

<br>

#### UseCase＆CheckPoint!

特にバックエンド側との作業(API 繋ぎ込みや DB 関連など)で意識することが多いかも!  
 処理や設計、開発方針などで意識するパターンを下記に簡単にまとめておきます！

  <br>

- バック側は null 想定の場合、JS 側からは undefined を返してあげて基本問題はなし。

  - Why?
    - 基本的にはバック側では値がないと言う意味で null 対応として処理されます！

- 気をつける点としてバックエンドの処理や設計によっては、null で型指定や値を返す必要もある。

  - Why?

    - 処理や設計上、null か undefined か合わせる必要がある場合があります！

  - When?

    - バック側で undefined を"undefined"のように文字列として扱われる処理の場合(直接解析系処理など)
    - 設計上必ず値を返す場合(null 許容はしません！や、string だったら"",number だったら 0 で処理など)
    - undefined 自体 を許容させない処理がある場合（設計やバック側のリクエストバリデーションが超厳密など）

    <br>
