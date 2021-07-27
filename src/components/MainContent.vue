<template>
  <div class="b-main-content">
    <form class="b-form" @submit.prevent="addExpense">
      <h2>Current balance: $ {{currentBalance}}</h2>
      <h3>Add expense:</h3>
      <div class="b-form__item">
        <label for="expense_total">Total amount:</label>
        <input v-model="expense.total" type="text" id="expense_total">
      </div>
      <div class="b-form__item">
        <label for="expense_category">Select category:</label>
        <select v-model="expense.category" id="expense_category" name="category">
          <option value="">--Please choose an option--</option>
          <option
              v-for="category in categories"
              :key="category"
              :value="category.value">
            {{category.name}}
          </option>
        </select>
      </div>
      <div class="b-form__item">
        <label for="expense_comment">Comment</label>
        <textarea v-model="expense.comment" id="expense_comment"></textarea>
      </div>
      <div class="b-form__item">
        <button type="submit">
          Add expense
        </button>
      </div>
    </form>
    <current-expenses :expenses="expenses" />
  </div>
</template>

<script>
import { roundPrice } from '@/helpers'
import CurrentExpenses from '@/components/CurrentExpenses'

const defaultExpense = {
  total: 0,
  category: '',
  comment: ''
}
const DEFAULT_BALANCE_VALUE = 1000
export default {
  name: 'MainContent',
  components: { CurrentExpenses },
  data () {
    return {
      categories: [
        { value: 'housing', name: 'Housing' },
        { value: 'food', name: 'Food' },
        { value: 'insurance', name: 'Insurance' },
        { value: 'transportation', name: 'Transportation' },
        { value: 'taxes', name: 'Taxes' }
      ],
      expense: { ...defaultExpense },
      expenses: []
    }
  },
  computed: {
    currentBalance () {
      return roundPrice(DEFAULT_BALANCE_VALUE - this.expenses.reduce((acc, item) => {
        acc += parseFloat(item.total)
        return acc
      }, 0))
    }
  },
  methods: {
    addExpense () {
      const newBalance = roundPrice(this.currentBalance - parseFloat(this.expense.total))
      if (roundPrice(parseFloat(this.expense.total)) < 0) {
        return alert('Expense total cannot be less than 0')
      }
      if (newBalance < 0) {
        return alert('Current balance cannot be less than 0')
      }
      if (this.expense.category === '') {
        this.expense.category = 'No category'
      }
      this.expenses.push(this.expense)
      this.expense = { ...defaultExpense }
    }
  }
}
</script>
<style lang="sass">
.b-form
  & .b-form__item
    display: flex
    flex-wrap: wrap
    flex: 1
    flex-direction: column
    max-width: 300px
    margin-bottom: 20px
.b-main-content
  display: flex
</style>
