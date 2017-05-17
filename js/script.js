(function($){
    let form = $('.form'),
        formSections = form.find('.form-section'),
        nextBtn = form.find('[type=button]'),
        submitBtn = form.find('[type=submit]'),
        reset = $('.reset');
        
    let defaultState = {
        login: null,
        email: null,
        password: null
    }; 
    
    let dataToSend = Object.assign({}, defaultState);

    nextBtn.on('click', function(){
        let activeSection = formSections.filter('.active');
        let currentField = activeSection.find('input'),
            currentName = currentField.attr('name'),
            currentValue = currentField.val();

        if (currentValue.trim().length) {
           dataToSend[currentName] = currentValue;
           form.removeClass('error');
           activeSection.removeClass('active')
                        .next()
                        .addClass('active');

            let keys = Object.keys(dataToSend);
            let isValid = keys.every( prop => !!dataToSend[prop] );
            
            if (isValid) {
                submitBtn.addClass('active');
                $(this).removeClass('active');
                $('.final-data').find('li').each(function(){
                    let element = $(this),
                        key = element.data('value');

                    element.find('b').text(dataToSend[key]);
                });
            }
            
        } else {
            form.addClass('error');
        }
    });

    reset.on('click', function(){
        formSections.removeClass('active').first().addClass('active');
        formSections.find('input').val('');
        submitBtn.removeClass('active');
        nextBtn.addClass('active');
        dataToSend = Object.assign({}, defaultState);
        form.removeClass('error');
    })
}(jQuery));