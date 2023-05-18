import {get_request} from "./requests.js";
const header = document.createElement('div');

export function init_header(main){
    header.setAttribute('id','header');
    header.classList.add('header');
    main.appendChild(header);

    init_header_left();
    init_header_content();
    init_header_right();
}

function init_header_left(){
    const header_left = document.createElement('div');
    header_left.classList.add('header-logo');
    const header_left_img = document.createElement('img');
    header_left_img.setAttribute('src','./frontend/assets/images/logo.svg')
    header_left.appendChild(header_left_img);
    header.appendChild(header_left);
}
function init_header_content(){
    const header_content = document.createElement('div');
    header_content.classList.add('header-content');
    header.appendChild(header_content);
}
function init_header_right(){
    const header_right = document.createElement('div');
    header_right.classList.add('header-right');
    const header_right_content = document.createElement('div');
    header_right_content.classList.add('header-right-content');

    const header_right_content_icon_1 = document.createElement('i');
    header_right_content_icon_1.classList.add('fa','fa-check');
    header_right_content.appendChild(header_right_content_icon_1);

    const header_right_content_icon_2 = document.createElement('i');
    header_right_content_icon_2.classList.add('fa','fa-server');
    header_right_content.appendChild(header_right_content_icon_2);

    const header_right_content_icon_3 = document.createElement('i');
    header_right_content_icon_3.classList.add('fa','fa-user');
    header_right_content.appendChild(header_right_content_icon_3);

    header_right.appendChild(header_right_content);
    header.appendChild(header_right);
}



function initSearchBar(){
    
    

}

