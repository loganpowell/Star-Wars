var characters = [
  {
    name: "DARTH",
    side: "Darkside",
    life: 200,
    hp: 30,
    active: false,
    dead: false,
    img: "./img/dar-03.jpg",
    pos: 20
  },
  {
    name: "TROOPER",
    side: "Darkside",
    life: 100,
    hp: 20,
    active: false,
    dead: false,
    img: "./img/dar-01.jpg",
    pos: 10
  },
  {
    name: "BOBA",
    side: "Darkside",
    life: 60,
    hp: 10,
    active: false,
    dead: false,
    img: "./img/dar-02.jpg",
    pos: 10
  },
  {
    name: "LUKE",
    side: "Force",
    life: 80,
    hp: 20,
    active: false,
    dead: false,
    img: "./img/for-03.jpg",
    pos: 0
  },
  {
    name: "???",
    side: "Force",
    life: 100,
    hp: 10,
    active: false,
    dead: false,
    img: "./img/for-01.jpg",
    pos: 60
  },
  {
    name: "ACKBAR",
    side: "Force",
    life: 60,
    hp: 20,
    active: false,
    dead: false,
    img: "./img/for-02.jpg",
    pos: 50
  },
]

//   -- bottom BOX
//     (1) alert box/instructions
//     (2) choose your player
//     (3) choose your enemy...
//     (4) ready to attack
//     (5) you win/lose

var playerTeam = []
var opponentTeam = []

// //testing image referencing
// var luke = characters[0].img
// var test = document.createElement('img')
// test.src = luke
// document.body.appendChild(test)
// // worked
//
// var character = {
//   name: "Ackbar",
//   side: "Force",
//   life: 60,
//   hp: 30,
//   active: false,
//   dead: false,
//   img: "./img/for-03.jpg"
// }

// primary template
function template(character) {
  var char = [
    '<div class="panel">',
      '<img style="top: ' + character.pos +'%" src="' + character.img + '" alt="' + character.name + '">',
      '<div class="stats top">',
        '<div class="side">' + character.side + '</div>',
        '<div class="name">' + character.name + '</div>',
      '</div>',
      '<div class="stats bottom">',
        '<div class="HP">HP:' + character.hp + '</div>',
        '<div class="life">LIFE:' + character.life + '</div>',
      '</div>',
    '</div>'
  ].join("\n")
  return char
}

// all characters templated
var charPackage = characters.map(function(character) {
  return template(character)
})

// Filters:
  // // filter for opponents if choosing force
  // function isDark(chars) {
  //   return chars.side === "Darkside"
  // }
  // function darkSide(chars) {
  //   if (isDark(chars)) {
  //     return true;
  //   }
  // }
  // // filtered Darkside opponents
  // var opponentsDark = characters.filter(darkSide)
  // var darkNess = opponentsDark.map(function(char) {
  //   return template(char)
  // })
  //
  // // filter for opponents if choosing darkside
  // function isForce(chars) {
  //   return chars.side === "Force"
  // }
  // function force(chars) {
  //   if (isForce(chars)) {
  //     return true;
  //   }
  // }
  // // filtered Force opponents
  // var opponentsForce = characters.filter(force)
  // var forceNess = opponentsForce.map(function(char) {
  //   return template(char)
  // })
  // // worked, but...

  // // trying a less redundant filter approach
  // function filterSide(character, side) {
  //   return character.side === side
  // }
  //
  // var darkFilter = characters.filter(function(character) {
  //   return filterSide(character, "Darkside")
  // })
  //
  // var darkSide = darkFilter.map(function(character) {
  //   return template(character)
  // })
  // // worked, but...

  //trying lodash approach
  var darkSide = _.filter(characters, {side: "Darkside"})
  // create charPackage
  var darkPack = darkSide.map(function(character) {
    return template(character)
  })
  var forceSide = _.filter(characters, {side: "Force"})
  // create charPackage
  var forcePack = forceSide.map(function(character) {
    return template(character)
  })

