import { openMenu } from './components/side-bar.mjs';
import { initCreateTableListener } from './components/create-table.mjs';
import { initApp } from './helpers/init-app.mjs';

(() => {
    const bootstart = () => {
        initApp();
        openMenu();
        initCreateTableListener();
    };

    document.addEventListener('DOMContentLoaded', bootstart);
})();
