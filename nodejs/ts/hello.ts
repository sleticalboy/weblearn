
interface Person {
  first: string;
  last: string;
}

function hello(person: Person) {
  return 'Hello ' + person.first + ' ' + person.last;
}

let user = {first: 'ben', last: 'lee'}

document.body.innerHTML = hello(user)