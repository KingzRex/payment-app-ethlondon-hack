/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useState } from 'react';
import { Wallet, type UserProfile } from '@dynamic-labs/sdk-react-core';
import { getSmartAccountClient } from '../data/adapters/browser/pimlico/smartAccountClient';

interface DashboardProps {
    user: UserProfile;
    wallet: Wallet;
    //smartAccount: Awaited<ReturnType<typeof getSmartAccountClient>>;
}

const Dashboard: FC<DashboardProps> = ({ user, wallet }) => {

    const [smartAccountClient, setSmartAccountClient] =
        useState<Awaited<ReturnType<typeof getSmartAccountClient>>>();

    const handleGetSmartAccountClient = async () => {
        if (!wallet) throw new Error('No wallet found');

        const client = await getSmartAccountClient(wallet);

        setSmartAccountClient(client);
    };

    return (

        <section className='flex flex-col h-screen items-center justify-center border-solid border-white bg-indigo-500'>
            <div className='bg-white p-10 rounded-lg mt-10'>
                <h1 className='font-bold text-xl mb-10'>Welcome {user.email}</h1>

                {
                    smartAccountClient ?
                        <>
                            <p>Smart Account Address</p>
                            <p className="bg-indigo-100 p-4 mb-4 rounded-lg">{smartAccountClient.account.address}</p>
                            
                            <p>Chain</p>
                            <p className="bg-indigo-100 p-4 rounded-lg">{smartAccountClient.chain.name}</p>
                        </> :
                        <>
                            <button type="button" onClick={handleGetSmartAccountClient} className="bg-indigo-500 hover:bg-white hover:border-indigo-500 hover:text-indigo-500 p-3 rounded-lg border-2 w-full">
                                Get Smart Account Client
                            </button>
                        </>
                }
            </div>
        </section>
    );
};

export default Dashboard;