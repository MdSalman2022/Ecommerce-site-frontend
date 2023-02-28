import React, { useState } from 'react'
import Billing from './Billing';
import MyProfile from './MyProfile';
import NotificationSettings from './NotificationSettings';
import PasswordTab from './PasswordTab';
import Team from './Team';

function Settings() {


    
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <div>
            <div className="text-3xl font-bold">Settings</div>

            <div className="flex w-full mt-10">
                <div className='flex text-center'>
                    <div onClick={()=>setActiveTab('profile')} className={`w-28 h-10 cursor-pointer border-b-2 tracking-wider hover:border-primary hover:text-primary font-semibold ${activeTab === 'profile' && 'text-primary border-primary'}`}>My Profile</div>
                    <div onClick={()=>setActiveTab('password')} className={`w-28 h-10 cursor-pointer border-b-2 tracking-wider hover:border-primary hover:text-primary font-semibold ${activeTab === 'password' && 'text-primary border-primary'}`}>Password</div>
                    <div onClick={()=>setActiveTab('team')} className={`w-20 h-10 cursor-pointer border-b-2 tracking-wider hover:border-primary hover:text-primary font-semibold ${activeTab === 'team' && 'text-primary border-primary'}`}>Team</div>
                    <div onClick={()=>setActiveTab('notification')} className={`w-28 h-10 cursor-pointer border-b-2 tracking-wider hover:border-primary hover:text-primary font-semibold ${activeTab === 'notification' && 'text-primary border-primary'}`}>Notification</div>
                    <div onClick={()=>setActiveTab('billing')} className={`w-24 h-10 cursor-pointer border-b-2 tracking-wider hover:border-primary hover:text-primary font-semibold ${activeTab === 'billing' && 'text-primary border-primary'}`}>Billing</div>
                </div>
                <div className='flex border-b-2 w-full'></div>
            </div>

            {activeTab === 'profile' && <MyProfile/>}
            {activeTab === 'password' && <PasswordTab/>}
            {activeTab === 'team' && <Team/>}
            {activeTab === 'notification' && <NotificationSettings/>}
            {activeTab === 'billing' && <Billing/>}
            

            
        </div>
    )
}

export default Settings;
