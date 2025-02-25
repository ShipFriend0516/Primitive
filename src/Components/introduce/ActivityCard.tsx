import styled from "styled-components";

interface ActivityCardStyledProps {
  $backgroundImage?: string;
}

const ActivityCardStyled = styled.div<ActivityCardStyledProps>`
  padding: 20px;
  box-shadow: 0 0 3px gray;
  border-radius: 20px;
  min-height: 30%;
  position: relative;
  aspect-ratio: 16/9;
  background-color: white;
  font-weight: bold;

  h4 {
    font-size: 1.8rem;
    position: relative;
    color: white;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    padding-left: 0.1em;
    border-radius: 5px;
  }

  p {
    font-size: 1.2rem;
    position: relative;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    color: white;
    padding-left: 0.1em;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }

  background-image: ${(props) =>
    props.$backgroundImage ? `url(${props.$backgroundImage})` : "none"};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

interface ActivityCardProps {
  className?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
}

const ActivityCard = ({ className, children, backgroundImage }: ActivityCardProps) => {
  return (
    <ActivityCardStyled className={className} $backgroundImage={backgroundImage}>
      {children}
    </ActivityCardStyled>
  );
};

export default ActivityCard;
