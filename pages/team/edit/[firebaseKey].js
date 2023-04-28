import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMemberDetails } from '../../../api/teamData';
import MemberForm from '../../../components/forms/MemberForm';

export default function ViewMembers() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (<MemberForm obj={memberDetails} />);
}
