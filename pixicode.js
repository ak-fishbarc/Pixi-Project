let app = new PIXI.Application ({width: 640, height: 360,
backgroundColor: 0x2980b9 });
document.body.appendChild(app.view);

const Player =
{
  sprite: PIXI.Sprite.from('hooded-assassin.png'),
  isjumping: false
}

let player1 = Player;
let elapsed = 0;
player1.sprite.x = 50;
player1.sprite.y = 150;
app.stage.addChild(player1.sprite);

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
  if(player1.isjumping == true)
  {
    elapsed += delta;
    if(elapsed < 160.0)
    {
        player1.sprite.y -= 0.5;
    }
  }
})
