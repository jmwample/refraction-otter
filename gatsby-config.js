module.exports = {
  siteMetadata: {
    title: `Refraction AS Visualization`,
    description: `Reactive application for viewing AS relations based on BGP data.`,
    author: `@jmwample`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Refraction Otter`,
        short_name: `otter`,
        start_url: `/`,
        background_color: `#1fffe3`,
        theme_color: `#1fffe3`,
        display: `minimal-ui`,
        icon: `src/images/refraction_identity2.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}


// 1fffe3 -> bg
// b2ffda -> lg
// b2f7ea -> lb
