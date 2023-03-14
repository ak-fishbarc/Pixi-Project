let app = new PIXI.Application ({width: 640, height: 360,
backgroundColor: 0x2980b9 });
document.body.appendChild(app.view);

// Create level. Values are temporary.
const Level =
{
  sizex: 500,
  sizey: 500,
  numofsectors: 0,
  // Create function that will divide map into sectors.
  // Each sector will contain certain amount of objects, like floors, for
  // collision detection, etc. This is to lower the amount of search required.
  divideSectors: function(objects_list){
    sectorSize = this.numofsectors * 250;
    let sector = newMap();
  }
}

const Player =
{
  sprite: PIXI.Sprite.from('hooded-assassin.png'),
  isjumping: false,
  isstanding: false,
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
    else
    {
      return colliding;
    }
  },
  isStanding: function(other)
  {
    if(this.sprite.y + this.sprite.height + 3 > other.sprite.y &&
      this.sprite.x + this.sprite.width - 3 >= other.sprite.x  &&
      this.sprite.x <= other.sprite.x + other.sprite.width - 3)
    {
      this.isstanding = true;
      return this.isstanding;
    }
    else
    {
      this.isstanding = false;
      return this.isstanding;
    }
  }
}

function createFloor()
{
  const floor =
  {
    sprite: PIXI.Sprite.from('brick-wall.png'),
  }
  new_floor = floor;
  new_floor.sprite.width = 50;
  new_floor.sprite.height = 50;
  return new_floor;
};

const Physics =
{
  gravity: 3
}

let player1 = Player;
let brick_floor = createFloor();
let brick_floor2 = createFloor();
let physics = Physics;
let elapsed = 0;

let floors = [brick_floor, brick_floor2];

player1.sprite.x = 50;
player1.sprite.y = 145;
player1.sprite.width = 50;
player1.sprite.height = 50;

brick_floor.sprite.x = 50;
brick_floor.sprite.y = 200;
brick_floor2.sprite.x = 150;
brick_floor2.sprite.y = 150;

app.stage.addChild(player1.sprite);
app.stage.addChild(brick_floor.sprite);
app.stage.addChild(brick_floor2.sprite);

document.addEventListener("keydown", keysMove);

function keysMove(event) {
  // 65 = "A"
  if(event.keyCode == 65)
  {
    player1.sprite.x -= 3;
  }
  // 68 = "D"
  else if(event.keyCode == 68)
  {
    player1.sprite.x += 3;
  }
  // 32 = "Space"
  else if(event.keyCode == 32)
  {
    if(player1.isstanding == true)
    {
      player1.isjumping = true;
    }
  }
};

app.ticker.add((delta)=>
{
  for(let x in floors)
  {
    player1.isStanding(floors[x]);
    if(player1.isstanding == true)
    {
      break;
    }
  }
  if(player1.isjumping == true)
  {
    elapsed += delta;
    if(elapsed < 160.0)
    {
      player1.sprite.y -= 0.5;
    }
    else
    {
      player1.isjumping = false;
      elapsed = 0;
    }
  }
  if(player1.isjumping == false)
  {
      if(player1.isstanding == false)
      {
        player1.sprite.y += physics.gravity;
      }
  }
})
