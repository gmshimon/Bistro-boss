/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../Components/Table/Table';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import SectionTItle from '../../../Components/SectionTitle/SectionTItle';
import { deleteMenuItem, reset, setPage } from '../../../Redux/Slice/menuSlice';
import Pagination from '../../../Components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageItems = () => {
    const {menus,totalPage,isDeleteMenuSuccess,isDeleteMenuError} = useSelector(state=>state.menu)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(setPage())
    },[dispatch])

    useEffect(()=>{
        if(isDeleteMenuSuccess){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Item Deleted successfully',
                showConfirmButton: false,
                timer: 2000
              })
              dispatch(reset())
        }
        if(isDeleteMenuError){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Delete Failed',
                showConfirmButton: false,
                timer: 2000
              })
            dispatch(reset())
        }
    },[dispatch, isDeleteMenuError, isDeleteMenuSuccess])

    const tableHeader = ["#","Item Image","Item Name","Price","Action","Action"]
    const handleEditItem = id =>{
        navigate(`/dashboard/admin-manage-items/${id}`)
    }
    const handleDeleteItem = id =>{
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteMenuItem(id))
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
    return (
        <section>
            <SectionTItle heading={'Manage All Items'} subHeading={"Hurry up!"} />
            <div>
                <Table menus={menus} headers={tableHeader} action1={<FaRegEdit/>} action2={<MdDelete/>} button1={handleEditItem} button2={handleDeleteItem}/>
            </div>
        </section>
    );
};

export default ManageItems;