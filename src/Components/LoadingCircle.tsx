interface Props {
  color?: string;
}
const LoadingCircle = ({ color }: Props) => {
  return (
    <svg
      className={`animate-pulse h-8 w-8 rounded-full ${color ? color : "bg-green-950"}`}
      viewBox="0 0 24 24"
    ></svg>
  );
};

export default LoadingCircle;
