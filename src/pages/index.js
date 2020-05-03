import React from "react"

import Layout from "../components/layout"
// import BarChart from "../components/BarChart"
// import TestGraph from "../components/TestGraph"
// import TestGraph2 from "../components/TestGraph2"
import TestBarChart from "../components/TestBarChart"

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Otter" />
    <p>We are going to try to make a reactive version of the CAIDA otter plots.</p>
    <p>See the parent site for more information about <a href="refraction.network">Refraction Networking</a>.</p>
    <div style={{ maxWidth: `100px`, marginBottom: `0.45rem` }}>

      <TestBarChart />
   </div>
  </Layout>
)

export default IndexPage
