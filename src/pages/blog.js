import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentWrapper from "../styles/ContentWrapper"
import Img from "gatsby-image"

const StyledSection = styled.section`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  h1 {
      font-size: 2rem;
  }
  h2 {
      font-size: 1.25rem;
  }
  h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .screenshot{
    height: 30rem
  }
  figcaption{
    text-align: center
  }
`

const shortcodes = { Link }

export default function Blog({ data: { mdx } }) {
  const { frontmatter, body } = mdx;
  return (
    <Layout splashScreen={false}>
      <SEO title={frontmatter.title} />
      <StyledSection id={frontmatter.title}>
        <StyledContentWrapper>
          <h1 className="article-title">{frontmatter.title}</h1>
          <h3 className="article-subtitle">{frontmatter.title}</h3>
          <figure>
            <Img
              className="screenshot"
              fluid={frontmatter.screenshot.childImageSharp.fluid}
            />
            <figcaption>{frontmatter.imageDesc}</figcaption>
          </figure>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </StyledContentWrapper>
      </StyledSection>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        subtitle
        visiblity
        category
        screenshot {
          childImageSharp {
            fluid(quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageDesc
        link
        position
      }
    }
  }
`
