
import React from "react";
import styled from "styled-components";

import ContentWrapper from "../../styles/ContentWrapper";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// Full Width Section
const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
`

// Fixed width container for content stuff
const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .vertical-timeline.vertical-timeline-custom-line::before {
    background: #424242;
  }
  .vertical-timeline-element-content{
    box-shadow: 0 0 2.5rem rgba(0,0,0,0.16);
  }
  .vertical-timeline-element-icon{
    background: ${({ theme }) => theme.colors.secondary};
    color: #424242;
    box-shadow: 0 0 0 4px #fff, inset 0 2px 1px 0px #424242, 0 6px 6px 3px #424242;;
  }
  .timeline-icon{
    fill:#424242
  }
  .vertical-timeline-element-content .vertical-timeline-element-date {
    padding: .8em;
    opacity: 0.8
  }
`

const MileIcon = (props) => {
  if (props.icon === 'work') {
    return (<svg className="timeline-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></svg>)
  }
  else if (props.icon === 'education') {
    return (<svg className="timeline-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"></path></svg>)
  }
  else if (props.icon === 'star') {
    return (<svg className="timeline-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>)
  }
  else {
    return (null)
  }
}

const Work = ({ content }) => {

  // Extract GraphQL data here  
  const { exports, frontmatter } = content[0].node;
  const { milestones } = exports

  return (
    <StyledSection id="career">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <VerticalTimeline className="vertical-timeline-custom-line">
          {milestones.map((m, i) =>
            <VerticalTimelineElement key={i} icon={<MileIcon icon={m.icon} />} date={m.date} className="vertical-timeline-element--work">
              <h3 className="vertical-timeline-element-title">{m.name}</h3>
              <h4 className="vertical-timeline-element-subtitle">{m.location}</h4>
              <p>
                {m.desc}
              </p>
            </VerticalTimelineElement>)}
        </VerticalTimeline>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default Work
