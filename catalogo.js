alert("¡Atención, vas a entrar al mejor mercado de camisetas de Argentina, si no quieres gastar dinero, no entres!");

document.addEventListener("DOMContentLoaded", function () {
  const catalogo = [
    {
      imagen: "francia.jpg",
      nombre: "Camiseta Francia 2018",
      precio: 13999
    },
    {
      imagen: "seleccion.jpg",
      nombre: "Camiseta Selección Argentina 2014",
      precio: 13999
    },
    {
      imagen: "camiseta de boca.jpg",
      nombre: "Camiseta Boca Juniors Temporada 2011",
      precio: 13999
    }
    // Agrega más productos aquí
  ];

  function mostrarCatalogo() {
    const catalogoDiv = document.getElementById("catalogo");
    catalogo.forEach(function (camiseta) {
      const camisetaDiv = document.createElement("div");
      camisetaDiv.className = "camiseta";
      camisetaDiv.innerHTML = `
        <img src="../images/${camiseta.imagen}" alt="${camiseta.nombre}" style="max-width: 250px; display: block; margin: 0 auto;">
        <h3>${camiseta.nombre}</h3>
        <p style="text-align: center;">Precio: $${camiseta.precio.toFixed(2)}</p>
        <button class="agregarCarrito" data-nombre="${camiseta.nombre}" data-precio="${camiseta.precio}">Agregar al Carrito</button>
      `;
      catalogoDiv.appendChild(camisetaDiv);
    });
  }

  mostrarCatalogo();

  const carrito = document.getElementById("carrito");
  const totalCarrito = document.getElementById("totalCarrito");

  function actualizarCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.innerHTML = "";
    let total = 0;

    if (carritoActual.length === 0) {
      const mensajeCarritoVacio = document.createElement("p");
      mensajeCarritoVacio.textContent = "El carrito está vacío.";
      carrito.appendChild(mensajeCarritoVacio);
    } else {
      carritoActual.forEach(function (item, index) {
        const nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

        // Agregar botón para eliminar el elemento
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function () {
          // Eliminar el elemento del carritoActual por su índice
          carritoActual.splice(index, 1);
          // Actualizar el LocalStorage con el carrito actualizado
          localStorage.setItem("carrito", JSON.stringify(carritoActual));
          // Actualizar la vista del carrito
          actualizarCarrito();
        });

        nuevoElemento.appendChild(botonEliminar);
        carrito.appendChild(nuevoElemento);
        total += item.precio;
      });
    }

    totalCarrito.textContent = total.toFixed(2);
  }

  const botonesAgregar = document.querySelectorAll(".agregarCarrito");

  botonesAgregar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const nombre = boton.getAttribute("data-nombre");
      const precio = parseFloat(boton.getAttribute("data-precio"));

      const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

      carritoActual.push({ nombre, precio });

      localStorage.setItem("carrito", JSON.stringify(carritoActual));

      actualizarCarrito();
    });
  });

  actualizarCarrito();

  // Agregar botón para reiniciar el carrito
  const reiniciarCarritoBtn = document.getElementById("reiniciarCarrito");
  reiniciarCarritoBtn.addEventListener("click", function () {
    // Limpiar el carrito actual y el LocalStorage
    localStorage.removeItem("carrito");
    // Actualizar la vista del carrito
    actualizarCarrito();
  });
});




const finalizarCompraBtn = document.getElementById("finalizarCompra");
finalizarCompraBtn.addEventListener("click", function () {
    const nuevaVentana = window.open("", "Completar Compra", "width=600,height=400");

    const contenidoFormulario = `
        <h2>Completa tu compra</h2>
        <form id="compraForm">
            <label for="direccion">Dirección de envío:</label>
            <input type="text" id="direccion" name="direccion">
            <br>
            <label for="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" name="ciudad">
            <br>
            <label for="codigoPostal">Código Postal:</label>
            <input type="text" id="codigoPostal" name="codigoPostal">
            <br>
            <label for="formaPago">Forma de pago:</label>
            <select id="formaPago" name="formaPago">
                <option value="mercadoPago">Mercado Pago</option>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
            </select>
            <br>
            <div id="datosTarjeta" style="display: none;">
                <label for="numeroTarjeta">Número de tarjeta:</label>
                <input type="text" id="numeroTarjeta" name="numeroTarjeta">
                <br>
                <label for="nombreTitular">Nombre del titular:</label>
                <input type="text" id="nombreTitular" name="nombreTitular">
                <br>
                <label for="fechaVencimiento">Fecha de vencimiento (MM/YY):</label>
                <input type="text" id="fechaVencimiento" name="fechaVencimiento">
                <br>
                <label for="cvv">Código de seguridad (CVV):</label>
                <input type="text" id="cvv" name="cvv">
            </div>
            <div id="datosMercadoPago" style="display: none;">
                <label for="cbu">Número de CBU:</label>
                <input type="text" id="cbu" name="cbu">
                <br>
                <label for="nombreTitularCbu">Nombre del titular de la cuenta:</label>
                <input type="text" id="nombreTitularCbu" name="nombreTitularCbu">
            </div>
            <br>
            <button type="submit" id="realizarPago">Realizar Pago</button>
        </form>
    `;

    nuevaVentana.document.open();
    nuevaVentana.document.write(contenidoFormulario);
    nuevaVentana.document.close();

    const compraForm = nuevaVentana.document.getElementById("compraForm");
    compraForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formaPagoSelect = nuevaVentana.document.getElementById("formaPago");
        if (formaPagoSelect.value === "mercadoPago") {
            // El usuario eligió Mercado Pago
            const cbu = nuevaVentana.document.getElementById("cbu").value;
            const nombreTitularCbu = nuevaVentana.document.getElementById("nombreTitularCbu").value;

            if (cbu && nombreTitularCbu) {
                // Aquí puedes agregar la lógica para procesar el pago con Mercado Pago
                // (por simplicidad, solo mostraremos un mensaje)
                alert("Pago con Mercado Pago realizado con éxito. ¡Gracias por tu compra!");
            } else {
                alert("La compra no puede completarse debido a la falta de información.");
            }
        } else {
            alert("¡Compra realizada con éxito!");
        }
        nuevaVentana.close();
    });

    const formaPagoSelect = nuevaVentana.document.getElementById("formaPago");
    const datosTarjetaDiv = nuevaVentana.document.getElementById("datosTarjeta");
    const datosMercadoPagoDiv = nuevaVentana.document.getElementById("datosMercadoPago");

    formaPagoSelect.addEventListener("change", function () {
        if (formaPagoSelect.value === "tarjeta") {
            datosTarjetaDiv.style.display = "block";
            datosMercadoPagoDiv.style.display = "none";
        } else if (formaPagoSelect.value === "mercadoPago") {
            datosMercadoPagoDiv.style.display = "block";
            datosTarjetaDiv.style.display = "none";
        } else {
            datosTarjetaDiv.style.display = "none";
            datosMercadoPagoDiv.style.display = "none";
        }
    });
});