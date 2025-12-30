export class SimpleVisualization {
  constructor() {
    this.initCharts()
  }

  initCharts() {
    this.createRAVEChart()
    this.createSkillsChart()
  }

  createRAVEChart() {
    const container = document.getElementById('rave-chart')
    if (!container) return

    container.innerHTML = `
      <div class="simple-chart">
        <div class="chart-bars">
          <div class="bar-group">
            <div class="bar" data-value="45" style="height: 45%"></div>
            <span class="bar-label">Epoch 1</span>
          </div>
          <div class="bar-group">
            <div class="bar" data-value="32" style="height: 32%"></div>
            <span class="bar-label">Epoch 5</span>
          </div>
          <div class="bar-group">
            <div class="bar" data-value="24" style="height: 24%"></div>
            <span class="bar-label">Epoch 10</span>
          </div>
          <div class="bar-group">
            <div class="bar" data-value="18" style="height: 18%"></div>
            <span class="bar-label">Epoch 15</span>
          </div>
          <div class="bar-group">
            <div class="bar active" data-value="14.2" style="height: 14.2%"></div>
            <span class="bar-label">Epoch 20</span>
          </div>
        </div>
        <div class="chart-info">
          <span class="metric">Final Loss: <strong>0.142</strong></span>
          <span class="metric">Real-time Factor: <strong>0.23</strong></span>
        </div>
      </div>
    `
  }

  createSkillsChart() {
    const container = document.getElementById('skills-chart')
    if (!container) return

    const skills = [
      { name: 'Deep Learning', level: 85 },
      { name: 'Web Development', level: 90 },
      { name: 'Music Theory', level: 95 },
      { name: 'Audio Processing', level: 88 },
      { name: 'Data Science', level: 82 },
      { name: 'Performance', level: 92 }
    ]

    const skillBars = skills.map(skill => `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-value">${skill.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" style="width: ${skill.level}%"></div>
        </div>
      </div>
    `).join('')

    container.innerHTML = `
      <div class="skills-chart">
        ${skillBars}
      </div>
    `
  }
}