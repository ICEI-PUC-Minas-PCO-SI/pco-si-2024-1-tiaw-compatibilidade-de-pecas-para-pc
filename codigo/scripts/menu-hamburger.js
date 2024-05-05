const hamburger = document.querySelector('.hamburger')
const close = document.querySelector('.close-hamburger')
const mobileLinks = document.querySelector('.mobile-links')

hamburger.addEventListener('click', _ => {
    if (mobileLinks.classList.contains("invisible")) {
        mobileLinks.classList.remove("invisible")
    } else {
        mobileLinks.classList.add("invisible")
    }
})

close.addEventListener('click', _ => {
    if (mobileLinks.classList.contains("invisible")) {
        mobileLinks.classList.remove("invisible")
    } else {
        mobileLinks.classList.add("invisible")
    }
})

