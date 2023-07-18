import './header.css';


export class Header{
    constructor(appState){
        this.element = document.createElement('header');
        this.AppState=appState;
    }

    render(){
        this.element.innerHTML=``;
        this.element.classList.add('header');
        this.element.innerHTML=`
                <div class="header__container container">
                    <div class="header__toggle" id="header__toggle">
                        <i class="ri-menu-line"></i>
                    </div>
                    <div class="header__nav" id='bigInputSearch'>
                        <input type='text' class='search__input'/>
                        <a href="#" class="header__logo">
                            <img src="./static/images/Logo.png" alt="Logo">
                        </a>
                    </div>
                </div>
        `;
        return this.element;
    }
}


