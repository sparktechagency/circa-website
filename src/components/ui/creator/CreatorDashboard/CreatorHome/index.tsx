'use client'
import { Post } from '@/types';
import CreatorStatics from './CreatorStatics';
import Header from './Header';
import TabBarWithContent from './TabBarWithContent';

const CreatorHome = ({ user, statistics, posts }: { user: any, statistics: any, posts: Post[] }) => {
  return (
    <div className=" text-white font-sans selection:bg-purple-500/30">
      <Header user={user} balance={statistics?.balance} />
      <main className="">
        <CreatorStatics statistics={statistics} />
        <div className="bg-cardBg p-6 rounded-2xl">
          {/* Tab Navigation */}
          <TabBarWithContent posts={posts} />
        </div>
      </main>
    </div>
  );
};

export default CreatorHome;