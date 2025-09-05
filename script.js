console.log("ライブハウスへようこそ！");
document.addEventListener("DOMContentLoaded", () => {
  // HTML要素を取得する
  const playButton = document.getElementById("playButton");
  const liveMusic = document.getElementById("liveMusic");

  // ボタンがクリックされたときの処理
  playButton.addEventListener("click", () => {
    // 現在の再生状態を確認
    if (liveMusic.paused) {
      // 停止中なら再生する
      liveMusic.play();
      playButton.textContent = "音楽を停止";
      console.log("音楽が再生されました。");
    } else {
      // 再生中なら停止する
      liveMusic.pause();
      playButton.textContent = "音楽を再生";
      console.log("音楽が停止しました。");
    }
  });
});
