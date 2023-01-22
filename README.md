# Spotify-App
https://user-images.githubusercontent.com/102020120/213918288-613fa117-774f-4957-88dc-59276f9aa914.mp4

## 概要
ドロップしたプレイリストの楽曲を、事前に学習したレコメンドモデルにより、おすすめ順にして表示します。

## レコメンドモデル
入力：楽曲のAudio Features (Spotify APIにより入手）

予測：楽曲の再生回数 （個人のストリーミング履歴から取得）

モデルは、Spotifyの長期ストリーミング履歴から取得した楽曲とその再生回数、そして楽曲のAudio Featuresから学習し、その後onnx化してNext.jsで使用しています。

## 使用方法
1. `npm install`を実行して、必要なモジュールをダウンロードしてください。
2. [My Dashboard | Spotify for Developers](https://developer.spotify.com/dashboard/)からClient IDとClient Secretを入手し、以下の内容で`.env.local`ファイルをルートディレクトリに作成してください

```
NEXT_PUBLIC_SPOTIFY_CLIENT_ID='CLIENT_ID'
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET='CLIENT_SECRET'
```
3. `npm run dev`を実行して、サーバーを起動してください、
4. 最後にブラウザで[http://localhost:3000](http://localhost:3000)を表示し、デモ動画のようにプレイリストをドロップしてくだい。

### 注意
レコメンドモデルは、完全に作成者用に学習されています。

## 参考
以下のサイトはこのアプリを作成する上で、大変お世話になりました。この場を借りてお礼申し上げます。
- [Next.js + TypeScript で Spotify Web Playback SDK の公式サンプルを書き直してみた](https://zenn.dev/ossamoon/articles/ef20bf19284fd8)
- [Spotify API + Next.jsで作る選曲支援Webアプリ - Qiita](https://qiita.com/Yuki_Oshima/items/82116e4044687b16ef60)