$(document).ready(function() {

  // game Functions
  //   -- II. teamMater/bifurcator(player)
  //     -- when a player is chosen, the rest are opponents
  //       -- playerTeam [].push(player) == placer(character)
  //       -- opponentTeam [].push(forEach filter...all on the other 'side')
  //       -- JQ: add class to player div ("side") = character.side
  //       -- JQ: hide #characters div
  //       -- JQ: show #opponents div
  //       -- initiate reaper()

  $('.all').append(charPackage)
  $('button').css("display", "none")
  $('.alert-box').css("border-top", "1px solid red")
  $('.alert-box').text("You must choose!")
  $('.all .panel')
    .mouseenter (function() {
    $(this).find('img').css("opacity", "1")
    })
    .mouseleave (function() {
    $(this).find('img').css("opacity", ".5")
    })
  function choosePlayer() {
    $('.all .panel').on('click', function() {
      var side = $(this).find('.side').text()
      console.log(side)
      if (side === "Darkside") {
        playerTeam.push(darkSide)
        opponentTeam.push(forceSide)
        console.log(playerTeam)
        console.log(opponentTeam)
        $('.opponents').append(forcePack)
        $('.alert-box').text("The darkness suits you well")
      }
      else {
        playerTeam.push(forceSide)
        opponentTeam.push(darkSide)
        console.log(playerTeam)
        console.log(opponentTeam)
        $('.opponents').append(darkPack)
        $('.alert-box').text("May the force be with you")
      }
      $('.all').css('display', 'none')
      $('.player').append($(this))
      $('.all .panel, .player .panel').off()
      console.log(isEmpty($('.player')))
    })
  }

  function chooseOpponent() {
    $('.opponents .panel')
    .mouseenter (function() {
    $(this).find('img').css("opacity", "1")
    })
    .mouseleave (function() {
    $(this).find('img').css("opacity", ".5")
    })
    .on('click', function() {
        console.log(isEmpty($('.player')))
    })
  }

  function isEmpty( el ){
    return !$.trim(el.html())
  }
  console.log(isEmpty($('.player')))
  function readyOpponent() {
    if (isEmpty($('.player'))) {
      choosePlayer()
    }
    else {
      chooseOpponent()
      console.log("chooseOpponent")
    }
  }
  readyOpponent()

  // $('.opponents').append(darkPack)
  // $('.opponents').css("display", "none");
  // $('.player').append(darkPack[2])
  // $('.opponent').append(darkPack[1])

});

// UI/JQuery:
//   $(document).ready(function() {...
//   (A) click listener on each avatar
//   (B) click listener on "attack" button
//   (C) .text() update player/enemy Life with each attack
//   (D) .append() player/enemy to "active avatar" when chosen
//   (E) .empty() player/enemy when dead (animation... slow fade out)
//   (F) .text(BOX: 1, 2, 3, 4...) updates
//   (G) .css(enemies) add enemy class to rest of avatars upon choosing player
//   (H)
//
// Functions:
//   -- {} dom model for character node (object {}) http://codoki.com/2015/09/01/native-javascript-templating/
//   -- I. initializer()
//     -- BOX: "choose player"
//     -- add click handlers to each {} #characters
//     -- on('click') ==> teamMater/bifurcator(player.side)
//   -- II. teamMater/bifurcator(player)
//     -- when a player is chosen, the rest are opponents
//       -- playerTeam [].push(player) == placer(character)
//       -- opponentTeam [].push(forEach filter...all on the other 'side')
//       -- JQ: add class to player div ("side") = character.side
//       -- JQ: hide #characters div
//       -- JQ: show #opponents div
//       -- initiate reaper()
//   -- III. reaper()
//       -- teamDeath ([] opponents.length for player team, array.length = 1)
//         -- if playerTeam.length = 0 ===> gameOver(playerTeam)
//         -- if opponentTeam.length = 0 ===> gameOver(opponentTeam)
//   -- IV. chooser(opponent)
//     -- BOX: "choose opponent"
//     -- add .click handlers to choose opponent ==> placer()
//   -- V. placer(character)
//     -- add player/enemy(parameter) to their respective active div
//       -- target div = $("character.side")
//       -- https://learn.jquery.com/using-jquery-core/jquery-object/
//       -- http://stackoverflow.com/questions/1279957/how-to-move-an-element-into-another-element
//   -- VI. attack (player, enemy)
//     -- reduce (player) Life by enemy hp
//     -- reduce (enemy) Life by player HP
//       -- HP multiplier (chosen player)
//         -- initial deduction = var = .2HP
//         -- with each attack = var + 8 (const)
//   -- VII. death
//     -- if life =< 0 {}
//     -- remove charachter from respective team []
//     -- .empty() them from the "active" div
//   -- VIII. gameOver(team)
//     -- team == player/opponentTeam
//     -- remove attack button listener
//       -- change button text to "GAME OVER"
//     -- if team = playerTeam:
//       -- BOX: "You LOSE"
//     -- if opponentTeam
//       -- BOX: "you win"
