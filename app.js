(function () {
    'use strict';

    const C = window.MO7A_CONFIG;
    const MENU = window.MO7A_MENU;
    const CART_KEY = 'mo7a_cart_v1';
    const CUST_KEY = 'mo7a_customer_v1';

    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

    // ---------- بيانات ----------
    const byId = {};
    MENU.forEach(sec => sec.items.forEach(it => { byId[it.id] = it; }));

    let cart = loadCart();
    let lastFocus = null;

    // ---------- تخزين محلي (آمن لو المتصفح مانع التخزين) ----------
    function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
    function read(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }

    function loadCart() {
        const raw = read(CART_KEY) || {};
        const clean = {};
        Object.keys(raw).forEach(id => {
            const q = parseInt(raw[id], 10);
            if (byId[id] && byId[id].available !== false && q > 0) clean[id] = Math.min(q, 99);
        });
        return clean;
    }

    // ---------- أدوات ----------
    const money = n => n + ' ج';
    function el(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text !== undefined) e.textContent = text;
        return e;
    }
    function toArabicDigits(s) { return s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)); }
    function normalize(s) {
        return toArabicDigits(String(s)).toLowerCase()
            .replace(/[\u064B-\u0652\u0640]/g, '')
            .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
    }
    let toastTimer;
    function toast(msg) {
        const t = $('#toast');
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
    }

    // ---------- حسابات ----------
    function subtotal() {
        return Object.keys(cart).reduce((s, id) => s + byId[id].price * cart[id], 0);
    }
    function count() {
        return Object.keys(cart).reduce((s, id) => s + cart[id], 0);
    }
    function orderType() { return $('input[name="otype"]:checked').value; }
    function deliveryFee(sub) {
        if (orderType() !== 'delivery') return 0;
        if (C.deliveryFee === null || C.deliveryFee === undefined) return null; // غير محددة
        if (C.freeDeliveryFrom && sub >= C.freeDeliveryFrom) return 0;
        return C.deliveryFee;
    }

    // ---------- بناء المنيو ----------
    function buildMenu() {
        const nav = $('#nav');
        const menu = $('#menu');

        MENU.forEach((sec, i) => {
            const b = el('button', 'cat-btn' + (i === 0 ? ' active' : ''), sec.icon + ' ' + sec.nav);
            b.type = 'button';
            b.dataset.target = sec.id;
            nav.appendChild(b);

            const s = el('section', 'menu-section');
            s.id = sec.id;
            const h = el('div', 'section-header');
            h.appendChild(el('h2', 'section-badge', sec.icon + ' ' + sec.title));
            s.appendChild(h);

            const grid = el('div', 'menu-grid');
            sec.items.forEach(it => grid.appendChild(buildCard(it)));
            s.appendChild(grid);
            menu.appendChild(s);
        });
    }

    function buildCard(it) {
        const unavailable = it.available === false;
        const card = el('article', 'menu-item' + (unavailable ? ' unavailable' : ''));
        card.dataset.id = it.id;
        card.dataset.search = normalize(it.name + ' ' + (it.desc || ''));

        if (it.image) {
            const img = el('img', 'item-img');
            img.src = it.image; img.alt = it.name; img.loading = 'lazy';
            card.appendChild(img);
        }

        const head = el('div', 'item-header');
        const info = el('div');
        if (it.badge) info.appendChild(el('span', 'item-badge', it.badge));
        info.appendChild(el('h3', 'item-title', it.name));
        if (it.desc) info.appendChild(el('div', 'item-desc', it.desc));
        head.appendChild(info);
        head.appendChild(el('div', 'item-price', money(it.price)));
        card.appendChild(head);

        const ctr = el('div', 'item-controls');
        if (unavailable) {
            ctr.appendChild(el('span', 'sold-out', 'غير متاح حاليًا'));
        } else {
            ctr.appendChild(el('span', 'qty-label', 'الكمية:'));
            ctr.appendChild(stepper(it));
        }
        card.appendChild(ctr);
        return card;
    }

    function stepper(it) {
        const g = el('div', 'qty-btn-group');
        const minus = el('button', 'btn-qty', '−');
        minus.type = 'button'; minus.dataset.act = 'dec'; minus.dataset.id = it.id;
        minus.setAttribute('aria-label', 'تقليل ' + it.name);
        const val = el('span', 'qty-val', '0');
        val.dataset.qty = it.id;
        const plus = el('button', 'btn-qty', '+');
        plus.type = 'button'; plus.dataset.act = 'inc'; plus.dataset.id = it.id;
        plus.setAttribute('aria-label', 'زيادة ' + it.name);
        g.append(minus, val, plus);
        return g;
    }

    // ---------- تغيير الكميات ----------
    function change(id, delta) {
        const it = byId[id];
        if (!it || it.available === false) return;
        const q = Math.max(0, Math.min(99, (cart[id] || 0) + delta));
        if (q === 0) delete cart[id]; else cart[id] = q;
        store(CART_KEY, cart);
        refresh();
    }

    function remove(id) { delete cart[id]; store(CART_KEY, cart); refresh(); }

    function clearCart() { cart = {}; store(CART_KEY, cart); refresh(); }

    // ---------- تحديث الواجهة ----------
    function refresh() {
        // كروت المنيو
        $$('[data-qty]').forEach(v => {
            const q = cart[v.dataset.qty] || 0;
            v.textContent = q;
            const card = v.closest('.menu-item');
            if (card) card.classList.toggle('in-cart', q > 0);
        });

        const sub = subtotal();
        $('#cart-count').textContent = count();
        $('#bar-total').textContent = sub + ' جنيه';

        renderCartList();
        renderSummary(sub);
    }

    function renderCartList() {
        const list = $('#cart-list');
        list.textContent = '';
        const ids = Object.keys(cart);
        $('#empty-cart').hidden = ids.length > 0;
        $('#clear-cart').hidden = ids.length === 0;
        $('#order-form').hidden = ids.length === 0 || !$('#done').hidden;

        ids.forEach(id => {
            const it = byId[id];
            const li = el('li', 'cart-row');
            const info = el('div', 'cart-row-info');
            info.appendChild(el('div', 'cart-row-name', it.name));
            info.appendChild(el('div', 'cart-row-sub', money(it.price) + ' × ' + cart[id] + ' = ' + money(it.price * cart[id])));
            li.appendChild(info);

            const g = el('div', 'qty-btn-group');
            const plus = el('button', 'btn-qty', '+'); plus.type = 'button';
            plus.dataset.act = 'inc'; plus.dataset.id = id; plus.setAttribute('aria-label', 'زيادة ' + it.name);
            const val = el('span', 'qty-val', String(cart[id]));
            const minus = el('button', 'btn-qty', '−'); minus.type = 'button';
            minus.dataset.act = 'dec'; minus.dataset.id = id; minus.setAttribute('aria-label', 'تقليل ' + it.name);
            g.append(minus, val, plus);
            li.appendChild(g);

            const del = el('button', 'icon-btn small', '🗑️'); del.type = 'button';
            del.dataset.act = 'del'; del.dataset.id = id; del.setAttribute('aria-label', 'حذف ' + it.name);
            li.appendChild(del);
            list.appendChild(li);
        });
    }

    function renderSummary(sub) {
        const fee = deliveryFee(sub);
        $('#sum-sub').textContent = money(sub);
        const feeEl = $('#sum-fee');
        let total = sub;
        if (orderType() === 'pickup') feeEl.textContent = 'بدون';
        else if (fee === null) feeEl.textContent = 'تتحدد عند التأكيد';
        else if (fee === 0) feeEl.textContent = 'مجاني 🎉';
        else { feeEl.textContent = money(fee); total += fee; }
        $('#sum-total').textContent = money(total);

        let hint = '';
        if (orderType() === 'delivery') {
            if (C.minOrder && sub < C.minOrder) hint = 'أقل طلب للتوصيل ' + money(C.minOrder) + ' (باقي ' + money(C.minOrder - sub) + ')';
            else if (C.freeDeliveryFrom && fee !== 0 && C.deliveryFee) hint = 'اطلب بـ ' + money(C.freeDeliveryFrom - sub) + ' زيادة والتوصيل مجاني!';
        }
        $('#sum-hint').textContent = hint;
        $('#address-group').hidden = orderType() === 'pickup';
    }

    // ---------- السلة (نافذة) ----------
    function openDrawer() {
        lastFocus = document.activeElement;
        $('#done').hidden = true;
        $('#drawer').hidden = false;
        document.body.classList.add('noscroll');
        refresh();
        const c = $('.drawer-head .icon-btn'); if (c) c.focus();
    }
    function closeDrawer() {
        $('#drawer').hidden = true;
        document.body.classList.remove('noscroll');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // ---------- التحقق والإرسال ----------
    function setErr(name, msg) {
        const e = $('[data-err="' + name + '"]');
        if (e) e.textContent = msg || '';
        const map = { name: 'cust-name', phone: 'cust-phone', address: 'cust-address' };
        const f = $('#' + map[name]);
        if (f) f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    function validate() {
        let ok = true, first = null;
        const name = $('#cust-name').value.trim();
        const phone = toArabicDigits($('#cust-phone').value).replace(/[\s-]/g, '');
        const address = $('#cust-address').value.trim();
        const delivery = orderType() === 'delivery';

        setErr('name', ''); setErr('phone', ''); setErr('address', ''); $('#min-err').textContent = '';

        if (name.length < 2) { setErr('name', 'اكتب اسمك'); ok = false; first = first || '#cust-name'; }
        if (!/^01[0125]\d{8}$/.test(phone)) { setErr('phone', 'رقم موبايل مصري غير صحيح (مثال: 01012345678)'); ok = false; first = first || '#cust-phone'; }
        if (delivery && address.length < 8) { setErr('address', 'اكتب عنوان التوصيل بالتفصيل'); ok = false; first = first || '#cust-address'; }
        if (delivery && C.minOrder && subtotal() < C.minOrder) {
            $('#min-err').textContent = 'أقل طلب للتوصيل ' + money(C.minOrder);
            ok = false;
        }
        if (!ok && first) $(first).focus();
        return ok ? { name, phone, address, delivery } : null;
    }

    function buildMessage(d) {
        const sub = subtotal();
        const fee = deliveryFee(sub);
        const total = sub + (fee || 0);
        const notes = $('#cust-notes').value.trim();
        const L = [];
        L.push('🚀 *طلب جديد - ' + C.restaurantName + '*', '');
        L.push('🛵 *النوع:* ' + (d.delivery ? 'توصيل' : 'استلام من الفرع'));
        L.push('👤 *الاسم:* ' + d.name);
        L.push('📞 *التليفون:* ' + d.phone);
        if (d.delivery) L.push('🏠 *العنوان:* ' + d.address);
        L.push('💳 *الدفع:* ' + $('#cust-pay').value);
        if (notes) L.push('📝 *ملاحظات:* ' + notes);
        L.push('', '-------------------------', '📋 *قائمة الطلبات:*');
        Object.keys(cart).forEach(id => {
            const it = byId[id];
            L.push('▪️ ' + it.name + ' × ' + cart[id] + ' = ' + (it.price * cart[id]) + ' جنيه');
        });
        L.push('-------------------------');
        L.push('🧾 المجموع: ' + sub + ' جنيه');
        if (d.delivery) {
            if (fee === null) L.push('🛵 التوصيل: يُحدد عند التأكيد');
            else if (fee === 0) L.push('🛵 التوصيل: مجاني');
            else L.push('🛵 التوصيل: ' + fee + ' جنيه');
        }
        L.push('💰 *الإجمالي:* ' + total + ' جنيه' + (d.delivery && fee === null ? ' + التوصيل' : ''));
        L.push('', 'شكراً لاختياركم ' + C.restaurantName + '! ❤️');
        return L.join('\n');
    }

    function submitOrder(e) {
        e.preventDefault();
        if (!count()) { toast('السلة فاضية'); return; }
        const d = validate();
        if (!d) return;

        store(CUST_KEY, { name: d.name, phone: d.phone, address: d.address });
        const url = 'https://wa.me/' + C.whatsappNumber + '?text=' + encodeURIComponent(buildMessage(d));
        const w = window.open(url, '_blank');
        $('#done-link').href = url;
        $('#order-form').hidden = true;
        $('#cart-list').textContent = '';
        $('#clear-cart').hidden = true;
        $('#done').hidden = false;
        if (!w) { window.location.href = url; }
    }

    // ---------- بحث ----------
    function applySearch() {
        const q = normalize($('#search').value.trim());
        let any = false;
        $$('.menu-section').forEach(sec => {
            let vis = 0;
            $$('.menu-item', sec).forEach(card => {
                const show = !q || card.dataset.search.indexOf(q) !== -1;
                card.hidden = !show;
                if (show) vis++;
            });
            sec.hidden = vis === 0;
            if (vis) any = true;
        });
        $('#no-results').hidden = any;
    }

    // ---------- تنقل الأقسام ----------
    function setActive(id) {
        $$('.cat-btn').forEach(b => {
            const on = b.dataset.target === id;
            b.classList.toggle('active', on);
            if (on) {
                b.scrollIntoView({ block: 'nearest', inline: 'center' });
            }
        });
    }
    function initScrollSpy() {
        if (!('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
        }, { rootMargin: '-25% 0px -65% 0px' });
        $$('.menu-section').forEach(s => io.observe(s));
    }

    // ---------- الفوتر ----------
    function buildFooter() {
        $('#footer-address').textContent = '📍 ' + C.address;
        const ph = $('#footer-phones');
        ph.appendChild(el('strong', null, '📞 خدمة العملاء والطلبات:'));
        C.phones.forEach(p => {
            const a = el('a', null, p);
            a.href = 'tel:+2' + p; a.dir = 'ltr';
            ph.appendChild(a);
        });
        if (C.workingHours) $('#footer-hours').textContent = '🕒 ' + C.workingHours;
        if (C.mapUrl) { const m = $('#footer-map'); m.href = C.mapUrl; m.hidden = false; }
        if (C.workingHours) $('#header-info').textContent = '🕒 ' + C.workingHours;
    }

    function buildPayments() {
        const sel = $('#cust-pay');
        C.paymentMethods.forEach(m => { const o = el('option', null, m); o.value = m; sel.appendChild(o); });
    }

    function restoreCustomer() {
        const c = read(CUST_KEY);
        if (!c) return;
        $('#cust-name').value = c.name || '';
        $('#cust-phone').value = c.phone || '';
        $('#cust-address').value = c.address || '';
    }

    // ---------- أحداث ----------
    function bind() {
        document.addEventListener('click', e => {
            const t = e.target.closest('[data-act],[data-target],[data-close]');
            if (!t) return;
            if (t.dataset.act === 'inc') change(t.dataset.id, 1);
            else if (t.dataset.act === 'dec') change(t.dataset.id, -1);
            else if (t.dataset.act === 'del') remove(t.dataset.id);
            else if (t.dataset.target) {
                const s = document.getElementById(t.dataset.target);
                if (s) { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(t.dataset.target); }
            } else if (t.hasAttribute('data-close')) closeDrawer();
        });

        $('#open-cart').addEventListener('click', openDrawer);
        $('#clear-cart').addEventListener('click', () => { if (confirm('تفريغ السلة بالكامل؟')) clearCart(); });
        $('#new-order').addEventListener('click', () => { clearCart(); $('#done').hidden = true; closeDrawer(); toast('تم تفريغ السلة'); });
        $('#order-form').addEventListener('submit', submitOrder);
        $$('input[name="otype"]').forEach(r => r.addEventListener('change', () => renderSummary(subtotal())));
        $('#search').addEventListener('input', applySearch);

        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#drawer').hidden) closeDrawer(); });
    }

    // ---------- تشغيل ----------
    buildMenu();
    buildFooter();
    buildPayments();
    restoreCustomer();
    bind();
    initScrollSpy();
    refresh();
})();
