var bulletTime1 = 0;
var bulletTime2 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function random_shoot() {
    if (bulletTime2 + 1 < clock.getElapsedTime()) {
    bullet = new THREE.Mesh(
        new THREE.SphereGeometry(2),
        bullet_player1_material);
    scene.add(bullet);
    bullet.position.x = player2.graphic.position.x + 7.5 * Math.cos(player2.direction);
    bullet.position.y = player2.graphic.position.y + 7.5 * Math.sin(player2.direction);
    if (player1.position.y < player2.position.y) {
        bullet.angle = player2.direction - Math.random();
    }
    else {
        bullet.angle = player2.direction + Math.random();
    }
    player2.bullets.push(bullet);
    bulletTime2 = clock.getElapsedTime();
    }
    var moveDistance = 5;

    for (var i = 0; i < player2.bullets.length; i++)
    {
        player2.bullets[i].position.x += moveDistance * Math.cos(player2.bullets[i].angle);
        player2.bullets[i].position.y += moveDistance * Math.sin(player2.bullets[i].angle);
    }
}

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        } else if (Math.round(player1.bullets[i].position.x) > player2.position.x - 12
            && Math.round(player1.bullets[i].position.x) < player2.position.x + 12
            && Math.round(player1.bullets[i].position.y) > player2.position.y - 12
            && Math.round(player1.bullets[i].position.y) < player2.position.y + 12) {
            player2.dead();
        }
    }

    for (var i = 0; i < player2.bullets.length; i++)
    {
        if (Math.abs(player2.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player2.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player2.bullets[i]);
            player2.bullets.splice(i, 1);
            i--;
        } else if (Math.round(player2.bullets[i].position.x) > player1.position.x - 6
            && Math.round(player2.bullets[i].position.x) < player1.position.x + 6
            && Math.round(player2.bullets[i].position.y) > player1.position.y - 6
            && Math.round(player2.bullets[i].position.y) < player1.position.y + 6) {
            console.log("OK. Lifes:");
            console.log(player1.life);
            player1.life > 1 ? player1.life-- : player1.dead();
        }
    }
}

function player_collision()
{
    //collision between player and walls
    var x_p1 = player1.graphic.position.x + WIDTH / 2;
    var y_p1 = player1.graphic.position.y + HEIGHT / 2;

    var x_p2 = player2.graphic.position.x + WIDTH / 2;
    var y_p2 = player2.graphic.position.y + HEIGHT / 2;

    if ( x_p1 < 0 )
        player1.graphic.position.x -= x_p1;
    if ( x_p1 > WIDTH )
        player1.graphic.position.x -= x_p1 - WIDTH;
    if ( y_p1 < 0 )
        player1.graphic.position.y -= y_p1;
    if ( y_p1 > HEIGHT )
        player1.graphic.position.y -= y_p1 - HEIGHT;

    if ( x_p2 < 0 ) {
        player2.graphic.position.x -= x_p2;
        player2.speed = -player2.speed;
    }
    if ( x_p2 > WIDTH ) {
        player2.graphic.position.x -= x_p2 - WIDTH;
        player2.speed = -player2.speed;
    }
    if ( y_p2 < 0 ) {
        player2.graphic.position.y -= y_p2;
        player2.speed = -player2.speed;
    }
    if ( y_p2 > HEIGHT ) {
        player2.graphic.position.y -= y_p2 - HEIGHT;
        player2.speed = -player2.speed;
    }

}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        var tileX = (element[0]) | 0;
        var tileY = (element[1]) | 0;
        var mtileX = (element[0] + sizeOfTileX) | 0;
        var mtileY = (element[1] + sizeOfTileY) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            if (tileX != player1.last_fall.x && tileY != player1.last_fall.y) {
                player1.last_fall = new THREE.Vector2(tileX, tileY);
            player1.life > 1 ? player1.life-- : player1.dead();
            }
        }
    }

}
