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
import Underlining from "../styles/Underlining"

const StyledSection = styled.article`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: auto;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.background};
  h1 {
      font-size: 2rem;
      line-height: 2.7rem
  }
  h2 {
      font-size: 1.7rem;
  }
  h3 {
      font-size: 1.4rem;
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
  .article-title{
    margin-top: 4rem;
    margin-bottom: 0;
  }
  .article-subtitle{
    margin-top: 0;
    font-style: italic;
    text-decoration: underline;
    margin-bottom: 0
  }
  .article-pubDate{
    font-style: italic;
  }
  .screenshot{
    height: 30rem
  }
  figcaption{
    text-align: center;
    color: #3c3c3c;
  }
  .tags {
    
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    line-height: 1.2rem;
    span {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
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
          <h3 className="article-subtitle">By {frontmatter.author}</h3>
          <span className="article-pubDate">published on: {frontmatter.pubdate}</span>
          <figure>
            <Img
              alt={frontmatter.screenshotAlt}
              className="screenshot"
              fluid={frontmatter.screenshot?.childImageSharp?.fluid}
            />
            <figcaption>{frontmatter.imageDesc}</figcaption>
          </figure>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          <div className="tags">
            {frontmatter.tags?.map(tag => (
              <Underlining
                key={tag}
                color="secondary"
                hoverColor="secondary"
              >
                {tag}
              </Underlining>
            ))}
          </div>
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
        author
        pubdate
        visiblity
        category
        screenshot {
          childImageSharp {
            fluid(quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        screenshotAlt
        imageDesc
        link
        position
        tags
      }
    }
  }
`
