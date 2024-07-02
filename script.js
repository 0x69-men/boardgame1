import { Alpine } from "/vendor/alpinejs@3.14.0.esm.js";

import morph from "/vendor/morph@3.14.0.esm.js";
import { QRCode } from "/vendor/qrcode.js";
import { PcgRandom } from "/vendor/pcg.js";

window.Alpine = Alpine;

Alpine.plugin(morph);

const morphOpt = {
  key(el) {
    // By default Alpine uses the `key=""` HTML attribute.
    return el.id;
  },
  lookahead: true,
};

window.htmx.defineExtension("alpine-morph", {
  isInlineSwap: function (swapStyle) {
    return swapStyle === "morph";
  },
  handleSwap: function (swapStyle, target, fragment) {
    if (swapStyle === "morph") {
      // console.log(target)
      if (fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        Alpine.morph(target, fragment.firstElementChild, morphOpt);
      } else {
        Alpine.morph(target, fragment.outerHTML, morphOpt);
      }
      window.scrollTo(0, target.offsetTop);
      return [target];
    }
  },
});

Alpine.data("game", () => ({
  data: {
    seed: new PcgRandom(42n),
    dices: [1, 1],
  },
  el: {
    roads: [...Array(72).fill({ [":class"]: "'AAA'" })],
    players: [{
      [""]
    }],
    dices: {
      ["x-show"]() {
        return this.data.dices[0] + this.data.dices[1] > 0;
      },
    },
    dice1: {
      [":class"]() {
        return `show-${this.data.dices[0]} `;
      },
    },
    dice2: {
      [":class"]() {
        return `show-${this.data.dices[1]} `;
      },
    },
    dialogue: {
      ["@play-knight"]() {
        console.log("play-knight");
      },
      ["@start-turn"]() {
        this.$el.dialog.value="action"
        this.data.dices[0] = this.data.seed.next32() % 6 + 1
        this.data.dices[1] = this.data.seed.next32() % 6 + 1
        
        console.log("start-turn");
      },
      ["@action-build"]() {
        this.$el.dialog.value="build"
        console.log("action-build");
      },
      ["@action-exchange"]() {
        console.log("action-exchange");
      },
      ["@action-development"]() {
        console.log("action-development");
      },
      ["@action-trade"]() {
        console.log("action-trade");
      },
      ["@action-end-turn"]() {
        console.log("action-end-turn");
      },
      ["@build-back"]() {
        this.$el.dialog.value="action"
        console.log("@build-back");
      },
      ["@build-road"]() {
        console.log("@build-road");
      },
      ["@build-village"]() {
        console.log("@build-village");
      },
      ["@build-city"]() {
        console.log("@build-city");
      },
      ["@build-development"]() {
        console.log("@build-development");
      },
      // document.gendersForm.gender.value="F";
    },
  },

  playerColors: [
    "#DE9EB5",
    "#CF6A6B",
    "#DE904C",
    "#E2C144",
    "#92CBC5",
    "#A0DEF1",
    "#8DB5F9",
    "#A79ADA",
  ],
  // numbers: [4,11,12,10,6,6,4,10,8,3,9,5,11,5,6,8,3,2],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  tiles: [
    ...Array(3).fill("Hills"),
    ...Array(4).fill("Pasture"),
    ...Array(3).fill("Mountain"),
    ...Array(4).fill("Fields"),
    ...Array(4).fill("Forest"),
    ...Array(1).fill("Deser"),
  ],
  players: [
    {
      name: "Kalabibishkis",
      avatar: 123, //"add https://github.com/fangpenlin/avataaars",
      developmentCards: ["Knight", "Knight", "Knight"],
      resourcesCards: { Brick: 9, Wool: 8, Ore: 7, Grain: 6, Lumber: 5 },
      roads: [1, 2, 3, 4, 5, 6],
      villages: [1, 2, 3, 4, 5],
      cities: [1, 3, 5, 8],
      get points() {
        return 44;
      },
      get resources() {
        return (
          this.resourcesCards.Brick +
          this.resourcesCards.Wool +
          this.resourcesCards.Ore +
          this.resourcesCards.Grain +
          this.resourcesCards.Lumber
        );
      },
    },
    {
      name: "Kalabibishkis",
      avatar: 123, //"add https://github.com/fangpenlin/avataaars",
      developmentCards: ["Knight", "Knight", "Knight"],
      resourcesCards: { Brick: 9, Wool: 8, Ore: 7, Grain: 6, Lumber: 5 },
      roads: [1, 2, 3, 4, 5, 6],
      villages: [1, 2, 3, 4, 5],
      cities: [1, 3, 5, 8],
      get points() {
        return 44;
      },
      get resources() {
        return (
          this.resourcesCards.Brick +
          this.resourcesCards.Wool +
          this.resourcesCards.Ore +
          this.resourcesCards.Grain +
          this.resourcesCards.Lumber
        );
      },
    },
    {
      name: "Kalabibishkis",
      avatar: 123, //"add https://github.com/fangpenlin/avataaars",
      developmentCards: ["Knight", "Knight", "Knight"],
      resourcesCards: { Brick: 9, Wool: 8, Ore: 7, Grain: 6, Lumber: 5 },
      roads: [1, 2, 3, 4, 5, 6],
      villages: [1, 2, 3, 4, 5],
      cities: [1, 3, 5, 8],
      get points() {
        return 44;
      },
      get resources() {
        return (
          this.resourcesCards.Brick +
          this.resourcesCards.Wool +
          this.resourcesCards.Ore +
          this.resourcesCards.Grain +
          this.resourcesCards.Lumber
        );
      },
    },
    {
      name: "Kalabibishkis",
      avatar: 123, //"add https://github.com/fangpenlin/avataaars",
      developmentCards: ["Knight", "Knight", "Knight"],
      resourcesCards: { Brick: 9, Wool: 8, Ore: 7, Grain: 6, Lumber: 5 },
      roads: [1, 2, 3, 4, 5, 6],
      villages: [1, 2, 3, 4, 5],
      cities: [1, 3, 5, 8],
      get points() {
        return 44;
      },
      get resources() {
        return (
          this.resourcesCards.Brick +
          this.resourcesCards.Wool +
          this.resourcesCards.Ore +
          this.resourcesCards.Grain +
          this.resourcesCards.Lumber
        );
      },
    },
  ],
  longestRoad: -1,
  largestArmy: -1,
  developmentCards: [
    "Chapel",
    "Library",
    "Market",
    "Palace",
    "University",
    ...Array(14).fill("Knight"),
    ...Array(2).fill("Monopoly"),
    ...Array(2).fill("Road Building"),
    ...Array(2).fill("Year of Plenty"),
  ],

  // ROADS - total 72 places
  /*
  
  X15-PerColor Road
  X5-PerColor Settlement
  X4-PerColor City
  
  
  TILES:
  3 Hills (Brick)
  4 Pasture (Wool)
  3 Mountain (Ore)
  4 Fields (Grain)
  4 Forest (Lumber)
  1 Deser
  
  Harbor Tokens:
  X4 (3:1) Universal
  X1 (2:1) Brick, Wool, Ore, Grain, Lumber
  
  
  Resource Cards:
  X19 Brick, Wool, Ore, Grain, Lumber
  
  Development Cards:
  14 Knight
  5 Victory Point (Chapel, Library, Market, Palace, University)
  X2 Monopoly, Road Building, Year of Plenty

  */
}));

Alpine.start();

// const qrcode = new QRCode("player-QR", {
//   text: "https://gugu-catan.glitch.me/",
//   width: 128,
//   height: 128,
//   colorDark: "#000000",
//   colorLight: "#ffffff",
//   correctLevel: QRCode.CorrectLevel.H,
// });

// console.log(qrcode);

// document.addEventListener('alpine:init', () => {
//     Alpine.data('dropdown', () => ({
//         open: false,

//         trigger: {
//             ['x-ref']: 'trigger',
//             ['@click']() {
//                 this.open = true
//             },
//         },

//         dialogue: {
//             ['x-show']() {
//                 return this.open
//             },
//             ['@click.outside']() {
//                 this.open = false
//             },
//         },
//     }))
// })
