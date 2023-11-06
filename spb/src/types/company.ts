import { INote } from "./note";
import { ISeo } from "./seo";

export type ICompany = {
    id: number;
    img: string;
    email: string;
    title: string;
    finalRating: string;
    goodRating: string;
    fastRating: string;
    lowRating: string;
    oficialPrice: string;
    peoplePrice: string;
    ratingPrice: string;
    attestat: string;
    dateSend: string;
    review: string;
    requestCount: string;
}

export type ICompanys = {
    company: ICompany[];
    block: INote;
    seo: ISeo;
}