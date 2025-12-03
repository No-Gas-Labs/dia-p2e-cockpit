
// Global variables for communication with React
window.gameXP = 0;
window.reactCallback = null;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'phaser-game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let player;
let shrine1, shrine2, shrine3;
let dialogueText;
let xp = 0;

// Create game instance but don't start immediately
const game = new Phaser.Game(config);

// Make game available globally for React component
window.game = game;

// Function to set React callback from outside
window.setReactCallback = function(callback) {
    window.reactCallback = callback;
};

function preload () {
    // Create placeholder assets using Phaser's built-in graphics
    this.load.image('tiles', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABYSURBVCiRY/j//z8DFsAEFqYAaYgYGhoaGhoaGhqKj4QwYTKGCwYQZJAwjDH/uMjAwMDAwMDAwMPwDMTQFABBVAAUJgAAgBcwq5nli6sGAAAAAElFTkSuQmCC');
    this.load.image('shrine', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABYSURBVCiRY/j//z8DFsAEFqYAaYgYGhoaGhoaGhqKj4QwYTKGCwYQZJAwjDH/uMjAwMDAwMDAwMPwDMTQFABBVAAUJgAAgBcwq5nli6sGAAAAAElFTkSuQmCC');
}

function create () {
    // Create a simple background
    this.add.rectangle(400, 250, 800, 500, 0x2a5298);
    
    // Add grid pattern for visual interest
    for (let x = 0; x < 800; x += 50) {
        this.add.line(x, 0, x, 0, x, 500, 0x1e3c72, 0.3);
    }
    for (let y = 0; y < 500; y += 50) {
        this.add.line(0, y, 800, y, 0x1e3c72, 0.3);
    }

    // Create player (simple colored square)
    player = this.physics.add.sprite(100, 100, 'player');
    player.setDisplaySize(32, 32);
    player.setTint(0x00ff00);
    player.setCollideWorldBounds(true);

    // Mouse/touch controls
    this.input.on('pointerdown', pointer => {
        this.physics.moveTo(player, pointer.x, pointer.y, 200);
    });

    // Create shrines (larger colored squares)
    shrine1 = this.physics.add.staticImage(200, 150, 'shrine');
    shrine1.setDisplaySize(48, 48);
    shrine1.setTint(0xffd700);

    shrine2 = this.physics.add.staticImage(400, 300, 'shrine');
    shrine2.setDisplaySize(48, 48);
    shrine2.setTint(0xff6b6b);

    shrine3 = this.physics.add.staticImage(600, 150, 'shrine');
    shrine3.setDisplaySize(48, 48);
    shrine3.setTint(0x00ffff);

    // Collision detection with shrines
    this.physics.add.overlap(player, [shrine1, shrine2, shrine3], handleShrine, null, this);

    // Dialogue text
    dialogueText = this.add.text(16, 16, '', {
        fontSize: '18px',
        fill: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
        borderRadius: 5
    }).setScrollFactor(0).setVisible(false);

    // Add instructions
    this.add.text(400, 480, 'Click anywhere to move • Visit shrines to earn XP', {
        fontSize: '14px',
        fill: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
}

function update () {
    if (player.body.speed > 0 && Phaser.Math.Distance.Between(player.x, player.y, player.body.touching.x, player.body.touching.y) < 4) {
        player.body.setVelocity(0);
    }
}

function handleShrine (player, shrine) {
    xp += 10;
    window.gameXP = xp;
    
    // Determine which shrine was visited
    let shrineNumber = 1;
    if (shrine === shrine2) shrineNumber = 2;
    if (shrine === shrine3) shrineNumber = 3;
    
    // Notify React component
    if (window.reactCallback) {
        window.reactCallback(shrineNumber, 10);
    }
    
    dialogueText.setText("XP +" + xp + " — Shrine blessed you!");
    dialogueText.setVisible(true);
    setTimeout(() => dialogueText.setVisible(false), 2000);
}
