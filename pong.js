var canvasPong = document.getElementById('pong');
canvasPong.width = canvasPong.clientWidth;
canvasPong.height = canvasPong.clientHeight;
var ctxPong = canvasPong.getContext('2d');


// Variables
const fps = 60;


// Classes

class Balle {

    constructor(x, y, direction) {
        this.couleur = '#000';
        this.taille = 10;
        this.x = x;
        this.y = y;
        this.direction = Math.PI * direction * 2;
        this.vitesse = 10;
    }

    bouger() {
        if (this.x <= 0 || this.x >= canvasPong.width) {
            this.direction += Math.PI;
        }
        this.x += Math.cos(this.direction) * this.vitesse;
        this.y += Math.sin(this.direction) * this.vitesse;
    }

    dessiner() {
        ctxPong.beginPath();
        ctxPong.fillStyle = this.couleur;
        ctxPong.arc(this.x, this.y, this.taille, 0, 180);
        ctxPong.fill();
    }
}

class Baton {

    constructor(x, y) {
        this.couleur = '#000';
        this.largeur = 10;
        this.hauteur = 100;
        this.x = x;
        this.y = y;
    }

    bouger() {
    }

    dessiner() {
        ctxPong.beginPath();
        ctxPong.fillStyle = this.couleur;
        ctxPong.fillRect(this.x - this.largeur / 2, this.y, this.largeur, this.hauteur);
        ctxPong.fill();
    }
}


var balle = new Balle(canvasPong.width / 2, canvasPong.height / 2, Math.random());
var batonGauche = new Baton(50, 100);
var batonDroite = new Baton(canvasPong.width - 50, 100);

var jeu = setInterval(function () {


    balle.bouger();
    batonGauche.bouger();
    batonDroite.bouger();

    ctxPong.clearRect(0, 0, canvasPong.width, canvasPong.height);
    balle.dessiner();
    batonGauche.dessiner();
    batonDroite.dessiner();

}, 1000 / fps);