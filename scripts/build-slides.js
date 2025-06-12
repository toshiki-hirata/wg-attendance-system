#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ES Modules で __dirname を取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

/**
 * .envファイルの環境変数をMarpスライドに埋め込むスクリプト
 */

const SLIDES_DIR = path.join(__dirname, '../hands_on_docs/slides');
const OUTPUT_DIR = path.join(__dirname, '../hands_on_docs/exports');

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 環境変数の値をJSON形式で適切にフォーマット
 */
function formatEnvValue(value) {
  if (!value) return '""';

  try {
    // JSON配列として解析を試行
    const parsed = JSON.parse(value);
    return JSON.stringify(parsed, null, 2)
      .split('\n')
      .map((line, index) => (index === 0 ? line : '  ' + line))
      .join('\n');
  } catch (e) {
    // JSON解析に失敗した場合は文字列として扱う
    return JSON.stringify(value);
  }
}

/**
 * テンプレート内の環境変数を置換
 */
function replaceEnvVariables(content) {
  return content.replace(/\{\{\s*env\.([A-Z_]+)\s*\}\}/g, (_, envVar) => {
    const value = process.env[envVar];
    return formatEnvValue(value);
  });
}

/**
 * 指定されたMarkdownファイルを処理
 */
function processSlideFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const processedContent = replaceEnvVariables(content);

  const fileName = path.basename(filePath);
  const outputPath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(outputPath, processedContent, 'utf8');
  console.log(`✅ 処理完了: ${fileName}`);
}

/**
 * メイン処理
 */
function main() {
  console.log('🚀 Marpスライドの環境変数置換を開始...');

  // .envファイルの存在確認
  if (!fs.existsSync('.env')) {
    console.error(
      '❌ .envファイルが見つかりません。.env.exampleを参考に作成してください。'
    );
    process.exit(1);
  }

  // スライドディレクトリの存在確認
  if (!fs.existsSync(SLIDES_DIR)) {
    console.error(`❌ スライドディレクトリが見つかりません: ${SLIDES_DIR}`);
    process.exit(1);
  }

  // .mdファイルを検索して処理
  const slideFiles = fs
    .readdirSync(SLIDES_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(SLIDES_DIR, file));

  if (slideFiles.length === 0) {
    console.log('⚠️  処理対象の.mdファイルが見つかりませんでした。');
    return;
  }

  slideFiles.forEach(processSlideFile);

  console.log(`\n🎉 完了! ${slideFiles.length}個のファイルを処理しました。`);
  console.log(`📁 出力先: ${OUTPUT_DIR}`);
  console.log('\n📋 次のステップ:');
  console.log('   1. VS Code で Marp 拡張機能を使用');
  console.log('   2. exports/ ディレクトリ内の .md ファイルを開く');
  console.log('   3. コマンドパレットから "Marp: Export Slide Deck..." を実行');
}

main();
