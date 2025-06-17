export const CommentStatus = {
    VISIBLE: 'visible',
    OCULTO: 'oculto',
    PENDIENTE: 'pendiente',
} as const;

export type CommentStatus = typeof CommentStatus[keyof typeof CommentStatus];
