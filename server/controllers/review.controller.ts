// @ts-nocheck

import { BusCompany, Review } from "../../common/types";
import { db } from "../firebase";

const companyCollectionRef = db.collection("bus_companies");
const reviewCollectionRef = db.collection('reviews');

export const addReview = async (review: Review) => {
    const companyDoc = await companyCollectionRef.doc(review.busCompanyId).get();
    if (!companyDoc.exists) {
        console.log('No such document!');
        return null;
    } else {
        const company = companyDoc.data() as BusCompany;
        companyCollectionRef.doc(review.busCompanyId).update({
                            "numReviews": company.numReviews + 1,
                            "averageRating": (company.averageRating * company.numReviews + review.rating) / (company.numReviews + 1)
                        })
    }

    const newDoc = reviewCollectionRef.doc();
    return await newDoc.set(review);
};


export const getReviewsByCompany = async (companyId: string) => {
    const snapshot = await reviewCollectionRef.where("busCompanyId", "==", companyId).get();
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