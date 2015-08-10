'use strict';
var myApp = angular.module('app', [])

/*Defining the controller*/
myApp.controller('ContactController' , function ($scope, ContactService) {
   $scope.contacts= ContactService.list();

   $scope.saveContact= function(){
   	ContactService.save($scope.newcontact);
   	$scope.newcontact={};
   };

   $scope.delete = function(id){
   	ContactService.delete(id);
   	if($scope.newcontact.id == id ) 
   		$scope.newcontact={};
   };

   $scope.edit = function(id){
   	$scope.newcontact = angular.copy(ContactService.get(id));
   };

   $scope.submitForm = function(isValid){
    $scope.submitted = true;
    if(isValid){
      alert("Member added!!");
    }
   };


});


// Service defination for the logic 
myApp.service('ContactService', function  () {
	// to create unique id 
	var Sid = 1;
	//creating an array for taking the list of contacts 
	var contacts= [{
		 id : 0,
		'name': 'Alex',
		'email' : 'alex123@gmail.com',
		'phone' : '+44-22455679'
	},
	{
		 id : 1,
		'name': 'Alexander',
		'email' : 'axand456@gmail.com',
		'phone' : '+44-23463489'
	}


	];
   //function for saving the new object or updating the existing one
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = Sid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }
 
    }
   
   // Seraching the contact list 
    this.get = function (id) {
    	  var i = 0;
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }
 
    }

  //deleting the contact 
    this.delete = function (id) {
    	var i = 0;
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }
// returing the contact list 
this.list = function(){
	return contacts;
}
});
