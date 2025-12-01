document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  // --- AUTH CHECK ---
  // Si no hay token, redirigir a la página de inicio
  if (!token) {
    window.location.href = "../index.html"; // Ajustar la ruta de redirección
    return;
  }

  // --- ELEMENTOS DEL DOM ---
  const productsList = document.getElementById("products-list");
  const productDialog = document.getElementById("product-dialog"); // Nuevo: el diálogo
  const addProductBtn = document.getElementById("add-product-btn"); // Nuevo: botón para añadir
  const closeProductDialog = document.getElementById("close-product-dialog"); // Nuevo: botón de cierre del diálogo

  const productForm = document.getElementById("product-form");
  const formTitle = document.getElementById("form-title");
  const productIdInput = document.getElementById("product-id");
  const productNameInput = document.getElementById("product-name");
  const productDescInput = document.getElementById("product-description");
  const productPriceInput = document.getElementById("product-price");
  const logoutNav = document.getElementById("logout-nav");

  // --- LOGOUT ---
  logoutNav.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "../index.html"; // Ajustar la ruta de redirección
  });

  // --- FUNCIONES API ---
  const fetchApi = async (endpoint, options = {}) => {
    options.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (response.status === 401 || response.status === 403) {
      // Token inválido o expirado
      localStorage.removeItem("token");
      window.location.href = "../index.html"; // Ajustar la ruta de redirección
    }
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData); // Log the full error object
      throw new Error(errorData.message || "Error en la petición a la API");
    }
    return response.json();
  };

  // --- LÓGICA DE PRODUCTOS ---
  const fetchProducts = async () => {
    try {
      const { data } = await fetchApi("/api/products");
      renderProducts(data);
    } catch (error) {
      alert(`Error al cargar productos: ${error.message}`);
    }
  };

  const renderProducts = (products) => {
    productsList.innerHTML = "";
    if (products.length === 0) {
      productsList.innerHTML = "<p>No tienes productos creados todavía.</p>";
      return;
    }
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description || ""}</p>
        <p class="price">$${product.price}</p>
        <div class="product-actions">
          <button class="edit-btn" data-id="${product.id}">Editar</button>
          <button class="delete-btn" data-id="${product.id}">Eliminar</button>
        </div>
      `;
      productsList.appendChild(productCard);
    });
  };

  // --- MANEJO DEL FORMULARIO (CREAR/EDITAR) ---
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = productIdInput.value;
    const productData = {
      name: productNameInput.value,
      description: productDescInput.value,
      price: parseFloat(productPriceInput.value),
    };

    try {
      if (id) {
        // Actualizar producto
        await fetchApi(`/api/products/${id}`, {
          method: "PUT",
          body: JSON.stringify(productData),
        });
        alert("Producto actualizado exitosamente.");
      } else {
        // Crear producto
        await fetchApi("/api/products", {
          method: "POST",
          body: JSON.stringify(productData),
        });
        alert("Producto creado exitosamente.");
      }
      resetForm(); // Cierra el diálogo y resetea el formulario
      fetchProducts();
    } catch (error) {
      alert(`Error al guardar producto: ${error.message}`);
    }
  });

  const resetForm = () => {
    formTitle.textContent = "Añadir Nuevo Producto";
    productIdInput.value = "";
    productForm.reset();
    productDialog.close(); // Nuevo: cierra el diálogo
  };

  // --- MANEJO DE DIÁLOGO ---
  addProductBtn.addEventListener("click", () => {
    resetForm(); // Limpia el formulario antes de abrir para añadir
    productDialog.showModal();
  });

  closeProductDialog.addEventListener("click", () => {
    resetForm(); // Limpia y cierra el formulario
  });

  // --- MANEJO DE ACCIONES (EDITAR/ELIMINAR) ---
  productsList.addEventListener("click", async (e) => {
    const target = e.target;
    const id = target.dataset.id;

    if (target.classList.contains("delete-btn")) {
      if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        try {
          await fetchApi(`/api/products/${id}`, { method: "DELETE" });
          alert("Producto eliminado.");
          fetchProducts();
        } catch (error) {
          alert(`Error al eliminar: ${error.message}`);
        }
      }
    }

    if (target.classList.contains("edit-btn")) {
      try {
        const { data: product } = await fetchApi(`/api/products/${id}`);
        formTitle.textContent = "Editar Producto";
        productIdInput.value = product.id;
        productNameInput.value = product.name;
        productDescInput.value = product.description || "";
        productPriceInput.value = product.price;
        productDialog.showModal(); // Nuevo: abre el diálogo para editar
      } catch (error) {
        alert(`Error al cargar producto para editar: ${error.message}`);
      }
    }
  });

  // --- INICIALIZACIÓN ---
  fetchProducts();
});
