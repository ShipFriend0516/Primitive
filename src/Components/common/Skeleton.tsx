interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={`bg-gray-500/80 animate-pulse ${className} `}></div>;
};
export default Skeleton;
