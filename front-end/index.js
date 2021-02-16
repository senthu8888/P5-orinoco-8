const content = document.getElementById("content");

fetch("https://jsonplaceholder.typicode.com/todos")
	.then((response) => response.json())
	.then((todos) => {
		todos.forEach((todo) => {
			// const h2 = document.createElement("h2");
			// h2.innerText = todo.title;
			// content.appendChild(h2);
			content.innerHTML += `<h2>${todo.title}</h2>`;
			console.log(todo.id);
		});
	});

// fetch("https://jsonplaceholder.typicode.com/todos/1")
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/todos/1")
// 	.then(function (response) {
// 		return response.json();
// 	})
// .then((todo) => console.log(todo));
