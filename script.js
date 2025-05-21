
document.addEventListener('DOMContentLoaded', () => {
  const cartCounter = document.getElementById('cart-counter');
  let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };

  function updateCartCounter() {
    cartCounter.textContent = cart.items.length;
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(book) {
    const existing = cart.items.find(item => item.id === book.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.items.push({ ...book, quantity: 1 });
    }
    cart.total += book.price;
    saveCart();
    updateCartCounter();
    renderCartModal();
  }

  function removeFromCart(bookId) {
    const index = cart.items.findIndex(item => item.id === bookId);
    if (index > -1) {
      cart.total -= cart.items[index].price * cart.items[index].quantity;
      cart.items.splice(index, 1);
      saveCart();
      updateCartCounter();
      renderCartModal();
    }
  }

  function renderCartModal() {
    document.querySelectorAll('.cart-modal').forEach(el => el.remove());
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.style.cssText = 'position:fixed; top:100px; right:20px; background:#fff; border:1px solid #ccc; padding:1rem; z-index:1000; max-width:300px; box-shadow:0 0 10px rgba(0,0,0,0.3);';

    if (cart.items.length === 0) {
      modal.innerHTML = '<p>Корзина пуста</p><button onclick="this.parentElement.remove()">Закрыть</button>';
    } else {
      modal.innerHTML = '<h2>Корзина</h2>' + cart.items.map(item => `
        <div style="margin-bottom: 10px;">
          <strong>${item.title}</strong><br>
          Цена: ${item.price}₽ × ${item.quantity}<br>
          <button onclick="removeFromCartFromUI(${item.id})">Удалить</button>
        </div>
      `).join('') + `<p><strong>Итого: ${cart.total}₽</strong></p><button onclick="this.parentElement.remove()">Закрыть</button>`;
    }

    document.body.appendChild(modal);
  }

  window.addToCart = addToCart;
  window.removeFromCartFromUI = function(bookId) {
    removeFromCart(bookId);
  }

  updateCartCounter();

  // Назначаем клики для каждой кнопки "в корзину"
  document.querySelectorAll('.book-card button').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.book-card');
      const title = card.querySelector('h3').textContent.trim();
      const price = parseFloat(card.querySelector('p:last-of-type').textContent.replace(/[^\d]/g, ''));
      addToCart({ id: i + 1, title, price });
    });
  });

  // Обработчик нажатия по ссылке "Корзина"
  const cartLink = document.querySelector('a[href="#cart"]');
  if (cartLink) {
    cartLink.addEventListener('click', e => {
      e.preventDefault();
      renderCartModal();
    });
  }
  // Фильтрация по категориям
document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.categories button');
  const bookCards = document.querySelectorAll('.book-card');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.category;

      bookCards.forEach(card => {
        const cardCategory = card.querySelector('h3').dataset.category;
        if (selectedCategory === 'all' || selectedCategory === cardCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
});
