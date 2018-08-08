export const enum TagSituationEnum {
    'ATIVO' = 'A',
    'INATIVO' = 'I'
}

export class Tag {
    constructor(
        id?: number,
        description?: string,
        situation?: TagSituationEnum,
    ) { }
}