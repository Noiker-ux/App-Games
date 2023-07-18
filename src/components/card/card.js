import './card.css';

import { DIVComponent } from '../../common/DivComponent.js';
import { Genre } from '../genres/genres';

export class Card extends DIVComponent {
    constructor(game){
        super();
        this.game=game;
    }


    ratingMetacritick(){
        let HelperProcent = Math.round((this.game.rating/5)*100);
        let ratingMeta=[];
        if (HelperProcent<50) {
            ratingMeta.push('badRating')
        }else {
            if (HelperProcent<75)
                ratingMeta.push('normalRating')
            else 
                ratingMeta.push('goodRating');
        }
        ratingMeta.push(HelperProcent);
        return ratingMeta;
    }

    render(){
        this.element.innerHTML=``;
        this.element.classList.add('card');
        this.element.setAttribute('data-id',this.game.id)
        console.log(this.game);
        let ratingMeta = this.ratingMetacritick();
        this.element.innerHTML=`
            <img src="${this.game.background_image}" alt="Preview image" class="card__img-preview">
            <div class="card__info">
                <div class="card__info-header">
                    <h3 class="card__title">${this.game.name}</h3>
                    <div class="card__rating ${ratingMeta[0]}">${ratingMeta[1]}</div>
                </div>
                <div class="card__body">${new Genre(this.game).render().outerHTML}</div>
            </div>
        `;
        return this.element;
    }


}
