import React from 'react';
import Banner from '../components/Banner';
import VolunteerNeedsNow from '../components/VolunteerNeedsNow';
import TopVolunteers from '../components/TopVolunteers';
import UpcomingEvents from '../components/UpcomingEvents';
import ClientLogoSlider from '../components/ClientLogoSlider';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <TopVolunteers></TopVolunteers>
            <UpcomingEvents></UpcomingEvents>
           <ClientLogoSlider></ClientLogoSlider>
        </div>
    );
};

export default Home;