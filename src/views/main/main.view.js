import { AbstractView } from '../../common/AbstractView.js';
import { Header } from '../../components/header/header.js'
import { Sidebar } from '../../components/sidebar/sidebar.js'
import { Main } from '../../components/main/main.js';
import onChange  from 'on-change';

export class mainView extends AbstractView{
    constructor(appState){
        super();
        this.AppState = appState;
        this.AppState = onChange(this.AppState, this.UpdateHookAppState.bind(this))
        this.settitle('Noiker GameApp');
    }

    UpdateHookAppState(path){  
        if (path=='favorites'){
            console.log(path);
        }
    }

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    async render(){
        this.app.innerHTML=``;
        this.renderHeader();
        this.renderSidebar();
        await this.renderMain();
        this.AppState.favorites.push('111');
    }

    renderHeader(){
        const header = new Header(this.AppState).render();
        this.app.prepend(header);
    }

    renderSidebar(){
        const sidebar = new Sidebar().render();
        this.app.append(sidebar);
    }

    async renderMain(){
        const main = new Main().render();
        await this.app.append(main);
    }
}