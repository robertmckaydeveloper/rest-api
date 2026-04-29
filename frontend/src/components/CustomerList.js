import { useEffect, useState } from 'react';
import { getCustomers } from '../api/customerApi';

const CustomerList = () => {
    const[customers, setCustomers] = useState([]);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCustomers()
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            })
            .catch((err) =>  {
                console.error("Fetch error:", err);
                setError("Failed to load customers.");
                setLoading(false);
            });
    }, [])

    if (loading) return <p>Loading customers...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <div style={{ padding: '20px' }}>
            <h2>Customer Directory</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ backgroundColor: '#f4f4f4', color: '#282c34' }}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {customers.length > 0 ? (
                    customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="3">No customers found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;