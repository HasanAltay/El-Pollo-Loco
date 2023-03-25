class BackgroundObject extends MovableObject {
    width = 960;
    height = 540;
    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}
