export const PublicationStatus = {
    BORRADOR: 'borrador',
    PENDIENTE_REVISION: 'pendiente_revision',
    PUBLICADO: 'publicado',
} as const;

export type PublicationStatus = typeof PublicationStatus[keyof typeof PublicationStatus];
