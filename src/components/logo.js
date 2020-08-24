import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import logo from "../content/favicon.png"
import inv_logo from "../content/favicon-inv.png"

import config from "../config"

const { siteShortTitle } = config

const StyledLogo = styled.div`
  position: relative;
  z-index: 13;

  font-size: ${({ size }) => (size ? size : "1.75rem")};
  font-weight: 900;
  color: ${({ theme, color }) => theme.colors[color] || color};
  

  /* Disable effects when sidebar is open */
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  img{
    width: 100px;
  }
`

const Logo = ({ isFooter }) => {
  let shownLogo;
  isFooter ? shownLogo = inv_logo : shownLogo = logo;
  return (
    <StyledLogo>
      <img alt="favicon" title="home" style={!isFooter ? {
        paddingTop: 15
      } : null} src={shownLogo} />
    </StyledLogo>
  )
}

Logo.propTypes = {
  isFooter: PropTypes.bool.isRequired,
}

export default Logo
