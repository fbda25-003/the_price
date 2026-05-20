let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = total;
  }
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price: parseFloat(price), qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} has been added to your cart!`);
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!container) return;

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<div class="col-12 text-center"><p>Your cart is empty. <a href="index.html">Start Shopping</a></p></div>`;
    totalEl.textContent = "P0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5>${item.name}</h5>
              <p>P${item.price} × ${item.qty}</p>
            </div>
            <div class="text-end">
              <p class="fw-bold">P${itemTotal.toFixed(2)}</p>
              <button onclick="removeFromCart(${index})" class="btn btn-sm btn-outline-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>`;
  });

  totalEl.textContent = `P${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("🎉 Thank you for shopping with The Price!\nYour order has been placed successfully.");
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function submitFeedback(e) {
  e.preventDefault();
  alert("Thank you for your feedback! We truly appreciate it.");
  e.target.reset();
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Add event listeners for all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = button.getAttribute('data-price');
      addToCart(name, price);
    });
  });

  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});