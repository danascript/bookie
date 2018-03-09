// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

exports.menu = [
  { slug: '/books', title: 'Books'},
  { slug: '/tags', title: 'Tags'},
  { slug: '/addBook', title: 'Add a book'},
];

exports.tags = [
  'Beginner', 'Advanced', 'Expert', 'General', 'Frontend', 'Backend', 'JavaScript', 'HTML&CSS', 'React.js', 'Node.js', 'MongoDB'
]

exports.shortenString = function(string, characters) {
  if (string === undefined) {
    return ''
  }

  if (string.length <= characters) {
    return string
  }

  const words = string.split(' ')
  let result = '';

  for (word of words) {
    if (result.length + word.length <= characters) {
      result += ' ' + word
    } else {
      break
    }
  }

  return `${result}...`
}