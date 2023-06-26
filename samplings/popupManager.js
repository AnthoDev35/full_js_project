class PopupManager {
    constructor() {
        this.popup = document.querySelector('.popup');
        this.popupContent = document.querySelector('.popup-content');
        this.selectedOption = null;
        this.forms = [
            {
                option: 'Option 1',
                fields: [
                    { type: 'input', label: 'Field 1' },
                    {
                        type: 'select',
                        label: 'Field 2',
                        options: [
                            { value: 'Option A', label: 'Option A', form: [{ type: 'input', label: 'Subfield 1' }] },
                            { value: 'Option B', label: 'Option B', form: [{ type: 'input', label: 'Subfield 2' }] },
                            { value: 'Option C', label: 'Option C', form: [{ type: 'input', label: 'Subfield 3' }] }
                        ]
                    },
                    { type: 'checkbox', label: 'Field 3', options: ['Option 1', 'Option 2', 'Option 3'] }
                ]
            },
            {
                option: 'Option 2',
                fields: [
                    { type: 'radio', label: 'Field A', options: ['Option X', 'Option Y', 'Option Z'] },
                    { type: 'input', label: 'Field B' },
                    { type: 'select', label: 'Field C', options: ['Option I', 'Option II', 'Option III'] }
                ]
            },
            // Ajoutez les autres options avec leurs champs ici
        ];
    }

    openPopup(option) {
        // Affiche le pop-up avec le formulaire correspondant à l'option choisie
        this.selectedOption = option;
        this.popup.style.display = 'block';
        this.popupContent.innerHTML = '';

        const selectedForm = this.forms[option - 1];
        const fields = selectedForm.fields;

        const formTitle = document.createElement('h2');
        formTitle.textContent = selectedForm.option;
        this.popupContent.appendChild(formTitle);

        const form = document.createElement('form');

        fields.forEach((field, index) => {
            const label = document.createElement('label');
            label.textContent = field.label + ' :';
            form.appendChild(label);

            if (field.type === 'input') {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = 'field' + (index + 1);
                form.appendChild(input);
            } else if (field.type === 'select') {
                const select = document.createElement('select');
                select.name = 'field' + (index + 1);

                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    select.appendChild(optionElement);
                });

                select.addEventListener('change', event => {
                    const selectedOption = field.options.find(option => option.value === event.target.value);
                    if (selectedOption && selectedOption.form) {
                        this.renderSubForm(form, selectedOption.form);
                    } else {
                        this.clearSubForm(form);
                    }
                });

                form.appendChild(select);
            } else if (field.type === 'checkbox' || field.type === 'radio') {
                field.options.forEach(option => {
                    const input = document.createElement('input');
                    input.type = field.type;
                    input.name = 'field' + (index + 1);
                    input.value = option;

                    const optionLabel = document.createElement('label');
                    optionLabel.textContent = option;
                    optionLabel.appendChild(input);

                    form.appendChild(optionLabel);
                });
            }

            form.appendChild(document.createElement('br'));
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Valider';
        submitButton.addEventListener('click', (event) => {
            this.submitForm(event); // Appelle la fonction submitForm() en passant l'événement en paramètre
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
    
        subFormContainer.innerHTML = ''; // Réinitialise le contenu du sous-formulaire
    
        subFormFields.forEach((field, index) => {
            const label = document.createElement('label');
            label.textContent = field.label + ' :';
            subFormContainer.appendChild(label);
    
            if (field.type === 'input') {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = 'subfield' + (index + 1);
                subFormContainer.appendChild(input);
            }
    
            subFormContainer.appendChild(document.createElement('br'));
        });
    
        const submitButton = form.querySelector('button');
        form.insertBefore(subFormContainer, submitButton); // Insère le sous-formulaire avant le bouton "Valider"
    }

    clearSubForm(form) {
        const subFormContainer = form.querySelector('.subform-container');
        if (subFormContainer) {
            subFormContainer.innerHTML = '';
        }
    }
    
    submitForm(event) {
        event.preventDefault(); // Empêche le comportement par défaut de l'événement de soumission du formulaire
    
        // Récupère les valeurs des champs du formulaire et effectue le traitement nécessaire
        const form = this.popupContent.querySelector('form');
        const formData = new FormData(form);
    
        const values = {};
        for (const [name, value] of formData) {
            values[name] = value;
        }
    
        // Affiche les valeurs dans la console (vous pouvez les traiter comme vous le souhaitez)
        console.log('Option : ' + this.forms[this.selectedOption - 1].option);
        console.log('Champs :', values);
    
        // Ferme le pop-up
        this.popup.style.display = 'none';
        form.reset();
        this.clearSubForm(form);
    }
}

const popupManager = new PopupManager();