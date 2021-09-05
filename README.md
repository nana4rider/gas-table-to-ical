# gas-table-to-ical
スプレッドシートのテーブルをiCalendarで取得するWeb API

## 導入
* プロパティに項目を追加  
`[sheet]`はgetパラメータで指定する
```
[sheet]_SPREAD_SHEET_ID=[スプレッドシートのID]
[sheet]_SHEET_NAME=[シート名]
```

## シートのフォーマット
|  日付(yyyy/MM/dd)   |  開始(HH:mm:ss オプション)  |  終了(HH:mm:ss オプション)  |  カテゴリ  |  概要  |  詳細  |

日付、開始、終了は日付型で設定すること

## 実行
```
https://script.google.com/macros/s/[このスクリプトのID]/exec?sheet=[sheet]&category=[カテゴリ(カンマ区切り、オプション)]
```

## プロジェクトのデプロイ
```
npm run deploy
```

## appsscript.jsonのダウンロード
```
npm run pull
```
