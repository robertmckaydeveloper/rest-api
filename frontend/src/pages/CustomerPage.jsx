import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import { useAuth } from "../auth/KeycloakProvider";
import CustomerList from "../components/customers/CustomerList";

const CustomerPage = () => {

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <CustomerList />
            </Container>
        </>
    );
};

export default CustomerPage;