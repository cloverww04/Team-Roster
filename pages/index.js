/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getTeam } from '../api/teamData';
import Footer from '../components/Footer';

function Home() {
  const { user } = useAuth();
  const [, setTeam] = useState([]);

  const getAllTheMembers = () => {
    getTeam(user.uid).then(setTeam);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <div id="homeOptions">
        <br />
        <h1>Hello {user.displayName}! </h1>
        <p>
          <Link href="/viewTeam" passHref>
            <Button size="lg" variant="flat" style={{ flex: 1, marginBottom: 0 }}>View Team</Button>
          </Link>
          <Link href="/team/new" passHref>
            <Button size="lg" variant="flat" style={{ flex: 1, marginLeft: 20 }}>Get Started</Button>
          </Link>
        </p>
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
