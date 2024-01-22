function hello(person) {
    return 'Hello ' + person.first + ' ' + person.last;
}
var user = { first: 'ben', last: 'lee' };
document.body.innerHTML = hello(user);
