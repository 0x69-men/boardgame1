import Alpine from "vendor/alpinejs@3.14.0.js"
const morphOpt = {
    key(el) {
        // By default Alpine uses the `key=""` HTML attribute.
        return el.id
    },
    lookahead: true,
}

window.htmx.defineExtension("alpine-morph", {
    isInlineSwap: function (swapStyle) {
        return swapStyle === "morph"
    },
    handleSwap: function (swapStyle, target, fragment) {
        if (swapStyle === "morph") {
            // console.log(target)
            if (fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                Alpine.morph(target, fragment.firstElementChild, morphOpt)
            } else {
                Alpine.morph(target, fragment.outerHTML, morphOpt)
            }
            window.scrollTo(0, target.offsetTop)
            return [target]
        }
    },
})





document.addEventListener('alpine:init', () => {
    Alpine.data('dropdown', () => ({
        open: false,

        trigger: {
            ['x-ref']: 'trigger',
            ['@click']() {
                this.open = true
            },
        },

        dialogue: {
            ['x-show']() {
                return this.open
            },
            ['@click.outside']() {
                this.open = false
            },
        },
    }))
})