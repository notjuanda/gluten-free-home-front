import type { Product } from '@/modules/core/types/product.type';

export interface CartItem {
    product: Product;
    quantity: number;
}
