import {get_request} from "./requests.js";
import {get_page} from "./pages.js";
const global_content = document.createElement('div');

/**
 * initialise le contenu
 */
export function init_content(){
    const global_container = document.getElementById('global-container');
    if(global_container){
        const exist_global_content = document.getElementById('global-content');
        if(exist_global_content){
            exist_global_content.remove();
            init_content();
        }
        else{
            global_content.setAttribute('id','global-content');
            global_content.classList.add('global-content');
            global_container.appendChild(global_content);
            get_page(global_content);
        }
    }
}
