import { getPosts } from "@/actions/postActions";
import { getDbUserId } from "@/actions/userActions";
import CreatePost from "./posts/createPost";
import PostCard from "./posts/postCard";

export default async function Home() {
  const posts = await getPosts();
  const currentUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 ">
      <div className="lg:col-span-12">
        {currentUserId ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUserId={currentUserId} />
          ))}
        </div>
      </div>
    </div>
  );
}
