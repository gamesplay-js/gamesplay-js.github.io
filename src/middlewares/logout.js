import { page } from '../lib.js';
import { logout } from '../api/data.js';
import { updateUserNav } from '../middlewares/decorateCtx.js';

export default function attachLogoutEventListener() {
    document.querySelector('#logoutBtn').addEventListener('click', onLogout);

    function onLogout() {
        logout();
        updateUserNav();
        page.redirect('/');
    }
}