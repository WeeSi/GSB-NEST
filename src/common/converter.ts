/**
 * Interface Converter
 * 
 * Cette interface permet a une classe qui l'implémente de convertir des Objet Business (Entités)
 * En objet utilisé par le client (DTO) et inversement.
 */
export interface Converter<T, U> {
    //Convertir de DTO en Entité
    convertInbound?: (dtoObject: T) => U;
    //Convertir untableau de DTO en tableau d'Entité
    convertInboundCollection?: (dtoObject: T[]) => U[];
    //Convertir de Entité en DTO
    convertOutbound?: (businessObject: U) => T;
    //Convertir de tableau d'Entité en tableau de DTO
    convertOutboundCollection?: (businessObject: U[]) => T[];
}