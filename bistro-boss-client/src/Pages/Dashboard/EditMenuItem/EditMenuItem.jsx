import { useParams } from "react-router-dom";
import EditMenu from "../../../Components/EditMenu/EditMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { reset } from "../../../Redux/Slice/menuSlice";

const EditMenuItem = () => {
    const {isUpdateMenuSuccess,isUpdateMenuLoading} = useSelector(state=>state.menu)
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(isUpdateMenuSuccess) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Menu item updated successfully',
                showConfirmButton: false,
                timer: 2000
              })
              dispatch(reset())
        }
        if(isUpdateMenuLoading) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Update Failed',
                showConfirmButton: false,
                timer: 2000
              })
              dispatch(reset())
        }
    },[dispatch, isUpdateMenuLoading, isUpdateMenuSuccess])

    return (
        <div>
            <h1 className="text-center text-4xl font-semibold my-7">UPDATE ITEM</h1>
            <EditMenu id={params.id}/>
        </div>
    );
};

export default EditMenuItem;