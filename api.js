const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export function getComment() {
    return fetch("https://wedev-api.sky.pro/api/v1/alenka-s/comments", {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("failed to get: " + response.status);
            }
        })
        .catch((error) => {
            console.error("Произошла ошибка при выполнении GET-запроса:", error);
        });
}


export function postComment() {
    return fetch("https://wedev-api.sky.pro/api/v1/alenka-s/comments", {
        method: "POST",
        body: JSON.stringify({
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