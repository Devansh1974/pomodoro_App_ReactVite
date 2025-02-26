import styled from "styled-components";

const Tags = () => {
  return (
    <TagsContainer>Tags</TagsContainer>
  );
};

export default Tags;

const TagsContainer = styled.div`
  background-color: #fff;
  height: 3rem;
  width: 25rem;
  margin: 0 auto;
  border-radius: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b0000;
  font-size: 1.4rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    height: 2.5rem;
    width: 20rem;
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    height: 2rem;
    width: 15rem;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
`;