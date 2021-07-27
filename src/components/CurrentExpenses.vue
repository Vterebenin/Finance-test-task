<template>
  <template v-if="expenses.length">
    <div class="b-expenses-list">
      <h2>List of expenses:</h2>
      <ol>
        <li v-for="(expense, key) in expenses" :key="key">
          For category: {{ expense.category }} -- Total amount is {{ roundPrice(parseFloat(expense.total)) }}
          <span v-if="expense.comment">Comment is: {{ expense.comment }}</span>
        </li>
      </ol>
    </div>
    <div class="b-percentage-statistic">
      <h2>List of expenses in percent:</h2>
      <ul>
        <li v-for="(item, key) in percentageStatistics" :key="key">
          <span class="b-percentage-statistic__colorbox" :style="`background-color: ${item.color}`"></span> "{{item.category}}" {{item.percent}}%
        </li>
      </ul>
    </div>
    <pie-chart :items="percentageStatistics" />
  </template>
</template>
<script>
import { roundPrice, getRandomColor } from '@/helpers/index'
import PieChart from '@/components/PieChart'

export default {
  name: 'CurrentExpenses',
  components: { PieChart },
  props: {
    expenses: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    roundPrice
  },
  computed: {
    percentageStatistics () {
      let total = 0
      const expensesByCategory = this.expenses.reduce((acc, item) => {
        if (!Object.keys(acc).includes(item.category)) {
          acc[item.category] = 0
        }
        const itemTotal = roundPrice(parseFloat(item.total))
        acc[item.category] += itemTotal
        total += itemTotal
        return acc
      }, {})
      if (total > 0) {
        return Object.entries(expensesByCategory).map(([category, item]) => {
          const percent = roundPrice(item / total * 100)
          expensesByCategory[category] = roundPrice(item / total * 100)
          const color = getRandomColor()
          return { category, percent, color }
        })
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="sass">
.b-expenses-list, .b-percentage-statistic
  margin-left: 20px

.b-percentage-statistic .b-percentage-statistic__colorbox
  display: inline-block
  width: 40px
  height: 12px
</style>
