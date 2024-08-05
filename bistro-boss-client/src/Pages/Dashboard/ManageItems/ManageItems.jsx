/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../Components/Table/Table';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import SectionTItle from '../../../Components/SectionTitle/SectionTItle';

const ManageItems = () => {
    const {menu} = useSelector(state=>state.menu)
    const tableHeader = ["#","Item Image","Item Name","Price","Action","Action"]
    return (
        <section>
            <SectionTItle heading={'Manage All Items'} subHeading={"Hurry up!"} />
            <div>
                <Table menus={menu} headers={tableHeader} action1={<FaRegEdit/>} action2={<MdDelete/>}/>
            </div>
        </section>
    );
};

export default ManageItems;