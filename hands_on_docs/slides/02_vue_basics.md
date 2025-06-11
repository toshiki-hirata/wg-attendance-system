---
marp: true
theme: vue-handson
paginate: true
backgroundColor: #fff
footer: 'Vue.js ハンズオン - 勤怠管理アプリ'
style: |
  section {
    font-size: 26px;
  }
  pre {
    font-size: 0.6em !important;
    line-height: 1.1 !important;
    margin: 0.6em 0 !important;
    padding: 0.6em !important;
    max-height: 55vh;
    overflow-y: auto;
  }
  h2 {
    font-size: 1.7em;
    margin-bottom: 0.3em;
    margin-top: 0.5em;
  }
  p, li {
    margin: 0.4em 0;
    line-height: 1.3;
  }
  ul, ol {
    margin: 0.5em 0;
  }
---

# Session 2: Vueアプリ全体の構成、HTML、見た目の実装

Vue.jsの基本構成とコンポーネントベースの開発を学びます

---

## 📚 本日の資源

### リポジトリ
- メインリポジトリ: https://github.com/toshiki-hirata/wg-attendance-system
- StackBlitz環境: [こちらから Fork してください](https://stackblitz.com/fork/github/toshiki-hirata/wg-attendance-system)

### 参考資料
- Vue.js公式ドキュメント: [テンプレート構文](https://ja.vuejs.org/guide/essentials/template-syntax.html)
- Vue.js公式ドキュメント: [単一ファイルコンポーネント](https://ja.vuejs.org/guide/scaling-up/sfc.html)

### 今日のゴール
✅ Vueアプリケーションの基本構造を理解する
✅ SFC（単一ファイルコンポーネント）の構成を理解する
✅ テンプレート構文とディレクティブを使える
✅ Tailwind CSSでスタイリングができる

---

# Vueアプリケーションの全体構成

---

## プロジェクト構造

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

---

## 各フォルダの役割

- **components/**: ボタンや入力欄など、いろいろな画面で使い回す部品
- **pages/**: 打刻画面や残業申請画面など、1つの完全な画面
- **stores/**: アプリ全体で共有するデータを管理する場所
- **api/**: HTTPリクエストの基本設定（axios設定、型定義など）
- **assets/**: 画像やアイコンなどの静的ファイル
- **repositories/**: api/を使って実際にデータを取得・送信する処理
- **utils/**: 日付フォーマットなど、便利な関数を置く場所

**📍 今回のハンズオンでは**: 主に **components/** と **pages/** の.vueファイルを触りながら、画面の作り方を学びます！

---

# Vueファイル（.vue）を理解しよう

---

## .vueファイルとは？

Vueでは、**1つのファイルに画面の見た目と動作をまとめて書く**ことができます。

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

**3つの重要な部分**:
1. **template**: HTMLで画面の構造を作る
2. **script**: JavaScriptで動きを作る  
3. **style**: CSSで見た目を装飾する

これから、この3つの部分をそれぞれ詳しく見ていきましょう！

---

## 実際の.vueファイルを見てみよう

```jsx
<template>
  <!-- ① 画面の構造 -->
  <div>
    <h1>打刻</h1>
    <p>現在時刻: {{ currentTime }}</p>
    <button @click="handlePunch">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script setup>
// ② 画面の動作
import { ref } from 'vue'

const currentTime = ref('12:34:56')
const buttonLabel = ref('出勤')

const handlePunch = () => {
  // ボタンをクリックした時の処理
}
</script>

<style scoped>
/* ③ 見た目の装飾 */
h1 { font-size: 24px; }
</style>
```

これから各セクションの役割を詳しく学んでいきます！

---

# ① templateセクション - 画面の構造を作る

---

## templateの役割

`<template>` セクションでは、**HTMLを使って画面の構造**を定義します。

```jsx
<template>
  <div>
    <h1>勤怠管理システム</h1>
    <p>ようこそ！</p>
  </div>
</template>
```

---

## HTMLとは？

**HTML（HyperText Markup Language）** は、Webページの構造を作るための言語です。

**基本的な仕組み**:
- **タグ**と呼ばれる `<>` で囲まれた命令を使う
- タグで「これは見出し」「これは段落」などを指定する
- ブラウザがタグを読んで、画面に表示する

```html
<h1>これは見出し</h1>
<p>これは段落の文章です</p>
<button>これはボタン</button>
```

**重要**: タグには開始 `<h1>` と終了 `</h1>` がある

ただし、Vueのtemplateでは普通のHTMLに加えて、**特別な機能**が使えます！

---

## {{ }} を使ってデータを表示

Vueでは `{{ }}` （二重波括弧）を使って、JavaScriptのデータをHTMLに表示できます。

```jsx
<template>
  <!-- 文字を表示 -->
  <p>メッセージ: {{ message }}</p>
  
  <!-- 計算結果を表示 -->
  <p>合計: {{ count + 1 }}</p>
  
  <!-- 条件によって表示を変える -->
  <p>状態: {{ isActive ? 'アクティブ' : '非アクティブ' }}</p>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')
const count = ref(10)
const isActive = ref(true)
</script>
```

**ポイント**: `{{ }}` の中には JavaScript の式を書くことができます

---

## templateで使える特別な機能 - ディレクティブ

Vueのtemplateでは、`v-` で始まる特別な属性で動的な機能を追加できます。

---

## ディレクティブ① 表示制御

```jsx
<template>
  <!-- v-if: 条件によって表示/非表示 -->
  <div v-if="showMessage">
    メッセージを表示
  </div>
  
  <!-- v-for: 配列の要素を繰り返し表示 -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
const showMessage = ref(true)
const items = ref([
  { id: 1, name: '田中' },
  { id: 2, name: '鈴木' }
])
</script>
```

---

## ディレクティブ② 入力・イベント

```jsx
<template>
  <!-- v-model: 入力欄とデータを連動 -->
  <input v-model="inputValue" />
  <p>入力内容: {{ inputValue }}</p>
  
  <!-- @click: クリック時の処理 -->
  <button @click="handleClick">クリック</button>
  <p>クリック回数: {{ clickCount }}</p>
</template>

<script setup>
const inputValue = ref('')
const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}
</script>
```

**よく使うディレクティブまとめ**:
- `v-if` → 表示/非表示の切り替え
- `v-for` → 繰り返し表示
- `v-model` → 入力欄との連動
- `@click` → クリック時の処理

---


# ② scriptセクション - 画面に動きを与える

---

## scriptの役割

`<script setup>` セクションでは、**画面の動作やデータの管理**を行います。

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

ここで定義したデータや関数は、templateセクションで使うことができます！

---

## templateとscriptの連携

```jsx
<template>
  <!-- scriptで定義したデータを表示 -->
  <p>{{ message }}</p>
  <p>カウント: {{ count }}</p>
  
  <!-- scriptで定義した関数を呼び出す -->
  <button @click="increment">+1</button>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello!')
const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

**ポイント**: scriptで定義 → templateで使用

---

# ③ styleセクション - 見た目を整える

---

## styleの役割

`<style>` セクションでは、**CSSを使って見た目を装飾**します。

```jsx
<template>
  <div class="container">
    <h1>タイトル</h1>
    <button class="primary-button">クリック</button>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

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

**scopedの意味**: このファイルだけに適用されるスタイル

---

## もう一つの方法: Tailwind CSS

実は、このプロジェクトでは **Tailwind CSS** という便利なツールを使って、
もっと簡単にスタイリングができます！

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

---

## Tailwind CSSの基本

ユーティリティファーストのCSSフレームワーク

```jsx
<template>
  <!-- 基本的なレイアウト -->
  <div class="container mx-auto px-4">
    
    <!-- フレックスボックス -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">タイトル</h1>
      <button class="px-4 py-2 bg-blue-500 text-white rounded">
        ボタン
      </button>
    </div>
    
    <!-- グリッドレイアウト -->
    <div class="grid grid-cols-3 gap-4 mt-8">
      <div class="bg-white p-4 shadow rounded">カード1</div>
      <div class="bg-white p-4 shadow rounded">カード2</div>
      <div class="bg-white p-4 shadow rounded">カード3</div>
    </div>
  </div>
</template>
```

---

## よく使うTailwindクラス

### スペーシング
- `p-4`: padding（内側の余白）
- `m-4`: margin（外側の余白）
- `px-4`: 左右のpadding
- `mt-4`: 上のmargin

### テキスト
- `text-lg`: 文字を大きく
- `font-bold`: 太字
- `text-center`: 中央揃え

### 色・装飾
- `bg-white`: 白い背景
- `text-blue-500`: 青い文字
- `rounded`: 角を丸く
- `shadow`: 影をつける

**メリット**: 
- CSSを書かなくても見た目を整えられる
- クラス名を見れば、どんな装飾か分かる

---

# 学んだことを確認しよう

---

## 🔍 問題（初級）

**Q: scriptで定義した変数 `userName` の値を画面に表示するには、どのコードが適切？**

A. `<p>userName</p>`
B. `<p>{{ userName }}</p>`
C. `<p>:userName</p>`
D. `<p v-text="userName">`

⏰ 考え時間: 30秒

---

## 💡 解説（初級問題）

**正解**: B. `<p>{{ userName }}</p>`

**選択肢の解説**:
- A. `<p>userName</p>` → 文字通り「userName」と表示される
- B. `<p>{{ userName }}</p>` → **変数の値**が表示される ← **正解！**
- C. `<p>:userName</p>` → 何も表示されない
- D. `<p v-text="userName">` → 動くが、`{{ }}` の方が一般的

**重要**: Vueでは `{{ }}` を使ってJavaScriptの値をHTMLに表示する

```jsx
<script setup>
const userName = ref('田中太郎')
</script>

<template>
  <p>{{ userName }}</p>  <!-- 「田中太郎」と表示される -->
</template>
```

---

## 🔨 問題（中級）- ハンズオン

**お題**: アプリの基本レイアウトを完成させてください

**現在の状況**:
- App.vueにはFooterコンポーネントが配置されていない
- SideNavコンポーネント内のメニュー項目のアイコンが表示されない

**要件**:
1. **課題1**: App.vueにFooterコンポーネントを配置
   - Footerコンポーネントをimportする
   - 画面の下部に固定表示されるように配置
2. **課題2**: SideNavコンポーネントのアイコン表示を実装
   - 各メニュー項目（打刻、残業申請）にアイコンを表示
   - アイコンコンポーネントは `/src/assets/icons/` に用意済み

**完成目標**:
- 画面下部に「© 2025 勤怠管理システム」のFooterが表示される
- サイドナビのメニュー項目に適切なアイコンが表示される

**ヒント**: 
- 今日学んだ「コンポーネントのインポートと使用」を活用
- Footerの配置: `src/components/footer.component.vue`
- アイコンの使用例: `<TimeIcon class="w-5 h-5" />`

⏰ 実装時間: 10分

---

## 💡 解説（中級問題）

**課題1: App.vueへのFooter配置**

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
import SideNav from '/src/components/sideNav.component.vue'
// Footerコンポーネントをインポート
import Footer from '/src/components/footer.component.vue'
</script>
```

---

## 課題2: SideNavのアイコン実装

```jsx
<!-- sideNav.component.vue の一部 -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
// アイコンコンポーネントをインポート
import TimeIcon from '/src/assets/icons/time.icon.vue'
import ListIcon from '/src/assets/icons/list.icon.vue'

const menuItems = [
  { path: '/punch-clock', label: '打刻', icon: TimeIcon },
  { path: '/overtime', label: '残業申請', icon: ListIcon }
]
</script>

<template>
  <nav class="w-64 bg-gray-100 p-4">
    <RouterLink 
      v-for="item in menuItems" 
      :key="item.path"
      :to="item.path"
      class="flex items-center gap-3 p-3 rounded hover:bg-gray-200"
    >
      <!-- アイコンを動的に表示 -->
      <component :is="item.icon" class="w-5 h-5" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>
```

---

## 実装のポイント解説

### 🎯 課題1のポイント

**コンポーネントの使い方の基本**:
1. **import文でコンポーネントを読み込む**
   ```javascript
   import Footer from '/src/components/footer.component.vue'
   ```
2. **templateで使用する**
   ```html
   <Footer />
   ```

**レイアウトの工夫**:
- `flex flex-col` で縦方向に要素を配置
- `flex-1` でメインコンテンツが残りの領域を埋める
- これによりFooterが常に画面下部に表示される

---

## 🎯 課題2のポイント

**動的コンポーネント `<component :is="">`**:
- 変数に応じて表示するコンポーネントを切り替える
- `item.icon` にはアイコンコンポーネント自体が入っている

**配列を使った効率的な実装**:
```javascript
const menuItems = [
  { path: '/punch-clock', label: '打刻', icon: TimeIcon },
  { path: '/overtime', label: '残業申請', icon: ListIcon }
]
```
- 同じような項目を配列で管理
- `v-for` で繰り返し表示
- 新しいメニューを追加するときも配列に追加するだけ

**学習効果**:
- ✅ コンポーネントのインポートと使用方法を習得
- ✅ レイアウトの基本（Flexbox）を理解
- ✅ 動的コンポーネントという高度な機能を体験

---

## まとめ

### 今日学んだこと

**Vueアプリケーションの基本構造**
- ✅ プロジェクトの構成とmain.ts、App.vueの役割

**.vueファイルの3つのセクション**
- ✅ `<template>`: HTMLで画面の構造を作る
- ✅ `<script>`: JavaScriptで動作を定義する
- ✅ `<style>`: CSSで見た目を装飾する（またはTailwind CSSを使う）

**templateで使える機能**
- ✅ `{{ }}` でデータを表示
- ✅ `v-` ディレクティブで動的な機能を追加
- ✅ `:` で属性を動的に設定

### 次回予告
- ロジックの実装
- APIコールの方法
- リアクティブなデータの扱い方

---

## 🎯 追加課題

時間がある方は以下に挑戦してみてください：

1. **SideNavに新しいメニュー項目を追加**
   - 「設定」メニューを追加（path: '/settings', icon: SettingIcon）
   
2. **FooterにTailwindクラスで装飾を追加**
   - 背景色を変更して見やすくする
   - アイコンや追加情報を表示

3. **選択中のメニューをハイライト表示**
   - 現在のページに対応するメニュー項目の背景色を変える
   - ヒント: `useRoute()` で現在のパスを取得

**ヒント**: 既存のコンポーネントコードを参考にしながら、今日学んだことを活用してみましょう！