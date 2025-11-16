// Canvas Background Animation
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(251, 191, 36, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Logo Canvas Animation
function drawLogo() {
    const logoCanvas = document.getElementById('logoCanvas');
    const logoCtx = logoCanvas.getContext('2d');
    const centerX = 30;
    const centerY = 30;

    // Clear canvas
    logoCtx.clearRect(0, 0, 60, 60);

    // Draw steam
    for (let i = 0; i < 3; i++) {
        logoCtx.beginPath();
        logoCtx.strokeStyle = `rgba(255, 255, 255, ${0.6 - i * 0.2})`;
        logoCtx.lineWidth = 2;
        logoCtx.arc(centerX - 8 + i * 8, centerY - 15 + Math.sin(Date.now() / 300 + i) * 3, 3, 0, Math.PI * 2);
        logoCtx.stroke();
    }

    // Draw cup
    logoCtx.fillStyle = '#fbbf24';
    logoCtx.beginPath();
    logoCtx.moveTo(centerX - 12, centerY - 5);
    logoCtx.lineTo(centerX - 8, centerY + 15);
    logoCtx.lineTo(centerX + 8, centerY + 15);
    logoCtx.lineTo(centerX + 12, centerY - 5);
    logoCtx.closePath();
    logoCtx.fill();

    // Draw handle
    logoCtx.strokeStyle = '#f59e0b';
    logoCtx.lineWidth = 3;
    logoCtx.beginPath();
    logoCtx.arc(centerX + 12, centerY + 5, 6, -Math.PI / 2, Math.PI / 2);
    logoCtx.stroke();

    // Draw coffee liquid
    logoCtx.fillStyle = '#92400e';
    logoCtx.beginPath();
    logoCtx.moveTo(centerX - 10, centerY);
    logoCtx.lineTo(centerX - 7, centerY + 12);
    logoCtx.lineTo(centerX + 7, centerY + 12);
    logoCtx.lineTo(centerX + 10, centerY);
    logoCtx.closePath();
    logoCtx.fill();

    // Draw highlight
    logoCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    logoCtx.beginPath();
    logoCtx.arc(centerX - 5, centerY + 3, 4, 0, Math.PI * 2);
    logoCtx.fill();

    requestAnimationFrame(drawLogo);
}

// Products Data
const products = [
    {
        id: 1,
        name: 'Espresso Clássico',
        description: 'Café espresso tradicional preparado com grãos selecionados de origem única',
        fullDescription: 'Nosso espresso clássico é preparado com grãos 100% arábica de origem brasileira, torrados artesanalmente. Possui notas de chocolate e caramelo, com acidez equilibrada e corpo médio.',
        price: 8.50,
        emoji: '☕',
        category: 'quente',
        sizes: ['Pequeno', 'Médio', 'Grande'],
        extras: ['Shot extra', 'Leite', 'Canela']
    },
    {
        id: 2,
        name: 'Cappuccino Cremoso',
        description: 'Espresso com leite vaporizado e espuma cremosa perfeita',
        fullDescription: 'Cappuccino italiano autêntico com 1/3 de espresso, 1/3 de leite vaporizado e 1/3 de espuma de leite. Finalizado com chocolate em pó premium.',
        price: 12.00,
        emoji: '☕',
        category: 'quente',
        sizes: ['Médio', 'Grande'],
        extras: ['Chocolate', 'Caramelo', 'Chantilly']
    },
    {
        id: 3,
        name: 'Café Gelado',
        description: 'Café especial servido gelado com gelo e leite cremoso',
        fullDescription: 'Café extraído a frio por 12 horas, servido com gelo e leite integral. Menos amargo e mais doce naturalmente.',
        price: 11.50,
        emoji: '🧊',
        category: 'gelado',
        sizes: ['Médio', 'Grande'],
        extras: ['Caramelo', 'Baunilha', 'Chantilly']
    },
    {
        id: 4,
        name: 'Croissant Especial',
        description: 'Croissant francês recheado com chocolate belga premium',
        fullDescription: 'Croissant artesanal feito com manteiga francesa, 36 camadas de massa folhada e recheio generoso de chocolate belga 70% cacau.',
        price: 9.00,
        emoji: '🥐',
        category: 'salgado',
        sizes: ['Único'],
        extras: ['Queijo extra', 'Presunto', 'Tomate seco']
    },
    {
        id: 5,
        name: 'Frappuccino',
        description: 'Bebida gelada cremosa com café, leite e gelo batido',
        fullDescription: 'Nossa versão do clássico frappuccino: café, leite, gelo e calda especial batidos até ficarem cremosos. Coberto com chantilly e calda.',
        price: 15.00,
        emoji: '🥤',
        category: 'gelado',
        sizes: ['Médio', 'Grande'],
        extras: ['Chantilly extra', 'Caramelo', 'Chocolate']
    },
    {
        id: 6,
        name: 'Bolo de Cenoura',
        description: 'Fatia generosa de bolo caseiro com cobertura de chocolate',
        fullDescription: 'Bolo de cenoura feito na casa com receita tradicional. Cobertura cremosa de chocolate meio amargo. Perfeito para acompanhar seu café.',
        price: 8.00,
        emoji: '🍰',
        category: 'doce',
        sizes: ['Único'],
        extras: ['Sorvete', 'Chantilly']
    },
    {
        id: 7,
        name: 'Macchiato',
        description: 'Espresso marcado com espuma de leite cremosa',
        fullDescription: 'Espresso duplo "marcado" com uma pequena quantidade de espuma de leite. Para quem aprecia o sabor intenso do café com um toque suave.',
        price: 9.50,
        emoji: '☕',
        category: 'quente',
        sizes: ['Pequeno', 'Médio'],
        extras: ['Caramelo', 'Baunilha']
    },
    {
        id: 8,
        name: 'Sanduíche Natural',
        description: 'Pão integral com frango, queijo branco e salada',
        fullDescription: 'Sanduíche saudável no pão integral com peito de frango grelhado, queijo branco, alface, tomate e cenoura ralada. Acompanha suco.',
        price: 13.00,
        emoji: '🥪',
        category: 'salgado',
        sizes: ['Único'],
        extras: ['Queijo extra', 'Abacate', 'Tomate seco']
    }
];

// Cart State
let cart = [];
let likedItems = [];
let currentFilter = 'all';
let selectedProduct = null;
let orders = [];

// Initialize
function init() {
    renderProducts();
    updateCart();
    loadOrders();
    renderOrders();
    startOrderUpdates();
    initParticles();
    animateParticles();
    drawLogo();
}

// Load Orders from localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('cafeDaBiancaOrders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Save Orders to localStorage
function saveOrders() {
    localStorage.setItem('cafeDaBiancaOrders', JSON.stringify(orders));
}

// Render Orders
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const ordersBadge = document.getElementById('ordersBadge');

    // Update badge
    const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
    if (activeOrders > 0) {
        ordersBadge.style.display = 'flex';
        ordersBadge.textContent = activeOrders;
    } else {
        ordersBadge.style.display = 'none';
    }

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">📦</div>
                <h3 style="color: #374151; margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: 800;">Nenhum pedido ainda</h3>
                <p style="font-size: 1.1rem;">Faça seu primeiro pedido e acompanhe aqui!</p>
                <button class="btn-primary" style="margin-top: 2rem;" onclick="scrollToMenu()">
                    Ver Cardápio ☕
                </button>
            </div>
        `;
        return;
    }

    // Sort orders by date (newest first)
    const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

    ordersList.innerHTML = sortedOrders.map(order => {
        const statusInfo = getStatusInfo(order.status);
        const progress = getProgressPercentage(order.status);
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-number-display">Pedido #${order.orderNumber}</div>
                    <div class="order-status ${statusInfo.class}">${statusInfo.text}</div>
                </div>

                <div class="order-info">
                    <div class="order-info-item">
                        <span><strong>📅 Data:</strong></span>
                        <span>${formatDate(order.timestamp)}</span>
                    </div>
                    <div class="order-info-item">
                        <span><strong>👤 Nome:</strong></span>
                        <span>${order.customerName}</span>
                    </div>
                    <div class="order-info-item">
                        <span><strong>📞 Telefone:</strong></span>
                        <span>${order.customerPhone}</span>
                    </div>
                    <div class="order-info-item">
                        <span><strong>🚚 Entrega:</strong></span>
                        <span>${order.deliveryType === 'delivery' ? 'Delivery' : 'Retirar no Local'}</span>
                    </div>
                    ${order.deliveryType === 'delivery' ? `
                        <div class="order-info-item">
                            <span><strong>📍 Endereço:</strong></span>
                            <span>${order.customerAddress}</span>
                        </div>
                    ` : ''}
                    <div class="order-info-item">
                        <span><strong>💳 Pagamento:</strong></span>
                        <span>${order.paymentMethod}</span>
                    </div>
                </div>

                <div class="order-items">
                    <strong style="display: block; margin-bottom: 0.7rem; color: #92400e; font-size: 1.1rem;">📝 Itens do Pedido:</strong>
                    ${order.items.map(item => `
                        <div class="order-item-line">
                            <span>${item.quantity}x ${item.name} (${item.size})</span>
                            <span style="font-weight: 700;">R$ ${((item.price + (item.extras.length * 2)) * item.quantity).toFixed(2)}</span>
                        </div>
                        ${item.extras.length > 0 ? `
                            <div style="font-size: 0.85rem; color: #6b7280; padding-left: 1rem; margin-top: 0.2rem;">
                                + ${item.extras.join(', ')}
                            </div>
                        ` : ''}
                        ${item.observations ? `
                            <div style="font-size: 0.85rem; color: #6b7280; padding-left: 1rem; margin-top: 0.2rem;">
                                📝 ${item.observations}
                            </div>
                        ` : ''}
                    `).join('')}
                    <div class="order-item-line" style="margin-top: 0.7rem; padding-top: 0.7rem; border-top: 2px solid #fde68a;">
                        <strong style="font-size: 1.1rem;">Total:</strong>
                        <strong style="color: #92400e; font-size: 1.2rem;">R$ ${order.total.toFixed(2)}</strong>
                    </div>
                </div>

                ${order.status !== 'cancelled' && order.status !== 'delivered' ? `
                    <div class="order-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="progress-steps">
                            <div class="progress-step ${getStepClass(order.status, 'pending')}">
                                <div class="progress-step-icon">📝</div>
                                <div class="progress-step-label">Recebido</div>
                            </div>
                            <div class="progress-step ${getStepClass(order.status, 'preparing')}">
                                <div class="progress-step-icon">👨‍🍳</div>
                                <div class="progress-step-label">Preparando</div>
                            </div>
                            <div class="progress-step ${getStepClass(order.status, 'ready')}">
                                <div class="progress-step-icon">${order.deliveryType === 'delivery' ? '🚚' : '✅'}</div>
                                <div class="progress-step-label">${order.deliveryType === 'delivery' ? 'Saiu p/ Entrega' : 'Pronto'}</div>
                            </div>
                            <div class="progress-step ${getStepClass(order.status, 'delivered')}">
                                <div class="progress-step-icon">🎉</div>
                                <div class="progress-step-label">${order.deliveryType === 'delivery' ? 'Entregue' : 'Retirado'}</div>
                            </div>
                        </div>
                    </div>

                    <button class="track-button" onclick="updateOrderStatus('${order.orderNumber}')">
                        🔄 Atualizar Status
                    </button>

                    ${order.status === 'pending' ? `
                        <button class="cancel-button" onclick="cancelOrder('${order.orderNumber}')">
                            ❌ Cancelar Pedido
                        </button>
                    ` : ''}
                ` : ''}

                ${order.status === 'delivered' ? `
                    <div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, #d1fae5, #a7f3d0); border-radius: 1rem; margin-top: 1.5rem;">
                        <strong style="color: #065f46; font-size: 1.3rem;">✅ Pedido Concluído!</strong>
                        <p style="font-size: 1rem; color: #047857; margin-top: 0.7rem;">Obrigado pela preferência! 😊</p>
                    </div>
                ` : ''}

                ${order.status === 'cancelled' ? `
                    <div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, #fee2e2, #fecaca); border-radius: 1rem; margin-top: 1.5rem;">
                        <strong style="color: #991b1b; font-size: 1.3rem;">❌ Pedido Cancelado</strong>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get Status Info
function getStatusInfo(status) {
    const statuses = {
        'pending': { text: '⏳ Aguardando Confirmação', class: 'status-pending' },
        'preparing': { text: '👨‍🍳 Em Preparo', class: 'status-preparing' },
        'ready': { text: '✅ Pronto / Saiu p/ Entrega', class: 'status-ready' },
        'delivered': { text: '🎉 Concluído', class: 'status-delivered' },
        'cancelled': { text: '❌ Cancelado', class: 'status-delivered' }
    };
    return statuses[status] || statuses['pending'];
}

// Get Progress Percentage
function getProgressPercentage(status) {
    const percentages = {
        'pending': 25,
        'preparing': 50,
        'ready': 75,
        'delivered': 100
    };
    return percentages[status] || 0;
}

// Get Step Class
function getStepClass(currentStatus, stepStatus) {
    const statusOrder = ['pending', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return '';
}

// Format Date
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `Há ${diffMins} min`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Há ${diffHours}h`;
    
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update Order Status (simulate progression)
function updateOrderStatus(orderNumber) {
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (!order || order.status === 'delivered' || order.status === 'cancelled') return;

    const statusProgression = {
        'pending': 'preparing',
        'preparing': 'ready',
        'ready': 'delivered'
    };

    const newStatus = statusProgression[order.status];
    if (newStatus) {
        order.status = newStatus;
        saveOrders();
        renderOrders();
        
        const statusInfo = getStatusInfo(newStatus);
        showNotification(`Pedido atualizado: ${statusInfo.text}`, 'success');
    }
}

// Cancel Order
function cancelOrder(orderNumber) {
    if (!confirm('Tem certeza que deseja cancelar este pedido?')) return;

    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) {
        order.status = 'cancelled';
        saveOrders();
        renderOrders();
        showNotification('Pedido cancelado com sucesso', 'error');
    }
}

// Start Order Updates (simulate real-time updates)
function startOrderUpdates() {
    setInterval(() => {
        const activeOrders = orders.filter(o => 
            o.status !== 'delivered' && 
            o.status !== 'cancelled'
        );

        // Randomly progress some orders (10% chance every 30 seconds)
        activeOrders.forEach(order => {
            if (Math.random() < 0.1) {
                const statusProgression = {
                    'pending': 'preparing',
                    'preparing': 'ready',
                    'ready': 'delivered'
                };
                
                const newStatus = statusProgression[order.status];
                if (newStatus) {
                    order.status = newStatus;
                    const statusInfo = getStatusInfo(newStatus);
                    showNotification(`Pedido #${order.orderNumber}: ${statusInfo.text}`, 'success');
                }
            }
        });

        if (activeOrders.length > 0) {
            saveOrders();
            renderOrders();
        }
    }, 30000); // Check every 30 seconds
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <button class="heart-btn" onclick="event.stopPropagation(); toggleLike(${product.id})">
                <span id="heart-${product.id}">${likedItems.includes(product.id) ? '❤️' : '🤍'}</span>
            </button>
            <div class="product-emoji">${product.emoji}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                <button class="btn-add" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                    Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderProducts();
}

