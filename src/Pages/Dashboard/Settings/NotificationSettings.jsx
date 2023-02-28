import React from 'react'
import { FaAngleDown } from 'react-icons/fa';

function NotificationSettings() {
    return (
        <div>
            <div className='flex flex-col p-3 border-b-2'>
                <p className="font-bold">Notification Settings</p>
                <p className='text-gray-400 font-medium text-sm'>Select the kind of notification you want to get</p>
            </div>
            <div className="flex justify-between border-b-2">
                <div className='flex flex-col p-3 '>
                    <p className="font-bold">Email Notifications</p>
                    <p className='text-gray-400 font-medium text-sm'>Get emails to find out what's going on when you're not online. You can turn these off.</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-start p-3 gap-2">
                        <div className="form-control">
                            <label className="cursor-pointer label p-1"> 
                            <input type="checkbox" className="toggle toggle-sm toggle-primary" checked />
                            </label>
                        </div>                   
                        <div className='flex flex-col'>
                            <p className="font-bold">News and updates</p>
                            <p className='text-gray-400 font-medium text-sm'>News about product and feature updates</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 gap-2">
                        <div className="form-control">
                            <label className="cursor-pointer label p-1"> 
                            <input type="checkbox" className="toggle toggle-sm toggle-primary" checked />
                            </label>
                        </div>                   
                        <div className='flex flex-col'>
                            <p className="font-bold">User research</p>
                            <p className='text-gray-400 font-medium text-sm w-96'>Get involved in our beta testing program or participate in paid product user research</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 gap-2">
                        <div className="form-control">
                            <label className="cursor-pointer label p-1"> 
                            <input type="checkbox" className="toggle toggle-sm toggle-primary" checked />
                            </label>
                        </div>                   
                        <div className='flex flex-col'>
                            <p className="font-bold">Tips and tutorials</p>
                            <p className='text-gray-400 font-medium text-sm w-96'>Tips on getting more out of Untitled</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 gap-2">
                        <div className="form-control">
                            <label className="cursor-pointer label p-1"> 
                            <input type="checkbox" className="toggle toggle-sm toggle-primary" checked />
                            </label>
                        </div>                   
                        <div className='flex flex-col'>
                            <p className="font-bold">Reports</p>
                            <p className='text-gray-400 font-medium text-sm w-96'>Reports on product from user</p>
                        </div>
                    </div>
                    <div className="flex items-start p-3 gap-2">
                        <div className="form-control">
                            <label className="cursor-pointer label p-1"> 
                            <input type="checkbox" className="toggle toggle-sm toggle-primary" checked />
                            </label>
                        </div>                   
                        <div className='flex flex-col'>
                            <p className="font-bold">Reminders</p>
                            <p className='text-gray-400 font-medium text-sm w-96'>These are notifications to remind you of updates you might have missed</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-3">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-secondary btn-outline gap-2 m-1">Suggested <FaAngleDown/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Suggestion 1</a></li>
                            <li><a>Suggestion 2</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-secondary btn-outline gap-2 m-1">Suggested <FaAngleDown/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Suggestion 1</a></li>
                            <li><a>Suggestion 2</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-secondary btn-outline gap-2 m-1">Suggested <FaAngleDown/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Suggestion 1</a></li>
                            <li><a>Suggestion 2</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-secondary btn-outline gap-2 m-1">Suggested <FaAngleDown/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Suggestion 1</a></li>
                            <li><a>Suggestion 2</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-secondary btn-outline gap-2 m-1">Suggested <FaAngleDown/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Suggestion 1</a></li>
                            <li><a>Suggestion 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NotificationSettings
