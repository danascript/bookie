// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

exports.menu = [
  { slug: '/books', title: 'Books'},
  { slug: '/tags', title: 'Tags'},
  { slug: '/addBook', title: 'Add a book'},
];

exports.tags = [
  'Beginner', 'Advanced', 'Expert', 'General', 'Frontend', 'Backend'
]