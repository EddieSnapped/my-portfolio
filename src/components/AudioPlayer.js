/**
 * Audio Player Component
 * 处理音乐播放、控制和UI更新
 */
export class AudioPlayer {
  constructor() {
    this.currentAudio = null
    this.isPlaying = false
    this.currentTrack = null
    this.init()
  }

  init() {
    this.createPlayerControls()
    this.setupEventListeners()
  }

  createPlayerControls() {
    // 创建音乐播放器控制界面
    const playerHTML = `
      <div class="audio-player" id="audio-player">
        <div class="player-info">
          <div class="track-title">Select a track to play</div>
          <div class="track-artist">Stone</div>
        </div>
        <div class="player-controls">
          <button class="control-btn play-pause" id="play-pause">
            <span class="play-icon">▶</span>
            <span class="pause-icon" style="display: none">⏸</span>
          </button>
          <button class="control-btn stop" id="stop">⏹</button>
        </div>
        <div class="player-progress">
          <span class="time current-time">0:00</span>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <span class="time total-time">0:00</span>
        </div>
      </div>
    `
    
    // 添加到页面底部
    document.body.insertAdjacentHTML('beforeend', playerHTML)
  }

  setupEventListeners() {
    const playPauseBtn = document.getElementById('play-pause')
    const stopBtn = document.getElementById('stop')

    playPauseBtn?.addEventListener('click', () => this.togglePlayPause())
    stopBtn?.addEventListener('click', () => this.stop())

    // 为所有播放按钮添加事件监听器
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('play-music-btn')) {
        const trackPath = e.target.dataset.track
        const trackTitle = e.target.dataset.title
        this.playTrack(trackPath, trackTitle)
      }
    })
  }

  playTrack(trackPath, trackTitle) {
    // 停止当前播放的音乐
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio = null
    }

    // 创建新的音频对象
    this.currentAudio = new Audio(trackPath)
    this.currentTrack = trackTitle

    // 更新UI
    this.updatePlayerInfo(trackTitle)
    
    // 设置音频事件监听器
    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.updateTotalTime()
    })

    this.currentAudio.addEventListener('timeupdate', () => {
      this.updateProgress()
    })

    this.currentAudio.addEventListener('ended', () => {
      this.stop()
    })

    // 开始播放
    this.currentAudio.play()
    this.isPlaying = true
    this.updatePlayPauseButton()
    
    // 显示播放器
    this.showPlayer()
  }

  togglePlayPause() {
    if (!this.currentAudio) return

    if (this.isPlaying) {
      this.currentAudio.pause()
      this.isPlaying = false
    } else {
      this.currentAudio.play()
      this.isPlaying = true
    }
    
    this.updatePlayPauseButton()
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.isPlaying = false
      this.updatePlayPauseButton()
      this.updateProgress()
    }
  }

  updatePlayerInfo(trackTitle) {
    const titleElement = document.querySelector('.track-title')
    if (titleElement) {
      titleElement.textContent = trackTitle
    }
  }

  updatePlayPauseButton() {
    const playIcon = document.querySelector('.play-icon')
    const pauseIcon = document.querySelector('.pause-icon')
    
    if (this.isPlaying) {
      playIcon.style.display = 'none'
      pauseIcon.style.display = 'inline'
    } else {
      playIcon.style.display = 'inline'
      pauseIcon.style.display = 'none'
    }
  }

  updateTotalTime() {
    if (!this.currentAudio) return
    
    const totalTimeElement = document.querySelector('.total-time')
    if (totalTimeElement) {
      totalTimeElement.textContent = this.formatTime(this.currentAudio.duration)
    }
  }

  updateProgress() {
    if (!this.currentAudio) return

    const currentTime = this.currentAudio.currentTime
    const duration = this.currentAudio.duration

    // 更新当前时间
    const currentTimeElement = document.querySelector('.current-time')
    if (currentTimeElement) {
      currentTimeElement.textContent = this.formatTime(currentTime)
    }

    // 更新进度条
    const progressFill = document.querySelector('.progress-fill')
    if (progressFill && duration) {
      const progress = (currentTime / duration) * 100
      progressFill.style.width = `${progress}%`
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00'
    
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  showPlayer() {
    const player = document.getElementById('audio-player')
    if (player) {
      player.classList.add('visible')
    }
  }

  hidePlayer() {
    const player = document.getElementById('audio-player')
    if (player) {
      player.classList.remove('visible')
    }
  }
}