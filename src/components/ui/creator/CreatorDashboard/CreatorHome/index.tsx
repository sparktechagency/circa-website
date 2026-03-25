'use client'
import CreatorStatics from './CreatorStatics';
import Header from './Header';
import PostCard from './PostCard';
import TabBarWithContent from './TabBarWithContent';

const CreatorHome = () => {



  return (
    <div className=" text-white font-sans selection:bg-purple-500/30">
      <Header />
      <main className="">
        <CreatorStatics />
        <div className="bg-cardBg p-6 rounded-2xl">
          {/* Tab Navigation */}
          <TabBarWithContent />         
        </div>
      </main>
    </div>
  );
};

export default CreatorHome;