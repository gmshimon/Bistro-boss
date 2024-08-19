/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../Components/Table/Table';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import SectionTItle from '../../../Components/SectionTitle/SectionTItle';
import { setPage } from '../../../Redux/Slice/menuSlice';
import Pagination from '../../../Components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const ManageItems = () => {
    const {menus,totalPage} = useSelector(state=>state.menu)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(setPage())
    },[dispatch])
    const tableHeader = ["#","Item Image","Item Name","Price","Action","Action"]
    const handleEditItem = id =>{
        navigate(`/dashboard/admin-manage-items/${id}`)
    }
    return (
        <section>
            <SectionTItle heading={'Manage All Items'} subHeading={"Hurry up!"} />
            <div>
                <Table menus={menus} headers={tableHeader} action1={<FaRegEdit/>} action2={<MdDelete/>} button1={handleEditItem}/>
            </div>
            <div className='flex justify-center my-4'>
                <Pagination totalPage={totalPage}/>
            </div>
        </section>
    );
};

export default ManageItems;