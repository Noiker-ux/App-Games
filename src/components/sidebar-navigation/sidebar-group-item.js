import { genreMenu } from './query-genres-menu.js'
import { DIVComponent } from '../../common/DivComponent.js';
import { navigationList } from './sidebar-items.json';
import { Sidebar_Link } from './sidebar-item-link';

export class Sidebar_Group extends DIVComponent{
    constructor(){
        super();
    }

     render(){
        this.element.classList.add('sidebar__content');
        navigationList.forEach(element => {
            if (element.title_group!=undefined){
                this.element.innerHTML+=`
                    <h3 class="sidebar__title">
                        <span>${element.title_group}</span>
                    </h3>
                `;
            }
            element.items_group.forEach(el=>{
                this.element.append(new Sidebar_Link().render(el))
            })
        });
        this.element.innerHTML+=`
            <h3 class="sidebar__title">
                <span>Genres</span>
            </h3>
        `;

        genreMenu().then(e=>{
            e.forEach(el=>{
                document.querySelector('.sidebar__content').insertAdjacentHTML('beforeend',`
                <a class='sidebar__link' href='#games--${el.slug}'>
                    <img class='genre-img' src='${el.image_background}'>
                    <span class="sidebar__link-name">${el.name}</span>
                    <span class="sidebar__link-floating">${el.name}</span>
                </a>
                `);
            })
        });
      
        return this.element;
    }
}