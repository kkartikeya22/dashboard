import { InvestigationGPT } from "./InvestigationGPT/InvestigationGPT"
import { motion } from "framer-motion"
import styled from "styled-components"

const StyledBottom = styled.div`
  padding: 0.75rem;
  background: linear-gradient(to right, #EDF2FF, #E7F5FF); /* Soft blue gradient */
  border-radius: 12px;
  border: 1px solid #BAC8FF;
  box-shadow: 0 4px 6px rgba(99, 148, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 148, 255, 0.08);
    background: linear-gradient(to right, #F8F9FF, #EDF2FF);
    border-color: #91A7FF;
  }
`

const AnimatedContainer = styled(motion.div)`
  width: 100%;
  padding: 0.5rem;
  color: #4263EB; /* Primary blue color */

  &:hover {
    color: #364FC7; /* Darker blue on hover */
  }
`

export function AppBottom() {
  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <StyledBottom>
        <InvestigationGPT />
      </StyledBottom>
    </AnimatedContainer>
  )
}
