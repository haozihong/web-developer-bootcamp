var faker = require("faker");
console.log(
`====================
WELCOME TO MY SHOP!
====================`);

for (var i=0; i<10; ++i)
	console.log(faker.fake("{{commerce.productName}} - ${{finance.amount}}"));