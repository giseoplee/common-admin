import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/ldcc_logo.png'
import sygnet from '../../assets/img/lotte_logo.png'
import avatar9 from '../../assets/img/avatars/User-Circle-512.png';

import { logoutRequest } from '../../actions/auth/AuthActions';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.props.logoutRequest().then(
        _ => {
            this.props.history.push('/login');
        }
    );
  }

  render() {
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 115, height: 29, alt: 'LDCC Gateway'}}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'LDCC' }}
        />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={avatar9} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>내 계정</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> 프로필</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> 설정</DropdownItem>
              <DropdownItem onClick={() => {this.handleLogout();}}><i className="fa fa-lock"></i> 로그아웃</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {this.props.page === "main"? null : <AppAsideToggler className="d-md-down-none" />}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
      status: state.authentication.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logoutRequest: () => {
          return dispatch(logoutRequest());
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));