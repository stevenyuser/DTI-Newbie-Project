// @ts-nocheck

import { BusCompanyEnum, Review } from "../../common/types";
import { db } from "../firebase";

const reviewCollectionRef = db.collection('reviews');


export const addReview = async (review: Review) => {
    const newDoc = reviewCollectionRef.doc();
    return await newDoc.set(review);
};


export const getReviewsByCompany = async (company_name : string) => {
    const snapshot = await reviewCollectionRef.where("busCompany", "==", company_name).get();
    let reviews = {};

    snapshot.forEach((doc) => {
        reviews[doc.id] = doc.data() as Review;
    })

    return reviews;
};


export const deleteReview = async (review_id: string) => {
    // const snapshot = await reviewCollectionRef.where("reviewDateTime", "==", reviewDateTime).where("userName", "==", userName).get();
    // return await snapshot.delete();
    return await reviewCollectionRef.doc(review_id).delete();
};