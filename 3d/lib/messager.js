function messager(){
    this.items=document.getElementById('message').childNodes;
    this.tips=[];
    this.current=null;
    this.init=function(){
      for(var i=0;i<this.items.length;i++){
        if(this.items[i].nodeName=="A"){
          this.tips.push(this.items[i]);
        }
      }

    };
    this.clear=function(){
      (this.current!==null)&&(this.tips[this.current].style.display="none");
      this.tips[0].className="";
    };
    this.to=function (index) {
      this.tips[index].style.display="block";
      this.tips[index].clientWidth;
      this.tips[index].className="show";
      this.current=index;
    };
}
