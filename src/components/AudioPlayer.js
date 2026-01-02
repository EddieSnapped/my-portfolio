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
    // 检查浏览器音频支持
    if (!window.Audio) {
      console.error('此浏览器不支持Web Audio API')
      this.showUnsupportedMessage()
      return
    }

    this.createPlayerControls()
    this.setupEventListeners()
    console.log('AudioPlayer initialized successfully')
  }

  showUnsupportedMessage() {
    const messageHTML = `
      <div class="audio-player unsupported" id="audio-player">
        <div class="player-info">
          <div class="track-title">音频播放不支持</div>
          <div class="track-artist">请使用现代浏览器</div>
        </div>
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', messageHTML)
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
    const progressBar = document.querySelector('.progress-bar')

    playPauseBtn?.addEventListener('click', () => this.togglePlayPause())
    stopBtn?.addEventListener('click', () => this.stop())

    // 进度条点击跳转
    progressBar?.addEventListener('click', (e) => {
      if (this.currentAudio && this.currentAudio.duration) {
        const rect = progressBar.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        const newTime = percentage * this.currentAudio.duration
        this.currentAudio.currentTime = newTime
      }
    })

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
      this.currentAudio.currentTime = 0
      this.currentAudio = null
    }

    // 创建新的音频对象
    this.currentAudio = new Audio(trackPath)
    this.currentTrack = trackTitle

    // 更新UI
    this.updatePlayerInfo(trackTitle)
    console.log(`加载音频: ${trackPath}`)
    
    // 设置音频事件监听器
    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.updateTotalTime()
      console.log('音频文件加载成功')
    })

    this.currentAudio.addEventListener('timeupdate', () => {
      this.updateProgress()
    })

    this.currentAudio.addEventListener('ended', () => {
      this.stop()
    })

    this.currentAudio.addEventListener('error', (e) => {
      console.error('音频文件加载失败:', e)
      console.error('尝试的路径:', trackPath)
      this.updatePlayerInfo('音频文件不可用')
    })

    // 添加加载状态反馈
    this.updatePlayerInfo('正在加载...')

    // 开始播放
    this.currentAudio.play().then(() => {
      this.isPlaying = true
      this.updatePlayPauseButton()
      this.showPlayer()
      console.log('音频播放开始')
    }).catch((error) => {
      console.error('播放失败:', error)
      // 可能是自动播放策略限制，显示友好提示
      this.updatePlayerInfo('点击播放音频')
      this.showPlayer()
    })
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