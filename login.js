import { loginUser, setToken, token } from "./api.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `<h1>Авторизация</h1>
    <div class="add-form">
      <h3 class="form-title">Авторизация</h3>
      <div class="form-row">
        <input class="input" type="text" id="login-input"  placeholder="Логин"/>
        <input class="input" type="text" id="password-input" placeholder="Пароль"/>
      </div>
      <br/>
      <button class="button" id="login-button">Войти</button>
      <button class="button-reg">Зарегистрироваться</button>
    </div>`

    appElement.innerHTML = loginHtml;

    const buttonGet = document.getElementById("login-button");
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");

buttonGet.addEventListener("click", () => {
    loginUser({
        login: loginInput.value,
        password: passwordInput.value
    }).then((responseData) => {
        console.log(token);
        setToken(responseData.user.token);
        console.log(token);
    }).then(() => {
        fetchPromiseGet();
    })
});
};