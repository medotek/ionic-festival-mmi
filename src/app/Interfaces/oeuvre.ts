export interface Oeuvre {
    key: string;
    name: string;
    auteur: string;
    categoryId: number;
    url: string;
    voteNumber?: number;
    description?: string;
    contributeurs?: string;
    technique?: string;
    realisation?: string;
    date?: string;
}
