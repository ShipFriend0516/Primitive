interface ProfileContainerProps {
  thumbnailUrl?: string;
  username: string;
  date?: number;
}

const ProfileContainer = ({
  thumbnailUrl,
  username,
  date,
}: ProfileContainerProps) => {
  return (
    <div className={"flex items-center gap-2"}>
      <div>
        <div className="rounded-full w-10 h-10 bg-gray-300 overflow-hidden">
          {thumbnailUrl && <img src={thumbnailUrl} alt={username} />}
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div>{username}</div>
        {date && (
          <div className="font-light text-sm">
            {new Date(date).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContainer;
