import { replyToComment } from "./main.js";
import { initEventListeners } from "./main.js";


const listElement = document.getElementById("comments");

export const renderComments = ({ comments }) => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
        <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.time}</div>
        </div>
        <div class="comment-body" data-text="${comment.comment}" data-name="${comment.name}">
            <div class="comment-text" data-index="${index}">
                ${comment.comment}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <div class="likes">
                    <span class="likes-counter">${comments[index].likes}</span>
                    <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""
            }"></button>
            </div>
        </div>
    </li> `;
    }).join('');

    listElement.innerHTML = commentsHtml;
    replyToComment();
    initEventListeners();
};