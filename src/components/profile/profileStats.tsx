import { UserStats } from "@/types/type";

type Props = {
  stats: UserStats; // Use the UserStats type here
};

export const ProfileStats: React.FC<Props> = ({ stats }) => (
  <div className="flex justify-center gap-10 mt-4 px-14">
    {[
      { label: "Posts", value: stats.posts },
      { label: "Following", value: stats.following },
      { label: "Followers", value: stats.followers },
    ].map((stat) => (
      <div key={stat.label} className=" text-center ">
        <p className="font-semibold text-lg">{stat.value.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{stat.label}</p>
      </div>
    ))}
  </div>
);
