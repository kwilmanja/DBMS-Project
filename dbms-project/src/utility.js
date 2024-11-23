import {trailSearchID} from "./trails/trail-service";

export const findTrails = async (trailIDs) => {

    const newTrails = [];

    for (const trailID of trailIDs) {
        const trail = await trailSearchID(trailID);
        newTrails.push(trail.data[0]);
    }
    console.log(newTrails);

    newTrails.reverse();

    return newTrails;

}

export const collectTrailIDs = (reviews) => {

    const trailIDs = [];

    reviews.forEach((review) => {
        if(!trailIDs.includes(review.trailID)){
            trailIDs.unshift(review.trailID)
        }
    });

    return trailIDs;

}

export const formatDate = (reviewDate) => {
    const date = new Date(reviewDate);
    const now = Date.now();

    const diffInMs = Math.abs(now - date);
    const diffInHours = Math.floor(diffInMs / (60 * 60 * 1000));

    if(diffInHours < 24){
        return (diffInHours) + "h ago";
    } else {
        return "on " + date.toLocaleDateString();

    }
}
