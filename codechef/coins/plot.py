import matplotlib.pyplot as plt


def profit(coin):
    """Return profit of exchanging coin."""
    return sum(exchange(coin)) - coin


if __name__ == '__main__':
    fig, ax = plt.subplots()
    ax.set_xlabel("Coin")
    ax.set_ylabel("Profit")
    ax.set_xticks([1, 12, 24, 36, 48])
    xs = [x for x in range(1, 49)]
    ys = [profit(x) for x in xs]
    ax.plot(xs, ys)
    plt.show()
