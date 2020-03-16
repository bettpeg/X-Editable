document.querySelector('body').addEventListener('click', clickHandler);

function clickHandler(event) {
    if (!event.target.hasAttribute('editable')) return;

    event.preventDefault();

    const { target: targetElement } = event;

    const type = targetElement.getAttribute('editable');
    
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', type);
    targetElement.parentNode.appendChild(inputElement);
    inputElement.value = targetElement.innerText;

    const btnConf = document.createElement('button');
    btnConf.classList.add('btn', 'btn-primary', 'btn-xs', 'btn-action');
    const tick = document.createElement('i');
    tick.classList.add('glyphicon', 'glyphicon-ok');
    targetElement.parentNode.appendChild(btnConf);
    btnConf.appendChild(tick);
    btnConf.id = 'confirm';

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('btn', 'btn-danger', 'btn-xs', 'btn-action');
    const cross = document.createElement('i');
    cross.classList.add('glyphicon', 'glyphicon-remove');
    targetElement.parentNode.appendChild(btnCancel);
    btnCancel.appendChild(cross);
    btnCancel.id = 'cancel';

    //targetElement.parentNode.removeChild(targetElement);
    targetElement.remove();
    //inputElement.focus();
    inputElement.select();

    const confChanges = document.querySelector('#confirm');
    const cancelChanges = document.querySelector('#cancel');

    function saveChanges() {
        inputElement.parentNode.appendChild(targetElement);
        targetElement.innerText = inputElement.value;
        inputElement.remove();
        confChanges.remove();
        cancelChanges.remove();
    }

    function deleteChanges() {
        inputElement.parentNode.appendChild(targetElement);
        inputElement.remove();
        confChanges.remove();
        cancelChanges.remove();
    }

    inputElement.addEventListener('keyup', function(event){
        switch (event.which) {
            case 13: //save
                saveChanges();
                break;
            
            case 27: //cancel
                deleteChanges();
                break;
        }
    });

    confChanges.addEventListener('click', saveChanges);

    cancelChanges.addEventListener('click', deleteChanges);

}