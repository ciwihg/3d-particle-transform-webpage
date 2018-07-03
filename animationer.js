function animationer(){
  this.tasks=[];
  this.tasker=function(f){
    this.end=false;
    this.fun=f.bind(this);
    return this;
  }
  this.addtask=function(obj){
    this.tasks.push(obj);
  }
  this.run=function(){

    for(var i=0;i<this.tasks.length;i++){
      this.tasks[i].fun();
     }
     this.tasks=this.tasks.filter(function(e){
       return !e.end;
     })

  }
  this.clear=function(){
      this.tasks=[];
  }
}
