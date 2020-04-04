/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


// const fs = require("fs")
// const yaml = require("js-yaml")
exports.createPages = ({ actions }) => {
  const { createPage } = actions
//   const ymlDoc = yaml.safeLoad(fs.readFileSync("./content/index.yaml", "utf-8"))
  const contentLayout = require("./content/content-layout.json")
  contentLayout.forEach(element => {
    createPage({
      path: element.route,
      component: require.resolve("./src/templates/otter-page.js"),
      context: {
        pageContent: element.name_iso_en,
        dataFilename: element.file_path,
      },
    })
  })
}