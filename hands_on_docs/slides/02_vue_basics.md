---
marp: true
theme: default
paginate: true
backgroundColor: #fff
footer: 'Vue.js ハンズオン - 勤怠管理アプリ'
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

```vue
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

```vue
<!-- src/pages/punchClockPage.vue -->
<template>
  <!-- ① templateセクション: 画面の構造 -->
  <div>
    <h1>打刻</h1>
    <p>現在時刻: {{ currentTime }}</p>
    <button @click="handlePunch">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
// ② scriptセクション: 画面の動作
import { ref } from 'vue'

const currentTime = ref('12:34:56')
const isPunchedIn = ref(false)
const buttonLabel = ref('出勤')

const handlePunch = () => {
  isPunchedIn.value = !isPunchedIn.value
  buttonLabel.value = isPunchedIn.value ? '退勤' : '出勤'
}
</script>

<style scoped>
/* ③ styleセクション: 見た目の装飾 */
h1 {
  font-size: 24px;
  font-weight: bold;
}
</style>
```

これから各セクションの役割を詳しく学んでいきます！

---

# ① templateセクション - 画面の構造を作る

---

## templateの役割

`<template>` セクションでは、**HTMLを使って画面の構造**を定義します。

```vue
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

```vue
<template>
  <!-- 文字を表示 -->
  <p>メッセージ: {{ message }}</p>
  
  <!-- 計算結果を表示 -->
  <p>合計: {{ count + 1 }}</p>
  
  <!-- 条件によって表示を変える -->
  <p>状態: {{ isActive ? 'アクティブ' : '非アクティブ' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 表示したいデータを定義
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

```vue
<template>
  <!-- v-if: 条件によって表示/非表示を切り替える -->
  <div v-if="showMessage">
    このメッセージは showMessage が true の時だけ表示されます
  </div>
  
  <!-- v-for: 配列の要素を繰り返し表示 -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const showMessage = ref(true)
const items = ref([
  { id: 1, name: '田中' },
  { id: 2, name: '鈴木' },
  { id: 3, name: '佐藤' }
])
</script>
```

---

## ディレクティブ② 入力・イベント

```vue
<template>
  <!-- v-model: 入力欄とデータを連動させる -->
  <input v-model="inputValue" />
  <p>入力した内容: {{ inputValue }}</p>
  
  <!-- @click: クリックした時の処理を設定 -->
  <button @click="handleClick">クリックしてね</button>
  <p>クリック回数: {{ clickCount }}</p>
</template>

<script setup lang="ts">
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

```vue
<script setup lang="ts">
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

```vue
<template>
  <!-- scriptで定義したデータを表示 -->
  <p>{{ message }}</p>
  <p>カウント: {{ count }}</p>
  
  <!-- scriptで定義した関数を呼び出す -->
  <button @click="increment">+1</button>
</template>

<script setup lang="ts">
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

```vue
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

```vue
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

```vue
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

```vue
<script setup>
const userName = ref('田中太郎')
</script>

<template>
  <p>{{ userName }}</p>  <!-- 「田中太郎」と表示される -->
</template>
```

---

## 🔨 問題（中級）- ハンズオン

**お題**: 時刻表示画面を完成させてください

**現在の状況**:
- 渡されたコードは時刻表示機能が未完成
- 現在時刻が「--:--:--」のまま更新されない

**要件**:
1. **scriptセクション**で現在時刻を取得する処理を実装
2. **templateセクション**で取得した時刻を表示
3. 1秒ごとに時刻が更新されるようにする

**完成目標**:
```
2025/01/06(月)
12:34:56  ← リアルタイムで更新される
```

**ヒント**: 
- `setInterval` を使って1秒ごとに更新
- `new Date()` で現在時刻を取得
- 時・分・秒は2桁表示（例：09:05:03）

⏰ 実装時間: 10分

---

## 💡 解説（中級問題）

**実装例**:

```vue
<template>
  <div class="text-center">
    <!-- templateで時刻を表示 -->
    <div>{{ currentDate }}</div>
    <div class="text-[50px]">{{ currentTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// データを管理する変数
const currentDate = ref('')
const currentTime = ref('')

// 現在時刻を取得・フォーマットする関数
const updateTime = () => {
  const now = new Date()
  
  // 日付の作成（2025/01/06(月) 形式）
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const day = dayNames[now.getDay()]
  currentDate.value = `${year}/${month}/${date}(${day})`
  
  // 時刻の作成（12:34:56 形式）
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

// コンポーネントがマウントされた時に実行
onMounted(() => {
  updateTime() // 初回実行
  setInterval(updateTime, 1000) // 1秒ごとに更新
})
</script>
```

**ポイント**:
- `ref()` でリアクティブなデータを作成
- `onMounted()` でコンポーネント開始時の処理を定義
- `setInterval()` で定期的な更新を実現
- `padStart()` で2桁のゼロ埋めを実装

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

1. `select.component.vue`にアイコン表示機能を追加
2. `loading.component.vue`のアニメーションをカスタマイズ
3. サイドナビゲーションにホバーエフェクトを追加

**ヒント**: 既存のコンポーネントコードを参考にしながら、小さな改善から始めてみましょう！