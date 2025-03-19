// Esta función define el tiempo que pasa entre fotos del carrousel
$('.carousel').carousel({
    interval: 2000
  })





// Esta parte del script simuula una base de datos, hemos decidido hacerlo asi ya que no hemos tenido tiempo 
// de configurar una base de datos pero creemos que esta ha sido una buena forma de simular el funcionamiento que
// queriemos tener con esta funcion.

//Primero define el numero de tracking para que pueda ser funcional en el buscador. Despues define unas variables
//como vehicleModel o entryDate, hemos adaptado estas variables con la información correcta para coches que hemos
//añadido en "Trabajos Realizados"
const orderDatabase = {
//Primer coche, el Audi RS5
  12345: {
    vehicleModel: "Audi RS5",
    entryDate: "15/02/2025",
    estimatedCompletion: "25/02/2025",
    status: 3, //etapas
    statusDates: [
      "15/02/2025", // Recepción
      "16/02/2025", // Evaluación
      "18/02/2025", // Trabajo en progreso
      null, // Control de calidad (pendiente)
      null, // Listo para recoger (pendiente)
    ],
//Galeria de imagenes para las fotos de los coches en el taller.
    images: ["media/estadors511.png", "media/estadors512.png"],
  },
//Segundo coche el BMW M3
  67890: {
    vehicleModel: "BMW M3",
    entryDate: "10/05/2025",
    estimatedCompletion: "20/05/2025",
    status: 4, // Completado
    statusDates: ["10/05/2025", "11/05/2025", "13/05/2025", "18/05/2025", "19/05/2025"],
    images: ["media/openart-image_CIZHERsK_1740588998773_raw.png", "media/openart-image_DMHIF9VI_1740588951039_raw.png", "media/openart-image_Qu5fVjT4_1740588998196_raw.png"],
  },
}

// Función para buscar y mostrar el pedido
function trackOrder() {
  const orderId = document.getElementById("order-id").value.trim()
  const orderDetails = document.getElementById("order-details")

  if (!orderId) {
    alert("Por favor, introduce un número de pedido")
    return
  }

  // Buscar el pedido en nuestra "base de datos"
  const order = orderDatabase[orderId]

  if (!order) {
    alert("Pedido no encontrado. Por favor, verifica el número e intenta de nuevo.")
    return
  }

  // Actualizar la información del pedido
  document.getElementById("display-order-id").textContent = orderId
  document.getElementById("vehicle-model").textContent = order.vehicleModel
  document.getElementById("entry-date").textContent = order.entryDate
  document.getElementById("estimated-completion").textContent = order.estimatedCompletion

  // Actualizar el estado del timeline
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item, index) => {
    if (index <= order.status) {
      item.classList.add("active")

      // Actualizar fechas si están disponibles
      if (order.statusDates[index]) {
        const dateSpan = item.querySelector(".timeline-date")
        dateSpan.textContent = order.statusDates[index]
      }
    } else {
      item.classList.remove("active")
    }
  })

  // Actualizar galería de imágenes
  const galleryContainer = document.querySelector(".gallery-images")
  galleryContainer.innerHTML = ""

  order.images.forEach((imgSrc) => {
    const img = document.createElement("img")
    img.src = imgSrc
    img.alt = "Progreso del trabajo"
    galleryContainer.appendChild(img)
  })

  // Mostrar los detalles del pedido
  orderDetails.classList.remove("hidden")
}