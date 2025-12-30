import { Chart } from 'chart.js/auto'

export class DataVisualization {
  constructor() {
    this.charts = new Map()
    this.initCharts()
  }

  initCharts() {
    this.createRAVEPerformanceChart()
    this.createSkillsRadarChart()
    this.createProjectTimelineChart()
  }

  createRAVEPerformanceChart() {
    const ctx = document.getElementById('rave-chart')
    if (!ctx) return

    const data = {
      labels: ['Epoch 1', 'Epoch 5', 'Epoch 10', 'Epoch 15', 'Epoch 20'],
      datasets: [{
        label: 'Reconstruction Loss',
        data: [0.45, 0.32, 0.24, 0.18, 0.142],
        borderColor: '#C5A065',
        backgroundColor: 'rgba(197, 160, 101, 0.1)',
        tension: 0.4
      }, {
        label: 'Real-time Factor',
        data: [1.2, 0.8, 0.5, 0.3, 0.23],
        borderColor: '#2C3E50',
        backgroundColor: 'rgba(44, 62, 80, 0.1)',
        tension: 0.4
      }]
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'RAVE Model Training Progress'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Performance Metrics'
            }
          }
        }
      }
    })

    this.charts.set('rave', chart)
  }

  createSkillsRadarChart() {
    const ctx = document.getElementById('skills-chart')
    if (!ctx) return

    const data = {
      labels: [
        'Deep Learning',
        'Web Development', 
        'Music Theory',
        'Audio Processing',
        'Data Science',
        'Performance'
      ],
      datasets: [{
        label: 'Proficiency Level',
        data: [85, 90, 95, 88, 82, 92],
        borderColor: '#C5A065',
        backgroundColor: 'rgba(197, 160, 101, 0.2)',
        pointBackgroundColor: '#C5A065',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#C5A065'
      }]
    }

    const chart = new Chart(ctx, {
      type: 'radar',
      data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Technical & Musical Expertise'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    })

    this.charts.set('skills', chart)
  }

  createProjectTimelineChart() {
    const ctx = document.getElementById('timeline-chart')
    if (!ctx) return

    const data = {
      labels: ['2022 Q1', '2022 Q3', '2023 Q1', '2023 Q3', '2024 Q1', '2024 Q3'],
      datasets: [{
        label: 'Technical Projects',
        data: [1, 2, 3, 5, 7, 9],
        borderColor: '#2C3E50',
        backgroundColor: 'rgba(44, 62, 80, 0.1)'
      }, {
        label: 'Music Projects',
        data: [2, 3, 4, 6, 8, 12],
        borderColor: '#C5A065',
        backgroundColor: 'rgba(197, 160, 101, 0.1)'
      }]
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Project Development Timeline'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cumulative Projects'
            }
          }
        }
      }
    })

    this.charts.set('timeline', chart)
  }

  destroy() {
    this.charts.forEach(chart => chart.destroy())
    this.charts.clear()
  }
}