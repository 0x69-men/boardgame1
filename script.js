import { Alpine } from "/vendor/alpinejs@3.14.0.esm.js";

import morph from "/vendor/morph@3.14.0.esm.js";
import {QRCode} from "/vendor/qrcode.js";

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

Alpine.data("board", () => ({
  numbers: [4,11,12,10,6,6,4,10,8,3,9,5,11,5,6,8,3,2],
  players: "add https://github.com/fangpenlin/avataaars"
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



const qrcode = new QRCode("player-QR", {
    text: "https://gugu-catan.glitch.me/",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

console.log(qrcode)

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