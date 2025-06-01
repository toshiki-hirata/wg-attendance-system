# プレゼン資料作成ルール

このドキュメントは、Vueハンズオン用のプレゼン資料作成に関するルールとガイドラインを定めています。

## 使用ツール

**Marp (Markdown Presentation Ecosystem)** を使用します。

### Marpを選択した理由
- Markdownベースでバージョン管理が容易
- VS Code拡張機能で編集とプレビューが可能
- コードハイライトが美しく、技術プレゼンに最適
- PDFやHTMLへのエクスポートが簡単
- GitHubでの管理と共有が容易

## ディレクトリ構造

```
hands_on_docs/
├── PRESENTATION_RULES.md    # このファイル
├── slides/                  # プレゼンテーションファイル
│   ├── 01_introduction.md   # イントロダクション
│   ├── 02_vue_basics.md     # Vue基礎
│   ├── 03_pinia_store.md    # Pinia状態管理
│   └── ...
├── assets/                  # 画像やその他のアセット
│   ├── images/
│   └── diagrams/
└── exports/                 # エクスポートしたPDF/HTML
```

## Marpの基本設定

各スライドファイルの先頭に以下のフロントマターを含めること：

```yaml
---
marp: true
theme: default
paginate: true
backgroundColor: #fff
footer: 'Vue.js ハンズオン - 勤怠管理アプリ'
---
```

## スライド作成ルール

### 1. ファイル命名規則
- `番号_内容.md` 形式を使用（例：`01_introduction.md`）
- 番号は2桁のゼロパディング
- 英語のスネークケースを使用

### 2. スライド構成
- 1つのMarkdownファイルに1つのトピック
- `---` で各スライドを区切る
- 最初のスライドにはセクションタイトルを含める

### 3. コードブロック
```markdown
```typescript
// TypeScriptコードの例
const message: string = 'Hello Vue!';
```
```

- 言語指定を必ず行う（typescript, vue, bash など）
- 実際のプロジェクトコードを参照する場合は、ファイルパスをコメントで明記

### 4. 画像の扱い
```markdown
![説明テキスト](../assets/images/画像名.png)
```
- 相対パスで参照
- 画像は `assets/images/` に配置
- 適切なalt textを必ず含める

### 5. スタイルガイド

#### 日本語表記
- 技術用語は英語表記を基本とする
- カタカナ表記は一般的なもののみ使用
- 例：
  - ⭕ Component、Store、State
  - ⭕ コンポーネント、ストア（一般的な場合）
  - ❌ ステート（Stateを使用）

#### スライドデザイン
- 1スライド1トピックを原則とする
- 箇条書きは3〜5項目まで
- コードサンプルは実行可能な最小限のものを使用
- 重要なポイントは **太字** で強調

### 6. ハンズオン用スライドの特別ルール

#### 実習スライド
```markdown
## 🔨 実習: [実習タイトル]

**目標**: 何を達成するか

**手順**:
1. 手順1の説明
2. 手順2の説明
3. 手順3の説明

**確認ポイント**:
- [ ] 確認事項1
- [ ] 確認事項2
```

#### ヒントスライド
```markdown
## 💡 ヒント

実習で詰まった場合の参考情報を記載
```

## VS Code拡張機能の設定

必須の拡張機能：
- **Marp for VS Code** (marp-team.marp-vscode)

推奨設定（`.vscode/settings.json`）：
```json
{
  "markdown.marp.enableHtml": true,
  "markdown.marp.exportType": "pdf",
  "markdown.marp.chromePath": ""
}
```

## エクスポート手順

### PDFエクスポート
1. VS CodeでMarkdownファイルを開く
2. コマンドパレット（Cmd+Shift+P）で「Marp: Export Slide Deck...」を選択
3. PDFを選択し、`exports/` ディレクトリに保存

### HTMLエクスポート
- 配布用にはHTMLエクスポートを推奨
- 参加者がブラウザで閲覧可能

## プレゼンテーション実施時の注意

1. **事前準備**
   - PDFとHTMLの両方をエクスポートしておく
   - オフラインでも表示できるように準備

2. **画面共有時**
   - VS Codeのプレビューモードを使用
   - フォントサイズは見やすいように調整

3. **コードデモ**
   - 実際のプロジェクトで動作確認
   - エラーハンドリングの例も準備

## 更新履歴

- 2025-01-06: 初版作成