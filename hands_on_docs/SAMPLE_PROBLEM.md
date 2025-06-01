# ハンズオン問題サンプル

このファイルは、PRESENTATION_RULES.mdで定義されたフォーマットの実例を示すサンプルです。

## 問題例（初級）- Vueの基本

### 🔍 問題（初級）

**Q: Vueコンポーネントで双方向データバインディングを実現するディレクティブは次のうちどれですか？**

A. `v-bind`
B. `v-model`
C. `v-show`
D. `v-for`

⏰ 考え時間: 1分

---

### 💡 解説

**正解**: B. `v-model`

**ポイント**:
- `v-model` は入力要素とデータを双方向にバインドする
- 内部的には `v-bind:value` と `@input` の組み合わせ
- フォーム入力の処理で頻繁に使用される

```vue
<!-- v-modelの例 -->
<template>
  <input v-model="message" />
  <p>入力内容: {{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
</script>
```

## 問題例（中級）- コンポーネント実装

### 🔨 問題（中級）- ハンズオン

**お題**: 打刻ボタンコンポーネントに、クリック時のローディング状態を実装してください

**要件**:
- ボタンクリック時にローディング状態を表示
- ローディング中はボタンを非活性化
- Piniaストアの`loading.store.ts`を使用すること

**ヒント**: 該当ファイル: `src/components/primaryButton.component.vue`

⏰ 実装時間: 10分

---

### 💡 解説

**ポイント**:
- Piniaストアからローディング状態を取得
- ボタンの`disabled`属性でクリックを制御
- 条件付きレンダリングでUIを切り替え

```vue
<!-- 解答例 -->
<template>
  <button 
    :disabled="loadingStore.isLoading || disabled"
    @click="handleClick"
    class="px-4 py-2 rounded"
  >
    <span v-if="loadingStore.isLoading">読み込み中...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { useLoadingStore } from '/src/stores/loading.store'

const loadingStore = useLoadingStore()

const props = defineProps<{
  label: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (!loadingStore.isLoading) {
    emit('click')
  }
}
</script>
```

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