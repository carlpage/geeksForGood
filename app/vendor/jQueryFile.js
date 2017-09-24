$(document).ready(function() {
  console.log('in jq');

  $(document).on('click', '.panel-heading span.clickable', function(e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
      $this.parents('.panel').find('.panel-body').slideUp();
      $this.addClass('panel-collapsed');
      $this.find('i').removeClass('fa fa-caret-up').addClass('fa fa-caret-down');
    } else {
      $this.parents('.panel').find('.panel-body').slideDown();
      $this.removeClass('panel-collapsed');
      $this.find('i').removeClass('fa fa-caret-down').addClass('fa fa-caret-up');
    }
  })

});
