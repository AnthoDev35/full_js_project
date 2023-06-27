class PopupManager {
    constructor() {
        this.popup = document.querySelector('.popup');
        this.popupHeader = document.querySelector('.popup-header');
        this.popupContent = document.querySelector('.popup-content');
        this.selectedOption = null;
        // can contruct this from the backend
        this.forms = [{
            optionId: 0,
            optionTitle: 'Add widget',
            optionClass: 'popup-header',
            fields: [
                { tag: 'input', type: 'hidden', name: 'widgetId', id: 'widgetId', value: '321' },
                { tag: 'input', type: 'hidden', name: 'minWidth', id: 'minWidth', value: '6' },
                { tag: 'input', type: 'hidden', name: 'minHeight', id: 'minHeight', value: '2' },
                { tag: 'input', type: 'hidden', name: 'selectType', id: 'selectType', value: 'option2' },
                { tag: 'input', type: 'hidden', name: 'selectFile', id: 'selectFile', value: '123456.pdf' },
                {
                    tag: 'div', type: 'none', name: 'none', title: 'Select a type', class: 'button-type', options: [
                        {
                            title: 'Option 1',
                            id: 'option_id_1',
                            icon: 'fas fa-clock',
                            subForm: [
                                { tag: 'input', type: 'text', name: 'subfield_1', title: 'Subfield 1', id: 'subfield_1' },
                                { tag: 'input', type: 'text', name: 'subfield_2', title: 'Subfield 2', id: 'subfield_2' },
                                { tag: 'select', name: 'subfield_3', title: 'Subfield 3', id: 'subfield_3', options: [{value: 1, title:'Option A'},{ value: 2, title:'Option B'},{ value: 3, title:'Option C'}]},
                            ]
                        },
                        {
                            title: 'Option 2',
                            id: 'option_id_2',
                            icon: 'fas fa-check',
                            subForm: [
                                { tag: 'input', type: 'text', name: 'subfield_1', title: 'Subfield 1', id: 'subfield_1' },
                                { tag: 'input', type: 'text', name: 'subfield_2', title: 'Subfield 2', id: 'subfield_2' },
                                { tag: 'select', title: 'Subfield 4', name: 'subfield_4', label: 'Subfield 4', options: [{value: 4, title:'Option D'},{ value: 5, title:'Option E'},{ value: 6, title:'Option F'}]},
                            ]
                        },
                        {
                            title: 'Option 3',
                            id: 'option_id_3',
                            icon: 'fas fa-calendar',
                            subForm: [
                                { tag: 'input', type: 'text', name: 'subfield_2', title: 'Subfield 2', id: 'subfield_2' },
                                { tag: 'checkbox', name: 'subfield_3', title: 'Subfield 3', options: [{value: 4, title:'Option D'},{ value: 5, title:'Option E'},{ value: 6, title:'Option F'}] },
                                { tag: 'input', type: 'text', name: 'subfield_1', title: 'Subfield 1', id: 'subfield_1' },
                            ]
                        },
                        {
                            title: 'Option 4',
                            id: 'option_id_4',
                            icon: 'fas fa-cogs',
                            subForm: [
                                { tag: 'select', title: 'Subfield 4', name: 'subfield_4', options: [{value: 4, title:'Option D'},{ value: 5, title:'Option E'},{ value: 6, title:'Option F'}]},
                                { tag: 'input', type: 'text', name: 'subfield_1', title: 'Subfield 1', id: 'subfield_1' },
                            ]
                        },
                        {
                            title: 'Option 5',
                            id: 'option_id_5',
                            icon: 'fas fa-file',
                            subForm: [
                                { tag: 'select', title: 'Subfield 4', name: 'subfield_4', options: [{value: 4, title:'Option D'},{ value: 5, title:'Option E'},{ value: 6, title:'Option F'}]},
                                { tag: 'select', title: 'Subfield 4', name: 'subfield_4', options: [{value: 4, title:'Option D'},{ value: 5, title:'Option E'},{ value: 6, title:'Option F'}]},
                                { tag: 'select', title: 'Subfield 4', name: 'subfield_4', options: [{value: 4, title:'Option D'},{ value: 5, title:'Option E'},{ value: 6, title:'Option F'}]},
                                { tag: 'input', type: 'text', name: 'subfield_1', title: 'Subfield 1', id: 'subfield_1' },
                            ]
                        },
                        {
                            title: 'Option 6',
                            id: 'option_id_6',
                            icon: 'fas fa-envelope',
                            subForm: [
                                { tag: 'input', type: 'text', name: 'subfield_1', title: 'Subfield 1', id: 'subfield_1' },
                            ]
                        }
                    ]
                }
            ]
        }];
    }

    openPopup(options = 0) {
        this.selectedOption = options;
        this.popup.style.display = 'block';
        this.popupContent.innerHTML = '';
    
        const selectedForm = this.forms[options];
        const fields = selectedForm.fields;
    
        this.popupHeader.textContent = selectedForm.optionTitle;
        this.popupHeader.className = selectedForm.optionClass;
    
        const form = document.createElement('form');
    
        fields.forEach(field => {
            if (field.tag === 'input') {
                const label = document.createElement('label');
                label.textContent = field.title + ' :';
    
                const input = document.createElement('input');
                input.type = field.type;
                input.name = field.name;
                input.value = field.value;
                if(field.type == 'hidden') form.appendChild(input);
                else form.append(label, input);
            } else if (field.tag === 'div') {
                const label = document.createElement('label');
                label.textContent = field.title + ' :';
    
                const div = document.createElement('div');
                div.className = field.class;
    
                field.options.forEach(option => {
                    const optionElement = document.createElement('label');
                    optionElement.className = 'select_type_option';
                    optionElement.id = option.id;
                    optionElement.title = option.title;
    
                    const icon = document.createElement('i');
                    icon.className = option.icon;
    
                    optionElement.appendChild(icon);
                    optionElement.appendChild(document.createTextNode(option.title));
    
                    optionElement.addEventListener('click', () => {
                        if (option.subForm) {
                            const all_options_id = document.querySelectorAll('[id^="option_id_"]');
                            all_options_id.forEach(all_option =>{
                                const option_id = document.getElementById(all_option.id);
                                option_id.classList.remove('active');
                            });
                            const option_id = document.getElementById(option.id);
                            if(option_id) option_id.classList.add('active');
                            this.renderSubForm(form, option.subForm);
                        } else {
                            this.clearSubForm(form);
                        }
                    });
    
                    div.appendChild(optionElement);
                });
    
                form.append(label, div);
            }
        });
    
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Valider';
        submitButton.addEventListener('click', (event) => {
            this.submitForm(event);
        });
        form.appendChild(submitButton);
    
        this.popupContent.appendChild(form);
    }

    renderSubForm(form, subFormFields) {
        let subFormContainer = form.querySelector('.subform-container');
        
        if (!subFormContainer) {
            subFormContainer = document.createElement('div');
            subFormContainer.classList.add('subform-container');
            form.appendChild(subFormContainer);
        }
        subFormContainer.innerHTML = '';
    
        subFormFields.forEach((field, index) => {
            const label = document.createElement('label');
            label.textContent = field.title + ' :';
            subFormContainer.appendChild(label);
    
            if (field.tag === 'input') {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = 'subfield' + (index + 1);
                subFormContainer.appendChild(input);
           
            } else if (field.tag === 'select') {
                const label = document.createElement('label');
                label.textContent = field.title + ' :';
                const select = document.createElement('select');
                select.name = field.name;
    
                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.title;
                    select.appendChild(optionElement);
                });
    
                subFormContainer.append(label, select);
            } else if (field.tag === 'checkbox' || field.tag === 'radio') {
                const label = document.createElement('label');
                label.textContent = field.title + ' :';
                subFormContainer.appendChild(label);
                field.options.forEach(option => {
                    const input = document.createElement('input');
                    input.type = field.tag;
                    input.name = field.name;
                    input.value = option.value;
    
                    const optionLabel = document.createElement('label');
                    optionLabel.textContent = option.title;
                    optionLabel.appendChild(input);
    
                    subFormContainer.appendChild(optionLabel);
                });
            }
    
            subFormContainer.appendChild(document.createElement('br'));
        });
    
        const submitButton = form.querySelector('button');
        form.insertBefore(subFormContainer, submitButton);
    }

    clearSubForm(form) {
        const subFormContainer = form.querySelector('.subform-container');
        if (subFormContainer) {
            subFormContainer.innerHTML = '';
        }
    }
    
    submitForm(event) {
        event.preventDefault();
    
        const form = this.popupContent.querySelector('form');
        const formData = new FormData(form);
    
        const request = {};
        for (const [name, value] of formData) {
            request[name] = value;
        }
        
        console.log('Request :', request);
    
        this.popup.style.display = 'none';
        form.reset();
        this.clearSubForm(form);
    }
}

const popupManager = new PopupManager();