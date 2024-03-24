import { getComment } from "./api.js";
import { renderComments } from "./renderComments.js";
import { initAddCommentListeners } from "./listeners.js";

// Поиск элементов
const commentInputElement = document.getElementById("comment-input");


// массив
let comments = [];

export function fetchRender() {
    getComment()
        .then((responseData) => {
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
        })
};

fetchRender();

initAddCommentListeners();

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


console.log("It works!");
