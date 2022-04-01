class Cannon{
    constructor(x,y,width,height,angle){
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.angle = angle;
        this.baseImg = loadImage("/assets/cannon_base.png")
        this.cannonImg = loadImage("/assets/canon.png")
    }

    display(){
        console.log(this.angle)
        if (keyIsDown(RIGHT_ARROW)&&this.angle<60) {
            this.angle = this.angle + 1;
        }
        if (keyIsDown(LEFT_ARROW)&&this.angle>-39) {
            this.angle = this.angle -1
        }
        //cano do canhão
        push()
        translate(this.x,this.y)
        rotate(this.angle)
        imageMode(CENTER)
        image(this.cannonImg,0,0,this.w,this.h);
        pop()
        //base do canhão
        image(this.baseImg,70,20,200,200);
    }
}