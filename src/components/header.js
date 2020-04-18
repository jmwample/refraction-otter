import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"


const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#FFFFFF`,
      marginBottom: `1.45rem`,
      borderBottom: `3px solid #000000`,
    }}
  >
    <div class="headerimg"></div>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0.75rem 1.0875rem`,
        textAlign: `center`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#000000`,
            textDecoration: `none`,
          }}
        >
          <Image />
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
