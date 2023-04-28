/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function MyTeam() {
  const [team, setTeam] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getTeam(user.uid).then(setTeam);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/team/new" passHref>
        <Button>Add A Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {team.map((member) => (
          <TeamCard key={member.firebaseKey} teamObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>

    </div>
  );
}

export default MyTeam;
