export const userService = {
  login,
  getBlogs
};
const baseURL = "https://jsonplaceholder.typicode.com/";
async function login(email, password) {
  const loginURL = "users";
  const response = await fetch(`${baseURL}${loginURL}`).then((res) =>
    res.json()
  );
  let flag = false;
  response.forEach((item) => {
    if (item.email === email && item.username === password) {
      flag = true;
    }
  });
  debugger;
  if (flag) {
    return {users:response};
  } else {
    return { error: "Email or Password is wrong" };
  }
}
async function getBlogs() {
  const blogsURL = "posts";
  const response = await fetch(`${baseURL}${blogsURL}`).then((res) =>
    res.json()
  );
  return {blogs:response}
}