// Toggle Like
function toggleLike(id) {
    const index = likedItems.indexOf(id);
    
    if (index > -1) {
        likedItems.splice(index, 1);
    } else {
        likedItems.push(id);
        showNotification('Adicionado aos favoritos! ❤️', 'success');
    }
    
    const heartEl = document.getElementById(`heart-${id}`);
    if (heartEl) {
        heartEl.textContent = likedItems.includes(id) ? '❤️' : '🤍';
    }
}

// Quick Add to Cart
function quickAddToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = {
        ...product,
        quantity: 1,
        size: product.sizes[0],
        extras: [],
        observations: ''
    };
    cart.push(cartItem);
    updateCart();
    showNotification('✓ Adicionado ao carrinho!', 'success');
}

// Open Product Modal
function openProductModal(id) {
    selectedProduct = products.find(p => p.id === id);
    const modal = document.getElementById('productModal');
    const modalName = document.getElementById('modalProductName');
    const modalContent = document.getElementById('modalContent');

    modalName.textContent = selectedProduct.name;

    modalContent.innerHTML = `
        <div style="text-align: center; font-size: 6rem; margin-bottom: 1.5rem; animation: bounce 2s ease-in-out infinite;">
            ${selectedProduct.emoji}
        </div>
        
        <p style="color: #6b7280; margin-bottom: 2rem; line-height: 1.7; font-size: 1.05rem;">
            ${selectedProduct.fullDescription}
        </p>

        <div class="form-group">
            <label class="form-label">📏 Tamanho</label>
            <select class="form-select" id="productSize">
                ${selectedProduct.sizes.map(size => `
                    <option value="${size}">${size}</option>
                `).join('')}
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">🔢 Quantidade</label>
            <div class="quantity-control">
                <button type="button" class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                <span class="quantity-display" id="quantityDisplay">1</span>
                <button type="button" class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">➕ Extras (opcional)</label>
            ${selectedProduct.extras.map((extra, index) => `
                <div style="margin-bottom: 0.7rem;">
                    <label style="display: flex; align-items: center; gap: 0.7rem; cursor: pointer; padding: 0.5rem; border-radius: 0.5rem; transition: background 0.3s;">
                        <input type="checkbox" id="extra-${index}" value="${extra}" 
                            onchange="updateProductPrice()"
                            style="width: 22px; height: 22px; cursor: pointer;">
                        <span style="font-size: 1.05rem;">${extra} <strong>(+R$ 2,00)</strong></span>
                    </label>
                </div>
            `).join('')}
        </div>

        <div class="form-group">
            <label class="form-label">📝 Observações</label>
            <textarea class="form-textarea" id="productObs" placeholder="Ex: sem açúcar, bem quente..."></textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin: 2rem 0; padding: 1.5rem; background: linear-gradient(135deg, #fef3c7, #fbbf24); border-radius: 1rem;">
            <div>
                <div style="font-size: 0.9rem; color: #92400e; font-weight: 600; margin-bottom: 0.3rem;">Total:</div>
                <span style="font-size: 2.2rem; font-weight: 800; color: #92400e;">
                    R$ <span id="productTotalPrice">${selectedProduct.price.toFixed(2)}</span>
                </span>
            </div>
            <button type="button" class="btn-primary" onclick="addCustomProduct()">
                Adicionar 🛒
            </button>
        </div>
    `;

    modal.classList.add('active');
    updateProductPrice();
}

