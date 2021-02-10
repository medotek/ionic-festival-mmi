export interface Oeuvre {
    key: string;
    name: string;
    categoryId: number;
    url: string;
    date: Date;
    voteId: number;
    description?: string;
    contributeurs?: string;
    realisation?: string;
    technique?: string;

}
