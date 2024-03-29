// Using an array to store unique values, which is inefficient compared to a Set
const uniqueNumbers = []
const numbers = [1, 2, 3, 4, 5, 1, 2]
numbers.forEach((num) => {
  if (!uniqueNumbers.includes(num)) {
    uniqueNumbers.push(num)
  }
})

// Generated by gpt-4-0125-preview
