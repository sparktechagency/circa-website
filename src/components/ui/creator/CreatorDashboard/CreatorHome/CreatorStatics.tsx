import { CircleDollarSign, Package, Users } from 'lucide-react';

const CreatorStatics = ({ statistics }: { statistics: any }) => {
  const stats = [
    { label: 'Total Earning', value: `$${(statistics?.analatys?.totalEarning || 0).toFixed(2)}`, icon: <CircleDollarSign className="text-purple-400" />, bgColor: 'bg-purple-500/20' },
    { label: 'Total Fans', value: statistics?.analatys?.totalMembers || 0, icon: <Users className="text-pink-400" />, bgColor: 'bg-pink-500/20' },
    { label: 'Total sale', value: `$${(statistics?.analatys?.totalSale || 0).toFixed(2)}`, icon: <Package className="text-orange-400" />, bgColor: 'bg-orange-500/20' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats?.map((stat, i) => (
        <div key={i} className="bg-cardBg   p-6 rounded-2xl flex justify-between items-center transition-all ">
          <div className="">
            <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mb-2`}>
              {stat.icon}
            </div>
            <span className="text-gray-400 font-medium">{stat.label}</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

export default CreatorStatics