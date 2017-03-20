import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './vehicle.html';
import { Person } from '../../api/person.js';
import { Travel } from '../../api/travel.js';
var onTravel=[];
var totalTrav=[];
var drivers=[];
var driver=null;
class vehicleCtrl {
    constructor($scope) {
        this.scope=$scope;
        $scope.viewModel(this);
        $scope.myhtml="hola";
        this.helpers({
            persons(){
                return Person.find({});
            },
            travels(){
                console.log("from trav"+drivers);
                return Travel.find({},{
                    sort: {
                        createdAt: -1
                    }
                }); 
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
    dri(){
        return drivers;
    }
    removePerson(person) {
        Person.remove(person._id);
    }
    addTravel(){     
        let trav =Travel.find({}).fetch();
        console.log("Todos los viajes: "+trav);
        var history=this.getHistoryForGroup(trav);
        var count=this.getCountForDrivers(history);
        console.log("count");
        for(i=0;i<count.length;i++){
            console.log(count[i].name+" "+count[i].count);
        }
        var recomended=this.getRecomendedDrivers(count);
        console.log("recomended");
        for(i=0;i<recomended.length;i++){
            console.log(recomended[i].name+" "+recomended[i].count);
        }
        
        console.log(this.showResponse(recomended));
        
        this.scope.response = this.showResponse(recomended);
        
    }
    removeTravel(travel) {
        Travel.remove(travel._id);
    }
    getHistoryForGroup(trav){
        console.log("getHistoryForGroup");
        var aux=0;
        var history=[];
        //se recorren todos los viajes
        for(i=0;i<trav.length;i++){
            var flog=true;
            //se comprueba longitud si no hay el mismo numero de pasajeros es q ya no es igual
            if(trav[i].passengers.length==onTravel.length){
                //se recorren los pasajeros
                for(h=0;h<trav[i].passengers.length;h++){
                    var flig=false;
                    //se recorren pasajeros de viaje actual
                    for(k=0;k<onTravel.length;k++){
                        //se comprueba q sean los mismos
                        if(onTravel[k].name==trav[i].passengers[h].name){
                            flig=true;
                        }
                    }
                }
            }else{
                flog=false;
            }
            if(flig==false){
                flog=false;
            }
            if(flog==true){
                history.push(trav[i]);
                aux++;
            }
        }
        console.log(history);
        console.log("getHistoryForGroup/////");
        return history;
        
    }
    getCountForDrivers(hist){
        console.log("getCountForDrivers");
        var count=[];
        //damos formato a count para posteriormente llevar la cuenta de cada uno
        if(hist.length>0){
            for(i=0;i<hist[0].passengers.length;i++){
                count.push({name:hist[0].passengers[i].name,count:0});
            }
            //recorremos el historial de viajes para este grupo
            for(i=0;i<hist.length;i++){
                for(k=0;k<count.length;k++){
                    if(hist[i].driver.name==count[k].name){
                        count[k].count=count[k].count+1;
                    }
                }
            }   
        }
        console.log("getCountForDrivers/////");
        return count;
    }
    getRecomendedDrivers(count){
        console.log("getRecomendedDrivers");
        var aux=999999;
        var toret=[];
        if(count.length>0){
            for(i=0;i<count.length;i++){
                if(count[i].count<aux){
                    aux=count[i].count;
                }
            }
            for(i=0;i<count.length;i++){
                if(count[i].count==aux){
                    toret.push(count[i]);
                }
            }
        }
        console.log("getRecomendedDrivers/////");
        return toret;
    }
    showResponse(dd){
        console.log("showResponse");
        var str="";
        str+="<ul>";
        str+="<li>";
        
        for(i=0;i<dd.length;i++){
            //str+="<button class='btn btn-evento' ng-click=''>Guardar!</button>";
            str+="<span class='text'>";
            str+=    dd[i].name +"  "+ dd[i].count;
            str+="</span>";
            str += "<br>";
        }
        
        str+="</li>";
        str+="</ul>";
      
        console.log("showResponse////7");
        return str;
        
    }
    setAsDriver(person){
        alert(person.name+" set as driver");
        var str="";
        str+="<ul>";
        str+="<li>";
        str+="<span class='text'>";
        str+=    person.name +" set as driver";
        str+="</span>";
        str += "<br>";
        str+="</li>";
        str+="</ul>";
        driver=person;
        this.scope.driv = str;
        
    }
    saveTravel(){
        console.log("save");
        if(driver!=null){
            Travel.insert({
              driver: driver,
              passengers: onTravel,
              createdAt: new Date
            });
            driver=null;
        }
        else{
            alert("driver set as null");
        }
        console.log("save////");
    }
}
 
export default angular.module('simple-app', [
  angularMeteor,'ngSanitize'
])
  .component('vehicle', {
    templateUrl: 'imports/components/vehicle/vehicle.html',
    controller: ['$scope',vehicleCtrl]
  });