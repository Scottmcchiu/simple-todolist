(function() {
  $(function() {

    /* wellcome */
    let list = $('.list');
    let main = list.parent();
    let hints = $('#hints p');
    const newHintText = {
      'wellcome': `Let's note something rightnow!`,
      'start': `Which is the most important one?`,
      'add': `Something else needs to do?`,
      'complete': `^o^ Great job ~~ Congratulations!`,
      'delete': `Keep goin' ~~ Any others?`,
      'remove': `Already removed ~~`,
      'update': `@@ Wanna change the note?`
    };

    main.on('mouseenter', '.list-items', function() {
      hints.text(newHintText.wellcome);
    }); // end mouseenter


    /* start */
    main.on('click', '.list-items', function() {
      $(this).focus();
      if ($(this).val() === '')
        hints.text(newHintText.start);
      else
        hints.text(newHintText.update);
    }); // end click

    main.on('mouseleave', function() {
      $('.list-items').blur();
      hints.text(newHintText.wellcome);
    }); // end mousemove


    /* writing and adding new item */
    let extItem = main.html();
    main.on('keydown', '.list-items', function(evt) {
      if (evt.keyCode === 13) {
        $(extItem)
          .appendTo(main)
          .removeClass('init');
        $('.list-items:last').val($(this).val());
        $(this).val('');
        $('.list-items').first().focus();
      } // end if
      hints.text(newHintText.add);
    }); // end keydown


    /* complete */
    main.on('click', '.fa-check', function() {
      if (!$(this).parent().hasClass('init')) {
        $(this)
          .addClass('done')
          .next().addClass('complete')
          .attr('disabled', true);
        hints.text(newHintText.complete);
      } // end if
    }); // end click


    /* delete */
    main.on('click', '.fa-trash-alt', function() {
      if (!$(this).parent().hasClass('init')) {
        if ($(this).hasClass('delete')) {
          $(this).parent().remove();
          hints.text(newHintText.remove);
        } else {
          $(this)
            .addClass('delete')
            .prev().addClass('complete')
            .attr('disabled', true)
            .siblings('.fa-check').css({
              opacity: '0'
            });
          hints.text(newHintText.delete);
        } // end if-else
      } // end if
    }); // end click

  }); // end jQuery
}()); // end IIFE
