import { render } from '../lib.js';
import { getUserData } from '../util.js';

const root = document.querySelector('#main-content');

export default function decorateCtx(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

export function updateUserNav(){
    if(getUserData()){
        document.querySelector('#user').style.display='inline';
        document.querySelector('#guest').style.display='none';
    } else {
        document.querySelector('#user').style.display='none';
        document.querySelector('#guest').style.display='inline';
    }
}