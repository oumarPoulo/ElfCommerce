import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  NavLink,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  NavbarBrand,
  Container,
  NavItem,
  Badge,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {
  FaRegBell,
} from 'react-icons/fa';

class Navigation extends Component {
  render() {
    return (
      <div className="admin-navbar">
        <Container fluid>
          <Navbar light expand="md">
            <NavbarBrand href="/dashboard">LF Commerce</NavbarBrand>
            <Nav className="ml-auto">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <FaRegBell size={18} />
                  <Badge color="danger">1</Badge>
                </DropdownToggle>
                <DropdownMenu style={{marginLeft: -100, width:280}}>
                  <DropdownItem>
                    <NavLink href="#" style={{whiteSpace: 'normal'}}>
                      <b>A new product has been created.</b><br />
                      <span className="text-muted">Your collegue John Doe has created a new product: sdlfladsjf</span>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="#">
                      <b>A new product has been created.</b>
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>                
                <DropdownToggle nav caret>
                  Nick Chen
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink href="/dashboard">
                      <FormattedMessage id="sys.myAccount" />
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/">
                      <FormattedMessage id="sys.logout" />
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default Navigation;
