import React from 'react';
import Banner from '../components/Banner';
import VolunteerNeedsNow from '../components/VolunteerNeedsNow';
import TopVolunteers from '../components/TopVolunteers';
import UpcomingEvents from '../components/UpcomingEvents';
import FeaturedCampaigns from '../components/FeaturedCampaigns';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <FeaturedCampaigns></FeaturedCampaigns>
            <TopVolunteers></TopVolunteers>
            <UpcomingEvents></UpcomingEvents>
        </div>
    );
};

export default Home;