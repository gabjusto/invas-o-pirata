class Boatizhinho{
    constructor(x,y,w,h,boatPos){
        
        this.img = loadImage("./assets/boat.png")
        this.w = w
        this.h = h
        this.boatPos = boatPos
        this.body = Bodies.rectangle(x,y,w,h)
        World.add(world,this.body)
    }
    removeBoats(i){
        setTimeout(() => {
            World.remove(world,boats[i].body)
            delete boats[i]
        }, 2000);
       
    }
    
    display(){
        var pos = this.body.position
        var angle = this.body.angle
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.img,0,this.boatPos,this.w,this.h)
        pop()
    }  

}
