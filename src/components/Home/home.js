import React, { useState, useEffect } from 'react'
import CustomCard from '../../commoncomponents/Cards';
import Snackbar from '../../commoncomponents/Snackbar';
import Loader from '../../commoncomponents/Loader';
import Links from '../../commoncomponents/Links';


function HomeScreen() {

    const [userList, setuserList] = useState([]);
    const [snackBar, setsnackBar] = useState({
        open: false, message: '', type: ''
    })
    const [currentCase, setcurrentCase] = useState('Case1')
    const [loading, setLoading] = useState(true)

    const handlesnackbarClose = () => {
        setsnackBar({ ...snackBar, open: false })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Links.baseApi}`);
                const result = await response.json();
                setuserList(result)
                setcurrentCase('case3')
            } catch (error) {
                setsnackBar({ open: true, message: 'Please try after sometime ', type: "error" })
                setcurrentCase('case2')
            } finally {
                setLoading(false)
                setcurrentCase('case4')
            }
        };

        fetchData()
    }, [])


    switch (currentCase) {
        case 'case1': return <Loader />
        case 'case2': return <Snackbar
            open={snackBar.open}
            message={snackBar.message}
            type={snackBar.type}
            onClose={handlesnackbarClose}
        />
        default:
            return  <CustomCard userlist={userList} />
    }

}

export default HomeScreen