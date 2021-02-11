export interface Oeuvre {
    key: string;
    name: string;
    auteur: string;
    categoryId: string;
    url: string;
    voteNumber?: number;
    nbImages: number;
    description?: string;
    contributeurs?: string;
    technique?: string;
    realisation?: string;
    date?: string;
}
