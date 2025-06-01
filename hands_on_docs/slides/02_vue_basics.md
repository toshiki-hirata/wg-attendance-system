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

ただし、普通のHTMLと違って、**Vueの特別な機能**が使えます！

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

## : （コロン）を使った属性の動的設定

template内で、HTMLの属性に JavaScript の値を設定したい時は `:` を使います。

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

**Q: .vueファイルの3つのセクションのうち、画面の動作を定義するのは？**

A. `<template>`
B. `<script>`
C. `<style>`
D. `<body>`

⏰ 考え時間: 30秒

---

## 🔍 問題（初級） - その2

**Q: Vueのtemplateで、条件によって要素の表示/非表示を切り替えるディレクティブは？**

A. `v-show`
B. `v-if`
C. `v-display`
D. AとBの両方

⏰ 考え時間: 1分

---

## 🔨 問題（中級）- ハンズオン

**お題**: `primaryButton.component.vue`を修正して、ボタンのサイズを変更できるようにしてください

**要件**:
1. **scriptセクション**で `size` プロパティを追加（'sm' | 'md' | 'lg'）
2. **templateセクション**でサイズに応じたTailwindクラスを適用
3. デフォルトサイズは 'md'

**サイズ別のTailwindクラス**:
- sm: `px-3 py-1 text-sm`
- md: `px-4 py-2`
- lg: `px-6 py-3 text-lg`

**ヒント**: 
- 該当ファイル: `src/components/primaryButton.component.vue`
- 今日学んだ3つのセクションをすべて活用しましょう！

⏰ 実装時間: 10分

---

## 💡 解説（初級問題）

**問題1の正解**: B. `<script>`

**各セクションの役割**:
- `<template>`: 画面の**構造**（HTML）
- `<script>`: 画面の**動作**（JavaScript）
- `<style>`: 画面の**装飾**（CSS）

---

## 💡 解説（初級問題） - その2

**問題2の正解**: D. AとBの両方

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