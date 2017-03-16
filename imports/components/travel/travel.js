import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './travel.html';
import { Person } from '../../api/travel.js';



class travelCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.helpers({
        travels(){
            return Travel.find({});
        }
    })
  }
    addTravel() {
     console.log("new travel");
  }

}
 
export default angular.module('simple-app', [
  angularMeteor
])
  .component('travel', {
    templateUrl: 'imports/components/travel/travel.html',
    controller: ['$scope',travelCtrl]
  });