// Close Product Modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    selectedProduct = null;
}

// Change Quantity
let currentQuantity = 1;
function changeQuantity(delta) {
    currentQuantity = Math.max(1, currentQuantity + delta);
    document.getElementById('quantityDisplay').textContent = currentQuantity;
    updateProductPrice();
}

// Update Product Price
function updateProductPrice() {
    if (!selectedProduct) return;
    
    const extras = document.querySelectorAll('[id^="extra-"]:checked').length;
    const total = (selectedProduct.price + (extras * 2)) * currentQuantity;
    document.getElementById('productTotalPrice').textContent = total.toFixed(2);
}

// Add Custom Product
function addCustomProduct() {
    const size = document.getElementById('productSize').value;
    const observations = document.getElementById('productObs').value;
    const extrasElements = document.querySelectorAll('[id^="extra-"]:checked');
    const extras = Array.from(extrasElements).map(el => el.value);

    const cartItem = {
        ...selectedProduct,
        quantity: currentQuantity,
        size: size,
        extras: extras,
        observations: observations
    };

    cart.push(cartItem);
    updateCart();
    closeProductModal();
    showNotification(`${currentQuantity}x ${selectedProduct.name} adicionado! 🎉`, 'success');
    currentQuantity = 1;
}

// Update Cart Display
function updateCart() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
        cartBadge.style.display = 'flex';
        cartBadge.textContent = totalItems;
    } else {
        cartBadge.style.display = 'none';
    }

    // Update content
    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="cart-empty">Carrinho vazio<br>🛒</div>';
        cartFooter.style.display = 'none';
    } else {
        cartContent.innerHTML = cart.map((item, index) => {
            const extrasPrice = item.extras.length * 2;
            const itemTotal = (item.price + extrasPrice) * item.quantity;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${item.emoji} ${item.name}</h3>
                        <div class="cart-item-details">
                            ${item.quantity}x | ${item.size}
                            ${item.extras.length > 0 ? '<br>+ ' + item.extras.join(', ') : ''}
                            ${item.observations ? '<br>📝 ' + item.observations : ''}
                        </div>
                        <p class="cart-item-price">R$ ${itemTotal.toFixed(2)}</p>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
                </div>
            `;
        }).join('');

        const total = cart.reduce((sum, item) => {
            const extrasPrice = item.extras.length * 2;
            return sum + ((item.price + extrasPrice) * item.quantity);
        }, 0);
        
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        cartFooter.style.display = 'block';
    }
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Item removido', 'error');
}

// Toggle Cart
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    overlay.classList.toggle('active');
    sidebar.classList.toggle('active');
}

// Open Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    updateOrderSummary();
    modal.classList.add('active');
}

// Close Checkout Modal
function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Toggle Address Field
function toggleAddressField() {
    const deliveryType = document.getElementById('deliveryType').value;
    const addressGroup = document.getElementById('addressGroup');
    const addressInput = document.getElementById('customerAddress');
    
    if (deliveryType === 'delivery') {
        addressGroup.style.display = 'block';
        addressInput.required = true;
    } else {
        addressGroup.style.display = 'none';
        addressInput.required = false;
    }
    
    updateOrderSummary();
}

// Update Order Summary
function updateOrderSummary() {
    const summaryDiv = document.getElementById('orderSummary');
    const deliveryType = document.getElementById('deliveryType').value;
    const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0;
    
    const subtotal = cart.reduce((sum, item) => {
        const extrasPrice = item.extras.length * 2;
        return sum + ((item.price + extrasPrice) * item.quantity);
    }, 0);
    
    const total = subtotal + deliveryFee;
    
    summaryDiv.innerHTML = cart.map(item => {
        const extrasPrice = item.extras.length * 2;
        const itemTotal = (item.price + extrasPrice) * item.quantity;
        return `
            <div class="order-item">
                <span>${item.quantity}x ${item.name}</span>
                <span>R$ ${itemTotal.toFixed(2)}</span>
            </div>
        `;
    }).join('') + `
        <div class="order-item">
            <span>Subtotal</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        ${deliveryType ? `
            <div class="order-item">
                <span>${deliveryType === 'delivery' ? 'Taxa de Entrega' : 'Retirada'}</span>
                <span>${deliveryFee > 0 ? 'R$ ' + deliveryFee.toFixed(2) : 'Grátis'}</span>
            </div>
        ` : ''}
    `;
    
    document.getElementById('finalTotal').textContent = `R$ ${total.toFixed(2)}`;
}

// Submit Order
function submitOrder(event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const deliveryType = document.getElementById('deliveryType').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const orderNotes = document.getElementById('orderNotes').value;

    // Validate
    if (deliveryType === 'delivery' && !customerAddress) {
        showNotification('Por favor, preencha o endereço!', 'error');
        return;
    }

    // Show loading
    const checkoutContent = document.getElementById('checkoutContent');
    checkoutContent.innerHTML = '<div class="spinner"></div><p style="text-align: center; margin-top: 1.5rem; font-size: 1.1rem; color: #92400e; font-weight: 600;">Processando seu pedido...</p>';

    // Simulate order processing
    setTimeout(() => {
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0;
        const total = cart.reduce((sum, item) => {
            const extrasPrice = item.extras.length * 2;
            return sum + ((item.price + extrasPrice) * item.quantity);
        }, 0) + deliveryFee;

        // Create order object
        const newOrder = {
            orderNumber: orderNumber.toString(),
            timestamp: Date.now(),
            customerName,
            customerPhone,
            deliveryType,
            customerAddress,
            paymentMethod: getPaymentMethodName(paymentMethod),
            orderNotes,
            items: [...cart],
            total,
            status: 'pending'
        };

        // Add to orders array
        orders.push(newOrder);
        saveOrders();
        renderOrders();

        checkoutContent.innerHTML = `
            <div class="success-message">
                <div class="success-icon">🎉</div>
                <h3 class="success-title">Pedido Confirmado!</h3>
                <p class="order-number">Pedido #${orderNumber}</p>
                <p style="color: #6b7280; margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">
                    Obrigado, <strong>${customerName}</strong>!<br>
                    Seu pedido foi confirmado com sucesso.
                </p>
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <p style="margin-bottom: 0.5rem;"><strong>💰 Total:</strong> R$ ${total.toFixed(2)}</p>
                    <p style="margin-bottom: 0.5rem;"><strong>💳 Pagamento:</strong> ${getPaymentMethodName(paymentMethod)}</p>
                    <p style="margin-bottom: 0.5rem;"><strong>🚚 Entrega:</strong> ${deliveryType === 'delivery' ? 'Delivery em 30-40min' : 'Retirar no local'}</p>
                    ${deliveryType === 'delivery' ? `<p><strong>📍 Endereço:</strong> ${customerAddress}</p>` : ''}
                </div>
                <p style="font-size: 1rem; color: #6b7280;">
                    Você receberá atualizações no telefone <strong>${customerPhone}</strong>
                </p>
                <p style="font-size: 1.05rem; color: #92400e; margin-top: 1.5rem; font-weight: 700;">
                    📋 Acompanhe seu pedido na seção "Meus Pedidos"
                </p>
                <button class="btn-primary" style="width: 100%; margin-top: 1.5rem;" onclick="finishOrder()">
                    Fechar ✨
                </button>
                <button class="btn-secondary" style="width: 100%; margin-top: 0.7rem;" onclick="viewMyOrders()">
                    Ver Meus Pedidos 📋
                </button>
            </div>
        `;

        // Clear cart
        cart = [];
        updateCart();
    }, 2000);
}

// Get Payment Method Name
function getPaymentMethodName(method) {
    const methods = {
        'cash': '💵 Dinheiro',
        'debit': '💳 Cartão de Débito',
        'credit': '💳 Cartão de Crédito',
        'pix': '📱 PIX'
    };
    return methods[method] || method;
}

// Finish Order
function finishOrder() {
    closeCheckoutModal();
    toggleCart();
    showNotification('Obrigado pela preferência! 😊', 'success');
}

// View My Orders
function viewMyOrders() {
    closeCheckoutModal();
    toggleCart();
    scrollToOrders();
}

// Scroll Functions
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function scrollToOrders() {
    document.getElementById('orders').scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Smooth Scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize App
init();
