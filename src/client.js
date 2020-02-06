import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333"
});

/**
 *
 * login logic goes here
 *
 */
async function loginRoute() {
  const { data } = await api.post("/login", {
    email: "john.doe@gmail.com",
    password: "12345678"
  });

  const { token } = data;

  return token;
}

/**
 *
 * protected route is created providing in the header the "authorization header".
 *
 * this request will be intercepted by expressjs and it will look at the request.
 *
 */
async function protectedRoute(token) {
  const { data } = await api.get("/protected", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

async function run() {
  try {
    const token = await loginRoute();
    const data = await protectedRoute(token);

    console.log(data);
  } catch (error) {
    console.error(error.request);
  }
}

run();
