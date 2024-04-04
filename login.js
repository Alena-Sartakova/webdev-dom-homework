import { loginUser, setToken, token } from "./api.js"
import { renderApp, setUser } from "./main.js"

export function renderLogin() {
  const container = document.querySelector('.container')
  container.innerHTML = `<div class="add-form">
          <h1 class="form-title">Авторизоваться</h1>
          <div class="form-row">
            
            <input class="input" type="text" id="login-input" placeholder="Логин"  />
            <input class="input" type="text" id="password-input" placeholder="Пароль" />
          </div>
          <button class="add-form-button" id="login-button">Войти</button>
          <button class="add-form-button">Зарегистрироваться</button>
             
        </div> `
  const loginButton = document.getElementById('login-button')
  loginButton.addEventListener("click", () => {
    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password-input').value;
    loginUser({ login, password })
      .then((data) => {
        setUser(data.user);
        setToken(data.user.token);
        renderApp();

        console.log(token);
      }).catch((error) => {
        if (error.message === "Нет авторизации") {
          alert("Неверные данные");
        };
        console.warn(error);
      })

  })
}

