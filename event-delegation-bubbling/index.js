/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
const EVENT_LISTENERS_SYMBOL = Symbol();

function onClick(root, predicate, handler) {
  if (root) {
    if (root[EVENT_LISTENERS_SYMBOL] === undefined) {
      root.addEventListener("click", function (event) {
        const currentEventListeners = root[EVENT_LISTENERS_SYMBOL];

        let element = event.target;
        // iterate over all target parent nodes and check for predicates and handlers
        while (element) {
          let eventStoppedPropagation = false;
          const eventStopPropagation = event.stopPropagation;
          event.stopPropagation = function () {
            eventStoppedPropagation = true;
            eventStopPropagation.call(this);
          };
          let eventStoppedImmediatePropagation = false;
          const eventStopImmediatePropagation =
            event.stopImmediatePropagation;
          event.stopImmediatePropagation = function () {
            eventStoppedImmediatePropagation = true;
            eventStopImmediatePropagation.call(this);
          };

          for (const currentEventListener of currentEventListeners) {
            if (currentEventListener.predicate(element)) {
              currentEventListener.handler.call(element, event);
            }
            if (eventStoppedImmediatePropagation) {
              break;
            }
          }
          if (
            eventStoppedPropagation ||
            eventStoppedImmediatePropagation
          ) {
            break;
          }

          element = element.parentElement;
        }
      });
    }

    root[EVENT_LISTENERS_SYMBOL] ??= [];
    root[EVENT_LISTENERS_SYMBOL].push({ predicate, handler });
  }
}

// onClick(
//   // root element
//   document.body,
//   // predicate
//   (el) => el.tagName.toLowerCase() === 'div',
//   function(e) {
//     console.log('hi!');
//     console.log(this);
//     // this logs all the `div` element
//   }
// )
// console.log('attached!');

// const root = document.createElement('div')
// root.innerHTML = `
//   <div id="div1">
//     <div id="div2">
//       <div id="div3">
//         div
//       </div>
//     </div>
//   </div>
// `
// const div1 = root.querySelector('#div1')
// const div2 = root.querySelector('#div2')
// const div3 = root.querySelector('#div3')
// const logs = []
// onClick(root, (el) => el.id === 'div1', function(e) {
//   logs.push(this.id)
// })
// onClick(root, (el) => el.id === 'div2', function(e) {
//   logs.push(this.id)
// })
// onClick(root, (el) => el.id === 'div3', function(e) {
//   logs.push(this.id)
// })
// onClick(root, (el) => el.id === 'div3', function(e) {
//   logs.push(this.id)
// })
// div3.click()
// setTimeout(() => {
//   // expect(logs).toEqual(['div3', 'div3','div2', 'div1'])
//   console.log('logs', logs);
//   // done()
// }, 100)

// const root = document.createElement('div')
// root.innerHTML = `
//   <div id="div1">
//     <div id="div2">
//       <div id="div3">
//         div
//       </div>
//     </div>
//   </div>
// `
// const div1 = root.querySelector('#div1')
// const div2 = root.querySelector('#div2')
// const div3 = root.querySelector('#div3')
// const logs = []
// onClick(root, (el) => el.id === 'div1', function(e) {
//   logs.push(this.id)
// })
// onClick(root, (el) => el.id === 'div2', function(e) {
//   logs.push(this.id)
//   e.stopPropagation()
// })
// onClick(root, (el) => el.id === 'div3', function(e) {
//   logs.push(this.id)
// })
// onClick(root, (el) => el.id === 'div3', function(e) {
//   logs.push(this.id)
// })
// div3.click()
// setTimeout(() => {
//   expect(logs).toEqual(['div3', 'div3', 'div2'])
//   done()
// }, 100)
