import React from "react"

import Layout from "../components/layout"
import BarChart from "../components/BarChart"
import Bullseye from "../components/Bullseye"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Otter" />
    <p>We are going to try to make a reactive version of the CAIDA otter plots.</p>
    <p>See the parent site for more information about <a href="refraction.network">Refraction Networking</a>.</p>
    <div style={{ maxWidth: `100px`, marginBottom: `0.45rem` }}>
      <BarChart />
      <Bullseye />
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

      <li>
        <a href="www.d3noob.org/2014/02/styles-in-d3js.html">D3 style tips</a>
      </li>

      <li>
        <a href="https://chartio.com/resources/tutorials/how-to-show-data-on-mouseover-in-d3js/">Mouseover Text</a>
      </li>
      <li>
        <a href="http://bl.ocks.org/alansmithy/e984477a741bc56db5a5">Enter(), Exit(), and Update() -- working with data</a>
      </li>
      <li>
        <a href="https://www.d3-graph-gallery.com/graph/network_basic.html">D3 graph intro</a>
      </li>
      
            
    </ul>
  </Layout>
)

export default IndexPage
