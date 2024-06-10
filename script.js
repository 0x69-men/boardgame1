import { Alpine } from "/vendor/alpinejs@3.14.0.esm.js";

import morph from "/vendor/morph@3.14.0.esm.js";

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
}));

Alpine.start();

console.log(Alpine)

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
