import express, { Express } from "express"
import cors from "cors"
import { db } from './firebase';

import { getAllCompanies, getCompany } from "./controllers/company.controller";
import { addReview, getReviewsByCompany, deleteReview } from "./controllers/review.controller";
import { Review } from "./../common/types";


const app: Express = express()
const port = 8080

app.use(express.json())
app.use(cors())

// sample route
app.get("/", async (req, res) => {
    res.status(200).json({message: "hello"})
})

// bus_route routes

app.get("/api/companies", async (req, res) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).send({
          message: `SUCCESS retrieved ${companies} from the bus_companies collection in Firestore`,
          data: companies,
        });
    } catch (err) {
        res.status(500).json({
          error: `ERROR: an error occurred in the /api/companies endpoint: ${err}`,
        });
    }
});

app.get("/api/companies/:company", async (req, res) => {
    const companyName: string = req.params.company;

    try {
        const company = await getCompany(companyName);

        if (company === null) {
            res
            .status(404)
            .send({
              error: `ERROR: company with companyName: ${companyName} not found in Firestore`,
            });
        } else {
            res.status(200).send({
              message: `SUCCESS retrieved company with companyName: ${companyName} from the companies collection in Firestore`,
              data: company,
            });
        }
    } catch (err) {
        res.status(500).json({
          error: `ERROR: an error occurred in the /api/companies/:company endpoint: ${err}`,
        });
    }
});


// company routes


// review routes

// add review
app.post("/api/reviews/create", async (req, res) => {
    console.log("[POST] entering '/reviews/create' endpoint");
        const { busCompany, rideDate, ridePrice, rideOrigin, rideDestination, title, rating, reviewText,
            likes, userName, netId, reviewDateTime } = req.body;
        // rideDate is in "YYYY-MM-DD" format
        // dateTimeOfPosting is in standard ISO format: "yyyy-MM-dd'T;HH:mm:ss"
        
        // console.log(rideDate);
        const review: Review = {
            busCompany,
            rideDate,
            ridePrice,
            rideOrigin,
            rideDestination,
            title,
            rating,
            reviewText,
            likes,
            userName,
            netId,
            reviewDateTime
    };

    try {
        await addReview(review);
        res.status(200).send({
            message: `SUCCESS added review from ${userName} to the reviews collection in Firestore`,
        });
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/reviews/create endpoint: ${err}`,   
    }) 
    }
}
)


// get reviews by company
app.get("/api/reviews/:company/all", async (req, res) => {
    const companyName: string = req.params.company;

    try {
        const company = await getCompany(companyName);

        if (company === null) {
            res
            .status(404)
            .send({
              error: `ERROR: company with companyName: ${companyName} not found in Firestore`,
            });
        } else {
            let reviews = await getReviewsByCompany(companyName);
            res.status(200).send({
              message: `SUCCESS retrieved reviews associated wiht companyName: ${companyName} from the reviews collection in Firestore`,
              data: reviews, 
            });
            console.log(reviews);
        }
    } catch (err) {
        res.status(500).json({
          error: `ERROR: an error occurred in the /api/companies/:company endpoint: ${err}`,
        });
    }
}); 

// delete specific review
app.delete("/api/reviews/:review_id/delete", async (req, res) => {
    
    const reviewId: string = req.params.review_id;
    
    try {
        await deleteReview(reviewId);
        res.status(200).send({
            message: `SUCCESS deleted review with : ${reviewId} from the reviews collection in Firestore`,
          });
    } catch (err) {
        res.status(500).json({
          error: `ERROR: an error occurred in the /api/reviews/:review_id/delete endpoint: ${err}`,
        });
    }
});

// listening on port
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})