import '../static/global.css';
import { navigationList } from './components/sidebar-navigation/sidebar-items.json';
import { mainView } from './views/main/main.view.js';
import { ViewStatick } from './views/viewStatic/viewstatic.view';
import { genreMenu } from './components/sidebar-navigation/query-genres-menu';

 
class APP{
    // массив вьюшек и путей к ним
    routes = [
        {path: [''], view: mainView},
    ]
    // загрузка из jsona всех путей по мейн вью
    hashForMainView = navigationList.forEach(e=>{
        e.items_group.forEach(el=>{
            this.routes[0].path.push(el.item_link);
        })
        genreMenu().then(el=>{
            el.forEach(e=>{
                this.routes[0].path.push(`#games--${e.slug}`);
            })
        })
    });

 
    AppState = {
        favorites:[],
    }
    constructor(){
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
        let statickView = new ViewStatick;
        statickView.renderHeader();
        statickView.renderSidebar();
    }

    route(){
        let route;
        // получаем необходимый объекст из массива routes
        for (let i=0; i<this.routes.length; i++){
            this.routes[i].path.find(e=>{
                if (e==location.hash){
                    route = this.routes[i]; 
                }
            });
        } 
  
        // currentView - Текущаю вьюшка
        this.currentView = new route.view(this.AppState, location.hash);
        // и вызов рендера у текущей вьюшки
        this.currentView.destroy();
        this.currentView.render();
        console.log(new Date());
    }
 
}

new APP();


