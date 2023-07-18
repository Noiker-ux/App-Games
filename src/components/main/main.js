import './main.css';
import { Card } from '../../components/card/card.js';

export class Main  {

    constructor(){
        this.element = document.createElement('main');
    }

    render(){
        this.element.innerHTML=``;
        this.element.classList.add('main');
        this.element.classList.add('container');
        this.element.setAttribute('id','main');
        this.basicLoad();
        


        return this.element;
    }

    renderCard(element){
        const card = new Card(element).render();
        this.element.append(card);
    }

    async basicLoad(){
        let dateNow = new Date().getFullYear();
        let responce = await fetch(`https://api.rawg.io/api/games?dates=${dateNow}-01-01,${dateNow}-12-31&ordering=-added&key=91b914bf86944b2d9729ffa2c47d253f`);
        responce = await responce.json();
        responce = [responce.count, responce.results]
        responce[1].forEach(element => {
            this.renderCard(element);
        });
        return responce;
    }


}