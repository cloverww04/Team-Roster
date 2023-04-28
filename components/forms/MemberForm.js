import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { createMember, updateTeam, getTeam } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  image: '',
  name: '',
  role: '',
};

function RoleForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const router = useRouter();
  const [, setTeam] = useState([]);
  const { user } = useAuth();
  const roles = ['Attack', 'Defend', 'Support'];

  useEffect(() => {
    getTeam(user.uid).then(setTeam);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

        {/* IMAGE INPUT  */}
        <FloatingLabel controlId="floatingInput2" label="Enter champion's image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Enter a name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* ROLE SELECT  */}
        <FloatingLabel controlId="floatingSelect" label="Role">
          <Form.Select
            aria-label="Role"
            name="role"
            onChange={handleChange}
            className="mb-3"
            value={formInput.role} // FIXME: modify code to remove error
            required
          >
            <option value="">Select a role</option>
            {
            roles.map((role) => (
              <option
                key={`${role}`}
                value={role}
              >
                {role}
              </option>
            ))
            }
          </Form.Select>
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </>
  );
}

RoleForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    role: PropTypes.string,
  }),
};

RoleForm.defaultProps = {
  obj: intialState,
};

export default RoleForm;
