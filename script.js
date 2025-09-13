document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const liveMusic = document.getElementById('liveMusic');
  const musicList = document.getElementById('musicList');
  const waveformCanvas = document.getElementById('waveformCanvas');
  const canvasCtx = waveformCanvas.getContext('2d');

  let audioContext;
  let sourceNode;
  let analyserNode;
  let dataArray;
  let bufferLength;

  // Web Audio APIのセットアップ
  const setupAudio = async (audioSrc) => {
    if (audioContext) {
      audioContext.close();
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 音声ファイルの読み込み
    const response = await fetch(audioSrc);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    bufferLength = analyserNode.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    sourceNode.loop = true;
  };

  // 波形描画の関数
  const drawWaveform = () => {
    requestAnimationFrame(drawWaveform);

    analyserNode.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(240, 240, 240)';
    canvasCtx.fillRect(0, 0, waveformCanvas.width, waveformCanvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 123, 255)';

    canvasCtx.beginPath();

    const sliceWidth = waveformCanvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * waveformCanvas.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    canvasCtx.lineTo(waveformCanvas.width, waveformCanvas.height / 2);
    canvasCtx.stroke();
  };

  // 再生ボタンのクリックイベント
  playButton.addEventListener('click', async () => {
    if (audioContext && audioContext.state === 'running') {
      liveMusic.pause();
      if (sourceNode) {
        sourceNode.stop();
      }
      audioContext.suspend();
      playButton.textContent = '音楽を再生';
    } else {
      liveMusic.play();
      const currentSrc = liveMusic.src;
      await setupAudio(currentSrc);
      sourceNode.start(0);
      drawWaveform();
      playButton.textContent = '一時停止';
    }
  });

  // リストの項目がクリックされた時のイベント
  musicList.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
      const newSrc = target.getAttribute('data-src');
      const fullPath = newSrc;
      
      // 既存の音楽を停止
      liveMusic.pause();
      if (sourceNode) {
        sourceNode.stop();
      }

      // 新しい音楽の読み込みと再生
      liveMusic.src = fullPath;
      liveMusic.play();
      
      // Web Audio APIで新しい音源をセットアップ
      await setupAudio(fullPath);
      sourceNode.start(0);
      drawWaveform();
      
      playButton.textContent = '一時停止';
    }
  });
});document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const liveMusic = document.getElementById('liveMusic');
  const musicList = document.getElementById('musicList');
  const waveformCanvas = document.getElementById('waveformCanvas');
  const canvasCtx = waveformCanvas.getContext('2d');

  let audioContext;
  let sourceNode;
  let analyserNode;
  let dataArray;
  let bufferLength;

  // Web Audio APIのセットアップ
  const setupAudio = async (audioSrc) => {
    if (audioContext) {
      audioContext.close();
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 音声ファイルの読み込み
    const response = await fetch(audioSrc);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    bufferLength = analyserNode.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    sourceNode.loop = true;
  };

  // 波形描画の関数
  const drawWaveform = () => {
    requestAnimationFrame(drawWaveform);

    analyserNode.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(240, 240, 240)';
    canvasCtx.fillRect(0, 0, waveformCanvas.width, waveformCanvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 123, 255)';

    canvasCtx.beginPath();

    const sliceWidth = waveformCanvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * waveformCanvas.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    canvasCtx.lineTo(waveformCanvas.width, waveformCanvas.height / 2);
    canvasCtx.stroke();
  };

  // 再生ボタンのクリックイベント
  playButton.addEventListener('click', async () => {
    if (audioContext && audioContext.state === 'running') {
      liveMusic.pause();
      if (sourceNode) {
        sourceNode.stop();
      }
      audioContext.suspend();
      playButton.textContent = '音楽を再生';
    } else {
      liveMusic.play();
      const currentSrc = liveMusic.src;
      await setupAudio(currentSrc);
      sourceNode.start(0);
      drawWaveform();
      playButton.textContent = '一時停止';
    }
  });

  // リストの項目がクリックされた時のイベント
  musicList.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
      const newSrc = target.getAttribute('data-src');
      const fullPath = newSrc;
      
      // 既存の音楽を停止
      liveMusic.pause();
      if (sourceNode) {
        sourceNode.stop();
      }

      // 新しい音楽の読み込みと再生
      liveMusic.src = fullPath;
      liveMusic.play();
      
      // Web Audio APIで新しい音源をセットアップ
      await setupAudio(fullPath);
      sourceNode.start(0);
      drawWaveform();
      
      playButton.textContent = '一時停止';
    }
  });
});