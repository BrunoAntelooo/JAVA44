let carrito = [];

function agregarAlCarrito(producto, precio) {
    const item = carrito.find(item => item.nombre === producto);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ nombre: producto, precio: precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => quitarDelCarrito(item.nombre);
        li.appendChild(removeButton);
        carritoItems.appendChild(li);
        total += item.precio * item.cantidad;
    });

    document.getElementById('total').textContent = total;
    checkEmptyList();
    addHoverEffect();
    addDoubleClickEffect();
}

function quitarDelCarrito(producto) {
    const index = carrito.findIndex(item => item.nombre === producto);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
    }
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function buscarProducto() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        const nombre = producto.getAttribute('data-name').toLowerCase();
        if (nombre.includes(input)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

function addHoverEffect() {
    const listItems = document.querySelectorAll('#productos .producto, #carrito-items li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#ffe0b2';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '#fff';
        });
    });
}

function addClickAlert() {
    const listItems = document.querySelectorAll('#productos .producto');
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`Has hecho clic en: ${item.querySelector('h2').textContent}`);
        });
    });
}

function addDoubleClickEffect() {
    const listItems = document.querySelectorAll('#carrito-items li');
    listItems.forEach(item => {
        item.addEventListener('dblclick', () => {
            item.style.textDecoration = 'line-through';
        });
    });
}

function checkEmptyList() {
    const ul = document.getElementById('carrito-items');
    const emptyMessage = document.getElementById('emptyMessage');
    if (ul.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addHoverEffect();
    addClickAlert();
    addDoubleClickEffect();

    // Creación de los botones con sus respectivas funcionalidades
    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar ítem';
    addButton.style.margin = '1em';
    addButton.addEventListener('click', () => {
        const newItemText = prompt('Introduce el nombre del nuevo ítem:');
        if (newItemText) {
            const ul = document.querySelector('#carrito-items');
            const li = document.createElement('li');
            li.textContent = newItemText;
            ul.appendChild(li);
            actualizarCarrito();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar ítem';
    deleteButton.style.margin = '1em';
    deleteButton.addEventListener('click', () => {
        const itemText = prompt('Introduce el nombre del ítem a eliminar:');
        if (itemText) {
            const items = document.querySelectorAll('#carrito-items li');
            let itemFound = false;

            items.forEach(item => {
                if (item.textContent.includes(itemText)) {
                    item.remove();
                    itemFound = true;
                }
            });

            if (!itemFound) {
                alert('Ítem no encontrado.');
            }
            actualizarCarrito();
        }
    });

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar ítem';
    searchButton.style.margin = '1em';
    searchButton.addEventListener('click', buscarProducto);

    const countButton = document.createElement('button');
    countButton.textContent = 'Contar ítems';
    countButton.style.margin = '1em';
    countButton.addEventListener('click', () => {
        const items = document.querySelectorAll('#carrito-items li');
        alert(`Número total de ítems: ${items.length}`);
    });

    const displayButton = document.createElement('button');
    displayButton.textContent = 'Mostrar todos los ítems';
    displayButton.style.margin = '1em';
    displayButton.addEventListener('click', () => {
        const items = document.querySelectorAll('#carrito-items li');
        let allItems = [];
        items.forEach(item => {
            allItems.push(item.textContent);
        });
        if (allItems.length > 0) {
            alert(`Lista de todos los ítems:\n${allItems.join('\n')}`);
        } else {
            alert('La lista está vacía.');
        }
    });

    // Inserción de los botones antes del footer
    const footer = document.querySelector('footer');
    footer.insertAdjacentElement('beforebegin', addButton);
    footer.insertAdjacentElement('beforebegin', deleteButton);
    footer.insertAdjacentElement('beforebegin', searchButton);
    footer.insertAdjacentElement('beforebegin', countButton);
    footer.insertAdjacentElement('beforebegin', displayButton);

    // Mostrar mensaje si la lista está vacía
    checkEmptyList();
});