import '../static/global.css';
import { mainView } from './views/main/main.view.js';

 
class APP{
    // массив вьюшек и путей к ним
    routes = [
        {path: '', view: mainView}
    ]
    AppState = {
        favorites:[]
    }
    constructor(){
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }

    route(){
        // получаем необходимый объекст из массива routes
        const view = this.routes.find(el=>el.path==location.hash).view;
        // currentView - Текущаю вьюшка
        this.currentView = new view(this.AppState);
        // и вызов рендера у текущей вьюшки
        this.currentView.render();
    }
}

new APP();



const showSidebar = (toggleId, sidebarId, mainId, bigInpSearchId) => {
    const toggle = document.getElementById(toggleId),
          sidebar = document.getElementById(sidebarId),
          main = document.getElementById(mainId),
          bigInpSearch = document.getElementById(bigInpSearchId) ;
        if (toggle && sidebar && main && bigInpSearch){
            toggle.addEventListener('click',()=>{
                sidebar.classList.toggle('show-sidebar');
                main.classList.toggle('main-pd');
                bigInpSearch.classList.toggle('bigInputSearch');
        })
    }
}
showSidebar('header__toggle','sidebar','main','bigInputSearch');

const sidebarLink = document.querySelectorAll('.sidebar__link');

sidebarLink.forEach(e=>e.addEventListener('click',function(){
    sidebarLink.forEach(el=>el.classList.remove('active-link'))
    this.classList.add('active-link');
}))



