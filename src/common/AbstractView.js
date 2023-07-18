export class AbstractView {
    constructor(){
        this.app = document.getElementById('root');
    }

    settitle(title){
        document.title = title;
    }

    render(){
        return
    }

    destroy(){
        return
    }
}