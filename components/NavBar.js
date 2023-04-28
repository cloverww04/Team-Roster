/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GiBlackKnightHelm } from 'react-icons/gi';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="custom-nav">
        <Link passHref href="/">
          <Navbar.Brand className="custom-logo"><GiBlackKnightHelm /> Pog Team Creator <GiBlackKnightHelm /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/viewTeam">
              <Nav.Link className="custom-logo">My Team</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link className="custom-logo">Add Member</Nav.Link>
            </Link>
            <Button className="custom-logo" variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
