---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
color: #2c3e50
style: |
  :root {
    --color-primary: #42b883;
    --color-accent: #e74c3c;
    --color-success: #27ae60;
    --color-warning: #f39c12;
    --color-dark: #2c3e50;
    --color-light: #ecf0f1;
  }
  
  h1 {
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
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-left: 3px solid var(--color-primary);
    border-radius: 6px;
    padding: 12px 14px 12px 30px;
    margin: 10px 0;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    position: relative;
  }
  
  .small-card::before {
    content: "✅";
    position: absolute;
    left: 8px;
    top: 12px;
    font-size: 14px;
    opacity: 0.7;
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

# Session 2: Vueアプリ全体の構成、HTML、見た目の実装

Vue.jsの基本構成とコンポーネントベースの開発を学び、実際にアプリケーションの画面を作成します

---

<style scoped>
.text-lg pre {
  font-size: 0.6em ;
}

</style>

# 自己紹介

<div class="text-lg">

```json
{
  "name": "{{ env.PRESENTER_NAME }}",
  "joined": "{{ env.PRESENTER_JOINED }}",
  "projects_and_skills": {{ env.PRESENTER_PROJECTS_AND_SKILLS }},
  "hobbies": {{ env.PRESENTER_HOBBIES }}
}

```

</div>


--- 
# 今日のゴール
✅ Vueアプリケーションの基本構造を理解する<br>
✅ SFC（単一ファイルコンポーネント）の構成を理解する<br>
✅ テンプレート構文とディレクティブを使える<br>
✅ Tailwind CSSでスタイリングができる
</div>

---

# Vueアプリケーションの全体構成

## プロジェクト構造を理解する

---

# プロジェクト構造

<div class="compact">

```
wg-attendance-system/
├── src/
│   ├── main.ts          # アプリケーションのエントリーポイント
│   ├── App.vue          # ルートコンポーネント
│   ├── routes.ts        # ルーティング設定
│   ├── style.css        # グローバルスタイル
│   ├── api/             # API通信関連
│   ├── assets/          # 画像やアイコン
│   ├── components/      # 再利用可能なコンポーネント
│   ├── pages/           # ページコンポーネント
│   ├── repositories/    # データ取得ロジック
│   ├── stores/          # Pinia ストア（状態管理）
│   └── utils/           # ユーティリティ関数
└── index.html           # HTMLエントリーポイント
```

</div>

---

# 各フォルダの役割

<div class="flex-container">
<div class="flex-item">

### UI関連
- **components/**: 再利用可能な部品
- **pages/**: 完全な画面
- **assets/**: 画像・アイコン

</div>
<div class="flex-item">

### ロジック関連
- **stores/** : 状態管理
- **api/**: HTTP通信設定
- **repositories/**: データ取得
- **utils/**: 便利関数

</div>
</div>

## <strong>📍 今回のハンズオン</strong>: 主に components/ と pages/ の.vueファイルを触りながら、画面の作り方を学びます！

---

# Vueファイル（.vue）を理解しよう

## 単一ファイルコンポーネント（SFC）の基本

---

# .vueファイルとは？

## Vueでは、<strong>1つのファイルに画面の見た目と動作をまとめて書く</strong>ことができます

```jsx
<template>
  <!-- ① 画面の見た目（HTML）を書く場所 -->
</template>

<script setup lang="ts">
// ② 画面の動作（JavaScript/TypeScript）を書く場所
</script>

<style scoped>
/* ③ 見た目の装飾（CSS）を書く場所（省略可） */
</style>
```

<div class="small-card">
<strong>3つの重要な部分</strong>:<br>
1. <strong>template</strong>: HTMLで画面の構造を作る<br>
2. <strong>script</strong>: JavaScriptで動きを作る<br>
3. <strong>style</strong>: CSSで見た目を装飾する
</div>

---

# 実際の.vueファイルを見てみよう

<div class="flex-container">
<div class="flex-item">

```jsx
<template>
  <!-- ① 画面の構造 -->
  <div>
    <h1>打刻</h1>
    <button @click="handlePunch">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script setup>
// ② 画面の動作
import { ref } from 'vue'
const buttonLabel = ref('出勤')
const handlePunch = () => {
  // ボタンクリック時の処理
}
</script>

<style scoped>
/* ③ 見た目の装飾 */
h1 { font-size: 24px; }
</style>
```

</div>
<div class="flex-item">

### ポイント
- **template**: 画面の構造
- **script**: データと処理
- **style**: デザイン

これから各セクションの役割を詳しく学んでいきます！

</div>
</div>

---

# ① templateセクション

## 画面の構造を作る

---

# templateの役割

## &lt;template&gt; セクションでは、<strong>HTMLを使って画面の構造</strong>を定義します

```jsx
<template>
  <div>
    <h1>勤怠管理システム</h1>
    <p>ようこそ！</p>
  </div>
</template>
```

<div class="small-card">
<strong>基本ルール</strong>:<br>
• HTMLタグを使って画面を構成<br>
• 必ず1つのルート要素で囲む<br>
• Vueの特別な機能も使える
</div>

---

# HTMLとは？

<div class="flex-container">
<div class="flex-item">

### 基本的な仕組み
- **タグ**と呼ばれる `<>` で囲まれた命令
- タグで「見出し」「段落」などを指定
- ブラウザがタグを読んで表示

```html
<h1>これは見出し</h1>
<p>これは段落の文章です</p>
<button>これはボタン</button>
```

</div>
<div class="flex-item">

### 重要なポイント
- タグには開始 `<h1>` と終了 `</h1>` がある
- 入れ子構造で階層を作れる
- Vueでは<span class="highlight">特別な機能</span>も追加される

</div>
</div>

---

# {{ }} を使ってデータを表示

## Vueでは {{ }} （二重波括弧）を使って、JavaScriptのデータをHTMLに表示できます

<div class="flex-container">
<div class="flex-item">

```html
<template>
  <!-- 文字を表示 -->
  <p>メッセージ: {{ message }}</p>
  
  <!-- 計算結果を表示 -->
  <p>合計: {{ count + 1 }}</p>
  
  <!-- 条件によって表示を変える -->
  <p>状態: {{ isActive ? 'アクティブ' : '非アクティブ' }}</p>
</template>
```

```jsx
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')
const count = ref(10)
const isActive = ref(true)
</script>
```
</div>
<div class="flex-item">



<div class="small-card">
<strong>ポイント</strong>: {{ }} の中には JavaScript の式を書くことができます
</div>

</div>
</div>

---

# ディレクティブ - Vueの特別な機能

## v- で始まる特別な属性で動的な機能を追加

---

# ディレクティブ① 表示制御

<div class="flex-container">
<div class="flex-item">

### v-if: 条件分岐
```jsx
<div v-if="showMessage">
  メッセージを表示
</div>
```

### v-for: 繰り返し
```jsx
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

### データ定義
```jsx
<script setup>
const showMessage = ref(true)
const items = ref([
  { id: 1, name: '田中' },
  { id: 2, name: '鈴木' }
])
</script>
```

</div>
<div class="flex-item">


<div class="small-card">
<strong>使い分け</strong>:<br>
• <strong>v-if</strong>: 表示/非表示<br>
• <strong>v-for</strong>: リスト表示
</div>

</div>
</div>

---

# ディレクティブ② 入力・イベント

<div class="flex-container">
<div class="flex-item">

### v-model: 双方向バインディング
```jsx
<input v-model="inputValue" />
<p>入力内容: {{ inputValue }}</p>
```

### @click: イベントハンドリング
```jsx
<button @click="handleClick">
  クリック
</button>
<p>回数: {{ clickCount }}</p>
```

### データと処理
```jsx
<script setup>
const inputValue = ref('')
const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}
</script>
```

</div>
<div class="flex-item">

<div class="small-card">
<strong>よく使うディレクティブ</strong>:<br>
• <strong>v-if</strong>: 表示/非表示<br>
• <strong>v-for</strong>: 繰り返し表示<br>
• <strong>v-model</strong>: 入力欄との連動<br>
• <strong>@click</strong>: クリック時の処理
</div>

</div>
</div>

---

# ② scriptセクション

## 画面に動きを与える

---

# scriptの役割

## &lt;script setup&gt; セクションでは、<strong>画面の動作やデータの管理</strong>を行います

```jsx
<script setup>
import { ref } from 'vue'

// データの定義
const message = ref('Hello!')
const count = ref(0)

// 関数の定義
const increment = () => {
  count.value++
}
</script>
```

<div class="small-card">
ここで定義したデータや関数は、templateセクションで使うことができます！
</div>

---

# templateとscriptの連携

<div class="flex-container">
<div class="flex-item">

### template部分
```jsx
<template>
  <!-- scriptで定義したデータを表示 -->
  <p>{{ message }}</p>
  <p>カウント: {{ count }}</p>
  
  <!-- scriptで定義した関数を呼び出す -->
  <button @click="increment">+1</button>
</template>
```

### script部分
```jsx
<script setup>
import { ref } from 'vue'

const message = ref('Hello!')
const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```


</div>

<div class="flex-item">



<div class="small-card">
<strong>ポイント</strong>: scriptで定義 → templateで使用
</div>

</div>
</div>

---

# ③ styleセクション

## 見た目を整える

---

# styleの役割

## &lt;style&gt; セクションでは、<strong>CSSを使って見た目を装飾</strong>します

<div class="flex-container">
<div class="flex-item">

```jsx
<template>
  <div>
    <h1>タイトル</h1>
    <button class="primary-button">
      クリック
    </button>
  </div>
</template>
```

```jsx
<style scoped>
h1 {
  color: #333;
  font-size: 24px;
}

.primary-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}
</style>
```


</div>

<div class="flex-item">
<div class="small-card">
<strong>scopedの意味</strong>: このファイルだけに適用されるスタイル
</div>
</div>


---

# もう一つの方法: Tailwind CSS

## このプロジェクトでは <strong>Tailwind CSS</strong> を使って、もっと簡単にスタイリングができます！

```jsx
<template>
  <!-- styleセクションを書かなくても、クラス名だけで装飾できる！ -->
  <div class="p-5 bg-gray-100">
    <h1 class="text-2xl text-gray-800">タイトル</h1>
    <button class="bg-blue-500 text-white px-5 py-2 rounded">
      クリック
    </button>
  </div>
</template>

<!-- styleセクションが不要！ -->
```

<div class="small-card">
<strong>メリット</strong>:<br>
• CSSを書かなくても見た目を整えられる<br>
• クラス名を見れば、どんな装飾か分かる
</div>

---

# これが、こうかけちゃいます

<div class="flex-container">
<div class="flex-item">

<!-- ここにstyle記載の場合の記述例 -->

<!-- ここにtailwind記載の場合の記述例 -->


</div>
<div class="flex-item">

<!-- ブランクのままでOKです。後で画像を貼ります -->

</div>
</div>

---

# よく使うTailwindクラス

<div class="flex-container">
<div class="flex-item">

### スペーシング
- `p-4`: padding（内側の余白）
- `m-4`: margin（外側の余白）
- `px-4`: 左右のpadding
- `mt-4`: 上のmargin

### 色・装飾
- `bg-white`: 白い背景
- `text-blue-500`: 青い文字
- `rounded`: 角を丸く
- `shadow`: 影をつける

</div>
<div class="flex-item">

### テキスト
- `text-lg`: 文字を大きく
- `font-bold`: 太字
- `text-center`: 中央揃え
- `text-sm`: 文字を小さく

### レイアウト
- `flex`: フレックスボックス
- `grid`: グリッド
- `justify-center`: 中央揃え
- `items-center`: 縦中央

</div>
</div>

---

# 学んだことを確認しよう

## 理解度チェックと実践課題

---

<style scoped>
  .text-lg {
    font-size: 0.8em;
  }
</style>

# 🔍 問題（初級）

## Q: scriptで定義した変数 userName の値を画面に表示するには、どのコードが適切？

<div class="text-lg">
A. &lt;p&gt;userName&lt;/p&gt;<br>
B. &lt;p&gt;{{ userName }}&lt;/p&gt;<br>
C. &lt;p&gt;:userName&lt;/p&gt;<br>
D. &lt;p v-text="userName"&gt;&lt;/p&gt;
</div>


---

# 💡 解説（初級問題）

## 正解: B. &lt;p&gt;{{ userName }}&lt;/p&gt;

<div class="flex-container">
<div class="flex-item">

### 選択肢の解説
- **A**: 文字通り「userName」と表示
- **B**: <span class="highlight">変数の値が表示される</span> ✅
- **C**: 何も表示されない
- **D**: 動くが、{{ }} の方が一般的

</div>
<div class="flex-item">

### 実装例
```jsx
<script setup>
const userName = ref('田中太郎')
</script>

<template>
  <p>{{ userName }}</p>
  <!-- 「田中太郎」と表示される -->
</template>
```

</div>
</div>

<div class="small-card">
<strong>重要</strong>: Vueでは {{ }} を使ってJavaScriptの値をHTMLに表示する
</div>

---

# 📚 本日の資源

<div class="flex-container">
<div class="flex-item">

## リポジトリ
- **メイン**: [wg-attendance-system](https://github.com/toshiki-hirata/wg-attendance-system)
- **StackBlitz**: [Fork してスタート](https://stackblitz.com/fork/github/toshiki-hirata/wg-attendance-system)

</div>
<div class="flex-item">

## 参考資料
- [テンプレート構文](https://ja.vuejs.org/guide/essentials/template-syntax.html)
- [単一ファイルコンポーネント](https://ja.vuejs.org/guide/scaling-up/sfc.html)

</div>
</div>

---

# 🔨 問題（中級）- ハンズオン

## お題: SideNavコンポーネントの基本レイアウトを作成してください

<div class="flex-container">
<div class="flex-item">

### 現在の状況
- App.vueにFooterが配置されていない
- SideNavコンポーネントが未完成（空の状態）

### 要件
1. **課題1**: App.vueにFooterを配置
   - Footerコンポーネントをimport
   - 画面下部に固定表示
   
2. **課題2**: SideNavの基本レイアウト作成
   - HTML要素を配置（nav要素、メニュー項目）
   - Tailwind CSSでスタイル適用（bg-purple-500など）
   - {{ userName }} を使って名前を表示

</div>
<div class="flex-item">

### 完成イメージ
```
┌──────────────┐
│勤怠管理アプリ  │
│              │
│ ⏰ 打刻      │
│ 📋 残業確認   │
│              │
│              │
│              │
│ 👤 田中 二郎  │
└──────────────┘
```

**課題2のGoal**: templateに書いて目的のレイアウトに近づける
- html要素を書いてみる
- tailwind cssでスタイルを当ててみる  
- {{ userName }} を使って名前を表示

</div>
</div>

---

# 💡 解説（中級問題）- 課題1

## 課題1: App.vueへのFooter配置

```jsx
<!-- App.vue -->
<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- ヘッダー部分 -->
    <header class="border-b py-4">
      <div class="text-2xl text-center">勤怠管理システム</div>
    </header>
    
    <!-- メインコンテンツ -->
    <div class="flex flex-1">
      <SideNav />
      <main class="flex-1 p-8">
        <RouterView />
      </main>
    </div>
    
    <!-- Footer を追加 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideNav from '/src/comionents/sideNav.component.vue'
// Footerコンポーネントをインポート
import Footer from '/src/components/footer.component.vue'
</script>
```

---

# 💡 解説（中級問題）- 課題2

## 課題2: SideNavの基本レイアウト作成

```jsx
<!-- sideNav.component.vue -->
<script setup lang="ts">
import { ref } from 'vue'

// ユーザー名をリアクティブデータとして定義
const userName = ref('田中 二郎')
</script>

<template>
  <!-- navタグでサイドナビゲーションを作成 -->
  <nav class="fixed flex flex-col justify-between bg-purple-500 h-full rounded-r-[20px] shadow-2xl p-4 text-gray-100">
    <!-- 上部セクション：タイトルとメニュー -->
    <div class="flex flex-col gap-10">
      <!-- アプリタイトル -->
      <div class="font-bold">勤怠管理アプリ</div>
      
      <!-- メニュー項目 -->
      <div class="flex flex-col gap-4">
        <button class="flex items-center w-full px-2 gap-2">
          ⏰ <span>打刻</span>
        </button>
        <button class="flex items-center w-full px-2 gap-2">
          📋 <span>残業確認</span>
        </button>
      </div>
    </div>
    
    <!-- 下部セクション：ユーザー名表示 -->
    <div class="flex items-center w-full gap-2">
      👤 {{ userName }}
    </div>
  </nav>
</template>
```

---

# 実装のポイント解説

<div class="flex-container">
<div class="flex-item">

### 🎯 課題1のポイント

<div class="small-card">
<strong>コンポーネントの使い方</strong>:<br>
1. import文でコンポーネントを読み込む<br>
2. templateで使用する
</div>

<div class="small-card">
<strong>レイアウトの工夫</strong>:<br>
• <strong>flex flex-col</strong>: 縦方向配置<br>
• <strong>flex-1</strong>: 残り領域を埋める<br>
• Footerが常に下部に表示
</div>

</div>
<div class="flex-item">

### 🎯 課題2のポイント

<div class="small-card">
<strong>HTML要素の配置</strong>:<br>
• <strong>&lt;nav&gt;</strong> タグでナビゲーション作成<br>
• <strong>&lt;div&gt;</strong> で構造を整理<br>
• <strong>&lt;button&gt;</strong> でメニュー項目
</div>

<div class="small-card">
<strong>Tailwind CSSの活用</strong>:<br>
• <strong>bg-purple-500</strong>: 紫色の背景<br>
• <strong>flex flex-col</strong>: 縦方向レイアウト<br>
• <strong>gap-4</strong>: 要素間の余白
</div>

<div class="small-card">
<strong>{{ }} でデータ表示</strong>:<br>
• scriptで定義した userName<br>
• templateで {{ userName }} で表示<br>
• リアクティブに更新される
</div>

</div>
</div>

<div class="card">
<strong>学習効果</strong>:<br>
✅ コンポーネントのインポートと使用方法を習得<br>
✅ HTML要素を使った基本的な構造作成を理解<br>
✅ Tailwind CSSでのスタイリング手法を習得<br>
✅ Vue.jsの {{ }} 記法でデータ表示を体験
</div>

---

# まとめ

<div class="flex-container">
<div class="flex-item">

### 今日学んだこと

<div class="small-card">
<strong>Vueアプリケーションの基本構造</strong><br>
✅ プロジェクトの構成<br>
✅ main.ts、App.vueの役割
</div>

<div class="small-card">
<strong>.vueファイルの3つのセクション</strong><br>
✅ <strong>template</strong>: HTMLで構造<br>
✅ <strong>script</strong>: JSで動作<br>
✅ <strong>style</strong>: CSSで装飾
</div>

</div>
<div class="flex-item">

### 使えるようになった機能

<div class="small-card">
<strong>templateで使える機能</strong><br>
✅ <strong>{{ }}</strong> でデータ表示<br>
✅ <strong>v-</strong> ディレクティブ<br>
✅ <strong>:</strong> で動的属性
</div>

<div class="small-card">
<strong>次回予告</strong><br>
• ロジックの実装<br>
• APIコールの方法<br>
• リアクティブなデータの扱い方
</div>

</div>
</div>

---

# 🎯 追加課題

## 時間がある方は以下に挑戦してみてください

<div class="flex-container">
<div class="flex-item">

### 1. SideNavの拡張
「設定」メニューを追加
- path: `/settings`
- icon: SettingIcon

### 2. Footerの装飾
Tailwindクラスで装飾
- 背景色を変更
- アイコンや情報を追加

</div>
<div class="flex-item">

### 3. メニューハイライト
選択中のメニューを強調
- 現在のページを判定
- 背景色を変更
- ヒント: useRoute()

<div class="small-card">
<strong>ヒント</strong>: 既存のコンポーネントコードを参考にしながら、今日学んだことを活用してみましょう！
</div>

</div>
</div>