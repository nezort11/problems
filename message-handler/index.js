/*
Наше приложение-чат должно отображать новые сообщения, которые приходят с сервера, как можно быстрее.

Сообщение имеет формат:

interface Message {
  id: number
  text: string
}

Id самого первого сообщения = 1, а id каждого следующего сообщения на 1 больше, чем id предыдущего.
Нам нужно выводить сообщения в правильном порядке, однако сервер не гарантирует правильный порядок
сообщений, отправляемых в наше приложение.

Таймлайн:
// (приходит)  1  3  4  2     5
// (рисуем)    1     2  3  4  5

Input:  1, 4, 2, 5, 6, 3
Output: 1,    2,       3, 4, 5, 6


Сообщения от сервера приходят в обработчик функции connect:

connect((msg) => {
  ...
});

Отображать сообщения нужно с помощью функции `render`:
render(msg)
*/

function render(msg) {
  console.log(msg);
}

/**
Алгоритм:

- принимаем сообщение и сохраняем его кудато ...
- к примеру в хеш таблицу

нужно понять то ли это сообщение которое мы ждем, на данный момент

к примеру мы сначала ждем 1 или 0, или тд - любое число? (ТОЛЬКО С 1)
* expectedId = 1

после того как мы получаем нужно сообщение мы его обрабатываем и начинаем спотреть сохранили ли мы ранее прошлые числа?
если да - то также обрабатываем их и удаляем из маппинга

if (msg.id === expectedId) =>
  render +
  expectedId += 1
  nextMsg = msgs[expectedId]
  while (nextMsg) {
    renderNextMsg
    expectedId += 1
    nextMsg = msgs[expectedId]
  }
else
  save into hash map ? - где в this? или global

 */

function connect(msg) {
  this.msgs ??= {}; // init this.msgs
  this.expectedId ??= 1;

  if (msg.id === this.expectedId) {
    render(msg);
    this.expectedId++;
    let nextMsg = this.msgs[this.expectedId];
    while (nextMsg) {
      delete this.msgs[this.expectedId];
      render(nextMsg);
      this.expectedId++;
      nextMsg = this.msgs[this.expectedId];
    }
  } else {
    this.msgs[msg.id] = msg;
  }
}
