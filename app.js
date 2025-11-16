// ===== MODAL DE PRODUTO =====
function openProductModal(id) {
    selectedProduct = products.find(p => p.id === id);
    const modal = document.getElementById('productModal');
    const modalName = document.getElementById('modalProductName');
    const modalContent = document.getElementById('modalContent');

    modalName.textContent = selectedProduct.name;
    currentQuantity = 1;

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

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    selectedProduct = null;
}

function changeQuantity(delta) {
    currentQuantity = Math.max(1, currentQuantity + delta);
    document.getElementById('quantityDisplay').textContent = currentQuantity;
    updateProductPrice();
}

function updateProductPrice() {
    if (!selectedProduct) return;
    
    const extras = document.querySelectorAll('[id^="extra-"]:checked').length;
    const total = (selectedProduct.price + (extras * 2)) * currentQuantity;
    document.getElementById('productTotalPrice').textContent = total.toFixed(2);
}

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

// ===== CHECKOUT =====
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    updateOrderSummary();
    modal.classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

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

function getPaymentMethodName(method) {
    const methods = {
        'cash': '💵 Dinheiro',
        'debit': '💳 Cartão de Débito',
        'credit': '💳 Cartão de Crédito',
        'pix': '📱 PIX'
    };
    return methods[method] || method;
}

function submitOrder(event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const deliveryType = document.getElementById('deliveryType').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const orderNotes = document.getElementById('orderNotes').value;

    if (deliveryType === 'delivery' && !customerAddress) {
        showNotification('Por favor, preencha o endereço!', 'error');
        return;
    }

    const checkoutContent = document.getElementById('checkoutContent');
    checkoutContent.innerHTML = '<div class="spinner"></div><p style="text-align: center; margin-top: 1.5rem; font-size: 1.1rem; color: #92400e; font-weight: 600;">Processando seu pedido...</p>';

    setTimeout(() => {
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0;
        const total = cart.reduce((sum, item) => {
            const extrasPrice = item.extras.length * 2;
            return sum + ((item.price + extrasPrice) * item.quantity);
        }, 0) + deliveryFee;

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

        cart = [];
        updateCart();
    }, 2000);
}

function finishOrder() {
    closeCheckoutModal();
    toggleCart();
    showNotification('Obrigado pela preferência! 😊', 'success');
}

function viewMyOrders() {
    closeCheckoutModal();
    toggleCart();
    scrollToOrders();
}

// ===== RENDERIZAR PEDIDOS =====
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const ordersBadge = document.getElementById('ordersBadge');

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

function startOrderUpdates() {
    setInterval(() => {
        const activeOrders = orders.filter(o => 
            o.status !== 'delivered' && 
            o.status !== 'cancelled'
        );

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
    }, 30000);
}