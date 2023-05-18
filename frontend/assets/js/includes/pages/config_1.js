
export function get_config_page_1(div_content){
    const element = document.createElement('div');
    element.classList.add('page');
    const title = document.createElement('h3');
    title.innerText = 'test page 1';
    element.append(title);
    div_content.append(element);
}