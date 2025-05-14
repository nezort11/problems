class BrowserHistory {
  history = [];
  cursor = -1;
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.initialUrl = url;
  }
  /**
   * @param { string } url
   */
  visit(url) {
    this.history.splice(this.cursor + 1, this.history.length, url);
    this.cursor++;
  }

  /**
   * @return {string} current url
   */
  get current() {
    return this.history[this.cursor] ?? this.initialUrl;
  }

  // go to previous entry
  goBack() {
    if (this.cursor > -1) {
      this.cursor--;
    }
  }

  // go to next visited url
  forward() {
    if (this.cursor < this.history.length - 1) {
      this.cursor++;
    }
  }
}
