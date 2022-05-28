const users = { id: 1, username: "amer", password: "123456" };

module.exports = User = {
  getUsers: () => users,
  findBy: (target, value) => users.find((u) => u[target === value]),
  addUser: (user) => users.push({ id: users.length + 1, ...user }),
};
