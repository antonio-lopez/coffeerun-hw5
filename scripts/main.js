(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"';
    //var SERVER_URL = 'https://co.audstanley.com/coffeeorders';
    //var SERVER_URL = 'http://localhost:3000/coffeeorders';

    //local firebase
    var SERVER_URL = 'http://localhost:5001/fir-coffeerun-fb27b/us-central1/app';

    //remote firebase
    //var SERVER_URL = 'https://us-central1-fir-coffeerun-fb27b.cloudfunctions.net/app';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', remoteDS);
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        console.log(formHandler);
        return myTruck.createOrder.call(myTruck, data)
            .then(function () {
                checkList.addRow.call(checkList, data);
            });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);