function* range(start: number, stop: number, step = 1) {
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

// 3ms = 15%
// function maxProfit(prices: number[]): number {
//   // Remove continuous duplicates
//   prices = prices.filter(
//     (price, priceIndex) => prices[priceIndex + 1] !== price
//   );

//   const extremePrices: Array<number> = [];
//   for (const priceIndex of range(0, prices.length)) {
//     const price = prices[priceIndex];
//     const prevPrice = prices[priceIndex - 1] ?? Infinity;
//     const nextPrice = prices[priceIndex + 1] ?? -Infinity;
//     if (
//       (prevPrice < price && price > nextPrice) ||
//       (prevPrice > price && price < nextPrice)
//     ) {
//       extremePrices.push(price);
//     }
//   }
//   // console.log(extremePrices);

//   let totalProfit = 0;
//   for (const extremePriceIndex of range(0, extremePrices.length, 2)) {
//     const extremeProfit =
//       extremePrices[extremePriceIndex + 1] -
//       extremePrices[extremePriceIndex];
//     totalProfit += extremeProfit;
//   }

//   return Number.isNaN(totalProfit) ? 0 : totalProfit;
// }

// 8ms = 7% - O(n)
// function maxProfit(prices: number[]): number {
//   let lastSmallestPrice = Infinity;
//   let totalProfit = 0;
//   for (const priceIndex of range(0, prices.length)) {
//     const price = prices[priceIndex];
//     let prevPrice = prices[priceIndex - 1] ?? Infinity;
//     if (prevPrice === price) {
//       const prevPrevPrice = prices[priceIndex - 2] ?? Infinity;
//       prevPrice = prices[priceIndex - 1] = prevPrevPrice; // substitute duplicate prev with prev prev without filter
//     }
//     const nextPrice = prices[priceIndex + 1] ?? -Infinity;

//     if (prevPrice >= price && price < nextPrice) {
//       lastSmallestPrice = price;
//     }

//     if (prevPrice <= price && price > nextPrice) {
//       if (Number.isFinite(lastSmallestPrice)) {
//         totalProfit += price - lastSmallestPrice;
//       }
//     }
//   }

//   return totalProfit;
// }

// 5ms
function maxProfit(prices: number[]): number {
  let totalProfit = 0;
  for (const priceIndex of range(1, prices.length)) {
    const price = prices[priceIndex];
    let prevPrice = prices[priceIndex - 1];
    if (price > prevPrice) {
      totalProfit += price - prevPrice;
    }
  }

  return totalProfit;
}

// console.log(maxProfit([7, 1, 2, 5, 3, 6, 4, 5, 6, 7, 8, 9]));

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(maxProfit([1, 2, 3, 4, 5]));
// console.log(maxProfit([7, 6, 4, 3, 1]));

// console.log(maxProfit([2, 2, 5]));

// console.log(maxProfit([3, 3]));

// console.log(maxProfit([8, 6, 4, 3, 3, 2, 3, 5, 8, 3, 8, 2, 6]));
// console.log(maxProfit([8, 6, 4, 3, 3]));

// console.log(maxProfit([5, 2, 3, 2, 6, 6, 2, 9, 1, 0, 7, 4, 5, 0]));

// console.log(maxProfit([0, 5, 5, 6, 2, 1, 1, 3]));

console.log(maxProfit([5, 5, 4, 9, 3, 8, 5, 5, 1, 6, 8, 3, 4]));
