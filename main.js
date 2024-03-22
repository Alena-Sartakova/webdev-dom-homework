import { postComment } from "./api.js";
import { getComment } from "./api.js";
import { renderComments } from "./renderComments.js";


// Поиск элементов
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");


// массив
let comments = [];

function fetchRender() {
    getComment()
    .then((response) => {
        const jsonPromise = response.json();

        jsonPromise.then((responseData) => {
            console.log(responseData);
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    time: new Date(comment.date).toLocaleTimeString('sm', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    comment: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
            let hidePreload = document.querySelector(".preload").style.display = "none";
            renderComments({ comments });
        });
    });
}
fetchRender();


buttonElement.addEventListener("click", () => {
    if (commentInputElement.value === "") {
        return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = 'Добавление...';
    const startAt = Date.now();
    console.log("Начинаем делать запрос");
    postComment()
        //Ошибки       
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();;
            }

            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            if (response.status === 400) {
                throw new Error('Плохой запрос');
            }
            return response.json();
        })
        .then(() => {
            fetchRender();
        })

        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            nameInputElement.value = "";
            commentInputElement.value = "";
        })

        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
                return;
            }

            if (error.message === "Плохой запрос") {
                alert("Имя и/или комментарий составляет менее 3-х символов");
                return;
            }

            alert('Произошла ошибка');
            console.warn(error);
            console.warn(error);
        })
        .finally(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
        })

});


//Ответ на коммент
export const replyToComment = () => {
    const commentBodys = document.querySelectorAll(".comment-body");
    for (const commentBody of commentBodys) {
        commentBody.addEventListener('click', () => {
            const oldName = commentBody.dataset.name;
            const oldComment = commentBody.dataset.text;
            console.log(oldName);
            console.log(oldComment);
            commentInputElement.value = `${oldName}: ${oldComment} `;
        })
    }
};

//Лайк
export const initEventListeners = () => {
    const likesElements = document.querySelectorAll(".like-button");
    for (const likesElement of likesElements) {
        likesElement.addEventListener("click", () => {
            const index = likesElement.dataset.index;

            console.log(comments[index].likes);
            if (comments[index].isLiked) {
                comments[index].isLiked = false;
                comments[index].likes--;
            } else {
                comments[index].isLiked = true;
                comments[index].likes++;
            }
            renderComments({ comments });

        });
    }
};

renderComments({ comments });
initEventListeners();
replyToComment();



// Обработчик клика

buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value.trim() === "") {
        nameInputElement.classList.add("error");
        return;
    }
    if (commentInputElement.value.trim() === "") {
        commentInputElement.classList.add("error");
        return;
    }

    renderComments({ comments });
    initEventListeners();
    replyToComment();


});

console.log("It works!");
