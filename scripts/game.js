const ingridients = [
    {
        id: 0,
        name: "Valerian",
        color: {
            red: 159,
            green: 122,
            blue: 147,
        },
        img: "/static/ingridients/",
    },
    {
        id: 1,
        name: "Thistle",
        color: {
            red: 216,
            green: 191,
            blue: 216,
        },
        img: "/static/ingridients/",
    },
    {
        id: 2,
        name: "Charcoal",
        color: {
            red: 54,
            green: 69,
            blue: 79,
        },
        img: "/static/ingridients/",
    },
    {
        id: 3,
        name: "Wormwood",
        color: {
            red: 159,
            green: 174,
            blue: 158,
        },
        img: "/static/ingridients/",
    },
    {
        id: 4,
        name: "Sage",
        color: {
            red: 156,
            green: 175,
            blue: 136,
        },
        img: "/static/ingridients/",
    },
    {
        id: 5,
        name: "Valerian (grinded)",
        color: {
            red: 159,
            green: 122,
            blue: 147,
        },
        img: "/static/ingridients/",
    },
    {
        id: 6,
        name: "Thistle (grinded)",
        color: {
            red: 216,
            green: 191,
            blue: 216,
        },
        img: "/static/ingridients/",
    },
    {
        id: 7,
        name: "Charcoal (grinded)",
        color: {
            red: 54,
            green: 69,
            blue: 79,
        },
        img: "/static/ingridients/",
    },
    {
        id: 8,
        name: "Wormwood (grinded)",
        color: {
            red: 159,
            green: 174,
            blue: 158,
        },
        img: "/static/ingridients/",
    },
    {
        id: 9,
        name: "Sage (grinded)",
        color: {
            red: 156,
            green: 175,
            blue: 136,
        },
        img: "/static/ingridients/",
    },
]
// Global constants

const recipes = [
    {
        id: 0,
        name: "Aid for Merhojed",
        description: "A healing potion that cures those afflicted in Merhojed.",
        recipe: "Drop thistle 2x in the cauldron and boil water for two turns. Add the valerian, then boil for one more turn. Let the mixture cool. When cooled, add the charcoal, but do not boil. Distill in phial.",
        validate: [
            "water",
            1,
            1,
            "boil",
            "boil",
            0,
            "boil",
            2,
            "distill",
        ],
        points: 150,
    },
    {
        id: 1,
        name: "Spirit based aid for Merhojed",
        description: "A healing potion that cures those afflicted in Merhojed.",
        recipe: "Drop the valerian 2x in the cauldron and boil for three turns. Leave to cool. Grind the wormwood. Add the wormwood in the cauldron, but do not boil. Distill.",
        validate: [
            "spirit",
            0,
            0,
            "boil",
            "boil",
            "boil",
            8,
            "distill",
        ],
        points: 175,
    },
    {
        id: 2,
        name: "Artemisia Potion",
        description: "A strong spirit that induces daydreams and strange visions. Strength and Warfare skills are increased by five for ten minutes.",
        recipe: "Drop the sage in the cauldron and boil for one turn. Grind the wormwood 2x. Add the wormwood in the cauldron and cook for two turns. Distill in phial.",
        validate: [
            "spirit",
            4,
            "boil",
            8,
            8,
            "boil",
            "boil",
            "distill",
        ],
        points: 125,
    },
]

const actions = [
    {
        name: "water",
        color: {
            red: 0,
            green: 255,
            blue: 255,
        },
    },
    {
        name: "wine",
        color: {
            red: 177,
            green: 18,
            blue: 38,
        },
    },
    {
        name: "spirit",
        color: {
            red: 178,
            green: 187,
            blue: 198,
        },
    },
    {
        name: "boil",
        color: {
            red: 255,
            green: 255,
            blue: 255,
        },
    },
    {
        name: "distill",
        color: {
            red: 255,
            green: 255,
            blue: 255,
        },
    },
]

const globalState = {
    cauldron: {
        isInitState: true,
        color: {
            red: 0,
            green: 0,
            blue: 0,
        },
        sequence: [],
    },
    recipe: {
        id: -1,
    },
    score: 0,
}

// Global state controllers
function updateCauldron(action) {
    globalState.cauldron.isInitState = false

    globalState.cauldron.sequence.push(action)

    globalState.cauldron.color = {
        red: 0,
        green: 0,
        blue: 0,
    }

    const delim = globalState.cauldron.sequence.length + 1

    globalState.cauldron.sequence.forEach((idOrName) => {
        let color

        if (typeof(idOrName) === "number") {
            color = ingridients.find((ing) => {
                return ing.id === idOrName
            }).color
        } else {
            color = actions.find((act) => {
                return act.name === idOrName
            }).color
        }

        globalState.cauldron.color.red += color.red / delim
        globalState.cauldron.color.green += color.green / delim
        globalState.cauldron.color.blue += color.blue / delim
    })

    globalState.cauldron.color.red = Math.round(globalState.cauldron.color.red)
    globalState.cauldron.color.green = Math.round(globalState.cauldron.color.green)
    globalState.cauldron.color.blue = Math.round(globalState.cauldron.color.blue)

    updateCauldronColor()
}

