'use strict';

const socket = new WebSocket('ws://127.0.0.1:8000');

const table = document.getElementById('table');
const cells = {};
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

socket.addEventListener('message', ({ data }) => {
	const change = JSON.parse(data);
	const cell = cells[change.cell];
	cell.value = change.value;
});

const tr = document.createElement('tr');
tr.innerHTML = '<th></th>' +
	letters.map(col => `<th>${col}</th>`).join('');
table.appendChild(tr);

const keyup = event => {
	socket.send(JSON.stringify({
		cell: event.target.id,
		value: event.target.value
	}));
};

const createRow = i => {
	const tr = document.createElement('tr');
	tr.innerHTML = `<td>${i}</td>` + letters.map(
		col => `<td><input id="${col}${i}" type="text"></td>`
	).join('');
	table.appendChild(tr);
	letters.forEach(col => {
		const cell = col + i;
		const input = document.getElementById(cell);
		input.addEventListener('keyup', keyup);
		cells[cell] = input;
	});
};

for (let i = 1; i <= 5; i++) createRow(i);
