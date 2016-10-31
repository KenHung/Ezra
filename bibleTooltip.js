$(document).tooltip({
  content: function () {
    return $(this).prop('title');
  },
  open: function (event, ui) {
    if (typeof (event.originalEvent) === 'undefined') {
      return false;
    }
    // close any lingering tooltips
    var $id = $(ui.tooltip).attr('id');
    $('div.ui-tooltip').not('#' + $id).remove();
  },
  close: function (event, ui) {
    // keep tooltip open on hover
    ui.tooltip.hover(
      function () {
        $(this).stop(true).fadeTo(400, 1);
      },
      function () {
        $(this).fadeOut('400', function () {
          $(this).remove();
        });
      }
    );
  }
});