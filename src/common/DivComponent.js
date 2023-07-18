export class DIVComponent {
    constructor(){
        this.element = document.createElement('div');
    }

    render(){
        return this.element;
    }

}