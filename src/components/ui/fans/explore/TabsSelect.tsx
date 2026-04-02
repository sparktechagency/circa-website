'use client'
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '../../tabs'
import { useRouter, useSearchParams } from 'next/navigation';

const TabsSelect = () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const currentTab = searchParams.get("tab") || "browse";
    
      const handleTabChange = (value: string) => {
        router.push(`/explore?tab=${value}`);
      };
    

    return (
         <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="browse">Browse Creators</TabsTrigger>
                <TabsTrigger value="my-creator">My Creator</TabsTrigger>
                <TabsTrigger value="friends">Friends & Flirting</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default TabsSelect