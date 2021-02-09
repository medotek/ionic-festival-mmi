export interface Oeuvre {
    key: string;
    name: string;
    categoryId: number;
    url: string;
    voteId: number;
    description?: string;
    //TODO: ajouter contributeur
}
