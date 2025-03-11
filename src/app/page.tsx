import { getPosts } from "@/actions/postActions";
import { getDbUserId } from "@/actions/userActions";
import CreatePost from "./posts/createPost";
import PostCard from "./posts/postCard";
import SuggestedUsers from "@/components/suggestedUsers";
import SuggestedPosts from "@/components/post/suggestedPosts";

export default async function Home() {
  const posts = await getPosts();
  const currentUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        {currentUserId ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUserId={currentUserId} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-5 sticky top-24 space-y-4">
        <SuggestedPosts />
        <SuggestedUsers />
      </div>
    </div>
  );
}
