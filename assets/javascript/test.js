let x = 1;
let y = 2;
z = { x, y };

console.log(z);

z.x = 5;

console.log(z);

z = { ...z, a: 3 };

console.log(z);
