import './main.css';
import { Card } from '../../components/card/card.js';
import { Queryies } from '../../queryies/queryies';

export class Main  {

    constructor(hash){
        this.element = document.createElement('main');
        this.hash=hash;
    }
    renderCard(element){
        const card = new Card(element).render();
        this.element.append(card);
    }

    async render(){
        this.element.innerHTML=``;
        this.element.classList.add('main');
        this.element.classList.add('container');
        this.element.setAttribute('id','main');
        // this

        let responce = await new Queryies(this.hash);
        let helper = this.hash.split('--');
        let functionForView = responce.routefunc.find(el=>el.hash==helper[0]);
        responce = await functionForView.func;
        await responce[1].forEach(element => {
            this.renderCard(element);
        });
        return this.element;
    }

}