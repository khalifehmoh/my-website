/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
        console.log(node.internal.type);
        const value = createFilePath({ node, getNode })
        createNodeField({
            node,
            name: `slug`,
            value: value,
        })
    }
}

const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions

    const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

    if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }

    // Create blog post pages.
    const posts = result.data.allMdx.edges

    // you'll call `createPage` for each result
    posts.forEach(({ node }, index) => {
        createPage({
            // This is the slug you created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/pages/blog.js`),
            // You can use the values in this context in
            // our page layout component
            context: { id: node.id },
        })
    })
}

// exports.createPages = async ({ graphql, actions }) => {
//     // **Note:** The graphql function call returns a Promise
//     // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
//     const result = await graphql(`
//       query {
//         allMdx {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `)
//     console.log(JSON.stringify(result, null, 4))
// }