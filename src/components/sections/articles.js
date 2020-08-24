import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import VisibilitySensor from "react-visibility-sensor"
import { motion } from "framer-motion"

import { useOnScreen } from "../../hooks"
import ContentWrapper from "../../styles/ContentWrapper"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 3rem;
  .cta-btn {
    display: block;
    text-align: center;
    margin: 2rem auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0 auto;
    }
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .articles {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: -2.5rem;
      padding: 4.5rem 2.5rem 0 2.5rem;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        // flex-direction: column;
        // margin-top: 0;
        // padding: 0;
        padding: 4.5rem 0rem 0rem 0rem;
        overflow: visible;
      }
      /* Show scrollbar if desktop and wrapper width > viewport width */
      @media (hover: hover) {
        &::-webkit-scrollbar {
          display: block;
          -webkit-appearance: none;
        }

        &::-webkit-scrollbar:horizontal {
          height: 0.8rem;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          border: 0.2rem solid white;
          background-color: rgba(0, 0, 0, 0.5);
        }

        &::-webkit-scrollbar-track {
          background-color: #fff;
          border-radius: 8px;
        }
      }
    }
    .counter {
      position: absolute;
      top: 2.2rem;
      right: 2.5rem;
      font-size: 1.125rem;
      font-weight: 500;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: none;
      }
    }
  }
`

const StyledArticle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  margin-bottom: 2rem;
  max-width: 30rem;
  box-shadow: 0 0 2.5rem rgba(0,0,0,0.16);
  transition: all 0.3s ease-out;
  cursor:pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  justify-content: space-between;
  flex-shrink: 1;
  width: 40%;
  margin-right: 40px;
  margin-bottom: 10rem;
  padding-right: 0;
  flex-direction: column;
  &:hover {
    transform: translate3d(0px, -0.125rem, 0px);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    max-width: 25rem;
    margin-top: 0rem;
    padding-right: 0rem;
    margin-right:0px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
  .details {
    width: 100%;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    // margin-top: 3rem;
    padding: 30px;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: 0;
    }
    .category {
      font-size: 0.875rem;
      line-height: 1rem;
      text-transform: uppercase;
      letter-spacing: +1px;
    }
    .title {
      margin-top: 0.625rem;
      margin-bottom: 0.625rem;
      font-size: 1.375rem;
      line-height: 1.625rem;
      font-weight: 700;
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
    .links {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin-top: 1rem;
      a {
        display: inline-block;
        margin-right: 2rem;
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
        transition: all 0.3s ease-out;
      }
      svg:hover {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  .screenshot {
    width: 100%;
    max-width: 25rem;
    height: 15rem;
    border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 13.75rem;
    }
  }
`

const Articles = ({ content }) => {
  const sectionDetails = content[0].node
  const articles = content.slice(1, content.length)

  // visibleProject is needed to show which project is currently
  // being viewed in the horizontal slider on mobile and tablet
  const [visibleArticle, setVisibleArticle] = useState(1)

  // articles don't track the visibility by using the onScreen hook
  // instead they use react-visibility-sensor, therefore their visibility
  // is also stored differently
  const [onScreen, setOnScreen] = useState({})
  const handleOnScreen = el => {
    if (!onScreen[el]) {
      const updatedOnScreen = { ...onScreen }
      updatedOnScreen[el] = true
      setOnScreen(updatedOnScreen)
    }
  }
  const pVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    console.log(content)
    // mobile and tablet only: set first project as visible in the
    // horizontal slider
    setVisibleArticle(1)
    // required for animations: set visibility for all articles to
    // "false" initially
    let initial = {}
    articles.forEach(article => {
      initial[article.node.frontmatter.position] = false
    })
    setOnScreen(initial)
  }, [])

  // Required for animating the title
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)
  const tVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <StyledSection id="articles">
      <StyledContentWrapper>
        <motion.div
          ref={tRef}
          variants={tVariants}
          animate={tOnScreen ? "visible" : "hidden"}
        >
          <h3 className="section-title">{sectionDetails.frontmatter.title}</h3>
          <div className="counter">
            {visibleArticle} / {articles.length}
          </div>
        </motion.div>
        <div className="articles">
          {articles.map(article => {
            const { body, frontmatter } = article.node
            return (
              <VisibilitySensor
                key={frontmatter.position}
                onChange={() => handleOnScreen(frontmatter.position)}
                partialVisibility={true}
                minTopValue={100}
              >
                <StyledArticle
                  position={frontmatter.position}
                  variants={pVariants}
                  animate={
                    onScreen[frontmatter.position] ? "visible" : "hidden"
                  }
                >
                  {/* <VisibilitySensor
              onChange={() => setVisibleArticle(frontmatter.position)}
            >
              <Img
                className="screenshot"
                fluid={frontmatter.screenshot.childImageSharp.fluid}
              />
            </VisibilitySensor> */}
                  <Img
                    className="screenshot"
                    fluid={frontmatter.screenshot.childImageSharp.fluid}
                  />
                  <div className="details">
                    <div className="category">
                      {frontmatter.emoji} {frontmatter.category}
                    </div>
                    <div className="title">{frontmatter.title}</div>
                    {frontmatter.short}
                  </div>
                  {/* If image in viewport changes, update state accordingly */}
                </StyledArticle>
              </VisibilitySensor>
            )
          })}
        </div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default Articles
