export interface Oeuvre {
    key: string;
    name: string;
    categoryId: string;
    url: string;
    voteId: number;
    nbImages: number;
    description?: string;
    contributeurs?: string;
    technique?: string;
    realisation?: string;
    date?: string;
}
