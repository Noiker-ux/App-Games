import './sidebar.css';

export class Sidebar{
    constructor(){
        this.element = document.createElement('aside');
    }

    render(){
        this.element.innerHTML=``;
        this.element.classList.add('sidebar');
        this.element.setAttribute('id','sidebar')
        this.element.innerHTML=`
        <nav class="sidebar__container">
            <div class="sidebar__logo">
                <img src="./static/images/Logo-ico.svg" alt="Logo-ICO" class="sidebar__logo-img">
                <img src="./static/images/Logo-text.svg" alt="Logo-Text" class="sidebar__logo-text">
            </div>

            <div class="sidebar__content">
                <div class="sidebar__list">
                    <a href="#" class="sidebar__link">
                        <i class="ri-home-4-line"></i>
                        <span class="sidebar__link-name">Home</span>
                        <span class="sidebar__link-floating">Home</span>
                    </a>
                    
                    <a href="#" class="sidebar__link">
                        <i class="ri-compass-3-line"></i>
                        <span class="sidebar__link-name">Explore</span>
                        <span class="sidebar__link-floating">Explore</span>
                    </a>

                    <a href="#" class="sidebar__link">
                        <i class="ri-video-line"></i>
                        <span class="sidebar__link-name">Shorts</span>
                        <span class="sidebar__link-floating">Shorts</span>
                    </a>

                    <a href="#" class="sidebar__link">
                        <i class="ri-add-box-line"></i>
                        <span class="sidebar__link-name">Subscription</span>
                        <span class="sidebar__link-floating">Subscription</span>
                    </a>
                </div>

                <h3 class="sidebar__title">
                    <span>Library</span>
                </h3>

                <div class="sidebar__list">
                    <a href="#" class="sidebar__link">
                        <i class="ri-history-line"></i>
                        <span class="sidebar__link-name">History</span>
                        <span class="sidebar__link-floating">History</span>
                    </a>
                    
                    <a href="#" class="sidebar__link">
                        <i class="ri-time-line"></i>
                        <span class="sidebar__link-name">Watch Later</span>
                        <span class="sidebar__link-floating">Watch Later</span>
                    </a>

                    <a href="#" class="sidebar__link">
                        <i class="ri-play-circle-line"></i>
                        <span class="sidebar__link-name">Playlists</span>
                        <span class="sidebar__link-floating">Playlists</span>
                    </a>

                    <a href="#" class="sidebar__link">
                        <i class="ri-heart-3-line"></i>
                        <span class="sidebar__link-name">Liked videos</span>
                        <span class="sidebar__link-floating">Liked videos</span>
                    </a>
                </div>


                <h3 class="sidebar__title">
                    <span>New Releases</span>
                </h3>

                <div class="sidebar__list">
                    <a href="#" class="sidebar__link">
                        <i class="ri-star-fill"></i>
                        <span class="sidebar__link-name">Last 30 days</span>
                        <span class="sidebar__link-floating">Last 30 days</span>
                    </a>
                    
                    <a href="#" class="sidebar__link">
                        <i class="ri-settings-3-line"></i>
                        <span class="sidebar__link-name">Settings</span>
                        <span class="sidebar__link-floating">Settings</span>
                    </a>

                    <a href="#" class="sidebar__link">
                        <i class="ri-logout-box-r-line"></i>    
                        <span class="sidebar__link-name">Logout</span>
                        <span class="sidebar__link-floating">Logout</span>
                    </a>
                </div>
            </div>

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
        return this.element;
    }
}

