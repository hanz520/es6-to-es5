const fn = () => {
  return new Promise((resolve) => {
    let num = 985211
    setTimeout(() => {
      resolve({num, target: this})
    }, 1000)
  })
}

console.log(fn())

fn().then(({num, target}) => {
  console.log(num, target)
}) 


let ttt = [1, 2, 3, 4].includes(2);
console.log(ttt)


const bb =new Set([
  ['name', 'hanz'],
  ['age', 18],
])
console.log(bb)