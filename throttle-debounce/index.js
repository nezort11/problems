/**
 * throttle.
 *
 * Напишите функцию throttle(fn, delay, ctx) — «тормозилку», которая возвращает обёртку,
 * вызывающую fn не чаще, чем раз в delay миллисекунд.
 * В качестве контекста исполнения используется ctx.
 * Первый вызов fn всегда должен быть синхронным.
 * Если игнорируемый вызов оказался последним, то он должен выполниться.
 */

// пример для delay === 100
// . - вызовы throttledFn
// ! - вызовы fn
// ...............!
///   !         !
///0ms 100ms   200ms
//  .    .     .
//      !     !
///0ms 100ms 200ms

/**
Декоратор который возвращает обернутую функцию
которая fn не вызывается чаще чем в <delay> милисекунд

Если fn все равно вызывается хотя не прошло <delay> миллисекунд, то

- нужно отложить выполнение fn на то время через сколько пройдет этот <delay>

- при повторынх вызовах - через <delay> должна вызваться только последняя функция

 */
function throttle(fn, delay, ctx) {
  let lastCalledAt = 0; // запоминаем когда в последний раз мы вызывали эту функции, чтобы понять сколько еще ждать
  let delayedFnArgs; // запоминаем аргументы при последней попытки вызова этой функции...
  let delayedTimeoutId; // запоминаем ставили ли мы раньше таймаут уже или еще нет
  return function (...args) {
    // проверяем если не прошло <delay> милисекунд после последнего вызова
    const passed = Date.now() - lastCalledAt;
    console.log("call with args", args, "and passed", passed);
    if (passed < delay) {
      // определяем в первый раз или переопределяем последние аргументы для вызова функции
      delayedFnArgs = args;
      // проверяем если таймаут был уже поставлен тогда не нужно переставлять
      if (!delayedTimeoutId) {
        const delayDelta = delay - passed;
        // откладываем выполнение функции через
        console.log("set timeout after delay delta", delayDelta);
        delayedTimeoutId = setTimeout(() => {
          // тк таймаут выполнился очищаем переменную храняющую айди таймаута (чтобы затем опять поставить)
          delayedTimeoutId = null;

          lastCalledAt = Date.now();
          fn.call(ctx ?? this, ...delayedFnArgs);
        }, delayDelta);
      }
    } else {
      lastCalledAt = Date.now();
      // если не было ничего сложно просто сразу выполняем функцию и переопредеяем тайм аут
      fn.call(ctx ?? this, ...args); // void result
    }
  };
}

function test() {
  const start = Date.now();

  function log(text) {
    const msPassed = Date.now() - start;
    console.log(`${msPassed}: ${this.name} logged ${text}`);
  }

  const throttled = throttle(log, 100, { name: "me" });

  setTimeout(() => throttled("m"), 0);
  setTimeout(() => throttled("mo"), 22);
  setTimeout(() => throttled("mos"), 33);
  setTimeout(() => throttled("mosc"), 150);
  setTimeout(() => throttled("moscow"), 400);

  // Ожидаемый вывод:
  //  0ms: me logged m
  // 100ms: me logged mos
  // 200ms: me logged mosc
  // 400ms: me logged moscow
}

test();
