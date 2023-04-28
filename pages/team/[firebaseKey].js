import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { viewMemberDetails } from '../../api/teamData';

export default function ViewMembers() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h5>
          {memberDetails.name}
        </h5>
        Role: {memberDetails.role}
        <hr />
        <p>
          <Image src={memberDetails.image} alt={memberDetails.title} style={{ width: '300px' }} />
        </p>
      </div>
    </div>
  );
}
