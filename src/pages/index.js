import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import Articles from "../components/sections/articles"
import About from "../components/sections/about"
import Interests from "../components/sections/interests"
import Languages from "../components/sections/languages"
import Projects from "../components/sections/projects"
import Contact from "../components/sections/contact"
import Work from "../components/sections/work-exp"
import { splashScreen } from "../config"

const IndexPage = ({ data }) => {
  const articles = data.posts.edges.slice(1, data.posts.edges.length);
  return (
    <Layout splashScreen={splashScreen}>
      <SEO title="Mohammad Khalifeh" />
      <Hero content={data.hero.edges} />
      <About content={data.about.edges} />
      <Work content={data.career.edges} />
      {articles.length > 0 ? (<Articles content={data.posts.edges} />) : null}
      <Projects content={data.projects.edges} />
      <Interests content={data.interests.edges} />
      <Languages content={data.languages.edges} />
      <Contact content={data.contact.edges} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
{
  hero: allMdx(filter: {fileAbsolutePath: {regex: "/hero/"}}) {
    edges {
      node {
        body
        frontmatter {
          greetings
          title
          subtitlePrefix
          subtitle
          icon {
            childImageSharp {
              fluid(maxWidth: 60, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
  about: allMdx(filter: {fileAbsolutePath: {regex: "/about/"}}) {
    edges {
      node {
        body
        frontmatter {
          title
          alt
          imageDesc
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
  interests: allMdx(filter: {fileAbsolutePath: {regex: "/interests/"}}) {
    edges {
      node {
        exports {
          shownItems
          interests {
            name
            icon {
              childImageSharp {
                fixed(width: 20, height: 20, quality: 90) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        frontmatter {
          title
        }
      }
    }
  }
  languages: allMdx(filter: {fileAbsolutePath: {regex: "/languages/"}}) {
    edges {
      node {
        exports {
          languages {
            name
            icon {
              childImageSharp {
                fixed(width: 32, height: 32, quality: 90) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            level
          }
        }
        frontmatter {
          title
        }
      }
    }
  }
  career: allMdx(filter: {fileAbsolutePath: {regex: "/career-timeline/"}}) {
    edges {
      node {
        exports {
            milestones{
              name
              location
              desc
              date
              icon
            }
          }
        frontmatter {
          title
        }
      }
    }
  }
  posts: allMdx(filter: {fileAbsolutePath: {regex: "/posts/"},frontmatter: {visiblity: {eq: "true"}}}, sort: {fields: [frontmatter___position], order: ASC}) {
      edges {
        node {
          body
          frontmatter {
            title
            author
            pubdate
            visiblity
            category
            screenshot {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            screenshotAlt
            link
            position
            tags
          }
        }
      }
    }
  projects: allMdx(filter: {fileAbsolutePath: {regex: "/projects/"}, frontmatter: {visible: {eq: "true"}}}, sort: {fields: [frontmatter___position], order: ASC}) {
    edges {
      node {
        body
        frontmatter {
          title
          category
          emoji
          external
          screenshot {
            childImageSharp {
              fluid(maxWidth: 400, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          screenshotAlt
          tags
          position
          buttonVisible
          buttonUrl
          buttonText
        }
      }
    }
  }
  contact: allMdx(filter: {fileAbsolutePath: {regex: "/contact/"}}) {
    edges {
      node {
        body
        frontmatter {
          title
          name
          email
          profileImage {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`


