const checkToken = () => {
  const userLogin = localStorage.getItem('userLogin');

  if (userLogin) return true;
  return false;
};
const checkUserRegister = username => {
  const strUsers = localStorage.getItem('users');
  if (strUsers) {
    const users = JSON.parse(strUsers);
    let index = users.findIndex(user => user.username === username);
    if (index !== -1) return true;
    return false;
  }
  return false;
};
const addUserRegister = user => {
  const strUsers = localStorage.getItem('users');
  let users;
  if (!strUsers) {
    users = [];
  } else {
    users = JSON.parse(strUsers);
  }
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};
const checkUserLogin = userLogin => {
  const strUsers = localStorage.getItem('users');
  let users;
  if (!strUsers) {
    return false;
  }
  users = JSON.parse(strUsers);

  let index = users.findIndex(user => userLogin.username === user.username && userLogin.password === user.password);
  if (index !== -1) {
    return true;
  }
  return false;
};

export { checkToken, checkUserRegister, addUserRegister, checkUserLogin };
