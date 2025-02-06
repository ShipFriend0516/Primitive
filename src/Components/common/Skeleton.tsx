interface SkeletonProps {
  className?: string;
  children?: React.ReactElement | React.ReactElement[];
}

const Skeleton = ({ className, children }: SkeletonProps) => {
  return (
    <div className={`bg-gray-300/70 rounded-md animate-pulse ${className} `}>
      {children}
    </div>
  );
};
export default Skeleton;
