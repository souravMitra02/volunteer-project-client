import React from 'react';
import Banner from '../components/Banner';
import VolunteerNeedsNow from '../components/VolunteerNeedsNow';
import TopVolunteers from '../components/TopVolunteers';
import UpcomingEvents from '../components/UpcomingEvents';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <TopVolunteers></TopVolunteers>
            <UpcomingEvents></UpcomingEvents>
        </div>
    );
};

export default Home;