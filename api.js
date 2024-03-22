const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export function getComment() {
    return fetch("https://wedev-api.sky.pro/api/v1/alenka-s/comments", {
        method: "GET",
    })
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
};