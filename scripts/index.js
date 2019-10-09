// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); //materialize library model intilize modals
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items); //materialize library model intilize modals
  
  });