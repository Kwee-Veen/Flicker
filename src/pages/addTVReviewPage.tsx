import React from "react";
import PageTemplate from "../components/templateTVPage";
import ReviewForm from "../components/tvReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { TVDetailsProps } from "../types/interfaces";

const WriteTVReviewPage: React.FC = () => {
    const location = useLocation();
    const { series_id } = location.state;
    const { data: tv, error, isLoading, isError } = useQuery<TVDetailsProps, Error>(
        ["tv", series_id],
        () => getTVSeries(series_id)
    );

    if (tv) document.title = `Write Review of ${tv.name}`

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tv ? (
                    <PageTemplate tv={tv}>
                        <ReviewForm {...tv} />
                    </PageTemplate>
            ) : (
                <p>Waiting for tv review details</p>
            )}
        </>
    );
};

export default WriteTVReviewPage;