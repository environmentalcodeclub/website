angular.module('ecc')
  .controller('mainController', MainController);

MainController.$inject = ['$http'];
function MainController($http) {
  var self = this;

  self.members = [];
  self.events = [];

  $http.get('/members').then(function(res) {
    self.members = res.data;
  });

  $http.get('/events').then(function(res) {
    self.events = res.data;
  });
}