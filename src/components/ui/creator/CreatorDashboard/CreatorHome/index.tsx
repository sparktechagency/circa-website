'use client'
import CreatorStatics from './CreatorStatics';
import Header from './Header';
import TabBarWithContent from './TabBarWithContent';

const CreatorHome = ({ user }: { user: any }) => {
  return (
    <div className=" text-white font-sans selection:bg-purple-500/30">
      <Header user={user} />
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