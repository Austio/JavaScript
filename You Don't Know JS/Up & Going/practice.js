'use strict'

const TAX_RATE = 0.08
const PHONE_PRICE = 99.99
const ACCESSORY_PRICE = 9.99
const SPENDING_THRESHOLD = 200

var bank_account_balance = prompt('Enter your bank account balance:')
var total_price = calculate_purchase_amount(bank_account_balance)
total_price += calculate_tax(total_price)
console.log('Calculated purchase amount: ' + format_price(total_price))

if (total_price < bank_account_balance) console.log('Purchase is afordable.')
else console.log('Purchase is not affordable.')

function calculate_purchase_amount (bank_account_balance) {
  var sub_total = 0.00
  while (sub_total < bank_account_balance) {
    sub_total += PHONE_PRICE
    if (sub_total < SPENDING_THRESHOLD) sub_total += ACCESSORY_PRICE
  }
  return sub_total
}

function calculate_tax (sub_total) {
  return sub_total * TAX_RATE
}

function format_price (final_amount) {
  return '$' + final_amount.toFixed(2)
}
