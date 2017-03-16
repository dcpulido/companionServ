import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './vehicle.html';
import { Person } from '../../api/person.js';
import { Travel } from '../../api/travel.js';
var onTravel=[];
var totalTrav=[];
class vehicleCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.helpers({
        persons(){
            return Person.find({});
        },
        travels(){
            return Travel.find({}); 
        }
    })
  }
    addPerson(newPerson,newCar) {
        // Insert a task into the collection
        console.log(newPerson);
        var flag=false;
        if (newPerson==""){
            flag=true;
        }
       if (newCar==""){
            flag=true;
        }
        if (newPerson==undefined){
            flag=true;
        }
        if (newPerson==undefined){
            flag=true;
        }
        if(flag==false){
            
            Person.insert({
              name: newPerson,
              car: newCar,
              createdAt: new Date
            });
        }else{
            console.log("mope");
        }

        this.newCar = '';
        this.newPerson = '';
  }
    setChecked(person) {
    // Set the checked property to the opposite of its current value
    if(!person.checked){
        onTravel.push(person);
        console.log(onTravel);
    }
    if(person.checked){
        var aux=[];
        for(i=0;i<onTravel.length;i++){
            console.log(onTravel[i]);
            if (onTravel[i]._id != person._id){
                aux.push(onTravel[i]);
            }
        }
        onTravel=aux;
        console.log(onTravel);
    }
    Person.update(person._id, {
      $set: {
        checked: !person.checked
      },
    });
  }
 
  removePerson(person) {
    Person.remove(person._id);
  }
    addTravel(){
        var history=[];
        
        let trav =Travel.find({}).fetch();
        console.log(trav);
        var aux=0;
        for(i=0;i<trav.length;i++){
            var flog=true;
            if(trav[i].passengers.length==onTravel.length){
                for(h=0;h<trav[i].passengers.length;h++){
                    var flig=false;
                    for(k=0;k<onTravel.length;k++){
                        if(onTravel[k].name==trav[i].passengers[h].name){
                            flig=true;
                        }
                    } 
                }
            }
            if(flig==false){
                flog=false;
            }
            else{
                history.push(trav[i]);
                aux++;
            }
        }
        console.log(aux);
        
        
        
        Travel.insert({
          driver: onTravel[0],
          passengers: onTravel,
          createdAt: new Date
        });
        
    }
    removeTravel(travel) {
    Travel.remove(travel._id);
  }
}
 
export default angular.module('simple-app', [
  angularMeteor
])
  .component('vehicle', {
    templateUrl: 'imports/components/vehicle/vehicle.html',
    controller: ['$scope',vehicleCtrl]
  });