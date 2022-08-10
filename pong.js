var canvasPong = document.getElementById('pong');
canvasPong.width = canvasPong.clientWidth;
canvasPong.height = canvasPong.clientHeight;
var ctxPong = canvasPong.getContext('2d');


// Variables
const fps = 60;


// Classes

class Balle {

    constructor(x, y, directionX, directionY) {

        this.couleur = '#fff';
        this.taille = 15;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.vitesseDefaut = .5;
        this.vitesse = this.vitesseDefaut;
    }

    bouger() {

        if (this.x - this.taille <= 0) {  // bord gauche

            this.directionX *= -1;

            viesGauche--;

            this.vitesse = this.vitesseDefaut;

        } else if (this.x + this.taille >= canvasPong.width) {  // bord droit

            this.directionX *= -1;

            viesDroite--;

            this.vitesse = this.vitesseDefaut;

        } else if (this.x - this.taille <= batonGauche.x + batonGauche.largeur / 2 && this.y + this.taille >= batonGauche.y && this.y - this.taille <= batonGauche.y + batonGauche.hauteur) {  // baton gauche

            this.directionX = Math.abs(this.directionX);

            if (batonGauche.up) {
                this.directionY -= .5;
            }

            if (batonGauche.down) {
                this.directionY += .5;
            }

            if (batonGauche.mode == 'rouge') {
                this.vitesse = this.vitesseDefaut + .2;
            } else {
                this.vitesse = this.vitesseDefaut;
            }

        } else if (this.x + this.taille >= batonDroite.x - batonGauche.largeur / 2 && this.y + this.taille >= batonDroite.y && this.y - this.taille <= batonDroite.y + batonDroite.hauteur) {  // baton droit

            this.directionX = Math.abs(this.directionX) * -1;

            if (batonDroite.up) {
                this.directionY -= .5;
            }

            if (batonDroite.down) {
                this.directionY += .5;
            }

            if (batonDroite.mode == 'rouge') {
                this.vitesse = this.vitesseDefaut + .2;
            } else {
                this.vitesse = this.vitesseDefaut;
            }
        }

        if (this.directionY < -.8) {
            this.directionY = -.8;
        }
        if (this.directionY > .8) {
            this.directionY = .8;
        }

        if (this.y - this.taille <= 0 || this.y + this.taille >= canvasPong.height) {
            this.directionY *= -1;
        }

        this.y += Math.sin(this.directionY) * this.vitesse * 1000 / fps;
        this.x += this.directionX * Math.sqrt(Math.pow(this.vitesse, 2) - Math.pow(Math.sin(this.directionY) * this.vitesse, 2)) * 1000 / fps;
    }

    dessiner() {
        ctxPong.beginPath();
        ctxPong.fillStyle = this.couleur;
        ctxPong.arc(this.x, this.y, this.taille, 0, 180);
        ctxPong.fill();
    }
}

class Baton {

    constructor(cote, couleur) {

        this.mode = couleur;
        this.largeur = 20;
        this.hauteur = canvasPong.height * .25;
        this.ay = 0;
        this.up = false;
        this.down = false;
        this.vitesse = .6;
        this.acceleration = .1;

        switch (cote) {
            case 'gauche':
                this.x = 50;
                this.y = 100;
                this.upKey = 'z';
                this.downKey = 's';
                break;

            case 'droite':
                this.x = canvasPong.width - 50;
                this.y = 100;
                this.upKey = 'ArrowUp';
                this.downKey = 'ArrowDown';
                break;

            default:
                clearInterval(jeu);
                break;
        }

        switch (this.mode) {
            case 'bleu':
                this.couleur = '#009';
                this.hauteur += canvasPong.height * .08;
                break;

            case 'jaune':
                this.couleur = '#ff0';
                this.vitesse += .3;
                break;

            case 'rouge':
                this.couleur = '#f00';
                break;

            default:
                this.couleur = '#fff';
                break;
        }

        document.addEventListener('keydown', (e) => {

            switch (e.key) {
                case this.upKey:
                    this.up = true;
                    break;

                case this.downKey:
                    this.down = true;
                    break;

                default:
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {

            switch (e.key) {
                case this.upKey:
                    this.up = false;
                    break;

                case this.downKey:
                    this.down = false;
                    break;

                default:
                    break;
            }
        });
    }

    bouger() {

        if (this.up) {
            this.y -= this.vitesse * 1000 / fps;
        }

        if (this.down) {
            this.y += this.vitesse * 1000 / fps;
        }

        // if (this.up) {
        //     this.ay -= this.acceleration;
        //     if (this.ay < -this.vitesse) {
        //         this.ay = -this.vitesse;
        //     }
        // }

        // if (this.down) {
        //     this.ay += this.acceleration;
        //     if (this.ay > this.vitesse) {
        //         this.ay = this.vitesse;
        //     }
        // }

        // if (!this.up && !this.down) {
        //     this.ay = Math.round((this.ay * .8) * 1000) / 1000;
        // }

        // if (this.ay < 0 && this.y > 0) {
        //     this.y += this.ay * 1000 / fps;
        // }

        // if (this.ay > 0 && this.y + this.hauteur < canvasPong.height) {
        //     this.y += this.ay * 1000 / fps;
        // }

        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y + this.hauteur > canvasPong.height) {
            this.y = canvasPong.height - this.hauteur;
        }

        // this.ay = Math.round((this.ay * .9) * 1000) / 1000;
        console.log(this.ay);
    }

    dessiner() {

        ctxPong.beginPath();
        ctxPong.fillStyle = this.couleur;
        ctxPong.fillRect(this.x - this.largeur / 2, this.y, this.largeur, this.hauteur);
        ctxPong.fill();
    }
}


var balle = new Balle(canvasPong.width / 2, canvasPong.height / 2, 1, Math.random() * 2 - 1);
var batonGauche = new Baton('gauche', 'rouge');
var batonDroite = new Baton('droite', 'bleu');
var viesGauche = 10;
var viesDroite = 10;

var jeu = setInterval(function () {

    balle.bouger();
    batonGauche.bouger();
    batonDroite.bouger();

    ctxPong.clearRect(0, 0, canvasPong.width, canvasPong.height);
    ctxPong.beginPath();
    ctxPong.fillStyle = '#000';
    ctxPong.fillRect(0, 0, canvasPong.width, canvasPong.height);
    ctxPong.fill();
    balle.dessiner();
    batonGauche.dessiner();
    batonDroite.dessiner();


    ctxPong.font = '48px serif';
    ctxPong.fillStyle = '#fff';
    ctxPong.fillText(viesGauche + ' | ' + viesDroite, canvasPong.width / 2, 60);

    if (viesGauche <= 0 || viesDroite <= 0) {
        clearInterval(jeu);
    }

}, 1000 / fps);