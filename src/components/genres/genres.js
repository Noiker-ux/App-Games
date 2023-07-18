import './genres.css';
import { DIVComponent } from '../../common/DivComponent.js'

export class Genre extends DIVComponent{
    constructor(game){
        super()
        this.game=game;
    }

    render(){
        this.element.innerHTML=``;
        this.element.classList.add('genres');
        this.game.genres.forEach(element => {
            this.element.innerHTML+=`
                <div class="genre">
                    ${element.name}
                </div>
        `; 
        });

        return this.element;

    }
}