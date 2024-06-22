export function confirmModal(title, func, section) {
    const structure = `
        <div class="confirm-content">
            <h2>${title}</h2>
            <div class="confirm-buttons">
                <button id="yes">SIM</button>
                <button id="no">NÃO</button>
            </div>
        </div>
    `

    const container = document.createElement('div')
    container.classList.add("modal")
    container.innerHTML = structure

    const yes = container.querySelector("#yes")
    const no = container.querySelector("#no")

    const wrappedFunc = () => {
        func()
        container.remove()
    }

    yes.addEventListener('click', wrappedFunc)
    no.addEventListener('click', () => container.remove())

    section.appendChild(container)
}