<template>
  <div class="b-expenses-list" v-if="expenses.length">
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
      <li v-for="(total, category) in percentageStatistics" :key="category">
        "{{category}}" {{total}}%
      </li>
    </ul>
    <div></div>
  </div>
</template>
<script>
import { roundPrice } from '@/helpers/index'

export default {
  name: 'CurrentExpenses',
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
        for (const key in expensesByCategory) {
          const item = expensesByCategory[key]
          expensesByCategory[key] = roundPrice(item / total * 100)
        }
        return expensesByCategory
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="sass">
.b-expenses-list
  margin-left: 20px
</style>
