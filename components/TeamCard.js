import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteMember(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <p className="card-text bold">{teamObj.name}</p>
        <p className="card-text bold">Role:  {teamObj.role}</p>
        {/* DYNAMIC LINK TO VIEW THE TEAM DETAILS  */}
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE TEAM DETAILS  */}
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
