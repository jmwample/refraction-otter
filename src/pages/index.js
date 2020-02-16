import React from "react"

import Layout from "../components/layout"
import BarChart from "../components/BarChart"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Otter" />
    <p>We are going to try to make a reactive version of the CAIDA otter plots.</p>
    <p>See the parent site for more information about <a href="refraction.network">Refraction Networking</a>.</p>
    <div style={{ maxWidth: `100px`, marginBottom: `0.45rem` }}>
      <BarChart />
   </div>
    <h2>Resource Links</h2>
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
      <li>
        <a href="http://www.routeviews.org/routeviews/index.php/tools/">RouteViews BGP Data Collection</a>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
