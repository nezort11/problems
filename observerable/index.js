/**
const observer = {
  next: (value) => {
     console.log('we got a value', value)
  },
  error: (error) => {
    console.log('we got an error', error)
  },
  complete: () => {
    console.log('ok, no more values')
  }
}

const publisher = (subscriber)=> {
  subscriber.next(1)
  subscriber.next(2)
  setTimeout(() => {
    subscriber.next(3)
    subscriber.next(4)
    subscriber.complete()
  }, 100)
}

const observable = new Observable(publisher);

// subscriber = observer
const sub = observable.subscribe(subscriber)

sub.unsubscribe()
 */

class Subscription {
  isCompleted = false;

  constructor(publisher, subscriber) {
    const proxyObserver = {
      next: (value) => {
        if (this.isCompleted) {
          return;
        }
        subscriber?.next?.(value);
      },
      error: (error) => {
        if (this.isCompleted) {
          return;
        }
        this.isCompleted = true;
        subscriber?.error?.(error);
      },
      complete: () => {
        if (this.isCompleted) {
          return;
        }
        this.isCompleted = true;
        subscriber?.complete?.();
      },
    };

    publisher(proxyObserver);
  }

  unsubscribe() {
    this.isCompleted = true;
  }
}

class Observable {
  constructor(publisher) {
    this.publisher = publisher;
  }

  subscribe(subscriber) {
    const sub =
      typeof subscriber === "function" ? { next: subscriber } : subscriber;
    return new Subscription(this.publisher, sub);
  }
}
