export interface Oeuvre {
    key: string;
    name: string;
    categoryId: number;
    url: string;
    voteId: number;
    description?: string;
    contributeurs?: string;
}
