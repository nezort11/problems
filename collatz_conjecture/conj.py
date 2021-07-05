import matplotlib.pyplot as plt

def collatz_stop_steps(n):
    """ Computes number of collatz steps to make number = 1. """
    i = 0
    while True:
        if n == 1:
            break
        elif n % 2 == 0:
            n /= 2
        else:
            n = 3*n + 1
        i += 1
    return i

def plot_histogram(n1, n2):
    ''' Plots a frequency of steps to stop for numbers between n1 and n2. '''
    # Steps to stop for range: [n1, n2]
    steps = [collatz_stop_steps(n) for n in range(n1, n2)]

    # Diagram plotting
    fig, ax = plt.subplots(num="Collatz conjecture frequency", figsize=(8, 6))
    ax.set_title(f"Frequency of steps for numbers between [{n1};{n2}]")
    ax.set_xlabel("Steps to stop")
    ax.set_ylabel("Frequency")
    ax.set_xticks(range(n1, n2, 20))
    ax.hist(steps, bins=10000, color='lightblue', edgecolor='darkblue')
    plt.show()

if __name__ == '__main__':
    print(collatz_stop_steps(39))
    plot_histogram(10, 10000)