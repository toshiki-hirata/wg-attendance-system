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
│   ├── components/      # 再利用可能なコンポーネント
│   ├── pages/           # ページコンポーネント
│   ├── stores/          # Pinia ストア
│   └── routes.ts        # ルーティング設定
└── index.html           # HTMLエントリーポイント
```

---

## main.ts - アプリケーションの起点

```typescript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Vueアプリケーションを作成
const app = createApp(App)

// HTMLの <div id="app"></div> に接続
app.mount('#app')
```

**何をしているか**:
1. `App.vue` を読み込む
2. Vueアプリケーションを作成
3. `index.html` の `<div id="app">` 部分に表示

※ 実際のプロジェクトでは、ここに様々な設定を追加していきます

---

## App.vue - アプリ全体の枠組み

```vue
<!-- src/App.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 左側のメニュー -->
    <side-nav />
    
    <!-- 中央のメインコンテンツ -->
    <main class="flex-1 p-6 overflow-y-auto">
      <!-- ページの内容がここに表示される -->
      <router-view />
    </main>
    
    <!-- 下部のフッター -->
    <footer-component />
  </div>
</template>

<script setup lang="ts">
// 他の.vueファイルを読み込んで使う
import sideNav from './components/sideNav.component.vue'
import footerComponent from './components/footer.component.vue'
</script>
```

**このファイルの役割**:
- アプリ全体のレイアウトを定義
- 他の.vueファイル（コンポーネント）を組み合わせて使用

---

# Vueファイル（.vue）の構成

---

## .vueファイルとは？

Vueでは、**1つのファイルに画面の見た目と動作をまとめて書く**ことができます。

```vue
<template>
  <!-- ここに画面の見た目（HTML）を書く -->
</template>

<script setup lang="ts">
// ここに画面の動作（JavaScript/TypeScript）を書く
</script>

<style scoped>
/* ここに見た目の装飾（CSS）を書く（省略可） */
</style>
```

**ポイント**:
- 1つのファイルで「見た目」と「動作」を管理
- ファイル名は `○○.vue` という形式
- このプロジェクトでは主に `<template>` と `<script>` を使用

---

## 実際の.vueファイルを見てみよう

```vue
<!-- src/pages/punchClockPage.vue -->
<template>
  <!-- 画面の見た目部分 -->
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">打刻</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <p class="text-lg mb-4">
        現在時刻: {{ currentTime }}
      </p>
      
      <button @click="handlePunch">
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 画面の動作部分
import { ref } from 'vue'

// データを定義
const currentTime = ref('12:34:56')
const isPunchedIn = ref(false)

// ボタンの表示テキスト
const buttonLabel = ref('出勤')

// ボタンがクリックされた時の処理
const handlePunch = () => {
  isPunchedIn.value = !isPunchedIn.value
  buttonLabel.value = isPunchedIn.value ? '退勤' : '出勤'
}
</script>
```

---

# 画面にデータを表示する方法

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

## v- で始まる特別な属性（ディレクティブ）

Vueには `v-` で始まる特別な属性があり、HTMLに動きを加えることができます。

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
  
  <!-- v-model: 入力欄とデータを連動させる -->
  <input v-model="inputValue" />
  <p>入力した内容: {{ inputValue }}</p>
  
  <!-- @click: クリックした時の処理を設定 -->
  <button @click="handleClick">クリックしてね</button>
</template>
```

**よく使うディレクティブ**:
- `v-if` → 表示/非表示の切り替え
- `v-for` → 繰り返し表示
- `v-model` → 入力欄との連動
- `@click` → クリック時の処理

---

## : （コロン）を使った動的な属性設定

HTMLの属性（src、class、styleなど）に JavaScript の値を設定したい時は `:` を使います。

```vue
<template>
  <!-- 画像のURLを動的に設定 -->
  <img :src="imageUrl" :alt="imageAlt" />
  
  <!-- クラスを条件によって付け外し -->
  <div :class="{ active: isActive }">
    isActive が true の時、active クラスが付きます
  </div>
  
  <!-- スタイルを動的に変更 -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
    文字の色とサイズが変わります
  </div>
  
  <!-- 普通の書き方との比較 -->
  <img src="固定のURL" />        <!-- 固定値 -->
  <img :src="imageUrl" />         <!-- 動的な値 -->
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageUrl = ref('/path/to/image.jpg')
const isActive = ref(true)
const textColor = ref('red')
const fontSize = ref(20)
</script>
```

**ポイント**: `:属性名="JavaScript の値"` で動的に値を設定できます

---

# Tailwind CSSによるスタイリング

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
- `p-4`: padding 1rem
- `m-4`: margin 1rem
- `px-4`: 左右padding
- `mt-4`: 上margin

### テキスト
- `text-lg`: フォントサイズ
- `font-bold`: 太字
- `text-center`: 中央揃え

### 背景・枠線
- `bg-white`: 背景色
- `border`: 枠線
- `rounded`: 角丸
- `shadow`: 影

### レスポンシブ
- `sm:`: 640px以上
- `md:`: 768px以上
- `lg:`: 1024px以上

---

## 🔍 問題（初級）

**Q: Vueのテンプレートで、条件によって要素の表示/非表示を切り替えるディレクティブは？**

A. `v-show`
B. `v-if`
C. `v-display`
D. AとBの両方

⏰ 考え時間: 1分

---

## 🔨 問題（中級）- ハンズオン

**お題**: `primaryButton.component.vue`に、ボタンのサイズを変更できる機能を追加してください

**要件**:
- `size` propを追加（'sm' | 'md' | 'lg'）
- デフォルトは 'md'
- Tailwindクラスでサイズを調整
  - sm: `px-3 py-1 text-sm`
  - md: `px-4 py-2`
  - lg: `px-6 py-3 text-lg`

**ヒント**: 
- 該当ファイル: `src/components/primaryButton.component.vue`
- `computed`を使ってクラスを動的に生成

⏰ 実装時間: 10分

---

## 💡 解説（初級問題）

**正解**: D. AとBの両方

**`v-if` と `v-show` の違い**:

### v-if
- 条件がfalseの場合、**DOMから完全に削除**
- 切り替えコストが高い
- 初期表示コストが低い

```vue
<div v-if="isVisible">条件付き表示</div>
```

### v-show
- 条件がfalseの場合、**CSS display: none** で非表示
- 切り替えコストが低い
- 初期表示コストが高い

```vue
<div v-show="isVisible">条件付き表示</div>
```

**使い分け**: 頻繁に切り替える場合は`v-show`、そうでない場合は`v-if`

---

## 💡 解説（中級問題）

**実装例**:

```vue
<!-- src/components/primaryButton.component.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  label: string
  disabled?: boolean
  size?: ButtonSize
}>(), {
  disabled: false,
  size: 'md'
})

const buttonClasses = computed(() => {
  const baseClasses = 'bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  return `${baseClasses} ${sizeClasses[props.size]}`
})
</script>
```

---

## まとめ

### 今日学んだこと
- ✅ Vueアプリケーションの基本構造
- ✅ .vueファイルの書き方（見た目と動作をまとめて管理）
- ✅ データの表示方法（{{ }} や v- ディレクティブ）
- ✅ Tailwind CSSでのスタイリング

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