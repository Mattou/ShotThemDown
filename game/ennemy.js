var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 1;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 1;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
    });

    bumperMesh = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 10, 12, 12, false), this.materialBumper);
    bumperMesh.rotation.x = Math.PI / 2 ;

    //sphere = new THREE.SphereGeometry(6, 8, 8);
    sphere = new THREE.SphereGeometry(12, 16, 16);
    THREE.GeometryUtils.merge(sphere, bumperMesh);

    canon = new THREE.CubeGeometry(6, 6, 30);
    THREE.GeometryUtils.merge(canon, sphere);

    this.graphic = new THREE.Mesh(sphere, this.material);
    this.graphic.position.x = 50;
    this.graphic.position.y = 50;
    this.graphic.position.z = 6;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction);
};

Ennemy.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Ennemy.prototype.dead = function () {
    this.graphic.position.z = this.graphic.position.z-0.1;
    this.life = 0;
    this.graphic.visible = false;
    //Nettoyage de la div container
    jQuery('#'+this.name+' >.life').text("Tu es mort !");
}

Ennemy.prototype.decelerate = function (distance) {
    var min = -1;

    this.speed -= distance / 16;
    if (this.speed <= min) {
        this.speed = min;
    }
};

Ennemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Ennemy.prototype.turnRight = function (angle) {
    this.direction -= angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
};

Ennemy.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
};

Ennemy.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.graphic.position.x,
        this.speed * Math.sin(this.direction) + this.graphic.position.y,
        this.graphic.position.z
    );
    this.graphic.position = moveTo;
    this.position = moveTo;

    // light1.position.z = this.graphic.position.z + 500;
};
