import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>This is my gatsby Netlify site.</p>
    <p>We are going to try to make a rective version of the CAIDA otter plots.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <a href="refraction.network">Refraction Networking Parent Site</a>
    <h2>Link Resources</h2>
    <ul>
      <li>
        <a href="https://www.caida.org/research/topology/as_core_network/2014/">AS CORE Network Graph</a>
      </li>
      <li>
        <a href="https://stats.apnic.net/vizas/index.html">APNIC AS relations visualization</a>
      </li>
      <li>
        <a href="https://stat.ripe.net/special/bgplay">RIPE NCC BGPLAY visualization.</a>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
