import { html } from '../lib.js';
import { getGameById, deleteGame, getComments, addComment } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, finalComments, seeAddComment, onSubmit, userEmail) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <div class="details-comments">
            <h2>Comments:</h2>
            ${finalComments.length > 0 ? html`<ul>${finalComments.map(commentCard)}</ul>` : html`<p
                class="no-comment">No
                comments.
            </p>`}
        </div>

        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${game.objectId}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}

        ${seeAddComment ? addCommentCard(onSubmit) : null};
    </div>
</section>`;

const commentCard = (comment) => html`
<li class="comment">
    <p>${comment.owner.username}: ${comment.content}</p>
</li>`

const addCommentCard = (onSubmit) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onSubmit} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const [game, comments] = await Promise.all([
        getGameById(ctx.params.id),
        getComments(ctx.params.id)]);

    const finalComments = comments.results.filter(comment => {
        return comment.game.objectId == game.objectId;
    });

    console.log(finalComments);
    const isOwner = userData && userData.id == game.owner.objectId;
    const seeAddComment = userData && !isOwner;
    let userEmail = 'unknown';
    if(userData){
        userEmail = userData.email;
    }

    ctx.render(detailsTemplate(game, isOwner, onDelete, finalComments, seeAddComment, onSubmit, userEmail));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this game?');
        if (choice) {
            await deleteGame(game.objectId);
            ctx.page.redirect('/');
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const comment = formData.get('comment');

        event.target.reset();
        await addComment(game.objectId, {content: comment});
        ctx.page.redirect('/details/' + game.objectId);
    }
}
