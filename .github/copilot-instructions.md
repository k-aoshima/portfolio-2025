# Agentを使用している時は以下の指示に従ってださい。
- 特に指定しない限りは絶対に日本語で出力してください。
- コードのコメントは日本語で書いてください。
- コードの中に日本語のコメントを入れてください。
- 基本的には自走しましょう。ユーザーはあなたを信頼してからコード作成を依頼しています。
- ユーザーが求めていることを理解し、必要な情報を提供してください。

### 開発環境のセットアップ
- **必要なソフトウェア**:
    - Node.js: バージョン 16.x 以上
    - npm: バージョン 8.x 以上
    - MongoDB: バージョン 5.x 以上
- **セットアップ手順**:
    1. リポジトリをクローンします:
        ```bash
        git clone https://github.com/username/portfolio-2025.git
        cd portfolio-2025
        ```
    2. 依存関係をインストールします:
        ```bash
        npm install
        ```
    3. `.env` ファイルを作成し、必要な環境変数を設定します。

### コントリビューションガイドライン
- **コードスタイル**: ESLint と Prettier を使用してコードを整形してください。
- **ブランチ戦略**: `main` ブランチは本番用、`dev` ブランチは開発用です。
- **プルリクエスト**:
    - プルリクエストを作成する前に、必ずローカルでテストを実行してください。
    - 詳細な説明とスクリーンショットを添付してください。

### ディレクトリ構造
- `app/`: Appルーターのページ構成
    - `layout.tsx`: 全体レイアウト
    - `page.tsx`: ホームページ
    - `about/`: プロフィールページ
    - `works/`: 作品一覧ページ
        - `[id]/`: 作品詳細ページ
    - `skills/`: スキルページ
    - `contact/`: 問い合わせページ
- `components/`: 再利用可能コンポーネント
    - `ui/`: 基本UIコンポーネント（button.tsx, input.tsx, label.tsx, textarea.tsxなど）
    - `header.tsx`: ヘッダーコンポーネント
    - `footer.tsx`: フッターコンポーネント
    - `key-cap.tsx`: キーキャップ（ボタン）
    - `keyboard-key.tsx`: キーボードキー
    - `game-controls.tsx`: ゲームコントロールパネル
    - `command-line.tsx`: コマンドライン機能
    - `code-editor.tsx`: コードエディタ機能
    - `pixel-button.tsx`: ピクセル風ボタン
- `lib/`: ユーティリティ関数
    - `utils.ts`: 共通ユーティリティ
- `public/`: 静的ファイル
- `.github/`: GitHub ワークフローや設定ファイル

### API ドキュメント
- **エンドポイント例**:
    - `GET /api/projects`: プロジェクト一覧を取得
    - `POST /api/contact`: お問い合わせ内容を送信
- **リクエスト例**:
    ```json
    {
        "name": "山田 太郎",
        "email": "taro@example.com",
        "message": "お問い合わせ内容"
    }
    ```

### 使用しているライブラリやツールの詳細
- **Next.js**: Reactベースのフレームワーク（Appルーター）
- **TypeScript**: 静的型付け
- **Tailwind CSS**: ユーティリティファーストのスタイリング
- **Framer Motion**: アニメーション実装
- **shadcn/ui**: 再利用可能UIコンポーネント
- **Lucide React**: アイコンライブラリ

### テストの実行方法
- テストを実行するには以下を使用します:
    ```bash
    npm test
    ```
- カバレッジレポートを生成するには:
    ```bash
    npm run coverage
    ```

### デプロイ手順
- **フロントエンド**: Vercel にデプロイ
- **バックエンド**: AWS Lambda と API Gateway を使用
- **CI/CD**: GitHub Actions を使用して自動デプロイを設定

### セキュリティに関する注意点
- `.env` ファイルを `.gitignore` に追加し、API キーや機密情報を公開しないようにしてください。
- HTTPS を使用して通信を暗号化してください。
