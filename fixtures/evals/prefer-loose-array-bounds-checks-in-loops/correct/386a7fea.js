// Example 9: Iterating over an array with a for loop and a dynamic condition
const words = ['hello', 'world', 'typescript', 'javascript']
for (let l = 0; l < words.length && words[l].length > 5; l++) {
  console.log(words[l])
  // Uses '<' for bounds check and additional condition
}

// Generated by gpt-4-0125-preview