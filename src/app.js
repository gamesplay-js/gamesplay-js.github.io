import attachLogoutEventListener from './middlewares/logout.js';
import decorateCtx from './middlewares/decorateCtx.js';
import { updateUserNav } from './middlewares/decorateCtx.js';
import { page } from './lib.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

attachLogoutEventListener();

page(decorateCtx);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

updateUserNav();

page.start();

