function askPassword(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "rockstar") ok();
  else fail();
}

// const alert = console.log;

let user = {
  name: "John",

  login(result) {
    alert(this.name + (result ? " logged in" : " failed to log in"));
  },
};

// askPassword(?, ?); // ?

// user.login(true);

// function with bound `this`
const userLogin = user.login.bind(user);

// userLogin(false);

askPassword(
  () => userLogin(true),
  // () => userLogin(false)
  () => user.login.call(user, false)
); // ?
