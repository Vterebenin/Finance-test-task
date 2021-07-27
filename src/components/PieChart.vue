<template>
  <svg v-if="items.length" ref="chart" width="300" height="100%" :viewBox="viewBox">
    <circle
        v-for="(item, key) in items"
        :key="key"
        :cx="centerOfTheViewBox" :cy="centerOfTheViewBox" :r="radius"
        fill="transparent"
        :title="item.name"
        :ref="`items${key}`"
        stroke-width="16"
        stroke-dasharray="0 100"
        stroke-dashoffset="25"
    ></circle>
  </svg>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: 0,
      diameter: 50,
      offset: 25,
      animationSpeed: '0.5s'
    }
  },
  watch: {
    items: {
      immediate: true,
      deep: true,
      async handler () {
        await this.$nextTick(() => {
          this.calculate()
        })
      }
    }
  },
  computed: {
    viewBox () {
      return `-25 -25 ${this.diameter} ${this.diameter}`
    },
    radius () {
      return `${this.diameter / (Math.PI)}`
    },
    centerOfTheViewBox () {
      return 0
    }
  },
  methods: {
    calculate () {
      const { animationSpeed, offset } = this
      for (const key in this.items) {
        const item = this.items[key]
        const { percent, color } = item
        const node = this.$refs[`items${key}`]
        node.style.transition = `stroke-dasharray ${animationSpeed} ease-in-out, stroke-dashoffset ${animationSpeed} ease-in-out`
        node.style.strokeDasharray = percent + ' ' + (100 - percent)
        node.setAttribute('stroke', color)
        if (key === '0') {
          node.style.strokeDashoffset = offset
        } else {
          const leftOver = this.items.slice(0, key).reduce((acc, item) => {
            acc += item.percent
            return acc
          }, 0)
          node.style.strokeDashoffset = 100 - leftOver + offset
        }
      }
    }
  }
}
</script>
