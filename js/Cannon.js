class Cannon{
    constructor(x,y,width,height,angle){
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.a = angle;
        this.baseImg = loadImage("/assets/cannon_base.png")
        this.cannonImg = loadImage("/assets/canon.png")
    }

    display(){
        //cano do canhão
        push()
        imageMode(CENTER)
        image(this.cannonImg,this.x,this.y,this.w,this.h);
        pop()
        //base do canhão
        image(this.baseImg,70,20,200,200);
    }
}