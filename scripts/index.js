const guideList = document.querySelector(".guides");

// set up guides
const setupGuides = (data) => {
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    // console.log(guide)
    const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
      </li>
    `;
    html += li;
    guideList.innerHTML = html;

  });
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); //materialize library model intilize modals
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items); //materialize library model intilize modals
  
  });

  // <li>
  //           <div class="collapsible-header grey lighten-4">Guide title</div>
  //           <div class="collapsible-body white">Lorem ipsum dolor sit amet.</div>
  //         </li>