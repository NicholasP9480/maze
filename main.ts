enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Guide = SpriteKind.create()
    export const tile = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
    //% blockIdentity=images._tile
    export const tile1 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
}
scene.onOverlapTile(SpriteKind.Player, sprites.castle.rock2, function (sprite, location) {
    if (pickaxe == 1) {
        tiles.setTilemap(tiles.createTilemap(
            hex`1000100003020302020202020202030303030307030303030303030303030302030202030203020202020202030303020302030202030202020202020302030203020302020303030303030203020202020203020302030203030203030203030303030203020303020302020202020202030203030302020203030303030303020302020303030303030202020203020203020203020202020202020203030303030203030303030303030302020302020202030302020202030203020203020303030303020502020302030302020203020203030203030303020203030302020202030302020202030303020203030303020304020202020202020202020302030303`,
            img`
. 2 . 2 2 2 2 2 2 2 . . . . . . 
. . . . . . . . . . . 2 . 2 2 . 
2 . 2 2 2 2 2 2 . . . 2 . 2 . 2 
2 . 2 2 2 2 2 2 . 2 . 2 . 2 . 2 
2 . . . . . . 2 . 2 2 2 2 2 . 2 
. 2 . 2 . . 2 . . 2 . . . . . 2 
. 2 . . 2 . 2 2 2 2 2 2 2 . 2 . 
. . 2 2 2 . . . . . . . 2 . 2 2 
. . . . . . 2 2 2 2 . 2 2 . 2 2 
. 2 2 2 2 2 2 2 2 . . . . . 2 . 
. . . . . . . . 2 2 . 2 2 2 2 . 
. 2 2 2 2 . 2 . 2 2 . 2 . . . . 
. 2 . 2 2 . 2 . . 2 2 2 . 2 2 . 
. 2 . . . . 2 2 . . . 2 2 2 2 . 
. 2 2 2 2 . . . 2 2 . . . . 2 . 
. 2 2 2 2 2 2 2 2 2 2 . 2 . . . 
`,
            [myTiles.tile0,myTiles.tile1,sprites.builtin.brick,sprites.dungeon.darkGroundCenter,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.collectibleRedCrystal,sprites.dungeon.collectibleInsignia,sprites.dungeon.chestOpen,sprites.castle.rock2],
            TileScale.Sixteen
        ))
        effects.confetti.startScreenEffect()
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonTeal, function (sprite, location) {
    if (WhisperingStatuePos == 1) {
        game.showLongText("Your travels amuse  me little one I wish to bestow you a gift.", DialogLayout.Bottom)
        game.showLongText("Choose between an extra life to make you strong or take the sword made from an ancient forge said to hold much power.", DialogLayout.Bottom)
        UserInput = game.askForString("Do you want a second life?", 3)
        if (UserInput == "yes") {
            info.changeLifeBy(1)
        } else if (UserInput == "no") {
            UserInput = game.askForString("Do you want the sword", 3)
            if (UserInput == "no") {
                UserInput = game.askForString("Do you want a second life?", 3)
            } else if (UserInput == "yes") {
                Sword = 1
            }
        }
    }
    WhisperingStatuePos = 3
    whispering_statue.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Sword == 1) {
        snake1.destroy(effects.confetti, 500)
        game.showLongText("You have slain the snake with your sword!", DialogLayout.Bottom)
    } else if (info.life() == 1) {
        snake1.destroy(effects.confetti, 500)
        game.showLongText("The sneak was so weak that when it bit you it died but it managed to take a life!", DialogLayout.Bottom)
    } else {
        info.changeLifeBy(-1)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    game.over(true)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    pickaxe = 1
    tiles.setTilemap(tiles.createTilemap(
            hex`10001000030203020202020202020303030303070303030303030303030303020302020302030202020202020303030203020302020302020202020203020302030203020203030303030302030202020202030203020302030302030302030303030b020302030302030202020202020203020303030202020303030303030302030202030303030303020202020302020302020302020202020202020303030303020303030303030303030202030202020203030202020203020302020302030303030302050202030203030202020a020203030203030809020203030302020202030302020202030303020203030303020304020202020202020202020302030303`,
            img`
. 2 . 2 2 2 2 2 2 2 . . . . . . 
. . . . . . . . . . . 2 . 2 2 . 
2 . 2 2 2 2 2 2 . . . 2 . 2 . 2 
2 . 2 2 2 2 2 2 . 2 . 2 . 2 . 2 
2 . . . . . . 2 . 2 2 2 2 2 . 2 
. 2 . 2 . . 2 . . 2 . . . . . 2 
. 2 . . 2 . 2 2 2 2 2 2 2 . 2 . 
. . 2 2 2 . . . . . . . 2 . 2 2 
. . . . . . 2 2 2 2 . 2 2 . 2 2 
. 2 2 2 2 2 2 2 2 . . . . . 2 . 
. . . . . . . . 2 2 . 2 2 2 2 . 
. 2 2 2 2 . 2 . 2 2 . 2 . . . . 
. 2 . 2 2 . 2 . . 2 2 2 . 2 2 . 
. 2 . . . . 2 2 . . . 2 2 2 2 . 
. 2 2 2 2 . . . 2 2 . . . . 2 . 
. 2 2 2 2 2 2 2 2 2 2 . 2 . . . 
`,
            [myTiles.tile0,myTiles.tile1,sprites.builtin.brick,sprites.dungeon.darkGroundCenter,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.collectibleRedCrystal,sprites.dungeon.collectibleInsignia,sprites.dungeon.chestOpen,sprites.castle.rock2,sprites.dungeon.darkGroundWest,sprites.dungeon.buttonOrange,sprites.dungeon.buttonTeal],
            TileScale.Sixteen
        ))
    adventurer.say("I got a pickax! I wonder where I could use this.", 5000)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonOrange, function (sprite, location) {
    if (WhisperingStatuePos == 0) {
        game.showLongText("Little one why have you come here? What are you looking for little one?", DialogLayout.Top)
    }
    WhisperingStatuePos = 1
    tiles.placeOnTile(whispering_statue, tiles.getTileLocation(14, 5))
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.darkGroundWest, function (sprite, location) {
    if (pickaxe == 0) {
        adventurer.say("If only I had a tool to remove the stones.", 5000)
    }
})
info.onLifeZero(function () {
    game.showLongText("You were slain by a snake   *Hint* Try killing the snake first.", DialogLayout.Center)
    game.over(false)
})
let UserInput = ""
let Sword = 0
let whispering_statue: Sprite = null
let adventurer: Sprite = null
let snake1: Sprite = null
let WhisperingStatuePos = 0
let pickaxe = 0
tiles.setTilemap(tiles.createTilemap(
            hex`100010000302030202020202020203030303030a0303030303030303030303020302020302030202020202020303030203020302020302020202020203020302030203020203030303030302030202020202030203020302030302030302030303030d020302030302030202020202020203020303030202020303030303030302030202030303030303020202020302020302020302020202020202020303030303020303030303030303030202030202020203030202020203020302020302030303030302050202030203030202020c020203030203030809020203030302020202030302020202030303020203030303020304020202020202020202020302030303`,
            img`
. 2 . 2 2 2 2 2 2 2 . . . . . . 
. . . . . . . . . . . 2 . 2 2 . 
2 . 2 2 2 2 2 2 . . . 2 . 2 . 2 
2 . 2 2 2 2 2 2 . 2 . 2 . 2 . 2 
2 . . . . . . 2 . 2 2 2 2 2 . 2 
. 2 . 2 . . 2 . . 2 . . . . . 2 
. 2 . . 2 . 2 2 2 2 2 2 2 . 2 . 
. . 2 2 2 . . . . . . . 2 . 2 2 
. . . . . . 2 2 2 2 . 2 2 . 2 2 
. 2 2 2 2 2 2 2 2 . . . . . 2 . 
. . . . . . . . 2 2 . 2 2 2 2 . 
. 2 2 2 2 . 2 . 2 2 . 2 . . . . 
. 2 . 2 2 . 2 . . 2 2 2 . 2 2 . 
. 2 . 2 . . 2 2 . . . 2 2 2 2 . 
. 2 2 2 2 . . . 2 2 . . . . 2 . 
. 2 2 2 2 2 2 2 2 2 2 . 2 . . . 
`,
            [myTiles.tile0,myTiles.tile1,sprites.builtin.brick,sprites.dungeon.darkGroundCenter,sprites.dungeon.collectibleBlueCrystal,sprites.dungeon.collectibleRedCrystal,sprites.dungeon.collectibleInsignia,sprites.dungeon.chestOpen,sprites.castle.rock2,sprites.dungeon.darkGroundWest,sprites.dungeon.chestClosed,sprites.castle.tilePath3,sprites.dungeon.buttonOrange,sprites.dungeon.buttonTeal],
            TileScale.Sixteen
        ))
info.setLife(1)
let speech = 0
pickaxe = 0
WhisperingStatuePos = 0
snake1 = sprites.create(img`
. . . . c c c c c c . . . . . . 
. . . c 6 7 7 7 7 6 c . . . . . 
. . c 7 7 7 7 7 7 7 7 c . . . . 
. c 6 7 7 7 7 7 7 7 7 6 c . . . 
. c 7 c 6 6 6 6 c 7 7 7 c . . . 
. f 7 6 f 6 6 f 6 7 7 7 f . . . 
. f 7 7 7 7 7 7 7 7 7 7 f . . . 
. . f 7 7 7 7 6 c 7 7 6 f c . . 
. . . f c c c c 7 7 6 f 7 7 c . 
. . c 7 2 7 7 7 6 c f 7 7 7 7 c 
. c 7 7 2 7 7 c f c 6 7 7 6 c c 
c 1 1 1 1 7 6 f c c 6 6 6 c . . 
f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
. f 6 1 1 1 1 1 1 6 6 6 f . . . 
. . c c c c c c c c c f . . . . 
`, SpriteKind.Enemy)
adventurer = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . d d d d d d . . . . . 
. . . . d d d d d d d d . . . . 
. . . . d d e d d e d d . . . . 
. . . . d d d d d d d d . . . . 
. . . . . d d 2 2 d d . . . . . 
. . . . . . d d d d . . . . . . 
. . . . . . . d d . . . . . . . 
. . . . . 6 6 6 6 6 6 . . . . . 
. . . . . 6 6 6 6 6 6 . . . . . 
. . . . . d d 6 6 d d . . . . . 
. . . . . d d 6 6 d d . . . . . 
. . . . . d d 6 6 d d . . . . . 
. . . . . . . 8 8 . . . . . . . 
. . . . . . . 8 8 . . . . . . . 
. . . . . . . 8 8 . . . . . . . 
`, SpriteKind.Player)
whispering_statue = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . 1 1 1 . . . . . . 
. . . . . . 1 3 3 3 . . . . . . 
. . . . . . 1 3 1 1 . . . . . . 
. . . . . . 3 1 1 1 . . . . . . 
. . . . . . 3 b 1 3 1 . . . . . 
. . . . . . b 3 b 3 1 1 . . . . 
. . . . . . 3 1 3 1 3 1 . . . . 
. . . . . b 3 1 3 1 b 1 . . . . 
. . . . . b 3 3 3 1 1 3 . . . . 
. . . . . b c 3 1 3 1 1 . . . . 
. . . . 3 b c 3 1 1 3 1 . . . . 
. . . . 3 b c 1 1 1 1 . . . . . 
. . . . 3 c 3 1 1 1 1 . . . . . 
. . . 3 3 c 1 1 3 1 1 3 . . . . 
. . . 1 b 3 1 1 1 1 1 1 . . . . 
. . . . . 3 1 1 1 1 1 1 . . . . 
. . . . . 3 1 1 3 1 1 1 . . . . 
. . . . . 3 1 1 3 1 1 1 3 . . . 
. b b b b 3 1 1 3 1 1 1 1 b b . 
b 1 1 1 3 3 1 3 3 1 1 1 1 3 1 b 
3 1 1 3 1 3 1 3 3 1 1 3 1 3 1 3 
3 1 1 3 1 1 1 3 3 1 1 3 3 3 1 3 
3 1 1 1 3 1 1 3 3 1 1 3 3 1 1 3 
3 1 1 1 1 3 3 3 3 3 3 3 3 1 1 3 
3 1 1 1 1 1 3 3 3 3 3 1 1 1 1 3 
b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 
3 b b 1 1 1 1 1 1 1 1 1 1 b b 3 
1 3 3 3 3 3 3 3 3 3 3 3 3 3 3 1 
1 3 3 3 3 b b b b b b 3 3 3 3 1 
b 3 3 3 3 3 3 3 3 3 3 3 3 3 3 b 
c b b b b b b b b b b b b b b c 
`, SpriteKind.Guide)
controller.moveSprite(adventurer, 100, 100)
tiles.placeOnRandomTile(adventurer, sprites.dungeon.collectibleBlueCrystal)
tiles.placeOnTile(whispering_statue, tiles.getTileLocation(12, 12))
scene.cameraFollowSprite(adventurer)
snake1.setPosition(168, 7)
animation.runImageAnimation(
snake1,
[img`
. . . . c c c c c c . . . . . . 
. . . c 6 7 7 7 7 6 c . . . . . 
. . c 7 7 7 7 7 7 7 7 c . . . . 
. c 6 7 7 7 7 7 7 7 7 6 c . . . 
. c 7 c 6 6 6 6 c 7 7 7 c . . . 
. f 7 6 f 6 6 f 6 7 7 7 f . . . 
. f 7 7 7 7 7 7 7 7 7 7 f . . . 
. . f 7 7 7 7 6 c 7 7 6 f c . . 
. . . f c c c c 7 7 6 f 7 7 c . 
. . c 7 2 7 7 7 6 c f 7 7 7 7 c 
. c 7 7 2 7 7 c f c 6 7 7 6 c c 
c 1 1 1 1 7 6 f c c 6 6 6 c . . 
f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
. f 6 1 1 1 1 1 1 6 6 6 f . . . 
. . c c c c c c c c c f . . . . 
`,img`
. . . c c c c c c . . . . . . . 
. . c 6 7 7 7 7 6 c . . . . . . 
. c 7 7 7 7 7 7 7 7 c . . . . . 
c 6 7 7 7 7 7 7 7 7 6 c . . . . 
c 7 c 6 6 6 6 c 7 7 7 c . . . . 
f 7 6 f 6 6 f 6 7 7 7 f . . . . 
f 7 7 7 7 7 7 7 7 7 7 f . . . . 
. f 7 7 7 7 6 c 7 7 6 f . . . . 
. . f c c c c 7 7 6 f c c c . . 
. . c 6 2 7 7 7 f c c 7 7 7 c . 
. c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
. c 1 1 1 1 7 6 6 c 6 6 6 c c c 
. c 1 1 1 1 1 6 6 6 6 6 6 c . . 
. c 6 1 1 1 1 1 6 6 6 6 6 c . . 
. . c 6 1 1 1 1 1 7 6 6 c c . . 
. . . c c c c c c c c c c . . . 
`,img`
. . . . c c c c c c . . . . . . 
. . . c 6 7 7 7 7 6 c . . . . . 
. . c 7 7 7 7 7 7 7 7 c . . . . 
. c 6 7 7 7 7 7 7 7 7 6 c . . . 
. c 7 c 6 6 6 6 c 7 7 7 c . . . 
. f 7 6 f 6 6 f 6 7 7 7 f . . . 
. f 7 7 7 7 7 7 7 7 7 7 f . . . 
. . f 7 7 7 7 6 c 7 7 6 f c . . 
. . . f c c c c 7 7 6 f 7 7 c . 
. . c 7 2 7 7 7 6 c f 7 7 7 7 c 
. c 7 7 2 7 7 c f c 6 7 7 6 c c 
c 1 1 1 1 7 6 f c c 6 6 6 c . . 
f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
. f 6 1 1 1 1 1 1 6 6 6 f . . . 
. . c c c c c c c c c f . . . . 
`,img`
. . . c c c c c c . . . . . . . 
. . c 6 7 7 7 7 6 c . . . . . . 
. c 7 7 7 7 7 7 7 7 c . . . . . 
c 6 7 7 7 7 7 7 7 7 6 c . . . . 
c 7 c 6 6 6 6 c 7 7 7 c . . . . 
f 7 6 f 6 6 f 6 7 7 7 f . . . . 
f 7 7 7 7 7 7 7 7 7 7 f . . . . 
. f 7 7 7 7 6 c 7 7 6 f . . . . 
. . f c c c c 7 7 6 f c c c . . 
. . c 6 2 7 7 7 f c c 7 7 7 c . 
. c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
. c 1 1 1 1 7 6 6 c 6 6 6 c c c 
. c 1 1 1 1 1 6 6 6 6 6 6 c . . 
. c 6 1 1 1 1 1 6 6 6 6 6 c . . 
. . c 6 1 1 1 1 1 7 6 6 c c . . 
. . . c c c c c c c c c c . . . 
`,img`
. . . . . c c c c c c c . . . . 
. . . . c 6 7 7 7 7 7 6 c . . . 
. . . c 7 c 6 6 6 6 c 7 6 c . . 
. . c 6 7 6 f 6 6 f 6 7 7 c . . 
. . c 7 7 7 7 7 7 7 7 7 7 c . . 
. . f 7 8 1 f f 1 6 7 7 7 f . . 
. . f 6 f 1 f f 1 f 7 7 7 f . . 
. . . f f 2 2 2 2 f 7 7 6 f . . 
. . c c f 2 2 2 2 7 7 6 f c . . 
. c 7 7 7 7 7 7 7 7 c c 7 7 c . 
c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
. f 6 1 1 1 1 1 6 6 6 6 c . . . 
. . f f c c c c c c c c . . . . 
`,img`
. . . . . . c c c c c c c . . . 
. . . . . c f f 6 6 f f 7 c . . 
. . . . c 7 6 6 6 6 6 6 7 6 c . 
. . . c 7 7 7 7 7 7 7 7 7 7 c . 
. . . c 7 8 1 f f 1 6 7 7 7 c . 
. . . f 6 f 1 f f 1 f 7 7 7 f . 
. . . f 6 f 2 2 2 2 f 7 7 7 f . 
. . c c 6 f 2 2 2 2 f 7 7 6 f . 
. c 7 7 7 7 2 2 2 2 7 7 f c . . 
c 7 1 1 1 7 7 7 7 7 c c 7 7 c . 
f 1 1 1 1 1 7 7 7 f c 6 7 7 7 c 
f 1 1 1 1 1 1 6 f c c 6 6 6 c c 
f 6 1 1 1 1 1 6 6 c 6 6 6 c . . 
f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
. f 6 1 1 1 1 6 6 6 6 6 c . . . 
. . f f c c c c c c c c . . . . 
`,img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . c c c c c 
. . . . . . . . . c c 7 7 7 6 c 
. . . . . . . . c c 7 7 7 c c . 
. . . . . . . . c 6 7 7 c . . . 
. . . . . . . . c 6 6 6 c . . . 
. . . c c c c c c 6 6 6 c c . . 
. . c 6 7 7 7 7 6 c c 6 6 6 c . 
. c 7 7 7 7 7 7 7 7 c 6 6 6 c c 
c 6 7 7 7 7 7 7 7 7 6 c 6 6 6 c 
c 7 c 6 6 6 6 c 7 7 7 c 6 6 6 c 
f 7 c c 6 6 c c 7 7 7 f 6 6 6 c 
f 7 6 f 6 6 f 6 7 7 7 f 6 6 6 c 
. c 1 c f f 1 c 7 6 f 6 6 c c . 
. c c c c c c c c c c c c . . . 
`,img`
. . . . . . . . . . . c c c c c 
. . . . . . . . . c c 7 7 7 6 c 
. . . . . . . . c c 7 7 7 c c . 
. . . . . . . . c 6 7 7 c . . . 
. . . . . . . . c 6 6 6 c . . . 
. . . . . . . . c 6 6 6 c c . . 
. . . c c c c c c c 6 6 6 c c . 
. . c 6 7 7 7 7 6 c c 6 6 6 c . 
. c 7 7 7 7 7 7 7 7 c 6 6 6 c c 
c 6 7 7 7 7 7 7 7 7 6 c 6 6 6 c 
c 7 c 6 6 6 6 c 7 7 7 c 6 6 6 c 
f 7 c c 6 6 c c 7 7 7 f 6 6 6 c 
f 7 6 f 6 6 f 6 7 7 7 f 6 6 6 c 
. f 7 7 7 7 7 7 7 7 6 f 6 6 c . 
. c 1 c f f 1 c 7 6 f 6 6 c c . 
. c c c c c c c c c c c c . . . 
`,img`
. . . . . . . . . . . c c c c c 
. . . . . . . . . c c 7 7 7 6 c 
. . . . . . . . c c 7 7 7 c c . 
. . . . . . . . c 6 7 7 c . . . 
. . . . . . . . c 6 6 6 c . . . 
. . . . . . . . c 6 6 6 c c . . 
. . . c c c c c c c 6 6 6 c c . 
. . c 6 7 7 7 7 6 c c 6 6 6 c . 
. c 7 7 7 7 7 7 7 7 c 6 6 6 c c 
c 6 7 7 7 7 7 7 7 7 6 c 6 6 6 c 
c 7 c 6 6 6 6 c 7 7 7 c 6 6 6 c 
f 7 c c 6 6 c c 7 7 7 f 6 6 6 c 
f 7 6 f 6 6 f 6 7 7 7 f 6 6 6 c 
. f 7 7 7 7 7 7 7 7 6 f 6 6 c . 
. c 1 c f f 1 c 7 6 f 6 6 c c . 
. c c c c c c c c c c c c . . . 
`],
500,
true
)
if (controller.B.isPressed()) {
    if (pickaxe == 1) {
        game.showLongText("you have a pickaxe in your bag", DialogLayout.Bottom)
    } else if (Sword == 1) {
        game.showLongText("you have a sword in your bag", DialogLayout.Bottom)
    } else if (pickaxe == 1 && Sword == 1) {
        game.showLongText("you have a sword and a pickaxe in your bag", DialogLayout.Bottom)
    } else {
        game.showLongText("you have nothing in your bag", DialogLayout.Bottom)
    }
}
