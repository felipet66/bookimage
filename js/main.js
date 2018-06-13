(function($) {
  'use strict';
  var app = (function(){
    return{
      init: function init(){
        this.companyInfo();
        this.initEvents();
      },
      initEvents: function initEvents(){
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },
      handleSubmit: function handleSubmit(e){
        e.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },
      createNewCar: function createNewCar(){
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdTitle = document.createElement('td');
        var $tdDescription = document.createElement('td');
        var $tdAcao = document.createElement('td');
        var $btnRemover = document.createElement('button');

        $btnRemover.setAttribute('class', 'btn btn-danger');
        $btnRemover.textContent = 'X';
        $btnRemover.addEventListener('click', handleRemoveElement)
        function handleRemoveElement(){
          $tr.remove();
        }
        $tdAcao.appendChild($btnRemover);
        $image.setAttribute('src', $('[data-js="image"]').get().value);
        $tdImage.appendChild($image);
        $tdTitle.textContent = $('[data-js="title').get().value;
        $tdDescription.textContent = $('[data-js="description').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdTitle);
        $tr.appendChild($tdDescription);
        $tr.appendChild($tdAcao);

        return $fragment.appendChild($tr);
      },
      companyInfo: function companyInfo(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'json/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },
      getCompanyInfo: function getCompanyInfo(){
        if(!app.isReady.call(this))
          return;
        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
        },
      isReady: function isReady(){
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();
  app.init();
})(window.DOM);