# Complete Marp Front Matter Configuration

新しいMarpスライドを作成する際は、以下のFront Matter設定をそのままコピーして使用してください：

```yaml
---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
color: #2c3e50
style: |
  :root {
    --color-primary: #3498db;
    --color-accent: #e74c3c;
    --color-success: #27ae60;
    --color-warning: #f39c12;
    --color-dark: #2c3e50;
    --color-light: #ecf0f1;
  }
  
  h1 {
    color: var(--color-accent);
    font-size: 20pt;
    font-weight: 700;
    margin-bottom: 20px;
    border-bottom: 3px solid var(--color-primary);
    padding-bottom: 10px;
    text-align: left;
    line-height: 1.2;
  }
  
  h2 {
    color: var(--color-primary);
    font-size: 16pt;
    font-weight: 600;
    margin-bottom: 15px;
    margin-top: 20px;
    line-height: 1.3;
  }
  
  h3 {
    color: var(--color-dark);
    font-size: 14pt;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 1.3;
  }
  
  p, li {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 6px;
  }
  
  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin: 15px 0;
  }
  
  .flex-item {
    flex: 1;
  }
  
  .card {
    background: var(--color-light);
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    border-left: 4px solid var(--color-primary);
    font-size: 15px;
  }
  
  .small-card {
    background: var(--color-light);
    border-radius: 6px;
    padding: 12px;
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.3;
  }
  
  .highlight {
    background: linear-gradient(120deg, #a8e6cf 0%, #dcedc8 100%);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  code {
    background: #f8f9fa;
    padding: 1px 4px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--color-accent);
    font-size: 14px;
  }
  
  pre {
    background: #f8f9fa;
    border-radius: 6px;
    padding: 12px;
    margin: 10px 0;
    overflow-x: auto;
    border-left: 3px solid var(--color-primary);
    font-size: 13px;
    line-height: 1.3;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 14px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background: var(--color-primary);
    color: white;
    font-size: 13px;
  }
  
  .center {
    text-align: center;
  }
  
  section {
    padding: 40px 60px;
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  .compact {
    font-size: 14px;
    line-height: 1.3;
    margin: 5px 0;
  }
  
  .mini {
    font-size: 12px;
    line-height: 1.2;
    margin: 3px 0;
  }
---
```

### デザインガイドライン

#### フォントサイズ体系
- **h1**: 20pt（メインタイトル、左揃え）
- **h2**: 16pt（セクションタイトル）
- **h3**: 14pt（サブセクション）
- **本文**: 16px（通常テキスト・リスト）
- **コンパクト**: 14px（.compact クラス）
- **ミニ**: 12px（.mini クラス）

#### カラーパレット
- **Primary**: #3498db（青）- セクションタイトル、ボーダー
- **Accent**: #e74c3c（赤）- メインタイトル、コード文字
- **Success**: #27ae60（緑）- 成功要素
- **Warning**: #f39c12（オレンジ）- 警告要素
- **Dark**: #2c3e50（濃い青灰色）- サブタイトル
- **Light**: #ecf0f1（薄いグレー）- カード背景

#### レイアウトパターン

##### 2カラムレイアウト
```html
<div class="flex-container">
<div class="flex-item">
左側のコンテンツ
</div>
<div class="flex-item">
右側のコンテンツ
</div>
</div>
```

##### カード表示
```html
<div class="card">
重要な情報をボックス表示
</div>

<div class="small-card">
コンパクトな情報表示
</div>
```

##### コンパクト表示
```html
<div class="compact">
文字サイズを小さくして情報量を増やす
</div>
```

#### 推奨されるスライド構成

1. **タイトルスライド**: h1 + 概要説明（.card）
2. **セクション区切り**: h1 + h2 の組み合わせ
3. **コンテンツ分割**: .flex-container で左右配置
4. **詳細説明**: .small-card で情報をグループ化
5. **コード表示**: pre タグでシンタックスハイライト対応
6. **まとめ**: .card で重要ポイントを強調

#### 情報密度の調整

- **高密度コンテンツ**: .compact や .mini クラスを活用
- **読みやすさ重視**: 標準フォントサイズを維持
- **重要度に応じて**: .highlight でキーワード強調

### 使用例

```markdown
# 📚 新しいトピック

<div class="card">
このセクションの概要説明
</div>

## 詳細内容

<div class="flex-container">
<div class="flex-item">

### 左側の情報
- ポイント1
- ポイント2

</div>
<div class="flex-item">

### 右側の情報
```code
サンプルコード
```

</div>
</div>
```

このデザインシステムを使用することで、一貫性のある読みやすいMarpスライドを効率的に作成できます。