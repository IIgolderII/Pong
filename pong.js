var canvasPong = document.getElementById('pong');
canvasPong.width = canvasPong.clientWidth;
canvasPong.height = canvasPong.clientHeight;
var ctxPong = canvasPong.getContext('2d');


// Variables
const fps = 60;


// Classes

class Balle {

    constructor(x, y, directionX, directionY) {

        this.couleur = '#000';
        this.taille = 15;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.vitesse = .5;

    }

    bouger() {

        if (this.x - this.taille <= 0) {  // bord gauche

            this.directionX *= -1;

            viesGauche--;

        } else if (this.x + this.taille >= canvasPong.width) {  // bord droit

            this.directionX *= -1;

            viesDroite--;

        } else if (this.x - this.taille <= batonGauche.x + batonGauche.largeur / 2 && this.y + this.taille >= batonGauche.y && this.y - this.taille <= batonGauche.y + batonGauche.hauteur) {  // baton gauche

            this.directionX = Math.abs(this.directionX);

            if (batonGauche.up && this.directionY > -.5) {
                this.directionY -= .4;
            }
            if (batonGauche.down && this.directionY < .5) {
                this.directionY += .4;
            }

        } else if (this.x + this.taille >= batonDroite.x - batonGauche.largeur / 2 && this.y + this.taille >= batonDroite.y && this.y - this.taille <= batonDroite.y + batonDroite.hauteur) {  // baton droit

            this.directionX = Math.abs(this.directionX) * -1;

            if (batonDroite.up && this.directionY > -.5) {
                this.directionY -= .4;
            }
            if (batonDroite.down && this.directionY < .5) {
                this.directionY += .4;
            }

        }

        if (this.y - this.taille <= 0 || this.y + this.taille >= canvasPong.height) {
            this.directionY *= -1;
        }

        this.x += this.directionX * this.vitesse * 1000 / fps; // revoir vitesse selon axe
        this.y += this.directionY * this.vitesse * 1000 / fps;
    }

    dessiner() {
        ctxPong.beginPath();
        ctxPong.fillStyle = this.couleur;
        ctxPong.arc(this.x, this.y, this.taille, 0, 180);
        ctxPong.fill();
    }
}

class Baton {

    constructor(x, y, upKey, downKey) {

        this.couleur = '#000';
        this.largeur = 20;
        this.hauteur = 200;
        this.x = x;
        this.y = y;
        this.up = false;
        this.down = false;
        this.vitesse = 1;

        document.addEventListener('keydown', (e) => {

            switch (e.key) {
                case upKey:
                    this.up = true;
                    break;

                case downKey:
                    this.down = true;
                    break;

                default:
                    break;
            }

        });

        document.addEventListener('keyup', (e) => {

            switch (e.key) {
                case upKey:
                    this.up = false;
                    break;

                case downKey:
                    this.down = false;
                    break;

                default:
                    break;
            }

        });

    }

    bouger() {

        if (this.up && this.y > 0) {
            this.y -= this.vitesse * 1000 / fps;
        }

        if (this.down && this.y + this.hauteur < canvasPong.height) {
            this.y += this.vitesse * 1000 / fps;
        }

    }

    dessiner() {

        ctxPong.beginPath();
        ctxPong.fillStyle = this.couleur;
        ctxPong.fillRect(this.x - this.largeur / 2, this.y, this.largeur, this.hauteur);
        ctxPong.fill();

    }
}


var balle = new Balle(canvasPong.width / 2, canvasPong.height / 2, 1, Math.random() * 2 - 1);
var batonGauche = new Baton(50, 100, 'z', 's');
var batonDroite = new Baton(canvasPong.width - 50, 100, 'ArrowUp', 'ArrowDown');
var viesGauche = 10;
var viesDroite = 10;

var jeu = setInterval(function () {

    balle.bouger();
    batonGauche.bouger();
    batonDroite.bouger();

    ctxPong.clearRect(0, 0, canvasPong.width, canvasPong.height);
    balle.dessiner();
    batonGauche.dessiner();
    batonDroite.dessiner();


    ctxPong.font = '48px serif';
    ctxPong.fillText(viesGauche + ' | ' + viesDroite, canvasPong.width / 2, 60);

    if (viesGauche <= 0 || viesDroite <= 0) {
        clearInterval(jeu);
    }

}, 1000 / fps);