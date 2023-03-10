let app = new PIXI.Application ({width: 640, height: 360,
backgroundColor: 0x2980b9 });
document.body.appendChild(app.view);

const Player =
{
  sprite: PIXI.Sprite.from('hooded-assassin.png'),
  isjumping: false,
  isColliding: function(other){
    let colliding = false;
    if(this.sprite.x < other.sprite.x + other.sprite.width &&
      this.sprite.x + this.sprite.width > other.sprite.x &&
      this.sprite.y + this.sprite.height > other.sprite.y &&
      this.sprite.y < other.sprite.y + other.sprite.height)
      {
        colliding = true;
        return colliding;
      }
  }
}

const Floor =
{
  sprite: PIXI.Sprite.from('brick-wall.png')
}

const Physics =
{
  gravity: 3
}

let player1 = Player;
let brick_floor = Floor;
let physics = Physics;
let elapsed = 0;
player1.sprite.x = 50;
player1.sprite.y = 145;
player1.sprite.width = 50;
player1.sprite.height = 50;
brick_floor.sprite.x = 50;
brick_floor.sprite.y = 200;
brick_floor.sprite.width = 50;
brick_floor.sprite.height = 50;
app.stage.addChild(player1.sprite);
app.stage.addChild(brick_floor.sprite);
document.addEventListener("keydown", keysMove);


function keysMove(event) {
  // 65 = "A"
  if(event.keyCode == 65)
  {
    player1.sprite.x -= 1;
  }
  // 68 = "D"
  else if(event.keyCode == 68)
  {
    player1.sprite.x += 1;
  }
  // 32 = "Space"
  else if(event.keyCode == 32)
  {
    player1.isjumping = true;
  }
};

app.ticker.add((delta)=>
{
  let collision = player1.isColliding(brick_floor);
  if(player1.isjumping == true)
  {
    elapsed += delta;
    if(elapsed < 160.0)
    {
      player1.sprite.y -= 0.5;
    }
    else
    {
      player1.sprite.y += physics.gravity;
    }
    if(collision == true)
    {
      player1.isjumping = false;
    }
  }
})
