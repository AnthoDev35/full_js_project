import {get_config_page_1} from "./pages/config_1.js";

export function get_page(global_content){
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    global_content.append(page_constructor(params.get('page')));
}

function page_constructor(page){
    const div_content = document.createElement('div');
    div_content.setAttribute('id','page-content');
    div_content.classList.add('page-content');
    if(!page){
        const bl_h3 = document.createElement('h3')
        bl_h3.innerText = `Aucun contenu à afficher !`;
        div_content.append(bl_h3);
    }
    else{
        if(page == 'config_1') get_config_page_1(div_content);
    }
    return div_content;
}
