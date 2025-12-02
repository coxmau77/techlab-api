document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "/api";
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  // --- ELEMENTOS DEL DOM ---
  const addProductBtn = document.getElementById("add-product-btn");
  const productDialog = document.getElementById("product-dialog");
  const closeProductDialog = document.getElementById("close-product-dialog");
  const productForm = document.getElementById("product-form");
  const productsContainer = document.getElementById("products-container");

  // --- MANEJO DE DIÁLOGOS ---
  addProductBtn.addEventListener("click", () => {
    document.getElementById("dialog-title").textContent = "Añadir Producto";
    productForm.reset();
    productDialog.showModal();
  });

  closeProductDialog.addEventListener("click", () => {
    productDialog.close();
  });

  // --- MANEJO DE PRODUCTOS ---
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al cargar productos");

      const products = await response.json();
      renderProducts(products.data);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const renderProducts = (products) => {
    productsContainer.innerHTML = "";

    if (products.length === 0) {
      productsContainer.innerHTML =
        "<p>No tienes productos aún. ¡Añade tu primer producto!</p>";
      return;
    }

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Precio:</strong> $${product.price}</p>
        <p>${product.description}</p>
        <div class="product-actions">
          <button class="edit-btn" data-id="${product.id}">Editar</button>
          <button class="delete-btn" data-id="${product.id}">Eliminar</button>
        </div>
      `;
      productsContainer.appendChild(productElement);
    });

    // Añadir event listeners a los botones
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id");
        editProduct(productId);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id");
        deleteProduct(productId);
      });
    });
  };

  const editProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al cargar el producto");

      const product = await response.json();

      // Llenar el formulario con los datos del producto
      document.getElementById("product-id").value = product.data.id;
      document.getElementById("product-name").value = product.data.name;
      document.getElementById("product-category").value = product.data.category;
      document.getElementById("product-price").value = product.data.price;
      document.getElementById("product-description").value =
        product.data.description;

      document.getElementById("dialog-title").textContent = "Editar Producto";
      productDialog.showModal();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?"))
      return;

    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      alert("Producto eliminado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // --- MANEJO DE FORMULARIO ---
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productId = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const category = document.getElementById("product-category").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;

    try {
      const method = productId ? "PUT" : "POST";
      const url = productId
        ? `${API_URL}/products/${productId}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, category, price, description }),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      alert(
        productId
          ? "Producto actualizado exitosamente"
          : "Producto añadido exitosamente"
      );
      productDialog.close();
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  });

  // --- INICIALIZACIÓN ---
  fetchProducts();
});
