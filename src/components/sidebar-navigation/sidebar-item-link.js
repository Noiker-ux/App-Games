
export class Sidebar_Link {
    constructor(){
        this.element = document.createElement('a');
    }

    render(item){
        this.element.classList.add('sidebar__link');
        this.element.setAttribute('href', item.item_link);
        this.element.innerHTML=`
            ${item.item_icon}
            <span class="sidebar__link-name">${item.item_name}</span>
            <span class="sidebar__link-floating">${item.item_name}</span>
        `
        return this.element;
    }
}