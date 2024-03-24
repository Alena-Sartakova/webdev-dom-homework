const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

let host = "https://wedev-api.sky.pro/api/v2/alenka-s/comments";
const hostReg = 'https://wedev-api.sky.pro/api/user/login';

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';


export let UserName;
export function setUserName(newName) {
    UserName = newName;
}

export function getComment() {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Нет авторизации');
            }
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("failed to get: " + response.status);
            }
        })

        .catch((error) => {
            alert("Произошла ошибка при выполнении запроса");
            console.error("Произошла ошибка при выполнении GET-запроса:", error);
        });
}


export function postComment() {
    return fetch(hostReg, {
        method: "POST",
        body: JSON.stringify({
            headers: {
                Authorization: token,
            },
            name: nameInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll('"', "&quot;"),
            text: commentInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll('"', "&quot;"),
            forceError: true,

        }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            }

            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            if (response.status === 400) {
                throw new Error('Плохой запрос');
            }
            return response.json();
        })

};
export function loginUser({ login, password }) {
    return fetch(hostReg, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    });
}
