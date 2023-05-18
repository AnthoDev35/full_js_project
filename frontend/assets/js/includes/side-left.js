import { get_request } from "./requests.js";
import {init_content} from "./content.js";

const main_div = null;
const side_left_exist = document.getElementById('side-left');
if(side_left_exist) side_left_exist.remove();
const side_left = document.createElement('div');
export function init_side_left(main) {
    side_left.setAttribute('id', 'side-left');
    side_left.classList.add('side-left');
    main.appendChild(side_left);
    // Création de la bordure qui va redimentionner le side-left
    const borderRight = document.createElement("div");
    borderRight.classList.add("border", "border-right");
    side_left.appendChild(borderRight);

    /*######## Start fonction de redimensionnement Side Left ##########*/
    function resizeElement(event) {
        const x = event.clientX;
        side_left.style.width = x - side_left.offsetLeft + "px";
    }

    borderRight.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", resizeElement);
    });

    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resizeElement);
    });
    /*######## End fonction de redimensionnement Side Left ##########*/
    
    init_side_left_content();
}

function init_side_left_content() {
    const configurations = [
        {
            id: 1,
            name: 'Config 1',
            link: 'config_1',
            value: 10,
            isParent: false,
            isEnabled: true
        },
        {
            id: 2,
            name: 'Config 2',
            link: 'config_2',
            value: 20,
            isParent: true,
            groups:[
                {
                    id: 21,
                    parent_id: 2,
                    name: 'Config 6',
                    link: 'config_6',
                    value: 60,
                    isParent: true,
                    isEnabled: true
                }
            ],
            isEnabled: false
        },
        {
            id: 3,
            name: 'Config 3',
            link: 'config_3',
            value: 30,
            isParent: true,
            groups:[
                {
                    id: 31,
                    parent_id: 3,
                    name: 'Config 6',
                    link: 'config_6',
                    value: 60,
                    isParent: true,
                    isEnabled: true
                }
            ],
            isEnabled: true
        },
        {
            id: 4,
            name: 'Config 4',
            link: 'config_4',
            value: 40,
            isParent: false,
            isEnabled: true
        },
        {
            id: 5,
            name: 'Config 5',
            link: 'config_5',
            value: 50,
            isParent: false,
            isEnabled: true
        },
        {
            id: 6,
            name: 'Config 6',
            link: 'config_6',
            value: 60,
            isParent: true,
            groups:[
                {
                    id: 61,
                    parent_id: 6,
                    name: 'Config 6-1',
                    link: 'config_6-1',
                    value: 60,
                    isParent: true,
                    isEnabled: true
                },
                {
                    id: 62,
                    parent_id: 6,
                    name: 'Config 6-2',
                    link: 'config_6-2',
                    value: 60,
                    isParent: true,
                    isEnabled: true
                },
                {
                    id: 63,
                    parent_id: 6,
                    name: 'Config 6-3',
                    link: 'config_6-3',
                    value: 60,
                    isParent: true,
                    isEnabled: true
                }
            ],
            isEnabled: true
        }
    ];

    const ul_element = document.createElement('ul');
    let left_elements = '';
    configurations.forEach(configuration=>{
        ul_element.append(create_left_element(configuration));
    });
    ul_element.append(left_elements);
    side_left.append(ul_element);
}

function create_left_element(configuration){
    let constructor = '';
    const li_el = document.createElement('li');
    const arrow_list = document.createElement('i');
    li_el.addEventListener('click', function() {
        set_url('add', 'page', configuration.link);
        if(get_parameter('page', configuration.link)){
            li_el.classList.add('active');
            arrow_list.classList.add('fa','fa-angle-up');
            init_content();
        } 
    });
    li_el.innerText = configuration.name;
    li_el.classList.add('li_linked');
    if(configuration.isParent && configuration.groups){
        li_el.classList.add('dropdown');
        if(get_parameter('page', configuration.link)) arrow_list.classList.add('fa','fa-angle-up');
        else arrow_list.classList.add('fa','fa-angle-down');
        create_group_element(configuration.groups)
        li_el.append(arrow_list);
    }
    if(get_parameter('page', configuration.link)){
        li_el.classList.add('active');
        arrow_list.classList.add('fa','fa-angle-up');
    } 
    return li_el;
}

//todo je n'arrive pas à gérer les sous-groupes
function create_group_element(groups){
    const ul_dropdown = document.createElement('ul');
    groups.forEach(group=>{
        const li_el = document.createElement('li');
        li_el.innerText = group.name;
        li_el.classList.add('dropdown_li_linked');
        li_el.append(ul_dropdown);
    });
    return ul_dropdown;
}

function set_url(action, parameter, value){
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if(action == 'add') params.set(parameter, value);
    if(action == 'remove') if(params.get(parameter)) params.delete(parameter);

    // Modification de l'objet URLSearchParams dans l'objet URL
    url.search = params.toString();
    
    // Utilisation de history.pushState() pour afficher la nouvelle URL dans le navigateur
    history.pushState(null, null, url.href);

    const all_linkeds = document.querySelectorAll('#side-left .li_linked');
    all_linkeds.forEach(all_linked=>{
        all_linked.classList.remove('active');
    });
    const all_linked_icon = document.querySelectorAll('#side-left .li_linked i');
    all_linked_icon.forEach(all_linked_icon=>{
        all_linked_icon.classList.add('fa-angle-down');
        all_linked_icon.classList.remove('fa-angle-up');
    });
    return false;
}

function get_parameter(parameter, value){
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if(params.get(parameter) == value) return true;
    else return false;
}