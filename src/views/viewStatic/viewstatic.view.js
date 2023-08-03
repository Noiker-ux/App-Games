//  view for statich HTML Head and Sidebar


import { Header } from "../../components/header/header";
import { AbstractView } from '../../common/AbstractView.js';
import { Sidebar } from "../../components/sidebar/sidebar";

export class ViewStatick extends AbstractView{
    constructor(){
        super()
    }
    renderHeader(){
        const header = new Header(this.AppState).render();
        this.app.prepend(header);
    }

    async renderSidebar(){
        const sidebar = await new Sidebar().render();
        await this.app.append(sidebar);
    }

}