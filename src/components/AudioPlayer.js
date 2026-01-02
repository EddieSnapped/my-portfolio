/**
 * Audio Player Component
 * Handles music playback, controls, and UI updates
 */
export class AudioPlayer {
  constructor() {
    this.currentAudio = null
    this.isPlaying = false
    this.currentTrack = null
    this.init()
  }

  init() {
    // Check browser audio support
    if (!window.Audio) {
      console.error('This browser does not support Web Audio API')
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
          <div class="track-title">Audio playback not supported</div>
          <div class="track-artist">Please use a modern browser</div>
        </div>
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', messageHTML)
  }

  createPlayerControls() {
    // Create music player control interface
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
    
    // Add to page bottom
    document.body.insertAdjacentHTML('beforeend', playerHTML)
  }

  setupEventListeners() {
    const playPauseBtn = document.getElementById('play-pause')
    const stopBtn = document.getElementById('stop')
    const progressBar = document.querySelector('.progress-bar')

    playPauseBtn?.addEventListener('click', () => this.togglePlayPause())
    stopBtn?.addEventListener('click', () => this.stop())

    // Progress bar click to seek
    progressBar?.addEventListener('click', (e) => {
      if (this.currentAudio && this.currentAudio.duration) {
        const rect = progressBar.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        const newTime = percentage * this.currentAudio.duration
        this.currentAudio.currentTime = newTime
      }
    })

    // Add event listeners for all play buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('play-music-btn')) {
        const trackPath = e.target.dataset.track
        const trackTitle = e.target.dataset.title
        this.playTrack(trackPath, trackTitle)
      }
    })
  }

  playTrack(trackPath, trackTitle) {
    // Stop current playing music
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio = null
    }

    // Create new audio object
    this.currentAudio = new Audio(trackPath)
    this.currentTrack = trackTitle

    // Update UI with track title immediately
    this.updatePlayerInfo(trackTitle)
    console.log(`Loading audio: ${trackPath}`)
    
    // Set audio event listeners
    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.updateTotalTime()
      console.log('Audio file loaded successfully')
    })

    this.currentAudio.addEventListener('timeupdate', () => {
      this.updateProgress()
    })

    this.currentAudio.addEventListener('ended', () => {
      this.stop()
    })

    this.currentAudio.addEventListener('error', (e) => {
      console.error('Audio file loading failed:', e)
      console.error('Attempted path:', trackPath)
      this.updatePlayerInfo('Audio file unavailable')
    })

    // Start playback
    this.currentAudio.play().then(() => {
      this.isPlaying = true
      this.updatePlayPauseButton()
      this.showPlayer()
      console.log('Audio playback started')
    }).catch((error) => {
      console.error('Playback failed:', error)
      // Might be autoplay policy restriction, show friendly message
      this.updatePlayerInfo('Click to play audio')
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

    // Update current time
    const currentTimeElement = document.querySelector('.current-time')
    if (currentTimeElement) {
      currentTimeElement.textContent = this.formatTime(currentTime)
    }

    // Update progress bar
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