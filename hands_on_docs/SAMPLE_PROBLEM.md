# ハンズオン問題サンプル

このファイルは、PRESENTATION_RULES.mdで定義されたフォーマットの実例を示すサンプルです。

## 問題設計のポイント

### 初級問題の設計方針
- **形式**: 「○○するにはどのコードが適切？」形式
- **目的**: 座学で学んだ基本概念の理解確認
- **内容**: templateセクションの基本機能（データ表示、ディレクティブなど）に焦点

### 中級問題の設計方針  
- **形式**: 未完成コードから完成品を作るハンズオン形式
- **目的**: 学習内容を総合的に活用し、達成感を得る
- **構成**: 現在の状況 → 要件 → 完成目標 → ヒント

## 問題例（初級）- Vueの基本

### 🔍 問題（初級）

**Q: scriptで定義した変数 `userName` の値を画面に表示するには、どのコードが適切？**

A. `<p>userName</p>`
B. `<p>{{ userName }}</p>`
C. `<p>:userName</p>`
D. `<p v-text="userName">`

⏰ 考え時間: 30秒

---

### 💡 解説

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

## 問題例（中級）- 時刻表示機能の実装

### 🔨 問題（中級）- ハンズオン

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

### 💡 解説

**実装のポイント**:
- `ref()` でリアクティブなデータを作成
- `onMounted()` でコンポーネント開始時の処理を定義
- `setInterval()` で定期的な更新を実現
- `padStart()` で2桁のゼロ埋めを実装

```vue
<template>
  <div class="text-center">
    <div>{{ currentDate }}</div>
    <div class="text-[50px]">{{ currentTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentDate = ref('')
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  
  // 日付の作成
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const day = dayNames[now.getDay()]
  currentDate.value = `${year}/${month}/${date}(${day})`
  
  // 時刻の作成
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateTime() // 初回実行
  setInterval(updateTime, 1000) // 1秒ごとに更新
})
</script>
```

**学習効果**:
- templateとscriptの連携を体験
- Vueのリアクティブシステムを実感
- ライフサイクル（onMounted）の活用
- 実際に動作する機能を完成させる達成感

## 資源共有スライドの例

### 📚 本日の資源

### リポジトリ
- メインリポジトリ: https://github.com/toshiki-hirata/wg-attendance-system
- StackBlitz環境: https://stackblitz.com/fork/github/toshiki-hirata/wg-attendance-system

### 参考資料
- Vue.js公式ドキュメント: [Composition API](https://ja.vuejs.org/guide/extras/composition-api-faq.html)
- Pinia公式ドキュメント: [Core Concepts](https://pinia.vuejs.org/core-concepts/)

### 今日のゴール
✅ Vueの基本的なディレクティブを理解する
✅ コンポーネントの作成と利用ができる
✅ Piniaでの状態管理の基礎を理解する