async function updateRecipe() {
    const recipe = getRandomRecipe(globalState.recipe.id)

    globalState.recipe = recipe

    await mountRecipe()
}

async function updateScore() {
    globalState.score += globalState.recipe.points

    await mountScore()
}

function validateRecipe() {
    if (globalState.cauldron.sequence.length != globalState.recipe.validate.length) return false

    globalState.cauldron.sequence.forEach((el, i) => {
        if (el != globalState.recipe.validate[i]) return false
    })

    return true
}

function getRandomRecipe(previousRecipeId) {
    let recipe = { id: previousRecipeId }

    while (recipe.id == previousRecipeId) {
        recipe = recipes[Math.floor(Math.random()*recipes.length)]
    }
    
    return recipe
}

// Useful commons
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// On-demand animations and other visuals
function updateCauldronColor() {
    const c = globalState.cauldron.color
    document.getElementById("cauldron-color").style.fill = `rgb(${c.red}, ${c.green}, ${c.blue})`

    if (globalState.cauldron.isInitState) {
        document.getElementById("cauldron-color").style.fill = "none"
    }
}

async function animateBubbles() {
    let activeElements = Array.from(document.getElementsByClassName('bubble-g1'))

    for (let i = 0; i < 5; i++) {
        activeElements.forEach((el) => {
            el.style.stroke = "none"
        })

        activeElements = Array.from(document.getElementsByClassName(`bubble-g${i % 3}`))
        activeElements.forEach((el) => {
            el.style.stroke = "black"
        })

        ms = i * 300
        await sleep(ms)
    }

    activeElements.forEach((el) => {
        el.style.stroke = "none"
    })
}

// MutationObserver magic
// An extremely useful functionality, as we are working with an SPA and the content is being laoded asynchroniusly.
// 
// MutationObserver API docs: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// 
// Inspired by https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists

// Make the mouting point our target to observe
const targetNode = document.getElementsByTagName("main")[0]

// Config mutations to observe.
// childLists refers only to the direct children of the target element,
// while subtree refers to the entire subtree of the element
const observerConfig = { attributes: false, childList: true, subtree: true }

function waitForElement(selector) {
    return new Promise((resolve) => {
        // Check, whether it's already available and return if so
        if (document.querySelector(selector)) return resolve(document.querySelector(selector))

        const observer = new MutationObserver((_) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector))
                observer.disconnect()
            }
        })

        observer.observe(
            targetNode,
            observerConfig,
        )
    })
}



// Button handlers
function handleLiquidBtn(liquid) {
    if (globalState.cauldron.isInitState) {
        updateCauldron(liquid)
        return
    }

    alert("You cannot add liquid after something else. Reset the cauldron")
}

async function handleOpBtn(op) {
    if (!globalState.cauldron.isInitState) {
        await animateBubbles()
        updateCauldron(op)
        return
    }

    alert("You cannot boil or distill empty cauldron")
}

function handleResetBtn() {
    globalState.cauldron = {
        isInitState: true,
        color: {
            red: 0,
            green: 0,
            blue: 0,
        },
        sequence: [],
    },

    updateCauldronColor()
}

async function handleRecipeBtn() {
    handleResetBtn()
    updateRecipe()
}

async function handleFinishBtn() {
    
    if (validateRecipe()) {
        await updateScore()
        alert("Cool!")
    } else alert("Oops, it doesn't taste well...")
    
    handleRecipeBtn()
}

// We want to know the id of the element, that was dragged into the cauldron,
// so the dragging elements must set this data
async function registerDragging() {
    waitForElement(".ing-item").then((_) => {
        const itemsToRegister = Array.from(document.getElementsByClassName("ing-item"))

        itemsToRegister.forEach((el) => {
            el.ondragstart = (event) => { event.dataTransfer.setData('id', event.target.id) }
        })
    })
}

// By default is not allowed. Also we register the dropping here too
async function allowDropToCauldron() {
    waitForElement("#cauldron").then((cauldron) => {
        cauldron.ondragover = (event) => {
            event.preventDefault()
        }
        cauldron.ondrop = (event) => {
            const itemId = event.dataTransfer.getData('id')

            if (itemId.startsWith("ing-item-")) {
                updateCauldron(Number(itemId.slice(9)))
            }
        }
    })
}

async function mountIngridients() {
    // TODO: refator with using icons and not names
    const htmlContentToInsert = ingridients.map(({ id, name }) => {
        return `<div class="ing-item" id="ing-item-${id}" draggable="true">${name}</div>`
    }).join('')

    waitForElement("#ings-list").then((mountingPoint) => { mountingPoint.innerHTML = htmlContentToInsert })
}

async function mountRecipe() {
    const htmlContentToInsert = `<h4>${globalState.recipe.name}</h4><p>${globalState.recipe.description}</p><p>${globalState.recipe.recipe}</p>`
    waitForElement("#recipe-mount").then((mountingPoint) => { mountingPoint.innerHTML = htmlContentToInsert })
}

async function mountScore() {
    waitForElement("#score-mount").then((mountingPoint) => { mountingPoint.innerHTML = globalState.score })
}

async function runAll() {
    if (window.location.pathname !== "/game") return

    updateRecipe()
    await mountIngridients()
    registerDragging()
    allowDropToCauldron()
}

runAll()