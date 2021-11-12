
// SECTION TEMPLATE
// If you want to add more sections to your page, you can use this component as a template

import React, { useEffect, useRef } from "react"
import { useOnScreen } from "../../hooks/"
import { motion, useAnimation } from "framer-motion"
import Img from "gatsby-image"
import styled from "styled-components"

import ContentWrapper from "../../styles/ContentWrapper"

// Full Width Section
const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: unset;
`

// Fixed width container for content stuff
const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const StyledLanguages = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  width: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 75%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
  }

  .language {
    display: flex;
    align-items: center;
    border-bottom: 1px black dashed;
    padding: 18px 0;

    &:first-of-type {
      padding-top: 0
    }

    h4 {
      margin: 0 6px 0 8px
    }

    span {
      font-weight: 700
    }
  }
`

// Add more styled components here

const Languages = ({ content }) => {

  // Extract GraphQL data here  
  const { exports, frontmatter } = content[0].node
  const { languages } = exports;

  const ref = useRef()
  const onScreen = useOnScreen(ref)

  const iControls = useAnimation()
  const bControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      if (onScreen) {
        await iControls.start(i => ({
          opacity: 1, scaleY: 1, transition: { delay: i * 0.1 }
        }))
        await bControls.start({ opacity: 1, scaleY: 1 })
      }
    }
    sequence()
  }, [onScreen, iControls, bControls])
  console.log(languages)

  return (
    <StyledSection id="langauges">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <StyledLanguages ref={ref}>
          {languages.map(({ name, icon, level }, key) => (
            <motion.li
              className='language'
              key={key}
              custom={key}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={iControls}
            >
              <Img className="icon" fixed={icon.childImageSharp.fixed} />
              <h4>{name}:</h4>
              <span>{level}</span>
            </motion.li>
          ))}
        </StyledLanguages>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default Languages
