import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllReports = () => {


    const [reports, setReport] = useState('')

    useEffect(() => {
        fetch(`https://buyandsell24-server.vercel.app/reportedProducts/`)
            .then(res => res.json())
            .then(data => setReport(data))
    }, [])


    const handleDelete = data => {
        fetch(`https://buyandsell24-server.vercel.app/reportedProducts/${data?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Report updated Successfully')
                    const remainingReports = reports?.filter(report => report?._id !== data?._id)
                    setReport(remainingReports)
                }
            })
    }



    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-bold">All Reports</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports &&
                            reports?.map((report, index) =>
                                <tr key={report?._id}>
                                    <th>{index + 1}</th>
                                    <td>{report?.name}</td>
                                    <td>{report?.email}</td>
                                    <td>
                                        <button onClick={() => handleDelete(report)} className="btn btn-error">Remove</button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReports;