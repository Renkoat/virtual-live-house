document.addEventListener("DOMContentLoaded", () => {
  // HTML要素を取得する
  const playButton = document.getElementById("playButton");
  const liveMusic = document.getElementById("liveMusic");
  const musicList = document.getElementById("musicList");

  // リストがクリックされたときの処理
  musicList.addEventListener("click", (event) => {
    // クリックされた要素がリストアイテム（li）か確認
    if (event.target.tagName === "LI") {
      // クリックされたリストアイテムからdata-src属性を取得
      const newSrc = event.target.getAttribute("data-src");
      // オーディオ要素のsrcを更新
      liveMusic.src = newSrc;
      // 音楽を再生
      liveMusic.play();
      // ボタンのテキストを更新
      playButton.textContent = "音楽を停止";
      console.log("新しい音楽が再生されました: " + newSrc);
    }
  });

  // 再生/停止ボタンがクリックされたときの処理（既存の機能）
  playButton.addEventListener("click", () => {
    if (liveMusic.paused) {
      liveMusic.play();
      playButton.textContent = "音楽を停止";
      console.log("音楽が再生されました。");
    } else {
      liveMusic.pause();
      playButton.textContent = "音楽を再生";
      console.log("音楽が停止しました。");
    }
  });
});
