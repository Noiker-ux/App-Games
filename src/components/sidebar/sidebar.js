import './sidebar.css';
import '../sidebar-navigation/sidebar-group-item.js'
import { Sidebar_Group } from '../sidebar-navigation/sidebar-group-item.js';


export class Sidebar{
    constructor(){
        this.element = document.createElement('aside');
    }




    async render(){
        this.element.innerHTML=``;
        this.element.classList.add('sidebar');
        this.element.setAttribute('id','sidebar')
        this.element.innerHTML=`
        <nav class="sidebar__container">
            <div class="sidebar__logo">
                <img src="./static/images/Logo-ico.svg" alt="Logo-ICO" class="sidebar__logo-img">
                <img src="./static/images/Logo-text.svg" alt="Logo-Text" class="sidebar__logo-text">
            </div>

                  ${await new Sidebar_Group().render().outerHTML}
      

            <div class="sidebar__account">
                <img src="./static/images/perfil.png" alt="sidebar image" class="sidebar__prefil">
            
                <div class="sidebar__names">
                    <h3 class="sidebar__name">Alex Vyugin</h3>
                    <span class="sidebar__email">noiker01@mail.ru</span>
                </div>

                <i class="ri-arrow-right-s-line"></i>
            </div>
        </nav>
        `;

        document.getElementById('header__toggle').addEventListener('click',()=>{
            document.getElementById('sidebar').classList.toggle('show-sidebar');
            document.getElementById('main').classList.toggle('main-pd');
            document.getElementById('bigInputSearch').classList.toggle('bigInputSearch');
        })
        
        const sidebarLink = document.querySelectorAll('.sidebar__link');
        
        sidebarLink.forEach(e=>e.addEventListener('click',function(){
            sidebarLink.forEach(el=>el.classList.remove('active-link'))
            this.classList.add('active-link');
        }));



        return this.element;
    }
}

