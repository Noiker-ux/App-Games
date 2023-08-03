import { AbstractView } from '../../common/AbstractView.js';
import { Main } from '../../components/main/main.js';
import onChange  from 'on-change';

export class mainView extends AbstractView{
    constructor(appState,hash){
        super();
        this.hash=hash;
        this.AppState = appState;
        this.AppState = onChange(this.AppState, this.UpdateHookAppState.bind(this))
        this.state = onChange(this.state, this.loader.bind(this));
        this.settitle('Noiker GameApp');
    }

    UpdateHookAppState(path){  
        if (path=='favorites'){
            console.log(path);
        }
    }


    loader(path){
        if (path=='loading'){
            document.querySelector('main').innerHTML+=`<p>sdf</p>`
        }  
    }


    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0
    }


    async render(){
        this.state.loading=true;
        const main = await new Main(this.hash).render();
        await this.app.append(main);
        this.state.loading=false;
    }

    destroy(){
        try {
            document.getElementById('main').remove();
        } catch(e){
            console.error(`Не удается очистить main: ${e.message}`);
        }
    }
}