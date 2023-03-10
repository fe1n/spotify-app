# Spotify-App

### ドロップしたプレイリストの楽曲を、学習済みのレコメンドモデルによりおすすめ順に並び替えて表示します。

https://user-images.githubusercontent.com/102020120/219248423-d5a690f6-232f-48d2-8976-05118d3d76bb.mp4

## レコメンドモデル
**入力** ：楽曲のAudio Features (Spotify APIにより入手）

**出力** ：楽曲の再生回数が6回以上か未満かの二値 （ラベルは個人のストリーミング履歴から作成）

モデルは、Spotifyの長期ストリーミング履歴から取得した楽曲とその再生回数、そして楽曲のAudio Featuresにより学習し、その後onnx化してNext.jsで使用しています。

## 使用方法
1. `npm install`を実行して、必要なモジュールをダウンロードしてください。
2. [My Dashboard | Spotify for Developers](https://developer.spotify.com/dashboard/)から __Client ID__ と __Client Secret__ を入手し、以下の内容で`.env.local`ファイルをルートディレクトリに作成してください

```
SPOTIFY_CLIENT_ID='CLIENT_ID'
SPOTIFY_CLIENT_SECRET='CLIENT_SECRET'
```
3. `npm run dev`を実行して、サーバーを起動してください、
4. 最後にブラウザで[http://localhost:3000](http://localhost:3000)を表示し、デモ動画のようにプレイリストをドロップしてくだい。

### 注意
レコメンドモデルは、完全に作成者用に学習されています。

## 参考
以下のサイトはこのアプリを作成する上で、大変お世話になりました。この場を借りてお礼申し上げます。
- [Next.js + TypeScript で Spotify Web Playback SDK の公式サンプルを書き直してみた](https://zenn.dev/ossamoon/articles/ef20bf19284fd8)
- [Spotify API + Next.jsで作る選曲支援Webアプリ - Qiita](https://qiita.com/Yuki_Oshima/items/82116e4044687b16ef60)

