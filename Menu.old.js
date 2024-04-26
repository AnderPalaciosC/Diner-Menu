// Menú del restaurante
const menu = {
  desayuno: {
    platosPrincipales: {
      "panqueques": 8,
      "huevos con bacon": 10,
      "tostadas con tomate": 9
    },
    acompañamientos: {
      "patatas fritas": 3,
      "ensalada rusa": 4,
      "yogur natural": 5
    }
  },
  almuerzo: {
    platosPrincipales: {
      "hamburguesa": 12,
      "sandwich de pollo": 11,
      "ensalada césar": 9
    },
    acompañamientos: {
      "patatas fritas": 3,
      "aros de cebolla": 4,
      "ensalada": 3
    }
  },
  cena: {
    platosPrincipales: {
      "filete": 20,
      "salmón": 18,
      "pasta": 15
    },
    acompañamientos: {
      "puré de patata": 4,
      "verduras en tempura": 5,
      "pan de ajo": 3
    }
  }
};

// Función para mostrar el menú
function mostrarMenu(tipoMenu) {
  const platosPrincipales = Object.keys(menu[tipoMenu].platosPrincipales);
  const acompañamientos = Object.keys(menu[tipoMenu].acompañamientos);

  let menuString = `Menú (${tipoMenu}):\n`;
  menuString += "Platos Principales:\n";
  platosPrincipales.forEach((item, index) => {
    menuString += `${index + 1}. ${item} - $${menu[tipoMenu].platosPrincipales[item]}\n`;
  });
  menuString += "\nAcompañamientos:\n";
  acompañamientos.forEach((item, index) => {
    menuString += `${index + 1}. ${item} - $${menu[tipoMenu].acompañamientos[item]}\n`;
  });

  alert(menuString);
}

// Función para calcular el costo total
function calcularTotal(platoPrincipal, acompañamiento1, acompañamiento2, tipoMenu) {
  const precioPlatoPrincipal = menu[tipoMenu].platosPrincipales[platoPrincipal];
  const precioAcompañamiento1 = menu[tipoMenu].acompañamientos[acompañamiento1];
  const precioAcompañamiento2 = menu[tipoMenu].acompañamientos[acompañamiento2];
  
  // Verificar si los platos y acompañamientos seleccionados existen en el menú
  if (precioPlatoPrincipal === undefined || precioAcompañamiento1 === undefined || precioAcompañamiento2 === undefined) {
    throw new Error("Uno o más elementos seleccionados no están en el menú.");
  }

  const costoTotal = precioPlatoPrincipal + precioAcompañamiento1 + precioAcompañamiento2;
  return costoTotal;
}

// Función para manejar la selección de un plato principal
function seleccionarPlatoPrincipal(tipoMenu) {
  const platosPrincipales = Object.keys(menu[tipoMenu].platosPrincipales);
  let eleccion = prompt("Por favor, selecciona un plato principal:\n" + platosPrincipales.map((item, index) => `${index + 1}. ${item}`).join("\n")).toLowerCase(); // Convertir a minúsculas

  // Verificar si la elección es un número
  if (!isNaN(eleccion)) {
    const index = parseInt(eleccion) - 1;
    if (index >= 0 && index < platosPrincipales.length) {
      return platosPrincipales[index];
    }
  }

  // Verificar si la elección está en el menú
  if (!platosPrincipales.includes(eleccion)) {
    alert("Esa opción no está en el menú. Por favor, inténtalo de nuevo.");
    return seleccionarPlatoPrincipal(tipoMenu); // Llamada recursiva para seleccionar otra vez
  }

  alert("¡Buena elección!");
  return eleccion;
}

// Función para manejar la selección de un acompañamiento
function seleccionarAcompañamiento(tipoMenu) {
  const acompañamientos = Object.keys(menu[tipoMenu].acompañamientos);
  let eleccion = prompt("Por favor, selecciona un acompañamiento:\n" + acompañamientos.map((item, index) => `${index + 1}. ${item}`).join("\n")).toLowerCase(); // Convertir a minúsculas

  // Verificar si la elección es un número
  if (!isNaN(eleccion)) {
    const index = parseInt(eleccion) - 1;
    if (index >= 0 && index < acompañamientos.length) {
      return acompañamientos[index];
    }
  }

  // Verificar si la elección está en el menú
  if (!acompañamientos.includes(eleccion)) {
    alert("Esa opción no está en el menú. Por favor, inténtalo de nuevo.");
    return seleccionarAcompañamiento(tipoMenu); // Llamada recursiva para seleccionar otra vez
  }

  alert("¡Suena delicioso!");
  return eleccion;
}

// Función principal para manejar la orden
function hacerPedido(tipoMenu) {
  mostrarMenu(tipoMenu);

  const platoPrincipal = seleccionarPlatoPrincipal(tipoMenu);
  const acompañamiento1 = seleccionarAcompañamiento(tipoMenu);
  const acompañamiento2 = seleccionarAcompañamiento(tipoMenu);

  const costoTotal = calcularTotal(platoPrincipal, acompañamiento1, acompañamiento2, tipoMenu);
  alert(`Costo total: $${costoTotal}`);
}

// Ejemplo de uso
try {
  let tipoMenu;
  while (!(tipoMenu in menu)) {
    tipoMenu = prompt("¡Bienvenido a Bottega Diner!\nPor favor, selecciona un tipo de comida (desayuno, almuerzo, cena):").toLowerCase();
    if (!(tipoMenu in menu)) {
      alert("Tipo de comida inválido");
    }
  }
  hacerPedido(tipoMenu);
} catch (error) {
  alert(error.message);
}