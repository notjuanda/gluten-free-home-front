import type { CartItem } from './cart.type';

export interface OrderSummaryProps {
    cart: CartItem[];
    onProceedToCheckout: () => void;
    onClearCart: () => void;
}

export interface CartItemCardProps {
    item: CartItem;
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
    onRemove: (productId: number) => void;
} 