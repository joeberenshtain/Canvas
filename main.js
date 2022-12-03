

const pixilSize = 20;
const width = 100;
const height = 100;
var color = -1;
const colors = ['orange', 'black', 'yellow'];

var pixilMap = new Uint8Array(width*height)
for (let i = 0; i < pixilMap.length; i++) {
    pixilMap[i] = Math.round(0)
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight
canvas.width = window.innerWidth
const pixilWidth = Math.floor(canvas.width/pixilSize)+1
const pixilHeight = Math.floor(canvas.height/pixilSize)+1

// create circles to draw   
canvas.addEventListener('click', (e)=> {
  
    let pixilsLeft = Math.floor((app.left+e.clientX)/pixilSize);
    let pixilsTop = Math.floor((app.top+e.clientY)/pixilSize);


    pixilMap[(pixilsTop)*width + pixilsLeft] = color;
    console.log(pixilMap[(pixilsTop)*width + pixilsLeft] )
    app.draw();
})

var app = {};

app.WIDTH  = pixilSize*width
app.HEIGHT = pixilSize*height

app.top  = 0
app.left = 0
app.draw = function() {
    canvas.width = canvas.width;
    var pixilsLeft = Math.floor(app.left/pixilSize);
    var pixilsTop = Math.floor(app.top/pixilSize);

    for (let y = -1; y <= pixilHeight; y++) {
        for (let x = -1; x <= pixilWidth; x++) {
            switch (pixilMap[(y+pixilsTop)*width+x+pixilsLeft]) {
                case 0: ctx.fillStyle = 'white'; break;
                case 1: ctx.fillStyle = 'red'; break;
                case 2: ctx.fillStyle = 'orange'; break;
                case 3: ctx.fillStyle = 'yellow'; break;
                case 4: ctx.fillStyle = 'lightgreen'; break;
                case 5: ctx.fillStyle = 'cyan'; break;
                case 6: ctx.fillStyle = 'blue'; break;
                case 7: ctx.fillStyle = 'blueviolet'; break;

                default: ctx.fillStyle = 'black'; break;
            }
            let xReal = (x+pixilsLeft)*pixilSize-app.left;
            let yReal = (y+pixilsTop)*pixilSize- app.top 
            ctx.fillRect(xReal,yReal,pixilSize+1, pixilSize+1)
        }
    }

    
}
app.scrollBy = function(deltaX, deltaY) {
    if (deltaX) {
        deltaX = -deltaX;
        var newLeft = this.left + deltaX;
        // make sure we're in the bounds
        this.left = newLeft > app.WIDTH - canvas.width ? app.WIDTH - canvas.width : newLeft < 0 ? 0 : newLeft;
        
    }
    if (deltaY) {
        deltaY = -deltaY
        var newTop = this.top + deltaY;
        if (newTop > app.HEIGHT - canvas.height) {
            newTop = app.HEIGHT - canvas.height;
        }
        else if (newTop < 0) {
            newTop = 0;
        }
        this.top = newTop
        
  }
    app.draw()
}
var toScrollCoords = function(pos, scrollBar) {
    var sbBase = scrollBar.vertical ? scrollBar.top : scrollBar.left;
    var sbMax = scrollBar.vertical ? scrollBar.height : scrollBar.width;
    var areaMax = scrollBar.vertical ? app.HEIGHT - canvas.height : app.WIDTH - canvas.width;

    var ratio = pos / areaMax;

    return ((sbMax - sbBase) * ratio) + sbBase;
}
var mouseWheel = function(e) {
    e.preventDefault();

    let delX = -e.deltaX;
    let delY = -e.deltaY
    if (delX>10) delX = 10;
    else if (delX<-10) delX = -10;

    if (delY>10) delY = 10;
    else if (delY<-10) delY = -10;

    app.scrollBy(delX, delY);
};
canvas.addEventListener('wheel', mouseWheel)
app.draw()